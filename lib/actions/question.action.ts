'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tag.model";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import {  CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams } from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams){
    try {
        connectToDatabase();
    
        const { searchQuery, filter, page = 1, pageSize = 20 } = params;
    
        // calculate the number of posts to skip based on the page number and page size
        const skipAmount = (page - 1) * pageSize;
    
        const query: FilterQuery<typeof Question> = {};
    
        if (searchQuery) {
          query.$or = [
            {
              title: { $regex: new RegExp(searchQuery, "i") },
            },
            {
              content: { $regex: new RegExp(searchQuery, "i") },
            },
          ];
        }
    
        let sortOptions = {};
    
        switch (filter) {
          case "newest":
            sortOptions = { createdAt: -1 };
            break;
          case "frequent":
            sortOptions = { views: -1 };
            break;
          case "unanswered":
            query.answers = { $size: 0 };
            break;
          default:
            break;
        }
    
        const totalQuestions = await Question.countDocuments(query);
    
        const questions = await Question.find(query)
          .populate({ path: "tags", model: Tag }) // we have id of the tag, this is to get the tag's name i.e it's value.
          .populate({ path: "author", model: User })
          .skip(skipAmount)
          .limit(pageSize)
          .sort(sortOptions);
    
        const isNext = totalQuestions > skipAmount + questions.length;
    
        return { questions, isNext };
      } catch (error) {
        console.log(error);
        throw error;
      }
}


export async function createQuestion(params: CreateQuestionParams) {
    //eslint-disable-next-line no-empty
    try {
        //connect to db
        connectToDatabase();
        const { title, content, tags, author, path } = params;
        //create the question
        const question = await Question.create({
            title,
            content,
            author,
        })
        const tagDocuments = [];
        // create the tags or get them if they already exist
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                {
                    name: { $regex: new RegExp(`^${tag}$`, "i") },
                },
                {
                    $setOnInsert: { name: tag },
                    $push: { questions: question._id },
                }, // insert a question for a specific tag
                {
                    upsert: true,
                    new: true,
                }
            );

            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } },
        });
        // Create an interaction record for user's ask-question action and then increment author's reputation by +5 for creating a question

        // await Interaction.create({
        //     user: author,
        //     action: "ask_question",
        //     question: question._id,
        //     tags: tagDocuments,
        // });

        // await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

        revalidatePath(path);
    } catch (err) {

    }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id name clerkId picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}