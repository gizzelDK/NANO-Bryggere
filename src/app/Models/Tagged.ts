import { Event } from "./Event";
import { Forum } from "./Forum";
import { Tag } from "./Tag";
import { Øl } from "./Øl";

export class Tagged{
    public id: number;
    public tagId: number;
    public tags: Tag;
    public forumId: number;
    public forum: Forum;
    public eventId: number;
    public events: Event;
    public olId: number;
    public ol: Øl;
  }
