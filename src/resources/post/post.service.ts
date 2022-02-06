import PostModel from "@/resources/post/post.model";
import Post from '@/resources/post/post.interface';
import HttpException from "@/utils/exceptions/http.exception";

class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */
    public async create (title:string, body:string):Promise<Post>{
        try{
            const savedPost = await this.post.create({title, body})
            return savedPost;
        }catch(error){
            throw new HttpException(400,'Cannot create post');  
        }
        
    }   
}
export default PostService