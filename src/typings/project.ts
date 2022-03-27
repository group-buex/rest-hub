export type TempApiItemType = {
  groupId: string;
  status: string;
  seq: number;
  order: number;
  method: string;
  url: string;
  description: string;
  notice: string;
  mockData: object;
  request: {
    seq: number;
    order: number;
    isRequired: boolean;
    name: string;
    type: string;
    defaultValue: string;
    description: string;
  }[];
  response: {
    seq: number;
    order: number;
    code: number;
    message: string;
    data: object;
  }[];
};
