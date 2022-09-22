import { Forum } from "./Forum";
import { Tag } from "./Tag";

export class Forumtags{
    public id: number;
    public forumId: number;
    public tagId: number;
    public forum: Forum;
    public tag: Tag;
}