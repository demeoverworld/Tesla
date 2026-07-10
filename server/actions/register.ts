"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/server";
import { registerSchema } from "@/types/register-schema";
import { users } from "@/server/schema";

type RegisterInput = unknown;

export async function registerUser(input: RegisterInput) {
	const parsed = registerSchema.safeParse(input);

	if (!parsed.success) {
		return {
			error: parsed.error.issues[0]?.message ?? "Invalid registration data",
		};
	}

	const { email, password, name } = parsed.data;

	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (existingUser) {
		return { error: "An account with this email already exists" };
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	await db.insert(users).values({
		name,
		email,
		password: hashedPassword,
		emailVerified: null,
	});

	return { success: "Account created successfully" };
}
