import { Request, Response, Router } from "express";
import {
  authenticateToken,
  CustomRequest,
} from "../middlewares/authenticateToken";
import { UserPayload } from "../types/jwtPayload";
const router = Router();

router.get("/", authenticateToken, (request: Request, response: Response) => {
  const customRequest = request as CustomRequest;
  const validToken = customRequest.token as UserPayload;
  if (validToken) {
    const userExpenses = expenses.find(
      (expense) => expense.username === validToken.username
    );
    if (userExpenses) {
      return response.json({data: userExpenses.expenses});
    } else {
      return response
        .status(404)
        .json({ message: "No expenses found for the user" });
    }
  } else {
    return response.status(401).json({ message: "No token found" });
  }
});

const expenses = [
  {
    _id: "66decc23d0f8f023cbebecb1",
    username: "Oppa Wunna",
    expenses: [
      {
        description: "Groceries",
        amount: 120.5,
        date: "2024-09-10T15:45:00.000+00:00",
        category: "Food & Dining",
      },
      {
        description: "Gasoline",
        amount: 40.75,
        date: "2024-09-11T10:00:00.000+00:00",
        category: "Transportation",
      },
      {
        description: "Movie Tickets",
        amount: 30.0,
        date: "2024-09-12T20:00:00.000+00:00",
        category: "Entertainment",
      },
    ],
  },
  {
    _id: "66e00b1fd2341292b7241b66",
    username: "Emily",
    expenses: [
      {
        description: "Restaurant",
        amount: 75.0,
        date: "2024-09-09T19:30:00.000+00:00",
        category: "Food & Dining",
      },
      {
        description: "Phone Bill",
        amount: 50.0,
        date: "2024-09-11T08:00:00.000+00:00",
        category: "Utilities",
      },
      {
        description: "Gym Membership",
        amount: 25.0,
        date: "2024-09-11T09:00:00.000+00:00",
        category: "Health & Fitness",
      },
    ],
  },
  {
    _id: "66e0ff3cb45e3319642dcae2",
    username: "lil z",
    expenses: [
      {
        description: "New Sneakers",
        amount: 150.0,
        date: "2024-09-10T16:30:00.000+00:00",
        category: "Shopping",
      },
      {
        description: "Concert Tickets",
        amount: 200.0,
        date: "2024-09-11T20:00:00.000+00:00",
        category: "Entertainment",
      },
      {
        description: "Lunch",
        amount: 25.0,
        date: "2024-09-12T13:00:00.000+00:00",
        category: "Food & Dining",
      },
    ],
  },
];

export default router;
