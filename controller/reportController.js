import borrowModel from "../model/borrowingModel.js";
import bookModel from "../model/bookModel.js";
export const getBorrowedBooksReport = async (req, res, next) => {
  try {
    const report = await borrowModel.aggregate([
      {
        $group: {
          _id: "$book",
          borrowCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          title: "$bookDetails.title",
          author: "$bookDetails.author",
          borrowCount: 1,
        },
      },
    ]);

    res.status(200).json({ status: "success", data: report });
  } catch (error) {
    next(error);
  }
};

export const getActiveMembers = async (req, res, next) => {
  try {
    const report = await borrowModel.aggregate([
      {
        $group: {
          _id: "$user",
          borrowCount: { $sum: 1 },
        },
      },
      { $sort: { borrowCount: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      { $unwind: "$userDetails" },

      {
        $project: {
          _id: 0,
          name: "$userDetails.name",
          email: "$userDetails.email",
          borrowCount: 1,
        },
      },
    ]);

    res.status(200).json({ status: "success", data: report });
  } catch (error) {
    next(error);
  }
};

export const getBooksAvailability = async (req, res, next) => {
  try {
    const report = await bookModel.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: "$numberOfCopies" },
          availableBooks: {
            $sum: {
              $cond: { if: { $gt: ["$numberOfCopies", 0] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $project: {
          _id: 0, 
          totalBooks: 1,
          availableBooks: 1,
        },
      },
    ]);

    res.status(200).json({ status: "success", data: report });
  } catch (error) {
    next(error);
  }
};
