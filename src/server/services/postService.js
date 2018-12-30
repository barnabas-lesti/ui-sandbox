const fsExtra = require('fs-extra');
const marked = require('marked');

const { config, logger } = require('../common');

const POSTS_PATH = `${ config.dataStore.BUCKET_PATH }/posts`;

class PostService {
	async getPost (postGroup, postId) {
		const postDir = `${ POSTS_PATH }/${ postGroup }/${ postId }`;
		try {
			const post = await this._fetchDataFromBucket(`${ postDir }/${ postId }`);
			return {
				postGroup,
				postId,
				...post,
			};
		} catch (error) {
			if (error.code !== 'ENOENT') {
				logger.error(error);
			}
			return null;
		}
	}

	async getPosts (postGroup) {
		const postGroupDir = `${ POSTS_PATH }/${ postGroup }`;
		try {
			const filesAndFolders = await fsExtra.readdir(postGroupDir);
			const postIds = filesAndFolders.filter(item => !item.endsWith('.json') && !item.endsWith('.md'));
			const postPromises = [];
			for (const postId of postIds) {
				postPromises.push(this.getPost(postGroup, postId));
			}
			const posts = await Promise.all(postPromises);
			return posts.length > 0 ? posts : null;
		} catch (error) {
			if (error.code !== 'ENOENT') {
				logger.error(error);
			}
			return null;
		}
	}

	async getPostGroup (postGroup) {
		const postGroupDir = `${ POSTS_PATH }/${ postGroup }`;
		try {
			const postGroupData = await this._fetchDataFromBucket(`${ postGroupDir }/${ postGroup }`);
			return {
				postGroup,
				...postGroupData,
			};
		} catch (error) {
			if (error.code !== 'ENOENT') {
				logger.error(error);
			}
			return null;
		}
	}

	async getPostGroups () {
		try {
			const filesAndFolders = await fsExtra.readdir(POSTS_PATH);
			const postGroupsIds = filesAndFolders.filter(item => !item.endsWith('.json') && !item.endsWith('.md'));
			const postGroupPromises = [];
			for (const postGroupId of postGroupsIds) {
				postGroupPromises.push(this.getPostGroup(postGroupId));
			}
			const postGroups = (await Promise.all(postGroupPromises)).filter(postGroup => postGroup !== null);
			return postGroups;
		} catch (error) {
			if (error.code !== 'ENOENT') {
				logger.error(error);
			}
			return null;
		}
	}

	async getRootPostsData () {
		try {
			const rootPostsMeta = await this._fetchDataFromBucket(`${ POSTS_PATH }/posts`);
			return rootPostsMeta;
		} catch (error) {
			if (error.code !== 'ENOENT') {
				logger.error(error);
			}
			return null;
		}
	}

	async _fetchDataFromBucket (path) {
		const [ rawMeta, mdContent ] = await Promise.all([
			fsExtra.readFile(`${ path }.json`, 'utf-8'),
			fsExtra.readFile(`${ path }.md`, 'utf-8'),
		]);
		const postMeta = JSON.parse(rawMeta);
		const htmlContent = marked(mdContent);
		const post = this._mergeContentWithMeta(htmlContent, postMeta);
		return post;
	}

	_mergeContentWithMeta (content, meta) {
		const merged = {
			...meta,
			content,
		};
		return merged;
	}
}

const postService = new PostService();
module.exports = postService;


