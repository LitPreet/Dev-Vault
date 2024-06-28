"use server"
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose"
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, UpdateUserParams } from "./shared.types";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getUserById(params: any) {
    try {
        connectToDatabase();
        const { userId } = params;
        const user = await User.findOne({ clerkId: userId });
        return user
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function createUser(userData: CreateUserParams) {
    try {
        connectToDatabase();
        const newUser = await User.create(userData);
        return newUser
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function updateUser(params: UpdateUserParams) {
    try {
        connectToDatabase();
        const { clerkId, updateData, path } = params;

        const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
            new: true
        });
        return updatedUser
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function deleteUser(params: DeleteUserParams) {
    try {
      connectToDatabase();
  
      const { clerkId } = params;
      const user = await User.findOne({ clerkId });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      // if found then we have to delete the user and all his existing ties from the database
  
      // const userQuestionIds = await Question.find({ author: user._id }).distinct(
      //   "_id"
      // );
  
      // delete the user's questions
  
      await Question.deleteMany({ author: user._id });
  
      // Todo: delete user answers,comments,etc
  
      const deletedUser = await User.findByIdAndDelete(user._id);
  
      return deletedUser;
    } catch (error) {
      console.log(error);
    }
  }


  
export async function getAllUsers(params: GetAllUsersParams) {
    try {
      connectToDatabase();
      const { searchQuery, filter, page = 1, pageSize = 20 } = params;
  
      const skipAmount = (page - 1) * pageSize;
  
      const query: FilterQuery<typeof User> = {};
  
      if (searchQuery) {
        query.$or = [
          {
            name: { $regex: new RegExp(searchQuery, "i") },
          },
          {
            username: { $regex: new RegExp(searchQuery, "i") },
          },
        ];
      }
  
      let sortOptions = {};
  
      switch (filter) {
        case "new_users":
          sortOptions = { joinedAt: -1 };
          break;
        case "old_users":
          sortOptions = { joinedAt: 1 };
          break;
        case "top_contributors":
          sortOptions = { reputation: -1 };
          break;
        default:
          break;
      }
  
      const totalUsers = await User.countDocuments(query);
  
      const users = await User.find(query)
        .skip(skipAmount)
        .limit(pageSize)
        .sort(sortOptions);
  
      const isNext = totalUsers > skipAmount + users.length;
  
      return { users, isNext };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  