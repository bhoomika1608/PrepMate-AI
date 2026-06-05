const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config({ override: true });

const questions = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    topic: 'Arrays',
    exampleIn: 'nums = [2,7,11,15], target = 9',
    exampleOut: '[0,1]'
  },
  {
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    difficulty: 'Easy',
    topic: 'Stack',
    exampleIn: 's = "()[]{}"',
    exampleOut: 'true'
  },
  {
    title: 'Reverse Linked List',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    difficulty: 'Easy',
    topic: 'Linked List',
    exampleIn: 'head = [1,2,3,4,5]',
    exampleOut: '[5,4,3,2,1]'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    exampleIn: 's = "abcabcbb"',
    exampleOut: '3'
  },
  {
    title: 'Container With Most Water',
    description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    exampleIn: 'height = [1,8,6,2,5,4,8,3,7]',
    exampleOut: '49'
  },
  {
    title: 'Merge Intervals',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    difficulty: 'Medium',
    topic: 'Sorting',
    exampleIn: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
    exampleOut: '[[1,6],[8,10],[15,18]]'
  },
  {
    title: 'Search in Rotated Sorted Array',
    description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
    difficulty: 'Medium',
    topic: 'Searching',
    exampleIn: 'nums = [4,5,6,7,0,1,2], target = 0',
    exampleOut: '4'
  },
  {
    title: 'Valid Anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    difficulty: 'Easy',
    topic: 'Strings',
    exampleIn: 's = "anagram", t = "nagaram"',
    exampleOut: 'true'
  },
  {
    title: 'Design Circular Queue',
    description: 'Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle.',
    difficulty: 'Medium',
    topic: 'Queue',
    exampleIn: '["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]\n[[3], [1], [2], [3], [4], [], [], [], [4], []]',
    exampleOut: '[null, true, true, true, false, 3, true, true, true, 4]'
  },
  {
    title: 'Fibonacci Number',
    description: 'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.',
    difficulty: 'Easy',
    topic: 'Recursion',
    exampleIn: 'n = 2',
    exampleOut: '1'
  },
  {
    title: 'Merge K Sorted Lists',
    description: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'Hard',
    topic: 'Linked List',
    exampleIn: 'lists = [[1,4,5],[1,3,4],[2,6]]',
    exampleOut: '[1,1,2,3,4,4,5,6]'
  },
  {
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    exampleIn: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
    exampleOut: '6'
  },
  {
    title: 'Minimum Window Substring',
    description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
    difficulty: 'Hard',
    topic: 'Sliding Window',
    exampleIn: 's = "ADOBECODEBANC", t = "ABC"',
    exampleOut: '"BANC"'
  },
  {
    title: 'Group Anagrams',
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    difficulty: 'Medium',
    topic: 'Strings',
    exampleIn: 'strs = ["eat","tea","tan","ate","nat","bat"]',
    exampleOut: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
  },
  {
    title: 'Sort Colors',
    description: 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.',
    difficulty: 'Medium',
    topic: 'Sorting',
    exampleIn: 'nums = [2,0,2,1,1,0]',
    exampleOut: '[0,0,1,1,2,2]'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Question.deleteMany({});
    console.log('Cleared existing questions');

    await Question.insertMany(questions);
    console.log('Successfully seeded 15 DSA questions');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
