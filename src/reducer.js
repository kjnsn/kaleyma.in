import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

const ACTION_POSTS_REQUESTED = 'POSTS_REQUESTED';
const ACTION_POSTS_SET = 'POSTS_SET';

export function createFetchPostsAction() {
    return {
        type: ACTION_POSTS_REQUESTED
    };
}

function createPostsSetAction(posts) {
    return {
        type: ACTION_POSTS_SET,
        posts
    };
}

function createFetchPosts(api) {
    return function* fetchPosts(action) {
        const posts = yield call(api.getPosts);
        yield put(createPostsSetAction(posts));
    }
}

export function createPostsSaga(api) {
    const fetchPosts = createFetchPosts(api);
    return function* postsSaga() {
        yield takeEvery(ACTION_POSTS_REQUESTED, fetchPosts);
    }
}

const initialState = {
    posts: [],
    loading: false,
    postsLoaded: false,
}

function posts(state = initialState, action) {
    switch (action.type) {
        case ACTION_POSTS_REQUESTED:
            return {
                ...state,
                loading: true,
            };
        case ACTION_POSTS_SET:
            return {
                ...state,
                loading: false,
                posts: action.posts,
                postsLoaded: true,
            }
        default:
            break;
    }
    return state;
}

export default posts;