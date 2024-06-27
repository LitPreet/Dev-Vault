'use server'

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/database/tag.model";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: any) {
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