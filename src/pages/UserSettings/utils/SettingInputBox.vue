<template>
    <li class="list-group-item border-0 px-0">
        <div class="setting-item-title col-12 col-sm-3 text-sm-end">
            <span class="title-text">{{SettingInputBoxInfo.title}}</span>
        </div>
        <div class="setting-item-body col-12 col-sm-9">
            <div class="setting-item-input col-12 col-sm-10">
                <input type="text" class="text-input" v-model="LocalValue">
                <span v-show="LocalValue!=''" class="material-icons clear-input" @click="clearInput">cancel</span>
            </div>
            <span class="input-tips col-12 col-sm-10">{{SettingInputBoxInfo.tips}}</span>
        </div>
    </li>
</template>

<script>
export default {
    name: "SettingInputBox",
    data() {
        return {
            LocalValue: ""
        };
    },
    props: {
        SettingInputBoxInfo: {
            required: true,
            type: Object
        },
        Value: {
            type: String,
            required: true
        }
    },
    methods: {
        clearInput() {
            this.LocalValue = "";
        }
    },
    watch: {
        LocalValue(val) {
            let result = {};
            result.name = this.SettingInputBoxInfo.name;
            result.value = val;
            this.$emit("SettingInput", result);
        },
        Value(val) {
            this.LocalValue = val;
        }
    }
}
</script>

<style>
.setting-item-title {
    display: block;
    padding: 0.5rem;
    float: left;
}
.setting-item-title .title-text {
    display: inline-block;
    color: rgb(38, 38, 38);
    font-size: 14px;
}
.setting-item-body {
    display: inline-block;
    padding: 0.5rem;
}
.setting-item-body .setting-item-input {
    border: 1px solid rgb(217, 217, 217);
    display: flex;
    align-items: center;
    padding-left: 5px;
    padding-right: 10px;
    transition-duration: 0.25s;
}
.setting-item-body .setting-item-input .text-input {
    outline: none;
    border: 0;
}
.setting-item-body .setting-item-input .clear-input {
    display: inline-block;
    opacity: 0.3;
    font-size: 15px;
    user-select: none;
    cursor: pointer;
    transition-duration: 0.5s;
}
.setting-item-body .setting-item-input .clear-input:hover {
    opacity: 0.8;
}
.setting-item-body .input-tips {
    display: block;
    color: rgb(205, 191, 191);
    font-size: 0.85rem !important;
    padding-top: 0.25rem;
    padding-left: 0.25rem;
    font-size: 14px;
}
.setting-item-body .setting-item-input:hover {
    border: 1px solid rgb(145, 185, 250);
}
.setting-item-body .setting-item-input:focus-within {
    border: 1px solid rgb(145, 185, 250);
    box-shadow: 0 0 0 2px rgba(145, 185, 250, 0.25);
}
.setting-item-body .setting-item-input input {
    flex: 1;
}
</style>

