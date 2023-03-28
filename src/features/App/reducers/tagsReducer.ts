import { TabsProps } from 'antd';

export enum EActionType {
  ADD,
  DELETE,
  DELETE_ALL,
  DELETE_OTHER,
}

export type Tag = {
  key: string;
  label: string;
};

type ActionType =
  | {
      type: EActionType.ADD;
      payload: Tag;
    }
  | {
      type: EActionType.DELETE;
      payload: Omit<Tag, 'label'>;
    }
  | {
      type: EActionType.DELETE_ALL;
      payload: null;
    }
  | {
      type: EActionType.DELETE_OTHER;
      payload: Omit<Tag, 'label'>;
    };

type TagsReducer = (tags: TabsProps['items'], action: ActionType) => TabsProps['items'];

const tagsReducer: TagsReducer = (tags, action) => {
  switch (action.type) {
    case EActionType.ADD: {
      if (tags?.findIndex((tag) => tag.key === action.payload.key) === -1) {
        return [...tags, { ...action.payload }];
      }
      return tags;
    }
    case EActionType.DELETE: {
      return tags?.filter((t) => t.key !== action.payload.key);
    }
    case EActionType.DELETE_ALL: {
      return tags?.slice(0, 1);
    }
    case EActionType.DELETE_OTHER: {
      return tags?.filter((t, index) => index === 0 || t.key === action.payload.key);
    }
    default: {
      throw Error('Unknown action');
    }
  }
};

export default tagsReducer;
