<template>
    <scroll-view class="" id="section_ul">
        <!-- 一级分支 -->
        <view class="lv1list" v-for="(item, index) in selectList" :key="index">
            <view class="tree-one">
                <!-- 单选框组件 -->
                <checkbox-group v-if='showCheck'
                                style="position: absolute;height: 80rpx;line-height: 80rpx; left:20rpx;z-index: 1;">
                    <checkbox :checked="item.checked" @click="_chooseAll(item,index)" />
                </checkbox-group>
                <!-- 名字和iconfont -->
                <label
                        style='height:80rpx;display: flex;align-items: center;padding: 20rpx;position: relative;border-bottom: 1px solid #e4e4e4;background: #f3f3f3;'
                        @click.capture='_showlv2(index)'>
                    <view style="margin-left: 60rpx;">{{item.name}}</view>
                    <i class="iconfont iconshang" v-if='item.show'
                       style="position: absolute;top: 18%;right: 2%;font-size: 48rpx;"></i>
                    <i class="iconfont iconxiala" v-else
                       style="position: absolute;top: 18%;right: 2%;font-size: 48rpx;"></i>
                </label>
            </view>
            <!-- 二级分支 -->
            <view v-if='item.show&&item.childrenList'>
                <view class="tree-two" v-for="(item2, index2) in item.childrenList" :key="index2"
                      style="padding:20rpx 80rpx;background: white;border-bottom: 1px solid #e2e2e2;">
                    <view class="aui-list-item-inner">
                        <checkbox-group v-if='showCheck' style='display:inline;'>
                            <checkbox :checked="item2.checked" @click="_chooseOne(index,index2)" />
                        </checkbox-group>
                        <label>{{item2.name}}</label>
                    </view>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        name: 'select-tree',
        props: {
            selectList: {
                type: Array,
                default: function () {
                    return [
                        {
                            name: '水果',
                            checked: false,
                            show: false,
                            childrenList: [
                                {
                                    checked: false,
                                    name: '西瓜'
                                }, {
                                    checked: false,
                                    name: '桃子'
                                }
                            ]
                        },
                        {
                            name: '工具',
                            checked: false,
                            show: false,
                            childrenList: [
                                {
                                    checked: false,
                                    name: '锄头'
                                }, {
                                    checked: false,
                                    name: '铲子'
                                }
                            ]

                        }
                    ]
                }
            },
            showCheck: {//显示多选框
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                finalList: []
            }
        },
        methods: {
            _showlv2(index) {//展开二级目录
                if (this.selectList[index].show) {
                    this.$set(this.selectList[index], 'show', false)
                } else {
                    this.$set(this.selectList[index], 'show', true)
                }

            },
            _chooseAll(item, index) {//选中所有
                if (this.selectList[index].checked) {//
                    this.$set(this.selectList[index], 'checked', false)
                    this.selectList[index].childrenList.forEach(item => {
                        item.checked = false
                    })
                } else {
                    this.$set(this.selectList[index], 'checked', true)
                    this.selectList[index].childrenList.forEach(item => {
                        item.checked = true
                    })
                }
                this.$set(this.selectList[index], 'show', true)
                this._computedFinalList()
            },
            _chooseOne(i1, i2) {
                if (this.selectList[i1].childrenList[i2].checked) {//
                    this.$set(this.selectList[i1], 'checked', false)
                    this.$set(this.selectList[i1].childrenList[i2], 'checked', false)
                    this.$forceUpdate()
                    this._computedFinalList()
                } else {
                    this.$set(this.selectList[i1], 'checked', false)
                    this.$set(this.selectList[i1].childrenList[i2], 'checked', true)
                    this.$forceUpdate()
                    this._computedFinalList()
                }
            },
            _computedFinalList() {//计算最终的值
                this.finalList = []
                this.selectList.forEach(item => {
                    if (item.childrenList) {
                        item.childrenList.forEach(item2 => {
                            if (item2.checked) {
                                this.finalList.push({ choosedValue: { ...item2 }, originValue: { ...item } })
                            }
                        })
                    }
                })
                this.$emit('choose',this.finalList)
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>