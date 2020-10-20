//User roles or types
export enum UserType {
  STUDENT,
  PROFESSOR,
}

//Abstract class for user
export abstract class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  institution: string;
  userType: UserType;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    institution: string,
    userType: UserType
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.institution = institution;
    this.userType = userType;
  }
}

//Instructor
export class Instructor extends User {
  createProject(
    name: string,
    extension: string,
    sharedWith: Instructor[]
  ): void {
    return;
  }

  getProjects(): Project[] {
    return;
  }
}

//Student
export class Student extends User {
  getSubmissions(): Submission[] {
    return;
  }

  appealSubmission(submissionId: string): void {}
}

//User Builder - Factory Pattern to build the user object
export class UserBuilder {
  static logIn(email: string, password: string): User {
    return;
  }

  static register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    institution: string,
    userType: UserType
  ): User {
    return;
  }
}

//Project class to hold the configuration and necessary functions for plagairism detection process
export class Project {
  name: string;
  submissions: Submission[];
  owner: Instructor;
  sharedWith: Instructor[];

  //look submissions in the project
  getSubmissions(): Submission[] {
    return;
  }

  //upload files to project
  uploadFiles(files: File[]): void {}

  //start detection process
  runDetection(): void {}
}

//UploadedFile Class for holding the file uploaded and its meta data
export class UploadedFile {
  fileType: string;
  file: File;
  fileSize: number;
  lastAccessed: Date;
  lastModified: Date;
}

//All the files beloning to a student for that submission
export class Submission {
  submissionId: string;
  student: Student;
  shared: boolean; // defaults to false
  codeblocks: CodeBlock[];
  files: UploadedFile[];

  getMatches(): SubmissionMatch[] {
    return;
  }

  getMatch(matchId: string): SubmissionMatch {
    return;
  }

  generateReport(): File {
    return;
  }
}

//Match between submission of one student and submission of other student
export class SubmissionMatch {
  matchId: string;
  match: [Submission, Submission];
  fileMatch: FileMatch;
  similarityRating: number;

  getFiles(): [Submission, Submission] {
    return;
  }
}

//File of a submission of one student with file in other students submission
export class FileMatch {
  file1: UploadedFile;
  file2: UploadedFile;
  codeBlockMatches: CodeMatch[]; //all the code matches in file1 and file2.

  //get all comments from all the matched codeblocks
  getAllComments(): Comment[] {
    return;
  }
}

//Individual portion or segment of code in a file
export class CodeBlock {
  from: number;
  to: number;
  file: UploadedFile;
}

//Code in a file of one student that matches with code in file of other student
export class CodeMatch {
  code1: CodeBlock;
  code2: CodeBlock;
  comments: Comment;

  publishComment(user: User): void {}
}

//Comment Class for holding comment text and the details
export class Comment {
  text: string;
  user: User;
  createdOn: Date;
}

//View Classes, Highlevel and system components
//The view classes are represented with out any parameters as React would use state and redux(probably)

export class LoginView {
  logIn(): void {}

  register(): void {}
}

export class DashboardView {
  createProject(): Project {
    return;
  }

  fetchProjects(): Project[] {
    return;
  }

  openProject(): Project {
    return;
  }

  markProjectAsObsellete(): void {
    return;
  }
}

export class ProjectView {
  uploadFiles(): void {
    return;
  }

  runDetection(): void {
    return;
  }
}

export class AnalysisView {
    downloadReport(): void {}
  
    shareReport(): void {}
  
    markForReview(): void {}
  
    markAsPlagiarised(): void {}
  
    markAsGenuine(): void {}
  
    openSubmissionMatch(): void {}
}

export class DeepAnalysisView {
  viewComments(): void {}

  addComment(): void {}

  adjustSeverity(): void {}

  markAsPlagiarised(): void {}

  markAsOriginal(): void {}

  resolveCode(): void {}
}
