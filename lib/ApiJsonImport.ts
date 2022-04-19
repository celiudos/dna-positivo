import todosOsPosts from "@data/todos-os-posts.json";
import { IPost } from "@typesApp/IPost";

//==================

const TODOS_OS_POSTS = todosOsPosts as unknown as IPost[];

//==================

export { TODOS_OS_POSTS };
