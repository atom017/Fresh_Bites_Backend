import { Request, Response } from "express"
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = await User.findOne({ _id: req.userId });

        if (!currentUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" })
    }
}

const createCurrentUser = async (req: Request, res: Response) => {
    //1. check if the user exists
    //2. Create user if doesn't exist
    //3. return the user object to the calling client
    //console.log("from server createUser...", req.body);
    try {
        const { auth0Id } = req.body;
        const existedUser = await User.findOne({ auth0Id });
        if (existedUser) {
            return res.status(200).send();
        }

        const userData = req.body;
        const newUser = new User(userData);
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser.toObject())
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}

const updateCurrentUser = async (req: Request, res: Response) => {
    //console.log("from server updateUser...", req.body);
    try {
        const { auth0Id, name, addressLine1, city, phoneNumber } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.phoneNumber = phoneNumber;

        await user.save();
        res.send(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user profile!" })
    }
}

export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser
}