abstract class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    institution: string;
    userType: UserType;

    constructor(firstName: string, lastName: string, email: string, password: string, institution: string, userType: UserType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.institution = institution;
        this.userType = userType;
    }
}

export class UserBuilder {
    logIn(email: string, password: string): User {
        return;
    }

    register(firstName: string, lastName: string, email: string, password: string,
        confirmPassword: string,institution: string, userType: UserType): User {
        return;
    }
}

export enum UserType {
    STUDENT,
    PROFESSOR
}

export interface UploadedFile {
    fileType: string;
    file: File;
    fileSize: number;
    lastAccessed: Date;
    lastModified: Date;
}

export class Comment{
    text: string;
    user: User;
    createdOn: Date;
}

export class CodeBlock{
    //Individual portion or segment of code in a file
    from: number;
    to: number;
    file: UploadedFile;
}

export class CodeMatch {
    //Code in a file of one student that matches with code in file of other student
    code1: CodeBlock;
    code2: CodeBlock;
    comments: Comment[];

    publishComment(user: User): void {}
}

export class FileMatch {
    //File of a submission of one student with file in other students submission
    file1: UploadedFile;
    file2: UploadedFile;
    codeBlockMatches: CodeMatch[]; //all the code matches in file1 and file2.

    getAllComments(): Comment[]{
        //get all comments from all the matched codeblocks
        return;
    }
}

export class SubmissionMatch {
    //Match between submission of one student and submission of other student
    matchId: string;
    match: [Submission, Submission];
    fileMatch: FileMatch[];
    similarityRating: number;

    getFiles(): [Submission, Submission] {
        return;
    }
}

export class Submission {
    //All the files beloning to a student
    submissionId: string;
    student: Student;
    shared: boolean; // defaults to false
    codeblocks: CodeBlock[];
    files: UploadedFile[];

    getMatches(): SubmissionMatch[] {
        return;
    }

    getMatch(matchId: string): SubmissionMatch {
        return
    }

    generateReport(): File {
        return
    }
}

export class Project {
    name: string;
    submissions: Submission[];
    owner: Instructor;
    sharedWith: Instructor[];

    getSubmissions(): Submission[] {
        return;
    }
    
    uploadFiles(files: File[]): void {}
}



export class Student extends User {
    getSubmissions(): Submission[] {
        return;
    }
    
    appealSubmission(submissionId: string): void {}

}

export class Note {
    note: string;
    createdOn: Date;
    isArchived: boolean;

    archiveNote(): void {
        return;
    }
}

export class Instructor extends User {
    notes: Note[];

    getProjects(): Project[] {
        return;
    }
}

