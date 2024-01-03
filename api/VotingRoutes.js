// adding swagger annotations 

/**
 * @swagger
 * /vote/{commentId}/{direction}:
 *   get:
 *     summary: Endpoint for voting on a comment
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *       - name: direction
 *         in: path
 *         required: true
 *         description: Direction of the vote (up or down)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example: true
 */

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: Get vote information for multiple comments
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentsIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               commentsTotals:
 *                 commentId1: 5
 *                 commentId2: -2
 *               userVotes:
 *                 commentId1: 1
 *                 commentId2: -1
 */


import express from 'express';
import {getUserFromToken} from "./UserFunctions.js";
import Vote from "./models/Vote.js";

const router = express.Router();

router.get('/vote/:commentId/:direction', (req, res) => {
  getUserFromToken(req.cookies.token)
    .then(userInfo => {

      // removing my existing votes
      Vote.remove({commentId:req.params.commentId,author:userInfo.username})
        .then(() => {

          if (['up','down'].indexOf(req.params.direction) === -1) {
            res.json(true);
            return;
          }

          // creating my new vote
          const vote = new Vote({
            author: userInfo.username,
            direction: req.params.direction === 'up' ? 1 : -1,
            commentId: req.params.commentId,
          });
          vote.save().then(() => {
            res.json(true);
          });

        });
    })
});

router.post('/votes', (req,res) => {
  const {commentsIds} = req.body;

  getUserFromToken(req.cookies.token).then(userInfo => {

    Vote.find({commentId: {'$in': commentsIds}})
      .then(votes => {
        let commentsTotals = {};
        votes.forEach(vote => {
          if (typeof commentsTotals[vote.commentId] === 'undefined') {
            commentsTotals[vote.commentId] = 0;
          }
          commentsTotals[vote.commentId] += vote.direction;
        });

        let userVotes = {};
        votes.forEach(vote => {
          if (vote.author === userInfo.username) {
            userVotes[vote.commentId] = vote.direction;
          }
        });

        res.json({commentsTotals, userVotes});
      });

  });

})

export default router;