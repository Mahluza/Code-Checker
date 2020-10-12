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

export class LoginBuilder {
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

export class CodeMatch {
    code1: string;
    code2: string;
}

export class FileMatch {
    file1: UploadedFile;
    file2: UploadedFile;
    codeBlockMatch: CodeMatch;
}

export class SubmissionMatch {
    matchId: string;
    match: [Submission, Submission];
    fileMatch: FileMatch[];

    similarityRating: number;

    getFiles(): [Submission, Submission] {
        return;
    }
}

export class Submission {
    submissionId: string;
    student: Student;
    shared: boolean; // defaults to false
    files: UploadedFile[];
    similarityRating: number;

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
    
    uploadFiles(file: File): void {}
}



export class Student extends User {
    getSubmissions(): Submission[] {
        return;
    }
    
    appealSubmission(submissionId: string): void {}

}

export class Instructor extends User {
    getProjects(): Project[] {
        return;
    }

    publishComment(codeMatch: CodeMatch): void {}

}

