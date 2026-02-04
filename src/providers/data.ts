// import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// import { API_URL } from "./constants";
// export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
//   apiURL: API_URL,
// });

import {
  DataProvider,
  BaseRecord,
  GetListParams,
  GetListResponse, 
} from "@refinedev/core";
import { MOCK_SUBJECTS } from "@/components/constants/mock-data";
import { Subject } from "@/types";

export const dataProvider: DataProvider = {
  getApiUrl: () => "",

  getList: async <TData extends BaseRecord>(
    { resource }: GetListParams
  ): Promise<GetListResponse<TData>> => {
    if (resource !== "subjects") {
      return {
        data: [],
        total: 0,
      };
    }

    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length,
    };
  },

  getOne: async () => {
    throw new Error("getOne is not implemented in mock");
  },

  create: async () => {
    throw new Error("create is not implemented in mock");
  },

  update: async () => {
    throw new Error("update is not implemented in mock");
  },

  deleteOne: async () => {
    throw new Error("deleteOne is not implemented in mock");
  },
};
