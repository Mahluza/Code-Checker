import { Project } from 'ts-morph'

/**
 * Project class uses Singleton pattern to maintain single project instance
 */
export default class ASTProject {
  private static project: Project

  /* istanbul ignore next */
  private constructor() {}

  public static instance(): Project {
    if (!ASTProject.project) {
      ASTProject.project = new Project()
    }
    return this.project
  }
}
