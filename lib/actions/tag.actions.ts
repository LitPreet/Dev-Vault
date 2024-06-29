"use server"

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams,GetQuestionsByTagIdParams,GetAllTagsParams} from "./shared.types";
import { FilterQuery } from "mongoose";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase()
        const { userId, limit = 3 } = params;
        const user = await User.findById(userId);
        if (!user) throw new Error("No user found")
        return [{ _id: '1', name: 'tag1' }, { _id: '2', name: 'tag2' }, { _id: '3', name: 'tag3' }]
    } catch (err) {
        console.log(err)
    }
}

export async function getAllTags(params: GetAllTagsParams) {
    try {
      connectToDatabase();
  
      const { searchQuery, filter, page = 1, pageSize = 20 } = params;
  
      const skipAmount = (page - 1) * pageSize;
  
      const query: FilterQuery<typeof Tag> = {};
  
      if (searchQuery) {
        query.$or = [
          {
            name: { $regex: new RegExp(searchQuery, "i") },
          },
        ];
      }
  
      let sortOptions = {};
  
      switch (filter) {
        case "popular":
          sortOptions = { questions: -1 };
          break;
        case "recent":
          sortOptions = { createdOn: -1 };
          break;
        case "name":
          sortOptions = { name: 1 };
          break;
        case "old":
          sortOptions = { createdOn: 1 };
          break;
        default:
          break;
      }
  
      const totalTags = await Tag.countDocuments();
  
      const tags = await Tag.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);
  
      const isNext = totalTags > skipAmount + tags.length;
  
      return { tags, isNext };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
    try {
      connectToDatabase();
  
      const { tagId, searchQuery, page = 1, pageSize = 20 } = params;
  
      const skipAmount = (page - 1) * pageSize;
  
      const tagFilter: FilterQuery<ITag> = { _id: tagId };
  
      const tag = await Tag.findOne(tagFilter).populate({
        path: "questions",
        model: Question,
        match: searchQuery
          ? { title: { $regex: searchQuery, $options: "i" } }
          : {},
        options: {
          sort: { createdAt: -1 },
          skip: skipAmount,
          limit: pageSize + 1,
        },
        populate: [
          {
            path: "tags",
            model: Tag,
            select: "_id name",
          },
          {
            path: "author",
            model: User,
            select: "_id clerkId name picture",
          },
        ],
      });
  
      if (!tag) {
        throw new Error("Tag not found");
      }
  
      const questions = tag.questions;
  
      const isNext = questions.length > pageSize;
  
      return { tagTitle: tag.name, questions, isNext };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function getTopTags() {
    try {
      connectToDatabase();
  
      const topTags = await Tag.aggregate([
        { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
        { $sort: { numberOfQuestions: -1 } },
        { $limit: 5 },
      ]);
  
      return topTags;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }