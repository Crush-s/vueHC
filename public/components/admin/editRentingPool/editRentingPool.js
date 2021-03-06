(function (vc, vm) {

    vc.extends({
        data: {
            editRentingPoolInfo: {
                rentingId: '',
                rentingTitle: '',
                price: '',
                paymentType: '',
                checkInDate: '',
                rentingConfigId: '',
                rentingDesc: '',
                ownerName: '',
                ownerTel: '',

            }
        },
        _initMethod: function () {

        },
        _initEvent: function () {
            vc.on('editRentingPool', 'openEditRentingPoolModal', function (_params) {
                vc.component.refreshEditRentingPoolInfo();
                $('#editRentingPoolModel').modal('show');
                vc.copyObject(_params, vc.component.editRentingPoolInfo);
                vc.component.editRentingPoolInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            editRentingPoolValidate: function () {
                return vc.validate.validate({
                    editRentingPoolInfo: vc.component.editRentingPoolInfo
                }, {
                    'editRentingPoolInfo.rentingTitle': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "出租标题不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "100",
                            errInfo: "标题太长 超过100位"
                        },
                    ],
                    'editRentingPoolInfo.price': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "租金不能为空"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "格式错误"
                        },
                    ],
                    'editRentingPoolInfo.paymentType': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "预付类型不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "格式错误"
                        },
                    ],
                    'editRentingPoolInfo.checkInDate': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "入住时间不能为空"
                        },
                        {
                            limit: "date",
                            param: "",
                            errInfo: "格式错误"
                        },
                    ],
                    'editRentingPoolInfo.rentingConfigId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "出租配置不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "显示格式错误"
                        },
                    ],
                    'editRentingPoolInfo.rentingDesc': [
                        {
                            limit: "maxLength",
                            param: "500",
                            errInfo: "备注格式错误"
                        },
                    ],
                    'editRentingPoolInfo.ownerName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "业主名称不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "100",
                            errInfo: "业主名称太长"
                        },
                    ],
                    'editRentingPoolInfo.ownerTel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "业主电话不能为空"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "业主电话格式错误"
                        },
                    ],
                    'editRentingPoolInfo.rentingId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "租房ID不能为空"
                        }]

                });
            },
            editRentingPool: function () {
                if (!vc.component.editRentingPoolValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }

                vc.http.apiPost(
                    '/renting/updateRentingPool',
                    JSON.stringify(vc.component.editRentingPoolInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //关闭model
                            $('#editRentingPoolModel').modal('hide');
                            vc.emit('rentingPoolManage', 'listRentingPool', {});
                            return;
                        }
                        vc.message(_json.msg);
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');

                        vc.message(errInfo);
                    });
            },
            refreshEditRentingPoolInfo: function () {
                vc.component.editRentingPoolInfo = {
                    rentingId: '',
                    rentingTitle: '',
                    price: '',
                    paymentType: '',
                    checkInDate: '',
                    rentingConfigId: '',
                    rentingDesc: '',
                    ownerName: '',
                    ownerTel: '',

                }
            }
        }
    });

})(window.vc, window.vc.component);
