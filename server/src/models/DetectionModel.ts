import FileModel from "./fileModel";
import { Project, Node, SourceFile } from "ts-morph";

export default class DetectionModel{
    constructor(private File1: FileModel, private File2: FileModel){

    }

    run(){
        const project = new Project();
        project.addSourceFileAtPath("./src/models/exp1.ts");
        const sourceFile = project.getSourceFileOrThrow("exp1.ts");
        const interfaces = sourceFile.getInterfaces();
        console.log(interfaces.length);
        this.printAST(sourceFile, 2);
        console.log("New world!!!!");
    }

    printAST(src: Node, acc: number){
        // console.log("s", src.getChildSyntaxList());
        if(acc>0){
            acc--;
            src.forEachChild((node_el: Node) => {
                console.log(">>", acc,"--",node_el.getStartLineNumber(),"-->",node_el.getKindName(), "-->>", node_el.getText());
                this.printAST(node_el, acc)
            })
        }
    }
}