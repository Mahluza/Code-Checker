export type SubmissionSchema = {
    email: string,
    file: {
        name: string,
        content: string
    }
}