// Go to localhost:3000/register to see this page
"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { z } from "zod";

export default function Register() {
	const [email, setEmail] = useState("");
	const [type, setType] = useState("");
	const [status, setStatus] = useState("");
	const [errors, setErrors] = useState({});

	// Define the schema
	const UserSchema = z.object({
		email: z.email("Invalid email format"),
		type: z.string().min(1, "Minimum length is 1"),
	});

	const handleSubmit = async (e) => {
		e.preventDefault(); // prevent page reload
		setStatus("Submitting...");
		setErrors({});

		const formData = { email, type };
		/**
		 * formData =  {
		 * 	 email: email,
		 *   type: type
		 * }
		 */

		const validation = UserSchema.safeParse(formData);

		if (!validation.success) {
			const flattenedErrors = z.flattenError(validation.error);
			setErrors({
				email: flattenedErrors.fieldErrors.email,
				type: flattenedErrors.fieldErrors.type,
			});
			return;
		}

		try {
			const response = await fetch(
				`https://ristekdemo.free.beeceptor.com/api/users?type=${type}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);

			if (!response.ok) throw new Error("Failed to submit");

			setStatus("User created successfully!");
		} catch (err) {
			setStatus(`Error: ${err.message}`);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div>
				<label>Email:</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={styles.input}
				/>
				{errors.email && <p className={styles.errors}>{errors.email}</p>}
			</div>

			<div>
				<label>Type:</label>
				<input
					value={type}
					onChange={(e) => setType(e.target.value)}
					className={styles.input}
				/>
				{errors.type && <p className={styles.errors}>{errors.type}</p>}
			</div>

			<button type="submit" className={styles.button}>
				Create User
			</button>

			{status && <p>{status}</p>}
		</form>
	);
}
