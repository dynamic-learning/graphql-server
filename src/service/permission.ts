import mongoose from "mongoose";

export const doesUserOwnEntity = async (
  userId: string,
  entityId: string,
  entityType: string
) => {
  const entity = await mongoose.model(entityType).findById(entityId);
  const isOwner = entity?.get("owner") === userId;
  if (!isOwner) {
    return false;
  }
  return true;
};
