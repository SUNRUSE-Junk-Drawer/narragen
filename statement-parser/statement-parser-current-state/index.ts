import { StatementParserSyntaxErrorType } from "../statement-parser-syntax-error-type";
import { StatementParserSyntaxErrorToken } from "../statement-parser-syntax-error-token";

export type StatementParserCurrentState =
  | { readonly type: "initial" }
  | {
      readonly type: "globalExpectingName";
      readonly globalLine: number;
      readonly globalColumn: number;
    }
  | {
      readonly type: "globalExpectingAttribute";
      readonly name: string;
    }
  | {
      readonly type: "globalExpectingInitializer";
      readonly name: string;
      readonly attributeLine: number;
      readonly attributeColumn: number;
      readonly attribute: string;
    }
  | {
      readonly type: "attributeExpectingName";
      readonly attributeLine: number;
      readonly attributeColumn: number;
    }
  | {
      readonly type: "attributeExpectingInitializer";
      readonly attributeLine: number;
      readonly attributeColumn: number;
      readonly nameLine: number;
      readonly nameColumn: number;
      readonly name: string;
    }
  | {
      readonly type: "ruleExpectingName";
      readonly ruleLine: number;
      readonly ruleColumn: number;
    }
  | {
      readonly type: "ruleExpectingLocal";
      readonly name: string;
    }
  | {
      readonly type: "skippingUntilNextStatement";
      readonly syntaxErrorType: StatementParserSyntaxErrorType;
      readonly tokens: StatementParserSyntaxErrorToken[];
    };
