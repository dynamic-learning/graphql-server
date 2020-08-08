import Sim from "../../models/sim";

export const sims = async (root, args) => {
  const keyword = args.keyword;
  const query = {
    $or: [
      {
        title: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        description: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        tags: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  };
  try {
    return await Sim.find(query);
  } catch (err) {
    console.log(err);
  }
};
