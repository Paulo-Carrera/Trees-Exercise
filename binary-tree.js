/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
    constructor(val, left = null, right = null) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }
  
  class BinaryTree {
    constructor(root = null) {
      this.root = root;
    }
  
    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */
  
    minDepth(){
      if (!this.root) return 0;
      let queue = [{node: this.root, depth: 1}];

      while (queue.length > 0) {
        let { node, depth } = queue.shift();

        if (!node.left && !node.right) return depth;

        // add children to the queue with depth incremented
        if (node.left) queue.push({node: node.left, depth : depth + 1});
        if (node.right) queue.push({node: node.right, depth : depth + 1});
      }
    }
  
    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */
  
    maxDepth() {
      function dfs(node) {
        if (!node) return 0 ;
        return 1 + Math.max(dfs(node.left), dfs(node.right));
      }
      return dfs(this.root);
    }
  
    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */
  
    maxSum() {
      let maxSum = -Infinity;

      function dfs(node) {
        if (!node) return 0;

        let leftSum = Math.max(0, dfs(node.left));
        let rightSum = Math.max(0, dfs(node.right));

        maxSum = Math.max(maxSum, node.val + leftSum + rightSum);

        return node.val + Math.max(leftSum, rightSum);
      }

      dfs(this.root);
      return maxSum === -Infinity ? 0 : maxSum;
    }
  
    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */
  
    nextLarger(lowerBound) {
      if (!this.root) return null;

      let stack = [this.root];
      let closest = null;

      while (stack.length > 0) {
        let node = stack.pop();
        if (node.val > lowerBound && (closest === null || node.val < closest)) {
          closest = node.val;
        }

        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
      }
      return closest;
    }
  
    /** Further study!
     * areCousins(node1, node2): determine whether two nodes are cousins
     * (i.e. are at the same level but have different parents. ) */
  
    areCousins(node1, node2) {
      if (!this.root) return false;

      let queue = [{node: this.root, parent: null, depth: 0}];
      let node1Info = null;
      let node2Info = null;

      while (queue.length > 0) {
        let {node, parent, depth} = queue.shift();

        if (node === node1) node1Info = {parent, depth};
        if (node === node2) node2Info = {parent, depth};

        if (node1Info && node2Info) break;

        if (node.left) queue.push({node: node.left, parent: node, depth : depth + 1});
        if (node.right) queue.push({node: node.right, parent: node, depth : depth + 1});
      }
      return (
        node1Info &&
        node2Info &&
        node1Info.depth === node2Info.depth &&
        node1Info.parent !== node2Info.parent
      );
    }
  }
  
  module.exports = { BinaryTree, BinaryTreeNode };