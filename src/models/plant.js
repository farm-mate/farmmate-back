const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const plantSchema = new Schema({
    // 식물 종류 - 필수
    plantType: {
        type : String,
        required : true
    },

    // 식물 별칭
    plantNickname : {
        type : String,
    },

    // 재배지
    plantLocation : {
        type : String,
    },

    // 메모
    memo : {
        type : String
    }

    // 처음 심은 날짜
    firstPlantingDate : {
        type : Date
    },

    // 최근 물 준 날짜
    recentWateringDate : {
        type : Date
    },

    // 최근 비료 준 날짜
    recentFertilizerDate: {
        type : Date
    },

    // 최근 농약 준 날짜
    recentPesticideDate : {
        type : Date
    }, 

    // 최초 생성일자
    createdAt: {
        type : Date,
        default : Date.now,
    },

    // 수정일자
    updatedAt : {
        type : Date,
        // default : Date.now,
    },

    // 삭제될경우 true
    is_deleted : {
        type : Boolean,
        default : false
    },

    

}, {collection : '', versionKey : false});

plantSchema.plugin(autoIncrement.plugin, {
    model: 'plant',
    field: 'num',
    startAt: 1,     // 시작
    increment: 1    // 증가
});
plantSchema.set('toObject', { virtuals: true });
plantSchema.set('toJSON', { virtuals: true });

// plantSchema.virtual('comments', {
//     ref: 'Comment',
//     localField: '_id',
//     foreignField: 'post',
//   });

// plantSchema.methods.createPost = function (text) {
//     const post = new this({
//       text: text,
//     });
//     return post.save();
//   };

// questionSchema.pre('remove', async function (next) {
//     const post = this;
//     try {
//       await Comment.deleteMany({ post: post._id });
//       next();
//     } catch (e) {
//       next();
//     }
//   });

module.exports = mongoose.model('Question', questionSchema);