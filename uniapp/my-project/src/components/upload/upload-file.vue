<template>
    <div class="file-box">
        <div v-if="type === 'image'" class="image-box" :class="{'img-line': imgLine}">
            <div v-if="!disabled" @click="chooseFile" class="trigger">
                <slot name="trigger">
                    <div class="img-box choose-img">
                        <div class="iconfont icon-hao"></div>
                    </div>
                </slot>
            </div>
            <div v-if="imgLine && _fileList.length" class="line-box" :style="{'margin-left': disabled ? '0' : '10px'}">
                <div class="img-box" v-for="(item, inx) in _fileList" :key="item.uid">
                    <slot name="file" :file="item">
                        <image class="img" :src="item.url" mode="aspectFill" @click="imagePreview(item, inx)"></image>
                        <div v-if="!disabled && (authorize || item.self)" class="iconfont icon-img btn-del icon-guanbi2" @click="deleteFile(item)"></div>
                        <div v-if="!disabled && tag" class="iconfont icon-img btn-tag icon-biaoqian" :class="{'btn-tag-active': item.keys}" @click="openTag(item)"></div>
                        <div class="percentage">
                            <div v-if="item.percentage === 0" class="ready">等待上传</div>
                            <progress v-else-if="item.percentage && item.percentage < 100" :percent="item.percentage" stroke-width="6" border-radius="10"/>
                        </div>
                    </slot>
                </div>
            </div>
            <div v-else class="img-box" v-for="(item, inx) in _fileList" :key="item.uid">
                <slot name="file" :file="item">
                    <image class="img" :src="item.url" mode="aspectFill" @click="imagePreview(item, inx)"></image>
                    <div v-if="!disabled && (authorize || item.self)" class="iconfont icon-img btn-del icon-guanbi2" @click="deleteFile(item)"></div>
                    <div v-if="!disabled && tag" class="iconfont icon-img btn-tag icon-biaoqian" :class="{'btn-tag-active': item.keys}" @click="openTag(item)"></div>
                    <div class="percentage">
                        <div v-if="item.percentage === 0" class="ready">等待上传</div>
                        <progress v-else-if="item.percentage && item.percentage < 100" :percent="item.percentage" stroke-width="6" border-radius="10"/>
                    </div>
                </slot>
            </div>
            <div v-if="disabled && _fileList.length === 0">
                <slot name="empty" :disabled="disabled">
                    <span v-if="disabled">暂无照片</span>
                </slot>
            </div>
        </div>
        <div v-else>
            <div v-if="!disabled" class="trigger" @click="chooseFile">
                <slot name="trigger">
                    <button class="iconfont icon-yunduanshangchuan">点击上传</button>
                </slot>
            </div>
            <slot name="tips"></slot>
            <div v-for="(item, inx) in _fileList" :key="item.uid">
                <slot name="file" :file="item">
                    <div class="list-box video-box" v-if="item.type === 'video'">
                        <video class="video-item" :src="item.src"></video>
                        <div v-if="!disabled && (authorize || item.self)" class="iconfont icon-img btn-del icon-guanbi2" @click="deleteFile(item)"></div>
                        <div v-if="!disabled && tag" class="iconfont icon-img btn-tag icon-biaoqian" :class="{'btn-tag-active': item.keys}" @click="openTag(item)"></div>
                        <progress v-if="item.percentage !== null" class="percentage" :percent="item.percentage" show-info stroke-width="6"/>
                    </div>
                    <div class="list-box all-box" v-else>
                        <image class="img" :src="item.url" mode="aspectFill" @click="imagePreview(item, inx)"></image>
                        <div v-if="!disabled && (authorize || item.self)" class="iconfont icon-img btn-del icon-guanbi2" @click="deleteFile(item)"></div>
                        <div v-if="!disabled && tag" class="iconfont icon-img btn-tag icon-biaoqian" :class="{'btn-tag-active': item.keys}" @click="openTag(item)"></div>
                        <div class="percentage">
                            <div class="file-name word-line">{{ item.name }}</div>
                            <div class="word-line" v-if="item.percentage === null">{{item.keys || '未贴标签'}}</div>
                            <progress v-else :percent="item.percentage" show-info stroke-width="6"/>
                        </div>
                    </div>
                </slot>
            </div>
            <slot v-if="_fileList.length === 0" name="empty" :disabled="disabled"></slot>
        </div>
        <!-- <choose-tips v-if="tag" v-model="tagDialog.show" :title="tag.title || `${type === 'image' ? '照片' : '文件'}标签`" :path="tag.path || 'tools/chooseTips/TipBasicInfo.sql'" :dict="tag.dict || ''"
                     :separator="tag.separator || ','" :splitString="tag.splitString || '_'" :max="tag.max || 6" :count="tag.count || 6" :placeholder="tag.placeholder || '新增标签'" :chooseList="tagDialog.data.memo || ''"
                     :option-list="tag.optionList || ''" @check="setTag">
            <div class="img-dialog">
                <image v-if="tagDialog.data.type === 'img'" class="img" :src="tagDialog.data.src" mode="aspectFit"></image>
                <video v-else-if="tagDialog.data.type === 'video'" class="video-item" :src="tagDialog.data.src"></video>
                <div class="word-line">{{tagDialog.data.name}}</div>
            </div>
        </choose-tips> -->
    </div>
</template>

<script>
    import { onMounted, reactive, ref, toRef, watch, computed } from 'uni-composition-api';
    import helper from "../../lib/helper";
    import store from "@/store";
    // import chooseTips from '@/components/common/choose-tips.vue';

    export default {
        name: "upload-file",
        components: {
            // chooseTips
        },
        props: {
            url: { // 文件上传前部分为 defaultApi
                type: String,
                default: '/FileUpload'
            },
            header: Object, // HTTP 请求 Header
            type: { // 文件类型，可选all、image、video
                type: String,
                default: 'all'
            },
            chooseConfig: Object, // 选择文件的配置项
            fileList: { // 展示的，不需要上传的文件
                type: Array,
                default() { return []; }
            },
            tag: [Object, Boolean], // 给文件打标签，choose-tips的相关参数
            ext: String, // 文件上传可接受的后缀
            formData: Object, // 上传参数
            autoUpload: Boolean, // 是否选完文件就自动上传
            maxSize: { // 文件可上传的最大大小，单位K，默认为20M
                type: Number,
                default: 20480
            },
            showList: { // 是否显示上传的文件列表
                type: Boolean,
                default: true
            },
            disabled: Boolean, // 是否禁用上传
            authorize: Boolean, // 在不禁用时，是否使用最高权限，此时就算不是本人也可以删除文件
            uploadBefore: { // 文件上传之前的操作，例如加水印
                type: Function,
                default() {
                    return () => {};
                }
            },
            showMsg: { // 上传成功是否显示提示语
                type: Boolean,
                default: true
            },
            imgLine: Boolean, // 图片列表时是否一行显示
        },
        setup(props, context) {
            let fileCount = 1; // 用于记录文件id
            const imgExt = ['jpg', 'gif', 'svg', 'jpeg', 'png']; // 照片的后缀
            const videoExt = ['ogm', 'wmv', 'mpg', 'webm', 'ogv', 'mov', 'asx', 'mpeg', 'mp4', 'm4v', 'avi']; // 视频的后缀
            const previewExt = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']; // 可预览的后缀
            const addFile = (file) => {
                let obj = file, src, name, type, ext;
                if (typeof file === 'string') obj = { src: file };
                src = obj.src;
                name = obj.name;
                ext = file.ext;
                if (ext) {
                    if (ext[0] === '.') {
                        ext = ext.substr(1);
                    }
                } else {
                    delete obj.obj;
                    ext = (name || src).split('.');
                    ext = ext[ext.length - 1];
                }
                ext = ext.toLowerCase();
                if (imgExt.includes(ext)) {
                    type = 'img';
                } else if (videoExt.includes(ext)) {
                    type = 'video';
                } else if (['doc', 'docx', 'docm'].includes(ext)) {
                    type = 'word';
                } else if (['xls', 'xlsx'].includes(ext)) {
                    type = 'excel';
                } else if (['ppt', 'pptx'].includes(ext)) {
                    type = 'ppt';
                } else if (['pdf'].includes(ext)) {
                    type = 'pdf';
                } else if (['zip', 'rar'].includes(ext)) {
                    type = 'zip';
                } else {
                    type = 'file';
                }
                if (!name) {
                    delete obj.name;
                    name = `文件${fileCount}.${ext}`;
                }
                return {
                    uid: fileCount++,
                    src: src,
                    url: ['img', 'video'].includes(type) ? src : `https://shhb.group/web/images/qrUpload/${type}.png`,
                    name,
                    file: file.file || file,
                    status: 'ready', // ready、uploading、success、fail
                    percentage: 0,
                    template: true, // 当前src是否为临时文件路径
                    keys: '', // 标签内容
                    memo: '', // 标签字段数据
                    ...obj,
                    type,
                    ext
                }
            }

            // 显示的文件
            const chooseList = ref([]),
                preList = ref([]); // 用于存储 fileList 的数据
            watch(toRef(props, 'fileList'), value => {
                preList.value = value.map(val => addFile({
                    ...val,
                    status: 'success',
                    percentage: null,
                    template: false
                }));
            }, {immediate: true});
            const _fileList = computed(() => {
                if (!props.showList) return [];
                return preList.value.concat(chooseList.value);
            });
            const getFileList = () => _fileList.value; // 获取组件的文件列表
            const clearFiles = () => { // 清空文件列表
                chooseList.value = [];
                preList.value = [];
            };

            // 文件的类型、可接受的后缀
            const type = toRef(props, 'type'), ext = toRef(props, 'ext');
            const _ext = computed(() => {
                if (ext.value) return ext.value;
                if (type.value === 'image') return imgExt.join('|');
                if (type.value === 'video') return videoExt.join('|');
                return 'doc|docm|docx|xls|xlsx|ppt|pptx|pdf|zip|rar|jpg|gif|svg|jpeg|png|rtf|nJSTF|csv|mp4|m4v|avi|dwg|dxf';
            });

            // 文件上限大小的提示
            const maxSize = toRef(props, 'maxSize');
            const sizeTip = computed(() => {
                let size = maxSize.value;
                if (size < 1024) {
                    return size + 'KB';
                }
                if (size % 1024) {
                    return (size / 1024).toFixed(2) + 'MB';
                }
                return (size / 1024).toFixed(0) + 'MB';
            });

            // 上传参数
            const formData = toRef(props, 'formData'), header = toRef(props, 'header');
            // 默认的上传头部
            const device = ref(null);
            helper.platform().then(res => {
                device.value = res[1];
            });
            const defaultApi = computed(() => {
                const {getters: {setter}} = store;
                return setter.apiUrl?.defaultApi;
            });
            const _header = computed(() => {
                const {getters: {setter}, state} = store, {appid, access_token} = state;
                return {
                    'access-token': access_token,
                    appid: appid,
                    db: setter.db,
                    device: device.value
                };
            });
            // 选择文件的配置项
            const chooseConfig = toRef(props, 'chooseConfig');

            // 上传url
            const url = toRef(props, 'url');

            // 预览图片
            const imagePreview = (item, index) => {
                if(item.type === 'img') {
                    let list = [], i = 0;
                    _fileList.value.forEach((val, inx) => {
                        if (val.type === 'img') {
                            if (inx === index) i = list.length;
                            list.push(val.src);
                        }
                    });
                    helper.showImage(i, list);
                } else if (previewExt.includes(item.ext)) {
                    previewFile(item);
                }
            }

            // 上传单个文件
            const uploadOne = (val) => {
                val['status'] = 'uploading';
                return new Promise(async (resolve) => {
                    await props.uploadBefore.call(context.parent, val);
                    const uploadTask = uni.uploadFile({
                        url: defaultApi.value + url.value,
                        header: {
                            ..._header.value,
                            timestamp: new Date().getTime(),
                            ...header.value
                        },
                        filePath: val['src'],
                        name: 'file',
                        formData: {
                            path: "uni/FileUpload.txt",
                            preID: undefined, // 文件夹ID
                            goalID: undefined,
                            module: undefined,
                            bidID: "null",
                            canEdit: "null",
                            source: val['source'] || "",
                            keys: val['keys'] || "",
                            memo: val['memo'] || "",
                            tips: val['tips'] || "",
                            fileName: val.name.replace(new RegExp('.' + val.ext + '$'), ''),
                            ...formData.value
                        },
                        async success(res) {
                            let data, err;
                            if (res && res.data) {
                                data = res.data;
                                if (typeof data === 'string') {
                                    data = JSON.parse(res.data);
                                }
                                const flag = await helper.judgeRes(data);
                                if (flag === null) { // token失效时，重新上传
                                    return resolve(await uploadOne(val));
                                } else if (flag) {
                                    const {fileInfo} = data;
                                    if (fileInfo) {
                                        val['status'] = 'success';
                                        resolve({val, data, fileInfo});
                                        return;
                                    }
                                }
                                err = data['msg'];
                            }
                            val['status'] = 'fail';
                            resolve({val, data, err: err || ('未知错误，请联系管理员！' + JSON.stringify(res))});
                        },
                        fail(err) {
                            val['status'] = 'fail';
                            resolve({val, err});
                        },
                    });

                    uploadTask.onProgressUpdate((res) => {
                        val.percentage = res.progress;
                        /*if (res.progress === 100) {
                            setTimeout(() => {
                                val.percentage = null;
                            }, 3000);
                        }*/
                    });
                });
            };

            // 上传文件
            const uploadFile = async (fileArr) => {
                if (fileArr && fileArr.length) {
                    fileArr.forEach(val => chooseList.value.push(addFile(val)));
                }
                context.emit("before");
                let fail = [], success = [], fileIDs = [], files = [];
                let promises = [];
                chooseList.value.forEach((val) => {
                    if (val['status'] === 'ready') {
                        promises.push(uploadOne(val));
                    }
                });
                (await Promise.all(promises)).forEach(({val, data, fileInfo, err}) => {
                    if (fileInfo) {
                        let id = fileInfo.ID;
                        val.id = id;
                        fileIDs.push(id);
                        success.push({ file: val, fileInfo, fileID: id, data });
                        files.push(fileInfo);
                        return;
                    }
                    fail.push({ file: val, msg: err, err, data, filePath: val['src'] });
                })
                let msg;
                if (fail.length && success.length === 0) {
                    msg = `${fail.length}个文件上传失败！${fail[0].msg}`;
                } else if (success.length && fail.length === 0) {
                    msg = `上传成功！${autoUpload.value && props.tag ? '记得给它们贴上标签！' : ''}`;
                } else if (success.length + fail.length > 0) {
                    msg = `文件上传结束，其中${success.length}个上传成功，${fail.length}个上传失败！${fail[0].msg}`;
                }
                msg && props.showMsg && uni.showToast({ title: msg, duration: 3000, icon: "none" });
                let obj = {fail, success, fileIDs: fileIDs.join(','), fileList: files};
                context.emit("done", obj);
                return obj;
            }

            // 是否自动上传
            const autoUpload = toRef(props, 'autoUpload');

            // 选择文件
            const chooseFile = () => {
                let choose, config = {
                    sourceType: ['album','camera'] // 从相册选择和拍照（type为image、video时才有效）
                };
                if (type.value === 'image') {
                    config.count = 9; // 最大上传数，默认9，最大值9
                    config.sizeType = ['original', 'compressed']; // 可以指定是原图还是压缩图，默认二者都有
                    choose = uni.chooseImage;
                } else if (type.value === 'video') {
                    choose = uni.chooseVideo;
                    // sourceType 默认：['album', 'camera']	图片和视频选择的来源
                    // extension 根据文件拓展名过滤
                    // compressed 是否压缩所选的视频源文件，默认值为true，需要压缩
                    // maxDuration 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
                    // camera 默认：'back'，使用前置 front 或 后置 back 摄像头
                } else {
                    // #ifdef H5
                    choose = uni.chooseFile;
                    // #endif
                    // #ifdef MP-WEIXIN
                    choose = wx.chooseMessageFile;
                    // #endif
                    if (!choose) {
                        uni.showToast({ title: '当前设备不支持文件选择，请使用微信小程序或者浏览器！', duration: 2000, icon: "none" });
                        return;
                    }
                    config.count = 20; // 最大上传数，默认100，最大值100
                    config.type = 'all'; // 所选的文件的类型（h5中：all video image）（wx中：all video image file）
                    config.extension = _ext.value.split('|').map(ext => '.' + ext); // 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。（wx中type=false才会有效）
                }
                choose({
                    ...config,
                    ...chooseConfig.value,
                    success(res) {
                        console.log(res);
                        let paths = [], {tempFiles} = res;
                        if (type.value === 'video') {
                            if (res.size / 1024 <= maxSize.value) {
                                let path = res.tempFilePath;
                                paths.push(path);
                                chooseList.value.push(addFile({
                                    src: path,
                                    name: res.name,
                                    self: true
                                }));
                            } else {
                                uni.showToast({title: `选择的视频超过${sizeTip}，请重新上传！`, duration: 3000, icon: "none"});
                            }
                        } else {
                            tempFiles.forEach(item => {
                                let ext = (item.name || item.path).split('.');
                                ext = ext[ext.length - 1].toLowerCase();
                                if(('|' + _ext.value + '|').includes(('|' + ext + '|')) && item.size / 1024 <= maxSize.value) {
                                    const value = item.path;
                                    paths.push(value);
                                    chooseList.value.push(addFile({
                                        src: value,
                                        file: item,
                                        name: item.name,
                                        ext,
                                        self: true
                                    }));
                                }
                            });
                            const errCount = tempFiles.length - paths.length;
                            if (errCount) {
                                uni.showToast({title: `选择的文件中有${errCount}个格式不对或者超过${sizeTip}，请重新上传！`, duration: 3000, icon: "none"});
                            }
                        }
                        if (paths.length !== 0) {
                            context.emit("choose-file", {paths, list: chooseList.value});
                            if (autoUpload.value) uploadFile();
                            else if (props.tag) {
                                uni.showToast({title: `已选择${paths.length}个文件，记得给它们贴上标签`, duration: 3000, icon: "none"});
                            }
                        }
                    },
                    /*fail(res) {},
                    complete(res) {}*/
                });
            }

            const fileRemove = (arr, uid) => { // 指定数组中移除文件
                return arr.some((f, inx) => {
                    if (f['uid'] === uid) {
                        arr.splice(inx, 1);
                        uni.showToast({ title: '删除成功！', duration: 2000, icon: "none" });
                        return true;
                    }
                });
            }

            // 列表中移除文件
            const removeFile = (file) => { // 移除列表中的文件
                const {uid} = file;
                if (!fileRemove(chooseList.value, uid)) fileRemove(preList.value, uid);
                context.emit("remove", file);
            }

            // 删除文件
            const deleteFile = async (file, flag) => { // 执行删除文件操作
                let del = await new Promise(resolve => {
                    if (flag) {
                        resolve(true);
                        return;
                    }
                    uni.showModal({
                        title: '删除提示',
                        content: '确定删除此文件？',
                        showCancel: true,
                        cancelText: '取消',
                        confirmText: '确定',
                        success(res) {
                            res.confirm && resolve(true);
                            resolve(false);
                        }
                    });
                });

                if (!del) return;
                if (file.status === "ready" || !file.id) { // 未上传的文件
                    removeFile(file);
                    return;
                }
                // 已经上传成功的文件
                const [, res] = await helper.fileDelete({
                    id: file.id,
                    ...props.formData
                });
                if (res.state === 200) {
                    removeFile(file);
                } else {
                    uni.showToast({ title: '删除失败！', duration: 2000, icon: "none" });
                }
            }

            // 预览文件
            const previewFile = async (options) => {
                let ext = options.ext, templatePath = options.src;
                if (options.template) {
                    if (!previewExt.includes(ext)) {
                        return uni.showToast({title: `后缀为${ext}的文件不支持预览`, duration: 3000, icon: "none"})
                    }
                } else { // 是之前上传的文件
                    const db = _header.value.db;
                    if (!templatePath) {
                        let fullPath = options.fullPath || options['FullPath'];
                        if (!fullPath) {
                            let [, res] = await helper.req({
                                url:  "/FileDownloadCheck",
                                data: options,
                            });
                            fullPath = res['downloadPath']; // downloadCode也可以
                        }
                        ext = fullPath.split('.');
                        ext = ext[ext.length - 1].toLowerCase();
                        templatePath = defaultApi.value + "/FilePreview?db=" + db + "&downloadPath=" + fullPath;
                    }
                    // #ifdef H5
                    // todo pdf是否会直接预览
                    return window.open(templatePath, "_blank");
                    // #endif
                    if (!previewExt.includes(ext)) {
                        return uni.showToast({title: `后缀为${ext}的文件不支持预览`, duration: 3000, icon: "none"})
                    }
                    const {tempFilePath} = await new Promise(resolve => {
                        uni.downloadFile({
                            url: templatePath,
                            success: resolve,
                            fail(err) {
                                resolve({ err });
                            }
                        });
                    });
                    if (!tempFilePath) {
                        return uni.showToast({title: `获取临时路径失败，请重试！`, duration: 3000, icon: "none"});
                    }
                    templatePath = tempFilePath;
                }
                uni.openDocument({
                    filePath: templatePath,
                    fileType: ext,
                    success(res) {
                        console.log('打开文档成功！');
                    },
                    fail(err) {
                        uni.showToast({title: `打开文档失败！${JSON.stringify(err)}`, duration: 3000, icon: "none"});
                    },
                });
            }

            const tagDialog = ref({
                show: false,  // tag弹框是否显示
                data: {}
            });
            const openTag = (item) => { // 弹框打标签
                tagDialog.value.show = true;
                tagDialog.value.data = item;
                if (!item.memo) item.memo = item.keys;
            };
            const setTag = ({value, label}) => {
                const data = tagDialog.value.data;
                data.keys = label;
                data.memo = value;
                helper.req({
                    data: {
                        path: 'uni/FileUpdate.txt',
                        id: data.id,
                        keys: label,
                        memo: value,
                    }
                });
            };
            return { _fileList, chooseList, imagePreview, chooseFile, uploadFile, deleteFile, previewFile, tagDialog, setTag, openTag, getFileList, clearFiles };
        }
    }
</script>

<style scoped lang="scss">
    $img-height: 145rpx;
    $margin-height: 10rpx;
    .file-box {
        .image-box {
            display: flex;
            flex-wrap: wrap;
            .choose-img {
                text-align: center;
                line-height: $img-height;
                background: #d8d8d8;
                color: rgba(109, 114, 120, 0.36);
                box-shadow: 3px 3px 10px 0 #d8d8d8;
                .iconfont {
                    font-size: 2em;
                    font-weight: bold;
                }
            }
            .img-box {
                width: $img-height;
                height: $img-height;
                position: relative;
                margin-right: 12px;
                margin-top: 17px;
                border-radius: 16rpx;
                .percentage {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    .ready {
                        color: rgba(45, 45, 45, 0.3);
                        font-size: 0.9em;
                        text-align: center;
                    }
                }
                .btn-del {
                    top: -13px;
                    right: -12px;
                }
                .btn-tag {
                    bottom: -10px;
                    right: -12px;
                }
            }
            .img {
                width: 100%;
                height: 100%;
                border-radius: 16rpx;
            }
        }

        .image-box.img-line {
            flex-wrap: nowrap;
            .choose-img.img-box {
                margin: 10px 0;
            }
            .line-box {
                display: flex;
                overflow-x: auto;
                padding: 10px 0;
                &::-webkit-scrollbar {
                    height: 0;
                }
            }
            .img-box {
                flex: none;
                margin-top: 0;
            }
        }

        .btn-del {
            color: red;
            top: 0;
            right: 5px;
        }
        .btn-tag {
            color: grey;
            bottom: 3px;
            right: 5px;
        }
        .btn-tag-active {
            color: blue;
        }
        .icon-img {
            position: absolute;
            font-size: 26px;
        }

        .list-box {
            position: relative;
            margin: $margin-height 0;
            padding: $margin-height;
            border: 1px dashed rgba(45, 45, 45, 0.3);
            border-radius: 10px;
        }
        .video-box {
            .video-item {
                width: 100%;
            }
            .percentage {
                width: calc(100% - 30px);
            }
        }

        .all-box {
            display: flex;
            .img {
                height: 60px;
                width: 60px;
                border-radius: 5px;
            }
            .percentage {
                width: calc(100% - 100px);
                margin-left: 10px;
            }
            .file-name {
                margin: 8px 0;
            }
        }
    }
    .word-line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .img-dialog {
        padding: 10px;
        background-color: #ffffff;
        text-align: center;
        .img {
            height: 150px;
            width: 100%;
        }
    }
</style>