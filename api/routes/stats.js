// routes/stats.js
router.get("/videos-per-district", async (req, res) => {
    try {
      const result = await Video.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $group: {
            _id: "$user.district",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "districts",
            localField: "_id",
            foreignField: "_id",
            as: "district",
          },
        },
        { $unwind: "$district" },
        {
          $project: {
            _id: 0,
            districtName: "$district.name",
            count: 1,
          },
        },
      ]);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Error getting stats", error: err });
    }
  });
  