import Sim from "../../models/sim";

export const createSim = async (root, args) => {
  try {
    return await new Sim({
      _id: args.sim._id,
      owner: args.sim.owner,
      title: args.sim.title,
      description: args.sim.description,
      tags: args.sim.tags,
      imageURL: args.sim.imageURL,
    }).save();
  } catch (err) {
    console.log(err);
  }
};

export const updateSim = async (root, args) => {
  const update = {
    title: args.updatedSim.title,
    description: args.updatedSim.description,
    tags: args.updatedSim.tags,
    imageURL: args.updatedSim.imageURL,
  };
  try {
    return await Sim.findByIdAndUpdate(args.simId, update, {
      new: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSim = async (root, args) => {
  const update = { _id: args.simId };
  try {
    const sim = await Sim.deleteOne(update);
    return { success: !!sim.deletedCount };
  } catch (err) {
    console.log(err);
  }
};
