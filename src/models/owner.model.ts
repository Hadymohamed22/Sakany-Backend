import { PoolClient } from "pg";
import { CreateOwnerData } from "../types/models";

export async function createOwner(
  client: PoolClient,
  data: CreateOwnerData,
): Promise<void> {
  await client.query(
    "INSERT INTO owner (owner_id, owner_address) VALUES ($1, $2)",
    [data.user_id, data.owner_address ?? null],
  );
}
