import { ParserSyntaxErrorType } from "../parser-syntax-error-type";
import { ParserSyntaxErrorToken } from "../parser-syntax-error-token";

export type ParserCurrentState =
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
      readonly type: "ruleConditionExpectingEntityA";
      readonly name: string;
      readonly whenLine: number;
      readonly whenColumn: number;
    }
  | {
      readonly type: "ruleConditionExpectingAttributeA";
      readonly name: string;
      readonly entityALine: number;
      readonly entityAColumn: number;
      readonly entityA: string;
    }
  | {
      readonly type: "ruleConditionExpectingIs";
      readonly name: string;
      readonly entityALine: number;
      readonly entityAColumn: number;
      readonly entityA: string;
      readonly attributeALine: number;
      readonly attributeAColumn: number;
      readonly attributeA: string;
    }
  | {
      readonly type: "ruleConditionExpectingEntityB";
      readonly name: string;
      readonly entityALine: number;
      readonly entityAColumn: number;
      readonly entityA: string;
      readonly attributeALine: number;
      readonly attributeAColumn: number;
      readonly attributeA: string;
      readonly isLine: number;
      readonly isColumn: number;
    }
  | {
      readonly type: "ruleConditionExpectingAttributeBOrEntityC";
      readonly name: string;
      readonly entityALine: number;
      readonly entityAColumn: number;
      readonly entityA: string;
      readonly attributeALine: number;
      readonly attributeAColumn: number;
      readonly attributeA: string;
      readonly isLine: number;
      readonly isColumn: number;
      readonly entityBLine: number;
      readonly entityBColumn: number;
      readonly entityB: string;
    }
  | {
      readonly type: "ruleConditionExpectingEntityCOrAttributeC";
      readonly name: string;
      readonly entityALine: number;
      readonly entityAColumn: number;
      readonly entityA: string;
      readonly attributeALine: number;
      readonly attributeAColumn: number;
      readonly attributeA: string;
      readonly isLine: number;
      readonly isColumn: number;
      readonly entityBLine: number;
      readonly entityBColumn: number;
      readonly entityB: string;
      readonly attributeBOrEntityCLine: number;
      readonly attributeBOrEntityCColumn: number;
      readonly attributeBOrEntityC: string;
    }
  | {
      readonly type: "ruleConditionExpectingAttributeCOrIs";
      readonly name: string;
      readonly entityALine: number;
      readonly entityAColumn: number;
      readonly entityA: string;
      readonly attributeALine: number;
      readonly attributeAColumn: number;
      readonly attributeA: string;
      readonly isLine: number;
      readonly isColumn: number;
      readonly entityBLine: number;
      readonly entityBColumn: number;
      readonly entityB: string;
      readonly attributeBOrEntityCLine: number;
      readonly attributeBOrEntityCColumn: number;
      readonly attributeBOrEntityC: string;
      readonly entityCOrAttributeCLine: number;
      readonly entityCOrAttributeCColumn: number;
      readonly entityCOrAttributeC: string;
    }
  | {
      readonly type: "skippingUntilNextStatement";
      readonly syntaxErrorType: ParserSyntaxErrorType;
      readonly tokens: ParserSyntaxErrorToken[];
    };
