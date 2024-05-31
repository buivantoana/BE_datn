import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from './schema/comments.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<Comments>,
  ) {}
  async reportCommentDad(value: any) {
    try {
      let data: any;
      let updateQuery: any = {};
      if (value.type == 0) {
        updateQuery = { $addToSet: { report_spam: value.user_id } };
      } else {
        updateQuery = { $addToSet: { report_inappropriate: value.user_id } };
      }
      data = await this.commentModel.updateOne({ _id: value._id }, updateQuery);

      if (!data || data.nModified === 0) {
        return {
          status: 1,
          message: 'Không thể cập nhật dữ liệu hoặc không có sự thay đổi',
        };
      }
      return {
        status: 0,
        message: 'Success',
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 1,
        message: 'Có lỗi xảy ra trong quá trình xử lý',
      };
    }
  }
  async reportCommentChild(value: any) {
    try {
      let data: any;
      let updateQuery: any = {};
      if (value.type == 0) {
        updateQuery = { $addToSet: { "comments_child.$.report_spam": value.user_id } };
      } else {
        updateQuery = { $addToSet: { "comments_child.$.report_inappropriate": value.user_id } };
      }
      data = await this.commentModel.updateOne(
        { _id: value.parentId, "comments_child._id": value._id },
        updateQuery
      );
      if (!data || data.modifiedCount === 0) {
        return {
          status: 1,
          message: 'Không thể cập nhật dữ liệu hoặc không có sự thay đổi',
        };
      }
   
  
      return {
        status: 0,
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 1,
        message: 'Có lỗi xảy ra trong quá trình xử lý',
      };
    }
  }
  async findReportedComments() {
    try {
      const comments = await this.commentModel.aggregate([
        {
            $match: {
              $or: [
                { 'report_spam.1': { $exists: true } },
                { 'report_inappropriate.1': { $exists: true } },
                {
                  comments_child: {
                    $elemMatch: {
                      $or: [
                        { 'report_spam.1': { $exists: true } },
                        { 'report_inappropriate.1': { $exists: true } },
                      ],
                    },
                  },
                },
              ],
            },
          },
          {
            $project: {
              content: 1,
              user_id: 1,
              courses_id: 1,
              lesson_id: 1,
              report_spam: 1,
              report_inappropriate: 1,
              comments_child: {
                $filter: {
                  input: '$comments_child',
                  as: 'child',
                  cond: {
                    $or: [
                      { $gt: [{ $size: '$$child.report_spam' }, 1] },
                      { $gt: [{ $size: '$$child.report_inappropriate' }, 1] },
                    ],
                  },
                },
              },
            },
          },
      ]);

      return {
        status: 0,
        message: 'Success',
        data: comments,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 1,
        message: 'Có lỗi xảy ra trong quá trình xử lý',
      };
    }
  }
  async deleteComment(id: string) {
    try {
      let data = await this.commentModel.findByIdAndDelete(id);
      if (!data) {
        return {
          status: 1,
          message: 'Không lấy được dữ liệu',
        };
      }
      return {
        status: 0,
        message: 'suceess',
        data,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteCommentChild(commentId: string, childId: string) {
    try {
      // Tìm và cập nhật bình luận có _id tương ứng
      const updatedComment = await this.commentModel.findOneAndUpdate(
        { _id: commentId },
        { $pull: { comments_child: { _id: childId } } },
        { new: true }
      );

      if (!updatedComment) {
        return { status: 1, message: 'Không tìm thấy bình luận hoặc bình luận không được cập nhật' };
      }

      return { status: 0, message: 'Xóa thành công bình luận con' };
    } catch (error) {
      console.error('Error deleting comment child:', error);
      return { status: 1, message: 'Có lỗi xảy ra khi xóa bình luận con' };
    }
  }
}
