<template>
    <li class="list-group-item border-0 px-0">
        <div class="form-check form-switch ps-0">
            <div class="setting-item-title col-12 col-sm-1">
                <input class="form-check-input" type="checkbox" v-model="LocalValue">
            </div>
            <div class="setting-item-body col-12 col-sm-11">
                <span class="text-dark checkbox-font-size w-80 mb-0">{{ConsoleCheckBoxInfo.title}}</span>
                <span class="input-tips col-12 col-sm-10">{{ConsoleCheckBoxInfo.tips}}</span>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: "ConsoleCheckBox",
    data() {
        return {
            LocalValue: Boolean,
        };
    },
    props: {
        ConsoleCheckBoxInfo: {
            required: true,
            type: Object
        },
        Value: {
            required: true,
            type: Boolean
        }
    },
    methods: {
    },
    watch: {
        LocalValue(val) {
            let result = {};
            result.name = this.ConsoleCheckBoxInfo.name;
            result.value = val;
            this.$emit("ConsoleCheck", result);
        },
        Value(val) {
            this.LocalValue = val;
        }
    }
}
</script>

<style scoped>
.setting-item-title {
    display: flex;
    padding: 0.5rem;
    float: left;
    justify-content: flex-end;
}

.setting-item-body {
    display: inline-block;
    padding: 0.5rem;
}

.setting-item-body .checkbox-font-size {
    font-size: 15px;
}

.setting-item-body .input-tips {
    display: block;
    color: rgb(205, 191, 191);
    font-size: 0.85rem !important;
    padding-top: 0.25rem;
    padding-left: 0.25rem;
    font-size: 14px;
}
</style>