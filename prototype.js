const modules = [
  { id: "company", icon: "▥", name: "企业管理", desc: "统一维护入驻企业档案与房间关联关系", tabs: ["企业信息", "房间关联"] },
  { id: "person", icon: "♙", name: "人员管理", desc: "人员档案、黑名单、轨迹、通行记录与卡片全生命周期管理", tabs: ["人员档案", "已离职人员", "人员黑名单", "通行记录", "人员轨迹", "卡片管理", "卡片操作日志"] },
  { id: "access", icon: "▣", name: "门禁管理", desc: "通行时段、权限组、授权关系、权限下发与通行审计", tabs: ["通行时间段", "门禁权限组", "按部门授权", "人员权限", "权限下发管理", "通行记录"] },
  { id: "visitor", icon: "♧", name: "访客管理", desc: "访客预约、被访人审批、安防审批、权限下发与通行追溯", tabs: ["访客管理", "安防审批", "基础权限配置"] },
  { id: "vehicle", icon: "▰", name: "车辆管理", desc: "车场配置、车辆档案与授权、特殊车辆、岗亭值守与车辆通行记录", tabs: ["车场配置", "车辆管理", "车辆黑名单", "车辆白名单", "特殊车辆管理", "岗亭值守（暂放）", "通行记录", "特殊车辆通行记录"] },
  { id: "patrol", icon: "◫", name: "安防巡更", desc: "基于在线视频的巡更路线、计划、任务与异常提报", tabs: ["视频巡检路线", "巡检计划", "巡检任务", "视频巡检"] },
  { id: "perimeter", icon: "⌗", name: "周界安全", desc: "可视化周界布控、入侵检测、告警确认与工单联动", tabs: ["周界设置", "周界告警"] },
  { id: "video", icon: "▤", name: "视频监控", desc: "监控设备查看、实时视频与录像回放", tabs: ["监控设备", "实时视频", "录像回放"] },
  { id: "alarm", icon: "⚠", name: "安防告警", desc: "安防告警等级配置、告警事件处置、安防工单与巡检工单闭环", tabs: ["告警配置", "告警事件", "安防工单", "巡检工单"] },
  { id: "inspection", icon: "✓", name: "安防巡检", desc: "现场巡检点、路线、计划与任务执行闭环", tabs: ["巡检点", "巡检路线", "巡检计划", "巡检任务"] },
  { id: "schedule", icon: "▦", name: "排班管理", desc: "6 人上一休二轮转、队长常白班、排班调整留痕", tabs: ["排班日历", "修改记录"] },
  { id: "device", icon: "⚙", name: "设备管理", desc: "安防设备主数据、位置绑定与在线状态管理", tabs: ["设备管理"] }
];

const tableConfigs = {
  company: {
    filters: ["所属园区", "企业名称", "信用代码", "营业状态", "入驻状态", "联系人/联系方式"],
    columns: ["所属园区", "企业名称", "统一社会信用代码", "营业状态", "入驻状态", "经营范围", "关联人员", "联系人/联系方式"],
    rows: [
      ["三里园区","大连微冷食品股份有限公司","912102007772801500","营业中","已入驻","园区总运营方、主体母公司，统筹水产加工、冰淇淋生产、园区整体管理","128 人","王立群|0411-6240 2801"],
      ["三里园区","大连瑞兴天宝水产品有限公司","912102137515820360","营业中","已入驻","水产深加工车间生产运营，狭鳕鱼、裹粉油炸预制菜主力生产单位","86 人","刘海涛|0411-6240 2812"],
      ["三里园区","大连微冷农产品有限公司","912102135880626100","营业中","已入驻","万吨气调保鲜库、果蔬分选、农产品仓储集散、供应链与园区物业租赁","42 人","孙晓宁|0411-6240 2826"],
      ["三里园区","联合林洋食品（大连）有限公司","912102136799624018","营业中","已入驻","冰淇淋、糕点速冻食品生产，冰淇淋专属车间运营主体","64 人","林建东|0411-6240 2833"],
      ["三里园区","海洋食品设计与创制高新技术研究院","52110200MJY6240150","营业中","已入驻","园区内设科研平台，承担检测、新品研发、质量管控工作","18 人","周明远|0411-6240 2855"]
    ], primary: "新增企业", note: "统一社会信用代码全局唯一；已被下游模块引用的企业不可删除。", showIndex: true, showSelection: false, showRefresh: false, tableClass: "company-info-table"
  },
  person: {
    filters: ["姓名/人员编号/联系方式", "性别", "员工类型", "人员状态", "所属企业/部门"],
    columns: ["姓名", "人员编号", "性别/联系方式", "员工类型", "人员状态", "所属企业", "部门/岗位"],
    rows: [
      ["张振新","P20260018","男|185 5323 6080","正式员工","在职","园区运营公司","安保部|安防主管"],
      ["闫卓宇","P20260031","男|185 5323 6081","外包员工","在职","恒泰安保服务","巡检组|巡检员"],
      ["李晨","P20260042","男|186 6178 2304","正式员工","在职","蓝谷数字能源","研发中心|算法工程师"],
      ["王浩","P20250077","男|178 5321 0019","实习生","停用","澄海智造科技","制造中心|生产助理"]
    ], primary: "新增人员", note: "人员编号创建后不可修改；离职通过列表行内操作办理，确认后进入已离职人员页面。", showSelection: false, showIndex: true, showRefresh: false, tableClass: "personnel-table"
  },
  access: {
    filters: ["所属园区", "权限来源", "下发状态", "人员 / 权限组 / 设备"],
    columns: ["姓名", "人员编号", "所属部门", "权限组", "通行时间段", "授权来源", "覆盖设备", "下发状态"],
    rows: [
      ["张振新","P20260018","安保部","全天通行组","周一至周日 00:00-23:59","按人员授权","20 台","下发成功"],
      ["李晨","P20260042","研发中心","主楼门禁组","工作日 08:00-20:00","按部门授权","12 台","下发成功"],
      ["闫卓宇","P20260031","巡检组","重点区域组","周一至周日 06:00-23:00","按人员授权","8 台","下发失败"],
      ["王浩","P20250077","制造中心","车间门禁组","工作日 07:00-19:00","按部门授权","6 台","待下发"]
    ], primary: "新增授权", note: "权限关联变更后自动触发设备下发；失败记录支持批量重试与对账。"
  },
  visitor: {
    filters: ["访客姓名/手机号/车牌号", "访问企业", "被访人姓名/联系方式", "拜访时间", "预约状态", "到访状态"],
    columns: ["访客姓名", "手机号/车牌号", "访问企业", "被访人/联系方式", "拜访时间", "来访事由", "预约状态", "到访状态"],
    rows: [
      ["赵一凡","13812348000|鲁B·T912F","蓝谷数字能源有限公司","李晨 / 18661782304","2026-07-20","技术交流","待安防审批","未到访"],
      ["周雨","13953219000|-","澄海智造科技有限公司","王浩 / 17853210019","2026-07-20 至 2026-07-21","设备安装/维修","已通过","在园"],
      ["刘启明","15641128473|辽B·62Q18","园区运营公司","陈晓 / 18604112306","2026-07-19","商务拜访","已通过","已离园"],
      ["沈璐","18604119081|-","联合林洋食品（大连）有限公司","林建东 / 041162402833","2026-07-18","参观考察","已拒绝","未到访"],
      ["孙可","13753212560|鲁B·F7162","大连微冷农产品有限公司","孙晓宁 / 041162402826","2026-07-17 至 2026-07-18","业务洽谈","已失效","未离园异常"]
    ], primary: "", note: "PC端仅查询访客预约、审批记录和到访结果；预约必须由访客小程序发起，本页面不提供代客预约、取消预约、修改预约、审批、签到或签退。", showSelection: false, showIndex: true, showActions: false, showRefresh: false, tableClass: "visitor-appointment-table"
  },
  vehicle: {
    filters: ["车场名称", "所属园区", "车场状态"],
    columns: ["车场名称", "所属园区", "是否启用", "备注", "车位总数", "入场/出场车道数", "绑定监控数"],
    rows: [
      ["南侧广场车场","微冷园区","启用","覆盖园区南门与货运出入口","295","2 / 2","5"],
      ["东门临时车场","微冷园区","禁用","临时车场区域，暂停新增通行配置","86","1 / 1","1"],
      ["冷链物流车场","微冷园区","启用","冷链货运车辆专用","48","1 / 1","2"]
    ], primary: "新增车场", note: "车位总数、入场/出场车道数、绑定监控数均由系统自动汇总；车场详情展示出入口和监控配置。", showIndex: true, showSelection: false, showRefresh: false, tableClass: "vehicle-parking-table"
  },
  patrol: {
    filters: ["任务状态", "来源计划", "执行人", "任务名称 / 巡更路线"],
    columns: ["任务名称", "来源计划", "视频巡更路线", "执行人", "任务状态", "点位进度", "计划时间", "实际时间"],
    rows: [
      ["20260610-园区重点区域早巡","重点区域每日巡更","园区主干道视频路线","闫卓宇","执行中","5 / 8","06-10 08:30 至 09:30","08:32 至 -"],
      ["20260610-外围夜巡","夜间周界巡更","园区外围视频路线","张振新","待执行","0 / 12","06-10 22:00 至 23:30","-"],
      ["20260609-园区重点区域早巡","重点区域每日巡更","园区主干道视频路线","闫卓宇","已完成","8 / 8","06-09 08:30 至 09:30","08:31 至 09:16"],
      ["20260609-地下空间巡更","地下空间巡更","地下车库视频路线","王涛","已取消","2 / 6","06-09 14:00 至 15:00","14:03 至 14:22"]
    ], primary: "新增巡更计划", note: "视频巡更严格按路线点位顺序执行，每个点位至少查看 10 秒方可完成。"
  },
  perimeter: {
    filters: ["告警状态", "告警级别", "所属园区 / 区域", "告警编号 / 任务 / 摄像头"],
    columns: ["告警编号", "告警任务", "检测规则", "告警级别", "所属区域", "关联摄像头", "告警时间", "告警状态"],
    rows: [
      ["PAM-20260720-0068","东北门外围夜间防攀爬","东北墙越线 A→B","紧急","微冷园区 / 东北门","CAM-2024-001 东北门外围02","2026-07-20 10:32:18","待确认"],
      ["PAM-20260720-0062","仓储区禁入监测","仓库北门禁入区","重要","A栋 / 1F / 仓储区","CAM-2024-018 仓库北门01","2026-07-20 09:55:41","已确认"],
      ["PAM-20260720-0059","西南门反向闯入","西南门警戒线 B→A","重要","微冷园区 / 西南门","CAM-2024-006 西南门01","2026-07-20 09:21:06","已生成工单"],
      ["PAM-20260720-0047","北侧围墙入侵防区","北侧绿化带区域","一般","微冷园区 / 北侧围墙","CAM-2024-021 北侧围墙03","2026-07-20 08:46:20","误报关闭"]
    ], primary: "新增周界任务", note: "同一告警仅允许生成 1 张工单；已生成工单和误报关闭为终态。"
  },
  video: {
    filters: ["设备名称/设备编码", "设备类型", "设备子类", "在线状态"],
    columns: ["设备名称", "设备编码", "设备类型", "设备子类", "在线状态", "绑定位置", "上次在线时间"],
    rows: [
      ["东北门外围02","CAM-2024-001","视频监控设备","枪型摄像头","在线","微冷园区 / 东北门","2026-07-20 10:42:12"],
      ["仓库北门01","CAM-2024-018","视频监控设备","球形摄像头","在线","微冷园区 / A栋 / 1F / 仓储区","2026-07-20 10:42:10"],
      ["停车场 B 区03","CAM-2024-026","视频监控设备","半球摄像头","离线","微冷园区 / 停车场 / B1 / B区","2026-07-20 09:58:02"],
      ["西南门岗亭01","CAM-2024-006","视频监控设备","枪型摄像头","离线","微冷园区 / 西南门","--"],
      ["南门通道01","CAM-2024-032","视频监控设备","半球摄像头","在线","微冷园区 / 南门","2026-07-20 10:41:58"]
    ], primary: "", note: "监控设备主数据来源于模块12，本页面仅查看设备信息；仅在线设备支持实时视频和录像回放，录像只支持30天内的时间选择，单次回放范围不得超过 24 小时。", showSelection: false, showIndex: true, showRefresh: false, tableClass: "video-device-table"
  },
  alarm: {
    filters: ["告警编号/位置/设备", "告警类型", "告警等级", "告警状态", "告警时间"],
    columns: ["告警编号", "告警类型", "告警等级", "告警位置/关联设备", "告警时间", "告警状态"],
    rows: [
      ["ALM-20260721-0128","热成像过温告警","紧急","A栋 / 冷库机房 / 配电柜01|THERM-2025-006 热成像测温仪","2026-07-21 10:32:18","待确认"],
      ["ALM-20260721-0119","人员黑名单告警","紧急","南门入口闸机|FACE-2024-018 南门人脸闸机","2026-07-21 09:55:41","已确认"],
      ["ALM-20260721-0107","消防通道占用告警","重要","A栋 / 2F / 疏散通道|CAM-2024-032 南门通道01","2026-07-21 09:21:06","已生成工单"],
      ["ALM-20260720-0175","睡岗告警","一般","北门值班室|CAM-2024-021 北侧围墙03","2026-07-20 22:46:20","误报关闭"]
    ], primary: "导出告警", note: "告警等级由“告警配置”中对应告警类型带出；安防告警按“待确认、已确认、已生成工单、误报关闭”流转。"
  },
  inspection: {
    filters: ["任务状态", "所属园区", "巡检执行人", "任务 / 计划 / 路线名称"],
    columns: ["任务名称", "巡检计划", "巡检路线", "巡检人", "计划巡检时间", "完成进度", "异常点", "任务状态"],
    rows: [
      ["消防重点点位巡检（2026-06-10）","消防设施每日巡检","A栋消防巡检路线","闫卓宇、王涛","06-10 08:00 至 11:00","8 / 12","2","巡检中"],
      ["外围设施安全巡检（2026-06-10）","园区外围每日巡检","外围设施路线","张振新","06-10 07:30 至 09:00","16 / 16","0","已完成"],
      ["地下车库环境巡检（2026-06-10）","地下空间巡检","地下车库路线","李浩","06-10 14:00 至 16:00","0 / 10","0","待巡检"],
      ["仓储区临时专项巡检","临时任务","仓储区专项路线","闫卓宇","06-09 15:00 至 17:00","4 / 9","1","已作废"]
    ], primary: "新增临时任务", note: "异常点提交后自动生成巡检工单；任务生成时保存路线点位快照。"
  },
  schedule: {
    filters: ["月份"],
    columns: ["日期", "星期", "当班人员", "队长"],
    rows: [
      ["2026-07-20","星期一","张振新、李浩","钱队"],
      ["2026-07-21","星期二","陈航、孙凯","钱队"],
      ["2026-07-22","星期三","张振新、李浩","钱队"],
      ["2026-07-23","星期四","闫卓宇、王涛","钱队"]
    ], primary: "", note: "6 名安保人员两两轮转；队长单独展示；历史调整在修改记录中留痕。"
  },
  device: {
    filters: ["设备名称/编码", "设备类型", "设备子类", "绑定位置", "在线状态", "上次在线时间"],
    columns: ["设备名称", "设备编码", "设备类型", "设备子类", "绑定位置/所属园区", "在线状态", "上次在线时间"],
    rows: [
      ["东北门外围02","CAM-2024-001","监控设备","枪型摄像头","微冷园区 / 东北门","在线","2026-07-20 10:42:12"],
      ["A栋大厅门禁01","ACC-2024-008","门禁设备","人脸门禁","微冷园区 / A栋 / 1F / 大厅","在线","2026-07-20 10:41:36"],
      ["南门车辆道闸01","BAR-2024-003","道闸设备","直杆道闸","微冷园区 / 南门","离线","2026-07-20 09:58:02"],
      ["仓库北门01","CAM-2024-018","监控设备","球形摄像头","微冷园区 / A栋 / 1F / 仓储区","故障","2026-07-20 08:46:18"]
    ], primary: "新增", secondary: "导出", note: "", showIndex: true, showSelection: false, showRefresh: false, tableClass: "security-device-management-table"
  }
};

const stateClass = {
  "营业中":"success","已入驻":"success","已绑定":"success","已发布":"success","已送达":"success","已完成":"success","按时完成":"success","在线":"success","正常":"success","在职":"success","下发成功":"success","已通过":"success","通过":"success","已生成工单":"success","启用":"success","开启":"success","自动放行":"success","人工抬杆":"success","已核验":"success","已采集":"success","已启用":"success","已确认":"primary","安防告警":"primary","周界告警":"warning",
  "暂停营业":"warning","处理中":"warning","巡检中":"warning","执行中":"warning","进行中":"warning","超时完成":"warning","正在下发":"warning","下发中":"warning","待发布":"warning","待确认":"warning","待处理":"warning","待派单":"warning","待接单":"warning","待派发":"warning","待执行":"warning","待巡检":"warning","待被访人审批":"warning","待安防审批":"warning","待审批":"warning","在园":"warning","停用":"warning","已停用":"warning","无权限":"warning","待核验":"warning","出场待核验":"warning","挂失":"warning","未采集":"warning","草稿":"default","生效中":"blacklist-active","未生效":"blacklist-pending","未配置":"default","未生成":"default","无需生成":"default","未开始":"default","未到访":"default","无法判断":"danger","有效":"success","已生效":"success","已处理":"success","通行成功":"success","成功":"success","区域入侵":"primary","越线入侵":"warning",
  "故障":"danger","异常":"danger","异常停用":"danger","超时":"danger","漏检":"danger","离线":"default","下发失败":"danger","部分失败":"danger","权限异常":"danger","未离园异常":"danger","紧急":"danger","重要":"warning","一般":"primary","黑名单":"danger","黑名单拦截":"danger","拦截":"danger","失败":"danger","误报":"default","误报关闭":"default","已驳回":"danger","已拒绝":"danger","拒绝":"danger","已作废":"default","已取消":"default","已退租":"default","待下发":"default","未通知":"default","已解绑":"default","已失效":"default","失效":"default","已终止":"default","已离园":"default","已离职":"default","注销":"default","作废":"default","禁用":"default","关闭":"default","否":"default","-":"default","--":"default"
};

const formSchemas = {
  "company:企业信息": { sections: [
    ["企业基本信息", [["所属园区","select","三里园区",1],["企业名称","text","大连微冷食品股份有限公司",1],["统一社会信用代码","text","请输入统一社会信用代码",1,"创建后不可修改"],["营业状态","select","营业中|暂停营业|已注销",1],["入驻状态","select","已入驻|已退租",1,"变更为已退租时需确认解除全部房间关联"]]],
    ["联系与补充信息", [["联系人","text","请输入联系人",1],["联系方式","text","请输入联系方式",1],["经营范围","textarea","园区总运营方、主体母公司，统筹水产加工、冰淇淋生产、园区整体管理",0],["备注","textarea","请输入备注",0]]]
  ], tip:"企业名称同园区唯一，统一社会信用代码全局唯一；被下游模块引用后删除将被阻断。" },
  "company:房间关联": { sections:[["批量绑定企业房间",[["选择企业","select","大连微冷食品股份有限公司|大连瑞兴天宝水产品有限公司|大连微冷农产品有限公司|联合林洋食品（大连）有限公司|海洋食品设计与创制高新技术研究院",1],["选择房间","choice","11 / 三里园区 / 德济楼 / 1F|1 / 三里园区 / 1# / 1F|221 / 三里园区 / 1# / 1F|12 / 三里园区 / 德济楼 / 1F|13 / 三里园区 / 德济楼 / 1F",1,"先选择企业，再选择可绑定房间；已绑定其他企业的房间不可选","full"]]]],tip:"一个企业可关联多个房间；一个房间仅允许绑定一个企业。" },
  "person:人员档案": { sections:[
    ["人员基本信息",[["姓名","text","请输入姓名",1],["人员编号","text","P20260058",0,"可自动生成，创建后不可修改"],["性别","select","男|女|未知",0],["联系方式","text","请输入联系方式",1],["员工类型","select","正式员工|外包员工|实习生",1],["人员状态","select","在职|停用",1],["所属企业","select","园区运营公司|澄海智造科技有限公司|蓝谷数字能源有限公司",1],["所属部门","select","安保部|巡检组|研发中心|制造中心",1],["岗位","select","安防主管|巡检员|算法工程师|生产助理",1],["证件类型","select","身份证|护照|其他",0],["证件号码","text","请输入证件号码",0],["邮箱","text","请输入邮箱",0],["人脸照片","upload","上传清晰正脸照片",0,"支持 jpg/png；编辑时可替换现有人脸照片","full"]]]
  ],tip:"所属企业、所属部门、岗位为必填选项；新增人员状态仅支持在职或停用，离职需通过列表行内“离职”操作办理。" },
  "person:人员黑名单": { sections:[["拉黑信息",[["选择人员","select","高启 / P20250061|林峰 / P20240028|王某 / P20230013",1],["拉黑原因","textarea","请输入具体拉黑原因",1],["生效时间","datetime","2026-06-10 10:00",1],["关联车辆处置","choice","鲁B·C1108|同步限制关联车辆通行",0,"确认拉黑前自动查询关联车辆","full"]]]],tip:"已生效中的人员不可重复拉黑；黑名单人员通行时将被拒绝并生成紧急告警。" },
  "person:卡片管理": { sections:[["发卡信息",[["物理卡号","text","800026",1],["选择未发卡人员","select","李晨 / P20260042|陈航 / P20260052|孙凯 / P20260053",1],["开卡时间","datetime","2026-06-10 10:30",1],["备注","textarea","请输入发卡说明",0]]]],tip:"卡片与人员一一绑定；仅状态正常且未绑定人员的卡片可执行发卡。" },
  "access:权限下发管理": { sections:[["新增授权",[["授权方式","select","按部门授权|按人员授权",1],["选择权限组","select","主楼门禁组|全天通行组|重点区域组",1],["授权对象","choice","张振新 / 安保部|闫卓宇 / 巡检组|研发中心（部门）",1,"支持多选","full"],["有效期","daterange","2026-06-10 至 2026-12-31",0],["授权说明","textarea","请输入授权原因",0,"full"]]]],tip:"授权关系保存后自动触发权限下发至权限组关联设备。" },
  "access:通行时间段": { sections:[["时间段信息",[["名称","text","工作日通行",1],["重复周期","select","执行一次|每天|法定工作日|法定节假日|自定义",1],["自定义周期","choice","周一|周二|周三|周四|周五|周六|周日",0,"仅重复周期选择自定义时展示","full"],["时间段","text","08:00-12:00；13:00-18:00",1,"支持配置多个，多个时段不可重叠"],["备注","textarea","请输入备注",0,"full"]]]],tip:"若时间段已被启用中的权限组引用，修改时需确认影响范围。" },
  "access:门禁权限组": { sections:[["权限组信息",[["权限组名称","text","主楼门禁组",1],["通行时间段","select","工作日通行|全天通行|节假日值守|临时施工通行",1],["状态","select","启用|停用",1],["备注","textarea","请输入备注",0,"full"]]]],tip:"权限组必须绑定一个已启用通行时间段，设备与人员变更后自动触发下发。" },
  "access:按部门授权": { sections:[["部门授权",[["选择部门","select","安保部|巡检组|研发中心|制造中心",1],["选择权限组","choice","主楼门禁组|全天通行组|重点区域组",1,"支持为部门配置多个权限组","full"]]]],tip:"部门人员变化后，系统按部门授权关系自动同步权限。" },
  "access:人员权限": { sections:[["人员授权",[["选择权限组","choice","主楼门禁组|全天通行组|重点区域组",1,"支持配置多个权限组","full"],["选择人员","choice","张振新 / P20260018|闫卓宇 / P20260031|李晨 / P20260042",1,"支持批量选择人员","full"],["有效期","daterange","2026-07-14 至 2026-12-31",1],["授权说明","textarea","请输入授权说明",0]]]],tip:"按人员授权用于个性化权限配置，与其他授权来源合并生效。" },
  "visitor:访客管理": { sections:[
    ["访客信息",[["访客姓名","text","请输入访客姓名",1],["手机号码","text","请输入手机号",1],["身份证号","text","请输入身份证号",1],["人脸照片","upload","上传访客人脸照片",1,"是否必填由基础权限配置决定","full"]]],
    ["拜访信息",[["所属企业","select","园区运营公司|澄海智造科技有限公司|蓝谷数字能源有限公司",1],["被访问人姓名","text","李晨",1],["被访问人手机号","text","186 6178 2304",1],["被访部门","select","研发中心|制造中心|安保部",1],["拜访事由","select","商务拜访|技术交流|面试|参观考察|设备安装/维修|其他",1],["到访日期范围","daterange","2026-06-10 至 2026-06-10",1],["随行人数","number","0",0],["车辆号牌","text","鲁B·T912F",0]]]
  ],tip:"系统将精确匹配被访问人的所属企业、姓名和手机号；审批通过后自动分配访客通行权限。" },
  "vehicle:车场配置": { sections:[["车场信息",[["车场名称","text","南侧广场车场",1],["所属园区","select","微冷园区",1],["车位总数","number","295",1],["是否启用","switch","启用",1],["备注","textarea","请输入车场备注",0,"full"]]]],tip:"入场/出场车道数和绑定监控数由系统自动汇总；车位总数由新增车场时填写。" },
  "vehicle:出入口配置": { sections:[["出入口信息",[["出入口类型","select","入口|出口",1],["出入口名称","text","南入口",1],["是否启用","select","启用|禁用",1],["设备商","select","捷顺|海康|大华|宇视",0],["设备Key","text","JS-GATE-IN-001",0],["车牌识别相机","select","南入口车牌监测01|货运入口车牌监测01|南出口车牌监测01",0],["道闸设备","select","南门入口道闸01|货运入口道闸01|南门出口道闸01",0],["LED 显示屏","select","南入口 LED 01|货运入口 LED 01|不配置",0],["备注","textarea","请输入备注",0,"full"]]]],tip:"出入口名称同一车场内不可重复；已存在通行记录后不可修改出入口类型，删除前需校验关联通行记录。" },
  "vehicle:监控绑定": { sections:[["绑定监控",[["监控设备","choice","南门车场全景01|南入口车牌监测01|南出口远景01|物流入口车牌监测01",1,"支持批量绑定；已绑定设备不可重复选择","full"]]]],tip:"仅允许绑定当前车场所属园区下的监控设备；离线监控可保留绑定关系但需展示离线状态。" },
  "vehicle:车辆管理": { sections:[["车辆与人员绑定",[["车牌号","text","鲁B·A726Q",1],["绑定人员","select","李晨 / P20260042|陈可 / P20260045",1,"同一车牌仅允许绑定一名人员；同一人员可绑定多辆车","full"],["联系方式","text","选择绑定人员后自动带出",0],["所属企业/部门","text","选择绑定人员后自动带出",0],["车辆品牌","text","大众",0],["车辆颜色","text","白色",0]]]],tip:"新增车辆仅建立车辆档案和人员绑定关系，不配置通行授权；车辆授权需通过行内“授权”单独配置。" },
  "vehicle:车辆黑名单": { sections:[["黑名单策略",[["车牌号","text","鲁B·C1108",1],["车主姓名","text","请输入车主姓名",0],["联系方式","text","请输入联系方式",0],["有效期","datetime","2026-06-10 00:00 至 2026-12-31 23:59",1],["禁行原因","textarea","请输入禁行原因",1,"full"]]]],tip:"黑名单保存后按有效期判断是否生效；若车辆存在白名单，仍以黑名单优先拦截。" },
  "vehicle:车辆白名单": { sections:[["白名单策略",[["车牌号","text","鲁B·F918D",1],["放行原因","textarea","请输入放行原因",1,"full"],["生效时间","datetime","2026-06-10 00:00",1],["失效时间","datetime","2026-12-31 23:59",1]]]],tip:"新增后按有效期自动判断状态；同车黑白名单可同时存在，但黑名单优先级更高。" },
  "vehicle:特殊车辆管理": { sections:[["特殊车辆登记",[["车牌号","text","鲁B·L8899",1],["所属单位","text","青岛冷链物流有限公司",1],["负责人","text","赵强",1],["联系方式","text","138 5321 6677",1],["有效期","daterange","2026-06-10 至 2027-06-09",1],["备注","textarea","请输入车辆用途、承运货物或核验说明",0,"full"]]]],tip:"特殊车辆入场在有效期内自动放行；出场必须由门卫拍照、登记出场信息后人工抬杆。" },
  "vehicle:特殊车辆通行记录": { sections:[["特殊车辆出场核验",[["关联车辆","select","鲁B·L8899 / 青岛冷链物流有限公司|临时物流车 / 无牌",1],["出场原因","select","货物配送完成|退货出场|临时转运|其他",1],["现场照片","upload","上传或现场拍照",1,"特殊车辆出场必须拍照留痕","full"],["核验备注","textarea","请输入门卫核验说明",1,"full"]]]],tip:"核验提交后同步生成特殊车辆通行记录，抬杆方式为人工抬杆。" },
  "vehicle:岗亭值守": { sections:[["无权限车辆放行登记",[["车牌号","text","鲁B·T6632",1],["车辆类型","select","临时车辆|特殊车辆（物流车辆）",1],["现场照片","upload","上传或现场拍照",0,"特殊车辆放行时必填","full"],["放行备注","textarea","请输入核验依据和放行原因",1,"full"]]]],tip:"无权限车辆放行前，道闸控制按钮保持置灰；确认放行需二次确认并记录人工抬杆。" },
  "patrol:视频巡检路线": { sections:[["视频巡检路线",[["路线名称","text","园区主干道视频路线",1],["点位最短播放时长（s）","number","10",1],["是否开启","switch","启用",1],["备注","textarea","覆盖正门、围墙、仓储区等重点视频点位",0,"full"]]]],tip:"" },
  "patrol:巡更计划": { sections:[["视频巡更计划",[["计划名称","text","重点区域每日巡更",1],["巡检路线","select","园区主干道视频路线|园区外围视频路线|地下车库视频路线",1],["生效日期","daterange","2026-06-10 至 2026-12-31",1],["巡检频率","select","每天|每周|每月",1],["开始时间","text","08:30-09:30",1],["是否开启","switch","启用",1],["备注","textarea","请输入计划说明",0,"full"]]]],tip:"仅可选择已开启的视频巡检路线；同一天、同一计划仅生成一次任务。" },
  "patrol:巡检任务": { sections:[["新增巡更任务",[["任务名称","text","7月巡检计划-周巡检3.4_20260717",1],["选择巡检路线","select","园区主干道视频路线|园区外围视频路线|地下车库视频路线|冷库外围视频路线",1],["预计开始时间","datetime","2026-07-17 15:20",1],["预计结束时间","datetime","2026-07-17 17:20",1]]]],tip:"时间精确到年月日时分；预计结束时间必须晚于预计开始时间。" },
  "perimeter:周界设置": { sections:[
    ["任务基础信息",[["任务名称","text","东北门外围夜间防攀爬",1],["责任部门","select","安保部|物业部",1],["去重冷却时长","number","30 秒",1,"范围 10-300 秒"],["任务描述","textarea","针对绿化带死角及围墙进行红外和视觉布控",0,"full"]]],
    ["摄像头与检测规则",[["关联摄像头","select","CAM-2024-001 东北门外围02|CAM-2024-018 仓库北门01",1,"仅在线且未被周界启用任务占用的摄像头可选"],["检测规则","choice","区域入侵：绿化带禁区 / 紧急|越线检测：东北墙 A→B / 紧急",1,"通过规则画布绘制监控区域或警戒线","full"],["保存方式","select","保存草稿|保存并启用",1]]]
  ],tip:"保存并启用前校验摄像头在线、无任务冲突且至少存在一条完整检测规则。" },
  "alarm:告警配置": { sections:[["告警等级配置",[["告警类型","select","热成像过温告警|人员聚集告警|消防通道占用告警|离岗告警|睡岗告警|人员黑名单告警",1],["告警等级","select","紧急|重要|一般",1],["备注","textarea","用于系统产生该类型告警事件时带出告警等级",0,"full"]]]],tip:"告警类型为固定枚举，不在本页面新增或删除；修改等级后默认仅对后续新产生的告警事件生效。" },
  "inspection:巡检任务": { sections:[["新增临时任务",[["任务名称","text","仓储区临时专项巡检",1],["所属园区","select","微冷园区",1],["巡检路线","select","A栋消防巡检路线|外围设施路线|仓储区专项路线",1],["巡检执行人","choice","闫卓宇|王涛|张振新",1,"多名执行人共同执行同一任务","full"],["计划开始时间","datetime","2026-06-10 14:00",1],["计划结束时间","datetime","2026-06-10 16:00",1,"根据路线预计时间自动带出"]]]],tip:"临时任务不依赖巡检计划，但必须选择路线和执行人。" },
  "inspection:巡检计划": { sections:[["巡检计划",[["计划名称","text","消防设施每日巡检",1],["巡检路线","select","A栋消防巡检路线|外围设施路线|地下车库路线",1],["生效日期","daterange","2026-06-10 至长期",1],["巡检频率","select","每天|每周|每月|自定义",1],["执行次数 / 时间","text","每天 1 次 / 08:00",1],["巡检执行人","choice","闫卓宇|王涛|张振新|李浩",1,"支持多人共同执行","full"],["计划状态","select","开启|停用",1]]]],tip:"任务结束时间根据开始时间和路线预计时间自动计算；不生成今天之前的历史任务。" },
  "inspection:巡检路线": { sections:[["巡检路线",[["路线名称","text","A栋消防巡检路线",1],["所属园区","select","微冷园区",1],["预计时间","text","120 分钟",1],["巡检点","choice","A栋 1F 消防栓-03|A栋 2F 疏散通道|A栋配电间|消防泵房",1,"支持多选并调整点位顺序","full"],["路线说明","textarea","按楼层顺序完成消防设施检查",0,"full"]]]],tip:"路线被计划引用后，编辑仅影响后续生成任务，已生成任务使用快照。" },
  "inspection:巡检点": { sections:[["巡检点基础资料",[["所属园区","select","海尔西园区|微冷园区",1],["巡检点名称","text","室外消火栓-27",1],["区域","select","海尔西园区东南角|海尔西园区西北角|1#东|1#西",1],["标签","multiselect","消防巡检|安全巡检|设施巡检|保洁巡检",0,"可多选","full"],["备注","textarea","检查环境周围是否有积水",0,"full"]]]] },
  "inspection:自定义标签": { sections:[["自定义标签",[["标签名称","text","消防巡检",1],["标签颜色","select","红色|橙色|蓝色|绿色",1],["状态","select","启用|停用",1],["标签说明","textarea","用于消防设施类巡检点分类",0]]]],tip:"标签停用后不可被新巡检点选择，历史关联关系保留。" },
  "inspection:自定义区域": { sections:[["自定义区域",[["区域名称","text","A栋东区",1],["所属园区","select","微冷园区",1],["上级区域","select","A栋 / 1F|A栋 / 2F|园区外围",1],["状态","select","启用|停用",1],["区域说明","textarea","用于巡检点业务分区",0]]]],tip:"自定义区域用于巡检业务归类，不替代设备管理中的物理位置树。" },
  "schedule:排班日历": { sections:[["排班调整",[["调整日期","datetime","2026-07-21",1],["调整类型","select","请假顶班|人员调班|队长请假",1],["调整人员","select","张振新|李浩|闫卓宇|王涛|陈航|孙凯|钱队",1],["备注","textarea","请输入请假、顶班或调班原因",1,"full"]]]],tip:"排班调整保存后即时生效；调整明细在修改记录中留痕。" },
  "device:设备台账": { sections:[
    ["设备基础信息",[["设备名称","text","请输入设备名称",1],["设备编码","text","系统自动生成",0,"编辑时不可修改"],["设备类型","select","门禁设备|道闸设备|监控设备",1],["IP 地址","text","192.168.10.130",1],["端口号","number","8000",0],["所属园区","select","微冷园区",1],["品牌","text","海康",0],["型号","text","DS-2CD",0]]],
    ["位置与类型特有信息",[["安装位置","select","微冷园区 / 东北门|A栋 / 1F / 大厅|停车场 / B1 / B区",0],["监控类型 / 门禁类型 / 道闸类型","select","枪型摄像机|球型摄像机|人脸门禁|直杆道闸",0],["通信 / 流传输协议","select","TCP|UDP",0],["进出 / 通行方向","select","进|出|入口|出口|双向",0],["备注","textarea","请输入设备备注",0,"full"]]]
  ],tip:"设备编码和 IP 地址在同一园区唯一；设备需在本模块注册后方可被业务模块引用。" },
  "device:设备维护": { sections:[["维护记录",[["目标设备","select","东北门外围02 / CAM-2024-001|A栋大厅门禁01 / ACC-2024-008|南门车辆道闸01 / BAR-2024-003",1],["维护类型","select","设备注册|设备移机|设备更换|设备拆除|设备启用|设备停用",1],["维护日期","datetime","2026-06-10 10:30",1],["新安装位置","select","微冷园区 / 东北门|A栋 / 1F / 大厅|停车场 / B1 / B区",0],["操作说明","textarea","请输入维护原因和处理说明",1,"full"],["附件","upload","上传维护现场照片或附件",0,"full"]]]],tip:"所有维护操作必须生成维护记录；停用或拆除前需确认对引用业务模块的影响。" },
  "device:位置绑定": { sections:[["设备位置绑定",[["选择设备","select","东北门外围02 / CAM-2024-001|A栋大厅门禁01 / ACC-2024-008|南门车辆道闸01 / BAR-2024-003",1],["所属园区","select","微冷园区",1],["建筑","select","A栋|B栋|停车场|园区外围",1],["楼层","select","1F|2F|B1|室外",1],["区域","select","大厅|仓储区|东北门|南门|B区",1],["位置描述","textarea","请输入安装点位详细描述",0,"full"]]]],tip:"一台设备绑定至一个最末级区域节点；位置变更应通过移机操作留痕。" }
};

let currentModule = "company";
let currentTab = {};
let scheduleCalendarState = { year: 2026, month: 7 };
const inspectionPointManageTabs = ["巡检点", "自定义标签", "自定义区域"];
let inspectionPointFilterState = { name: "", area: "全部", tag: "全部", park: "全部" };
let inspectionTagFilterState = { name: "", park: "全部" };
let inspectionAreaFilterState = { name: "", park: "全部" };
const inspectionTaskRows = [
  { name: "消防重点点位巡检（2026-07-21）", park: "微冷园区", executor: "闫卓宇、王涛", start: "2026-07-21 08:00", end: "2026-07-21 10:00", status: "巡检中", abnormal: 2, normal: 6, points: 12, timedOut: true },
  { name: "外围设施安全巡检（2026-07-21）", park: "微冷园区", executor: "张振新", start: "2026-07-21 07:30", end: "2026-07-21 09:00", status: "已完成", abnormal: 0, normal: 16, points: 16 },
  { name: "地下车库环境巡检（2026-07-21）", park: "微冷园区", executor: "李浩", start: "2026-07-21 14:00", end: "2026-07-21 15:40", status: "待巡检", abnormal: 0, normal: 0, points: 10 },
  { name: "仓储区临时专项巡检", park: "微冷园区", executor: "闫卓宇", start: "2026-07-20 15:00", end: "2026-07-20 18:30", status: "已作废", abnormal: 1, normal: 3, points: 9, timedOut: true },
  { name: "海尔西园区东南角保洁巡检", park: "海尔西园区", executor: "孙宁", start: "2026-07-21 09:30", end: "2026-07-21 11:00", status: "待巡检", abnormal: 0, normal: 0, points: 8 }
];
const videoDevices = [
  { code: "CAM-2024-001", name: "东北门外围02", category: "视频监控设备", type: "枪型摄像头", identifier: "WL-CAM-NE-0001", ip: "192.168.10.101", mac: "00:16:3E:10:42:01", location: "微冷园区 / 东北门", entryLocation: "微冷园区", brandModel: "海康 / DS-2CD", status: "在线", heartbeat: "2026-07-20 10:42:12", statusUpdateTime: "2026-07-20 10:42:12", protocol: "TCP", port: "8000", stream: "主码流 1080P", remark: "--" },
  { code: "CAM-2024-018", name: "仓库北门01", category: "视频监控设备", type: "球形摄像头", identifier: "WL-CAM-WH-0018", ip: "192.168.10.118", mac: "00:16:3E:10:42:18", location: "微冷园区 / A栋 / 1F / 仓储区", entryLocation: "微冷园区 / A栋", brandModel: "大华 / DH-SD", status: "在线", heartbeat: "2026-07-20 10:42:10", statusUpdateTime: "2026-07-20 10:42:10", protocol: "TCP", port: "8000", stream: "主码流 1080P", remark: "--" },
  { code: "CAM-2024-026", name: "停车场 B 区03", category: "视频监控设备", type: "半球摄像头", identifier: "WL-CAM-PK-0026", ip: "192.168.10.126", mac: "00:16:3E:10:42:26", location: "微冷园区 / 停车场 / B1 / B区", entryLocation: "微冷园区 / 停车场", brandModel: "宇视 / IPC", status: "离线", heartbeat: "2026-07-20 09:58:02", statusUpdateTime: "2026-07-20 09:58:02", protocol: "TCP", port: "8000", stream: "主码流 720P", remark: "网络离线待巡检" },
  { code: "CAM-2024-006", name: "西南门岗亭01", category: "视频监控设备", type: "枪型摄像头", identifier: "WL-CAM-SW-0006", ip: "192.168.10.106", mac: "00:16:3E:10:42:06", location: "微冷园区 / 西南门", entryLocation: "微冷园区", brandModel: "海康 / DS-2CD", status: "离线", heartbeat: "--", statusUpdateTime: "--", protocol: "TCP", port: "8000", stream: "未连接", remark: "--" },
  { code: "CAM-2024-032", name: "南门通道01", category: "视频监控设备", type: "半球摄像头", identifier: "WL-CAM-SG-0032", ip: "192.168.10.132", mac: "00:16:3E:10:42:32", location: "微冷园区 / 南门", entryLocation: "微冷园区", brandModel: "海康 / DS-2CD", status: "在线", heartbeat: "2026-07-20 10:41:58", statusUpdateTime: "2026-07-20 10:41:58", protocol: "TCP", port: "8000", stream: "主码流 1080P", remark: "--" }
];
let currentVideoDeviceDetailCode = "CAM-2024-001";
let videoState = {
  realtimeDeviceCode: "CAM-2024-001",
  realtimePlaying: true,
  realtimeScreenMode: 1,
  realtimePtzVisible: false,
  treeKeyword: "",
  collapsedGroups: new Set(),
  playbackDeviceCode: "CAM-2024-001",
  playbackStatus: "播放中",
  playbackSpeed: "1x",
  playbackProgress: 38,
  playbackStart: "2026-07-20T08:00:00",
  playbackEnd: "2026-07-20T10:00:00"
};
const PLAYBACK_RETENTION_DAYS = 30;
const PLAYBACK_NOW = new Date("2026-07-20T10:42:16");
let videoTileClickTimer = null;
let selectedCompanyRoomIds = new Set(["11","1","221"]);
let pendingUnbindRoomName = "";
let pendingResignedPerson = "";
let selectedCardIds = new Set(["800001"]);
let selectedVehicleIds = new Set(["鲁B·A726Q"]);
let pendingCardOperation = "";
let mobileFaceState = { step: "draft", personCode: "P20260018", agreed: true };
let currentAccessGroupDetailName = "主楼门禁组";
let accessGroupDetailFilterState = {
  activeTab: "关联人员",
  peopleKeyword: "",
  deviceKeyword: ""
};
let accessDevicePickerState = {
  groupName: "主楼门禁组",
  selectedCodes: new Set(),
  currentPage: 1,
  pageSize: 6,
  keyword: "",
  layer: "main"
};
let accessAuthorizeState = {
  groupName: "主楼门禁组",
  mode: "department",
  departments: new Set(),
  persons: new Set(),
  departmentKeyword: "",
  personKeyword: ""
};
let currentVisitorDetail = null;
let currentVisitorSecurityApprovalDetail = null;
let currentSpecialVehicleRecordDetailRow = null;
let currentInspectionTaskDetail = null;
let currentAlarmInspectionWorkorderDetail = null;
let currentSecurityWorkorderDetail = null;
let currentPerimeterAlarmId = "PAM-20260720-0068";
let currentPerimeterTaskId = "PT-001";
const perimeterCameraOptions = [
  { code: "CAM-2024-001", name: "东北门外围02", status: "在线", area: "微冷园区 / 东北门", reason: "周界启用任务中" },
  { code: "CAM-2024-018", name: "仓库北门01", status: "在线", area: "A栋 / 1F / 仓储区", reason: "周界启用任务中" },
  { code: "CAM-2024-006", name: "西南门01", status: "离线", area: "微冷园区 / 西南门", reason: "设备离线，停用任务可编辑不可启用" },
  { code: "CAM-2024-021", name: "北侧围墙03", status: "在线", area: "微冷园区 / 北侧围墙", reason: "周界启用任务中" },
  { code: "CAM-2024-032", name: "南门通道01", status: "在线", area: "微冷园区 / 南门", reason: "" },
  { code: "CAM-2024-026", name: "停车场B区03", status: "离线", area: "停车场 / B1 / B区", reason: "设备离线，不可选择" }
];
const perimeterTasks = [
  {
    id: "PT-001",
    name: "东北门外围夜间防攀爬",
    status: "已启用",
    camera: "CAM-2024-001 东北门外围02",
    area: "微冷园区 / 东北门",
    regionCount: 1,
    lineCount: 1,
    level: "紧急",
    dedup: 30,
    createdAt: "2026-07-18 09:20:16",
    updatedAt: "2026-07-19 18:42:05",
    updatedBy: "张振新",
    department: "安保部",
    description: "针对绿化带死角及围墙进行红外和视觉布控"
  },
  {
    id: "PT-002",
    name: "仓储区禁入监测",
    status: "已启用",
    camera: "CAM-2024-018 仓库北门01",
    area: "A栋 / 1F / 仓储区",
    regionCount: 2,
    lineCount: 0,
    level: "重要",
    dedup: 60,
    createdAt: "2026-07-17 14:06:31",
    updatedAt: "2026-07-17 17:22:48",
    updatedBy: "李浩",
    department: "安保部",
    description: "仓储区非授权人员进入识别"
  },
  {
    id: "PT-003",
    name: "西南门反向闯入",
    status: "已停用",
    camera: "CAM-2024-006 西南门01",
    area: "微冷园区 / 西南门",
    regionCount: 0,
    lineCount: 1,
    level: "重要",
    dedup: 30,
    createdAt: "2026-07-15 11:35:04",
    updatedAt: "2026-07-19 09:12:33",
    updatedBy: "张振新",
    department: "安保部",
    description: "西南门单向越线检测"
  },
  {
    id: "PT-004",
    name: "北侧围墙入侵防区",
    status: "异常停用",
    camera: "CAM-2024-021 北侧围墙03",
    area: "微冷园区 / 北侧围墙",
    regionCount: 1,
    lineCount: 0,
    level: "一般",
    dedup: 45,
    createdAt: "2026-07-13 10:18:24",
    updatedAt: "2026-07-20 07:46:12",
    updatedBy: "系统",
    department: "安保部",
    description: "摄像头视频流中断后自动异常停用"
  }
];
const perimeterAlarms = [
  {
    id: "PAM-20260720-0068",
    type: "越线入侵",
    level: "紧急",
    triggerTime: "2026-07-20 10:32:18",
    latestTime: "2026-07-20 10:32:26",
    location: "微冷园区 / 东北门 / 东北门外围02",
    camera: "CAM-2024-001 东北门外围02",
    task: "东北门外围夜间防攀爬",
    rule: "东北墙越线 A→B",
    ruleType: "越线入侵",
    direction: "A→B",
    repeat: 3,
    status: "待确认",
    workorderNo: "",
    target: "人员目标 T-4481",
    coordinates: "x:0.62, y:0.48",
    ownerDept: "安保部",
    audit: [
      ["2026-07-20 10:32:18", "告警产生", "AI引擎检测到目标按 A→B 方向穿越东北墙警戒线。"],
      ["2026-07-20 10:32:20", "消息推送", "已推送至当班值班员张振新。"]
    ]
  },
  {
    id: "PAM-20260720-0062",
    type: "区域入侵",
    level: "重要",
    triggerTime: "2026-07-20 09:55:41",
    latestTime: "2026-07-20 09:55:41",
    location: "A栋 / 1F / 仓储区 / 仓库北门01",
    camera: "CAM-2024-018 仓库北门01",
    task: "仓储区禁入监测",
    rule: "仓库北门禁入区",
    ruleType: "区域入侵",
    direction: "--",
    repeat: 1,
    status: "已确认",
    workorderNo: "",
    target: "人员目标 T-4190",
    coordinates: "x:0.42, y:0.57",
    ownerDept: "安保部",
    audit: [
      ["2026-07-20 09:55:41", "告警产生", "目标检测框进入监控区域，重叠比例达到 62%。"],
      ["2026-07-20 09:58:04", "确认告警", "张振新确认告警有效。"]
    ]
  },
  {
    id: "PAM-20260720-0059",
    type: "越线入侵",
    level: "重要",
    triggerTime: "2026-07-20 09:21:06",
    latestTime: "2026-07-20 09:21:08",
    location: "微冷园区 / 西南门 / 西南门01",
    camera: "CAM-2024-006 西南门01",
    task: "西南门反向闯入",
    rule: "西南门警戒线 B→A",
    ruleType: "越线入侵",
    direction: "B→A",
    repeat: 2,
    status: "已生成工单",
    workorderNo: "WO-20260720-0018",
    target: "人员目标 T-3988",
    coordinates: "x:0.51, y:0.50",
    ownerDept: "安保部",
    audit: [
      ["2026-07-20 09:21:06", "告警产生", "系统生成告警记录。"],
      ["2026-07-20 09:24:12", "确认告警", "李浩确认告警有效。"],
      ["2026-07-20 09:25:03", "生成工单", "已创建工单 WO-20260720-0018。"]
    ]
  },
  {
    id: "PAM-20260720-0047",
    type: "区域入侵",
    level: "一般",
    triggerTime: "2026-07-20 08:46:20",
    latestTime: "2026-07-20 08:46:20",
    location: "微冷园区 / 北侧围墙 / 北侧围墙03",
    camera: "CAM-2024-021 北侧围墙03",
    task: "北侧围墙入侵防区",
    rule: "北侧绿化带区域",
    ruleType: "区域入侵",
    direction: "--",
    repeat: 1,
    status: "误报关闭",
    workorderNo: "",
    target: "晃动树影",
    coordinates: "x:0.34, y:0.61",
    ownerDept: "安保部",
    audit: [
      ["2026-07-20 08:46:20", "告警产生", "系统生成告警记录。"],
      ["2026-07-20 08:48:11", "误报关闭", "王涛核验抓拍图后关闭为误报。"]
    ]
  }
];
const securityAlarmEvents = [
  {
    id: "ALM-20260721-0128",
    type: "热成像过温告警",
    level: "紧急",
    location: "A栋 / 冷库机房 / 配电柜01",
    device: "THERM-2025-006 热成像测温仪",
    triggerTime: "2026-07-21 10:32:18",
    latestTime: "2026-07-21 10:32:28",
    status: "待确认",
    workorderNo: "",
    workorderStatus: "",
    currentOwner: "安保监控员",
    handler: "--",
    expectedCloseTime: "",
    ownerDept: "安保部",
    target: "配电柜01 最高温度 86.5°C",
    description: "热成像识别到配电柜温度超过安全阈值。",
    suggestion: "请前往现场核查配电柜温度、负载和散热状态。",
    audit: [
      ["2026-07-21 10:32:18", "告警产生", "热成像设备上报过温告警。"]
    ]
  },
  {
    id: "ALM-20260721-0119",
    type: "人员黑名单告警",
    level: "紧急",
    location: "南门入口闸机",
    device: "FACE-2024-018 南门人脸闸机",
    triggerTime: "2026-07-21 09:55:41",
    latestTime: "2026-07-21 09:55:41",
    status: "已确认",
    workorderNo: "",
    workorderStatus: "",
    currentOwner: "安保监控员",
    handler: "--",
    expectedCloseTime: "",
    ownerDept: "安保部",
    target: "高启 / P20250061",
    description: "人脸识别命中人员黑名单。",
    suggestion: "请核实人员身份并按安防要求现场处置。",
    audit: [
      ["2026-07-21 09:55:41", "告警产生", "系统识别到黑名单人员进入南门入口。"],
      ["2026-07-21 09:58:04", "确认告警", "张振新确认告警有效。"]
    ]
  },
  {
    id: "ALM-20260721-0107",
    type: "消防通道占用告警",
    level: "重要",
    location: "A栋 / 2F / 疏散通道",
    device: "CAM-2024-032 南门通道01",
    triggerTime: "2026-07-21 09:21:06",
    latestTime: "2026-07-21 09:21:12",
    status: "已生成工单",
    workorderNo: "AFGD-20260721-002",
    workorderStatus: "处理中",
    currentOwner: "闫卓宇",
    handler: "闫卓宇",
    expectedCloseTime: "2026-07-21 10:30",
    ownerDept: "安保部",
    target: "通道堆放货物",
    description: "视频识别到消防通道被货物占用。",
    suggestion: "请现场清理占用物并上传处理照片。",
    audit: [
      ["2026-07-21 09:21:06", "告警产生", "系统生成消防通道占用告警。"],
      ["2026-07-21 09:24:12", "确认告警", "李浩确认告警有效。"],
      ["2026-07-21 09:26:03", "生成工单", "已创建工单 AFGD-20260721-002。"],
      ["2026-07-21 09:42:06", "接单处理", "闫卓宇已接单，正在清理消防通道占用物。"]
    ]
  },
  {
    id: "ALM-20260721-0096",
    type: "人员聚集告警",
    level: "重要",
    location: "A栋 / 卸货区",
    device: "CAM-2024-014 卸货区全景",
    triggerTime: "2026-07-21 08:22:16",
    latestTime: "2026-07-21 08:22:16",
    status: "已生成工单",
    workorderNo: "AFGD-20260721-001",
    workorderStatus: "已完成",
    currentOwner: "李浩",
    handler: "李浩",
    expectedCloseTime: "2026-07-21 09:30",
    ownerDept: "安保部",
    target: "卸货区 8 人聚集",
    description: "视频识别到卸货区短时间内人员聚集。",
    suggestion: "请现场疏导并确认是否存在安全风险。",
    audit: [
      ["2026-07-21 08:22:16", "告警产生", "系统生成人员聚集告警。"],
      ["2026-07-21 08:28:10", "确认告警", "李浩确认告警有效。"],
      ["2026-07-21 08:30:00", "生成工单", "已创建工单 AFGD-20260721-001。"],
      ["2026-07-21 09:08:32", "处置完成", "现场人员已疏导，确认无安全事件。"]
    ]
  },
  {
    id: "ALM-20260720-0175",
    type: "睡岗告警",
    level: "一般",
    location: "北门值班室",
    device: "CAM-2024-021 北侧围墙03",
    triggerTime: "2026-07-20 22:46:20",
    latestTime: "2026-07-20 22:46:20",
    status: "误报关闭",
    workorderNo: "",
    workorderStatus: "",
    currentOwner: "张振新",
    handler: "张振新",
    expectedCloseTime: "",
    ownerDept: "安保部",
    target: "值守人员姿态误识别",
    description: "系统识别到疑似睡岗行为。",
    suggestion: "核验视频后确认是否误报。",
    audit: [
      ["2026-07-20 22:46:20", "告警产生", "系统生成睡岗告警。"],
      ["2026-07-20 22:48:11", "误报关闭", "张振新核验视频后关闭为误报。"]
    ]
  }
];
let accessDepartmentAuthState = {
  selectedDepartmentKey: "",
  groupKeyword: "",
  groupStatus: ""
};
let accessPersonPermissionAuthState = {
  groupNames: new Set(),
  personCodes: new Set(),
  personKeyword: "",
  mode: "batch",
  longTerm: false
};
let currentAccessPersonPermissionCode = "P20260018";
let accessIssueProgressTimer = null;
let patrolPlanFrequency = "每天";
let patrolPlanFrequencyState = {
  counts: { "每天": 3, "每周": 3, "每月": 3 },
  weekdays: ["周一", "周三", "周五"],
  monthDays: [1, 15, 28],
  quarterAnchors: [
    { month: "首月", day: "1号" },
    { month: "首月", day: "1号" },
    { month: "首月", day: "1号" }
  ],
  customDates: ["01-01", "04-01"]
};
let currentPatrolPlanDetail = null;
let visitorConfigState = {
  allowVehicle: true,
  deviceScope: "person",
  reasons: ["商务拜访","技术交流","面试","参观考察","设备安装/维修","其他"],
  personDevices: new Set(["东门访客闸机01","东门访客闸机02","南门通行闸机01"]),
  vehicleDevices: new Set(["南门车辆道闸01","东门车辆道闸01"])
};

const vehicleParkingLots = [
  {
    name: "南侧广场车场",
    park: "微冷园区",
    status: "启用",
    remark: "覆盖园区南门与货运出入口",
    spaces: 295,
    entranceCount: 2,
    exitCount: 2,
    monitors: [
      ["-1FA区摄像机"],
      ["#3大门西侧"],
      ["9层卫生间外走廊"],
      ["停车门口健康"],
      ["西门门口"]
    ],
    gateways: [
      ["入口", "南入口", "捷顺", "JS-GATE-IN-001", "启用"],
      ["入口", "货运入口", "捷顺", "JS-GATE-IN-002", "启用"],
      ["出口", "南出口", "捷顺", "JS-GATE-OUT-001", "启用"],
      ["出口", "货运出口", "捷顺", "JS-GATE-OUT-002", "启用"]
    ]
  },
  {
    name: "东门临时车场",
    park: "微冷园区",
    status: "禁用",
    remark: "临时车场区域，暂停新增通行配置",
    spaces: 86,
    entranceCount: 1,
    exitCount: 1,
    monitors: [["东门临停全景01", "微冷园区 / 东门", "海康", "CAM-PARK-E-001", "在线"]],
    gateways: [["入口", "东门入口", "捷顺", "JS-GATE-E-IN", "禁用"], ["出口", "东门出口", "捷顺", "JS-GATE-E-OUT", "禁用"]]
  },
  {
    name: "冷链物流车场",
    park: "微冷园区",
    status: "启用",
    remark: "冷链货运车辆专用",
    spaces: 48,
    entranceCount: 1,
    exitCount: 1,
    monitors: [["物流入口车牌监测01", "冷链物流区 / 入口", "海康", "CAM-LOG-IN-001", "在线"], ["物流出口车牌监测01", "冷链物流区 / 出口", "海康", "CAM-LOG-OUT-001", "在线"]],
    gateways: [["入口", "物流入口", "捷顺", "JS-LOG-IN-001", "启用"], ["出口", "物流出口", "捷顺", "JS-LOG-OUT-001", "启用"]]
  }
];

const vehicleManagementRows = [
  { plate: "鲁B·A726Q", personCode: "P20260042", personName: "李晨", phone: "186 6178 2304", enterprise: "蓝谷数字能源", department: "研发中心", brand: "大众", color: "白色", bindStatus: "已绑定", startTime: "2026-06-10", endTime: "2026-12-31", parkingLots: 1, entrances: 4, authStatus: "启用", operator: "张振新", operateTime: "2026-06-08 09:20:05" },
  { plate: "鲁B·F918D", personCode: "P20260018", personName: "张振新", phone: "185 5323 6080", enterprise: "园区运营公司", department: "安保部", brand: "丰田", color: "黑色", bindStatus: "已绑定", startTime: "2026-01-01", endTime: "长期", parkingLots: 2, entrances: 5, authStatus: "启用", operator: "admin", operateTime: "2026-06-01 10:10:00" },
  { plate: "鲁B·C1108", personCode: "P20250061", personName: "高启", phone: "185 5323 6108", enterprise: "大连瑞兴天宝水产品有限公司", department: "物流部", brand: "厢式货车", color: "蓝色", bindStatus: "已绑定", startTime: "-", endTime: "-", parkingLots: 0, entrances: 0, authStatus: "未配置", operator: "admin", operateTime: "2026-05-18 08:20:13" },
  { plate: "鲁B·D520M", personCode: "P20260045", personName: "陈可", phone: "186 6178 2307", enterprise: "蓝谷数字能源", department: "研发中心", brand: "特斯拉", color: "灰色", bindStatus: "已解绑", startTime: "-", endTime: "-", parkingLots: 0, entrances: 0, authStatus: "停用", operator: "李浩", operateTime: "2026-05-20 14:15:36" }
];

const vehicleBlacklistRows = [
  { plate: "鲁B·C1108", ownerName: "高启", ownerPhone: "185 5323 6108", reason: "多次违规停放并占用冷链装卸通道", startTime: "2026-05-01 00:00", endTime: "2026-08-01 00:00", source: "手动新增", operator: "张振新", operateTime: "2026-06-08 10:22:13" },
  { plate: "鲁B·Q8821", ownerName: "林峰", ownerPhone: "186 0411 3306", reason: "安全事件关联车辆，需安保复核后解除", startTime: "2026-06-08 10:00", endTime: "长期", source: "人员黑名单同步", operator: "张振新", operateTime: "2026-06-08 10:35:41" },
  { plate: "鲁B·H3320", ownerName: "陈可", ownerPhone: "186 6178 2307", reason: "证件异常，临时暂停通行", startTime: "2026-04-01 00:00", endTime: "2026-05-31 23:59", source: "手动新增", operator: "李浩", operateTime: "2026-06-01 09:12:20" },
  { plate: "鲁B·K3208", ownerName: "高启", ownerPhone: "185 5323 6108", reason: "人员黑名单关联车辆，同步限制通行", startTime: "2026-08-01 00:00", endTime: "2026-12-31 23:59", source: "人员黑名单同步", operator: "系统同步", operateTime: "2026-06-08 10:20:05" }
];

const vehicleWhitelistRows = [
  { plate: "鲁B·F918D", ownerName: "张振新", ownerPhone: "185 5323 6080", reason: "园区管理层固定车辆，允许长期通行", startTime: "2026-01-01 00:00", endTime: "长期", operator: "张振新", operateTime: "2026-06-08 10:12:28" },
  { plate: "鲁B·S5506", ownerName: "孙宁", ownerPhone: "139 5323 1137", reason: "长期供应商冷链配送车辆", startTime: "2026-05-01 00:00", endTime: "2026-06-30 23:59", operator: "李浩", operateTime: "2026-06-08 09:41:16" },
  { plate: "鲁B·A726Q", ownerName: "李晨", ownerPhone: "186 6178 2304", reason: "研发中心固定办公车辆", startTime: "2026-06-10 00:00", endTime: "2026-12-31 23:59", operator: "admin", operateTime: "2026-06-10 08:30:22" },
  { plate: "鲁B·T6632", ownerName: "王涛", ownerPhone: "186 5323 6019", reason: "临时保障车辆，保留白名单记录待复核", startTime: "2026-08-01 00:00", endTime: "2026-08-31 23:59", operator: "王涛", operateTime: "2026-06-16 11:08:30" }
];

const specialVehicleRows = [
  { plate: "鲁B·L8899", category: "冷链车辆", unit: "青岛冷链物流有限公司", ownerName: "赵强", ownerPhone: "138 5321 6677", credentialNo: "YD-2026-018", startDate: "2026-06-10", endDate: "2027-06-09", status: "启用", entryRule: "入场自动放行", exitRule: "出场移动端核验", remark: "冷链货物配送车辆，出场需核对车厢和送货单", operator: "李浩", operateTime: "2026-06-10 09:36:12" },
  { plate: "鲁B·K3208", category: "货运车辆", unit: "恒曜供应链有限公司", ownerName: "孙宁", ownerPhone: "139 5323 1137", credentialNo: "YD-2026-011", startDate: "2026-03-01", endDate: "2026-12-31", status: "启用", entryRule: "入场自动放行", exitRule: "出场移动端核验", remark: "常驻货运车辆，出场由门卫拍照登记后手动放行", operator: "张振新", operateTime: "2026-06-08 11:18:30" },
  { plate: "辽B·62Q18", category: "快递车辆", unit: "日日达快递", ownerName: "周雨", ownerPhone: "139 5321 9000", credentialNo: "YD-2026-026", startDate: "2026-07-01", endDate: "2026-09-30", status: "启用", entryRule: "入场自动放行", exitRule: "出场移动端核验", remark: "园区固定快递车", operator: "王涛", operateTime: "2026-07-01 08:26:45" },
  { plate: "临时-0616-003", category: "临时物流车辆", unit: "临时承运", ownerName: "陈一鸣", ownerPhone: "186 5323 6020", credentialNo: "TEMP-2026-003", startDate: "2026-06-16", endDate: "2026-06-16", status: "停用", entryRule: "入场人工登记", exitRule: "出场移动端核验", remark: "临时入园记录已完成离场", operator: "门卫王涛", operateTime: "2026-06-16 17:28:09" }
];

const vehicleAccessRecordRows = [
  ["鲁B·T6632","抓拍|鲁B","2026-06-16 10:46:22","南入口","入场","人工抬杆","访客货物临时送达，登记后放行","陈一鸣|186 5323 6020"],
  ["鲁B·A726Q","抓拍|鲁B","2026-06-16 10:31:44","南入口","入场","自动放行","命中车辆授权","李晨|186 6178 2304"],
  ["鲁B·C1108","抓拍|鲁B","2026-06-16 10:22:09","南入口","入场","拦截","命中车辆黑名单","高启|185 5323 6108"],
  ["鲁B·L8899","抓拍|鲁B","2026-06-16 10:42:18","南出口","出场","人工抬杆","特殊车辆出场核验通过","赵强|138 5321 6677"]
];

const specialVehicleAccessRecordRows = [
  ["鲁B·L8899","青岛冷链物流有限公司","赵强|13888886677","2026-06-16 10:42:18","南出口","出场","人工抬杆|特殊车辆拍照登记后手动放行","王涛|2026-06-16 10:43:05"],
  ["鲁B·K3208","恒曜供应链有限公司","孙宁|13900001137","2026-06-16 09:28:03","货运入口","入场","自动放行|命中特殊车辆登记权限","-|-"],
  ["鲁B·M7612","海川冷运有限公司","刘凯|13788886620","2026-06-16 09:06:32","货运入口","入场","人工抬杆|特殊车辆拍照登记后手动放行","李浩|2026-06-16 09:07:05"],
  ["LS-20260616-003","日日达快递","周雨|13953219000","2026-06-16 08:55:41","南出口","出场","人工抬杆|特殊车辆拍照登记后手动放行","王涛|2026-06-16 08:56:05"]
];

let vehicleParkDetailState = { name: vehicleParkingLots[0].name, tab: "出入口" };
let pendingVehicleRelease = null;
let vehicleMonitorBindState = { tab: "candidate", selected: new Set(), preview: "负一8号楼配电", lotName: vehicleParkingLots[0].name };

const vehicleMonitorOptions = ["负一8号楼配电", "负二5、6号楼", "负二5号楼东", "负二7号楼前西", "负一8号楼西侧", "10号楼观景平台", "负一8号楼东侧", "车场北侧全景"];

const visitorDeviceOptions = {
  person: ["东门访客闸机01","东门访客闸机02","南门通行闸机01","A栋大厅门禁01","A栋办公区门禁","B栋访客闸机01","西门人行闸机01","研发楼门禁02"],
  vehicle: ["南门车辆道闸01","东门车辆道闸01","地下车库道闸01","西门车辆道闸01","货运通道道闸01"]
};

const accessDepartmentTargets = [
  ["安保部", "园区运营公司", "25", "安保值班、巡检人员"],
  ["研发中心", "蓝谷数字能源", "42", "研发办公区人员"],
  ["仓储部", "大连微冷农产品有限公司", "18", "仓储作业人员"],
  ["物流部", "恒曜供应链", "30", "物流配送人员"]
];

const accessDepartmentAuthTree = [
  {
    key: "park",
    label: "三里园区",
    type: "root",
    children: [
      {
        key: "wl-food",
        label: "大连微冷食品股份有限公司",
        type: "company",
        children: [
          { key: "security", label: "安保部", enterprise: "园区运营公司", peopleCount: 18, authorizedCount: 2, deviceCount: 28, updateTime: "2026-06-08 10:20" },
          { key: "operation", label: "运营管理部", enterprise: "园区运营公司", peopleCount: 12, authorizedCount: 1, deviceCount: 20, updateTime: "2026-06-07 09:18" }
        ]
      },
      {
        key: "blue-energy",
        label: "蓝谷数字能源",
        type: "company",
        children: [
          { key: "rd", label: "研发中心", enterprise: "蓝谷数字能源", peopleCount: 46, authorizedCount: 1, deviceCount: 12, updateTime: "2026-06-05 14:10" }
        ]
      },
      {
        key: "wl-agri",
        label: "大连微冷农产品有限公司",
        type: "company",
        children: [
          { key: "warehouse", label: "仓储部", enterprise: "大连微冷农产品有限公司", peopleCount: 18, authorizedCount: 1, deviceCount: 4, updateTime: "2026-05-18 11:06" },
          { key: "manufacture", label: "制造中心", enterprise: "大连微冷农产品有限公司", peopleCount: 38, authorizedCount: 1, deviceCount: 6, updateTime: "2026-06-04 16:22" }
        ]
      },
      {
        key: "outsourcing",
        label: "外包服务单位",
        type: "company",
        children: [
          { key: "patrol-team", label: "巡检组", enterprise: "恒泰安保服务", peopleCount: 16, authorizedCount: 1, deviceCount: 20, updateTime: "2026-06-02 08:44" },
          { key: "logistics", label: "物流部", enterprise: "恒曜供应链", peopleCount: 30, authorizedCount: 0, deviceCount: 0, updateTime: "--" }
        ]
      }
    ]
  }
];

const accessDepartmentAuthRows = {
  security: [
    ["全天通行组", "全天通行", "20", "18", "启用", "2026-06-08 10:20"],
    ["重点区域组", "周一至周日 06:00-23:00", "8", "18", "启用", "2026-06-08 10:20"]
  ],
  operation: [
    ["全天通行组", "全天通行", "20", "12", "启用", "2026-06-07 09:18"]
  ],
  rd: [
    ["主楼门禁组", "工作日通行", "12", "46", "启用", "2026-06-05 14:10"]
  ],
  warehouse: [
    ["仓库门禁组", "工作日通行", "4", "18", "停用", "2026-05-18 11:06"]
  ],
  manufacture: [
    ["车间门禁组", "工作日 07:00-19:00", "6", "38", "启用", "2026-06-04 16:22"]
  ],
  "patrol-team": [
    ["全天通行组", "全天通行", "20", "16", "启用", "2026-06-02 08:44"]
  ],
  logistics: []
};

const accessPersonTargets = [
  ["张振新", "P20260018", "园区运营公司", "安保部", "正式员工", "在职"],
  ["闫卓宇", "P20260031", "恒泰安保服务", "巡检组", "外包员工", "在职"],
  ["李晨", "P20260042", "蓝谷数字能源", "研发中心", "正式员工", "在职"],
  ["陈航", "P20260052", "园区运营公司", "安保部", "正式员工", "在职"],
  ["孙凯", "P20260053", "恒泰安保服务", "巡检组", "外包员工", "停用"]
];

const cardPeople = {
  P20260042: { name: "李晨", code: "P20260042", phone: "186 6178 2304", type: "正式员工", enterprise: "蓝谷数字能源", department: "研发中心" },
  P20260052: { name: "陈航", code: "P20260052", phone: "185 5323 6086", type: "正式员工", enterprise: "园区运营公司", department: "安保部" },
  P20260053: { name: "孙凯", code: "P20260053", phone: "185 5323 6087", type: "外包员工", enterprise: "恒泰安保服务", department: "巡检组" }
};

const cardRows = [
  { cardNo: "800001", personCode: "P20260018", personName: "张振新", phone: "185 5323 6080", type: "正式员工", enterprise: "园区运营公司", department: "安保部", openTime: "2026-05-12 09:10", status: "正常" },
  { cardNo: "800018", personCode: "P20260031", personName: "闫卓宇", phone: "185 5323 6081", type: "外包员工", enterprise: "恒泰安保服务", department: "巡检组", openTime: "2026-05-18 10:20", status: "挂失" },
  { cardNo: "800026", personCode: "-", personName: "-", phone: "-", type: "-", enterprise: "-", department: "-", openTime: "-", status: "正常" },
  { cardNo: "800031", personCode: "P20260042", personName: "李晨", phone: "186 6178 2304", type: "正式员工", enterprise: "蓝谷数字能源", department: "研发中心", openTime: "2026-06-04 14:22", status: "注销" },
  { cardNo: "800045", personCode: "P20260052", personName: "陈航", phone: "185 5323 6086", type: "正式员工", enterprise: "园区运营公司", department: "安保部", openTime: "2026-06-08 11:08", status: "作废" }
];

const accessPermissionGroups = [
  {
    name: "主楼门禁组",
    timePeriod: "工作日通行",
    deviceCount: 12,
    personCount: 86,
    status: "启用",
    remark: "A栋办公区工作日通行权限",
    people: [
      ["张振新", "P20260018", "园区运营公司", "安保部", "按人员授权", "2026-06-01 09:20"],
      ["李晨", "P20260042", "蓝谷数字能源", "研发中心", "按部门授权", "2026-06-03 14:12"],
      ["陈可", "P20260045", "蓝谷数字能源", "研发中心", "按部门授权", "2026-06-03 14:12"]
    ],
    devices: [
      ["A栋大厅门禁01", "ACC-2024-008", "A栋 / 1F / 大厅", "在线", "2026-05-22 09:30"],
      ["A栋侧门门禁03", "ACC-2024-011", "A栋 / 1F / 侧门", "在线", "2026-05-22 09:35"],
      ["A栋二层通道门禁02", "ACC-2024-016", "A栋 / 2F / 通道", "在线", "2026-05-28 10:12"]
    ]
  },
  {
    name: "全天通行组",
    timePeriod: "全天通行",
    deviceCount: 20,
    personCount: 156,
    status: "启用",
    remark: "安保、运维和值班人员全天通行",
    people: [
      ["闫卓宇", "P20260031", "恒泰安保服务", "巡检组", "按人员授权", "2026-06-01 10:08"],
      ["李浩", "P20260020", "园区运营公司", "安保部", "按人员授权", "2026-06-02 08:44"],
      ["王涛", "P20260033", "园区运营公司", "安保部", "按人员授权", "2026-06-02 08:44"]
    ],
    devices: [
      ["东门访客闸机02", "ACC-2024-021", "微冷园区 / 东门", "在线", "2026-05-21 16:20"],
      ["安防中心门禁01", "ACC-2024-031", "安防中心 / 值班室", "在线", "2026-05-21 16:26"],
      ["南门通行闸机01", "ACC-2024-033", "微冷园区 / 南门", "在线", "2026-05-21 16:30"]
    ]
  },
  {
    name: "重点区域组",
    timePeriod: "周一至周日 06:00-23:00",
    deviceCount: 8,
    personCount: 32,
    status: "启用",
    remark: "仓库、机房和安防中心等重点区域通行权限",
    people: [
      ["闫卓宇", "P20260031", "恒泰安保服务", "巡检组", "按人员授权", "2026-07-14 08:44"],
      ["张振新", "P20260018", "园区运营公司", "安保部", "按部门授权", "2026-06-08 10:20"]
    ],
    devices: [
      ["仓库北门门禁02", "ACC-2024-041", "A栋 / 1F / 仓储区", "在线", "2026-05-18 10:10"],
      ["安防中心门禁01", "ACC-2024-031", "安防中心 / 值班室", "在线", "2026-05-21 16:26"]
    ]
  },
  {
    name: "仓库门禁组",
    timePeriod: "工作日通行",
    deviceCount: 4,
    personCount: 23,
    status: "停用",
    remark: "仓储区域人员权限，停用后不再下发",
    people: [
      ["孙宁", "P20250106", "大连微冷农产品有限公司", "仓储部", "按部门授权", "2026-05-18 11:06"],
      ["周雨", "P20260058", "恒曜供应链", "物流部", "按人员授权", "2026-05-20 15:42"]
    ],
    devices: [
      ["仓库北门门禁02", "ACC-2024-041", "A栋 / 1F / 仓储区", "在线", "2026-05-18 10:10"],
      ["仓库卸货区门禁01", "ACC-2024-042", "A栋 / 1F / 卸货区", "离线", "2026-05-18 10:18"]
    ]
  }
];

const accessPersonPermissionRows = [
  {
    name: "张振新",
    code: "P20260018",
    enterprise: "园区运营公司",
    department: "安保部",
    employeeType: "正式员工",
    personStatus: "在职",
    permissionGroups: ["主楼门禁组", "全天通行组"],
    permissionSources: ["按人员授权"],
    validPeriod: "2026-07-14 至 2026-12-31",
    issueStatus: "下发成功",
    issueTime: "2026-07-14 09:26",
    details: [
      ["主楼门禁组", "按人员授权", "2026-07-14 至 2026-12-31", "工作日通行", "12 台", "下发成功", "2026-07-14 09:26"],
      ["全天通行组", "按人员授权", "2026-07-14 至 2026-12-31", "全天通行", "20 台", "下发成功", "2026-07-14 09:26"]
    ]
  },
  {
    name: "闫卓宇",
    code: "P20260031",
    enterprise: "恒泰安保服务",
    department: "巡检组",
    employeeType: "外包员工",
    personStatus: "在职",
    permissionGroups: ["全天通行组", "重点区域组"],
    permissionSources: ["按人员授权"],
    validPeriod: "长期",
    issueStatus: "下发失败",
    issueTime: "2026-07-14 08:44",
    details: [
      ["全天通行组", "按人员授权", "长期", "全天通行", "20 台", "下发成功", "2026-07-14 08:40"],
      ["重点区域组", "按人员授权", "长期", "周一至周日 06:00-23:00", "8 台", "下发失败", "2026-07-14 08:44"]
    ]
  },
  {
    name: "李晨",
    code: "P20260042",
    enterprise: "蓝谷数字能源",
    department: "研发中心",
    employeeType: "正式员工",
    personStatus: "在职",
    permissionGroups: ["主楼门禁组"],
    permissionSources: ["按部门授权"],
    validPeriod: "长期",
    issueStatus: "下发成功",
    issueTime: "2026-07-13 16:18",
    details: [
      ["主楼门禁组", "按部门授权", "长期", "工作日通行", "12 台", "下发成功", "2026-07-13 16:18"]
    ]
  },
  {
    name: "孙凯",
    code: "P20260053",
    enterprise: "恒泰安保服务",
    department: "巡检组",
    employeeType: "外包员工",
    personStatus: "在职",
    permissionGroups: ["全天通行组"],
    permissionSources: ["按人员授权"],
    validPeriod: "2026-07-01 至 2026-07-31",
    issueStatus: "正在下发",
    issueTime: "--",
    details: [
      ["全天通行组", "按人员授权", "2026-07-01 至 2026-07-31", "全天通行", "20 台", "正在下发", "--"]
    ]
  }
];

const accessControlDevices = [
  ["A栋大厅门禁01", "ACC-2024-008", "在线", "A栋 / 1F / 大厅"],
  ["A栋侧门门禁03", "ACC-2024-011", "在线", "A栋 / 1F / 侧门"],
  ["A栋二层通道门禁02", "ACC-2024-016", "在线", "A栋 / 2F / 通道"],
  ["东门访客闸机02", "ACC-2024-021", "在线", "微冷园区 / 东门"],
  ["安防中心门禁01", "ACC-2024-031", "在线", "安防中心 / 值班室"],
  ["南门通行闸机01", "ACC-2024-033", "在线", "微冷园区 / 南门"],
  ["仓库北门门禁02", "ACC-2024-041", "在线", "A栋 / 1F / 仓储区"],
  ["仓库卸货区门禁01", "ACC-2024-042", "离线", "A栋 / 1F / 卸货区"],
  ["东门人脸识别机01", "ACC-2024-050", "在线", "微冷园区 / 东门"],
  ["研发中心门禁01", "ACC-2024-057", "在线", "B栋 / 3F / 研发中心"],
  ["冷库入口门禁01", "ACC-2024-063", "离线", "C栋 / 1F / 冷库入口"],
  ["后勤通道门禁02", "ACC-2024-071", "故障", "后勤楼 / 1F / 通道"]
];

const companyLinkedRooms = [
  ["18","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 18","2026-03-03 08:44:39"],
  ["16","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 16","2026-03-03 08:44:39"],
  ["17","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 17","2026-03-03 08:44:39"],
  ["13","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 13","2026-03-03 08:44:39"],
  ["14","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 14","2026-03-03 08:44:39"],
  ["12","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 12","2026-03-03 08:44:39"]
];

const companySelectableRooms = [
  ["11","三里园区","德济楼","1F","222.00","可绑定"],
  ["1","三里园区","1#","1F","222.00","可绑定"],
  ["221","三里园区","1#","1F","10.00","可绑定"],
  ["12","三里园区","德济楼","1F","10.00","可绑定"],
  ["13","三里园区","德济楼","1F","10.00","可绑定"],
  ["14","三里园区","德济楼","1F","10.00","可绑定"],
  ["15","三里园区","德济楼","1F","10.00","可绑定"],
  ["16","三里园区","德济楼","1F","10.00","可绑定"],
  ["17","三里园区","德济楼","1F","10.00","可绑定"],
  ["18","三里园区","德济楼","1F","10.00","可绑定"]
];

const blacklistPeople = [
  { name:"高启", code:"P20250061", gender:"男", phone:"185 5323 6108", enterprise:"大连瑞兴天宝水产品有限公司", department:"物流部", face:"高", vehicles:["鲁B·C1108","鲁B·K3208"], room:"A栋 / 1F / 安保登记点" },
  { name:"林峰", code:"P20240028", gender:"男", phone:"186 0411 3306", enterprise:"联合林洋食品（大连）有限公司", department:"施工组", face:"林", vehicles:["鲁B·Q8821"], room:"B栋 / 2F / 设备间" },
  { name:"王某", code:"P20230013", gender:"女", phone:"138 0013 9013", enterprise:"大连微冷农产品有限公司", department:"原生产一部", face:"王", vehicles:["鲁B·P320F"], room:"宿舍1号楼 / 218-1号床" },
  { name:"赵凯", code:"P20230026", gender:"男", phone:"185 5323 6026", enterprise:"海洋食品设计与创制高新技术研究院", department:"巡检组", face:"赵", vehicles:[], room:"未关联" }
];

const personnelTracks = {
  "P20260042": {
    code: "P20260042",
    name: "李晨",
    status: "在职",
    type: "正式员工",
    enterprise: "蓝谷数字能源",
    department: "研发中心",
    phone: "186 6178 2304",
    lastLocation: "A栋 / 1F / 大厅",
    source: "门禁",
    device: "A栋大厅门禁01",
    lastTime: "2026-06-10 10:38:12",
    events: [
      ["2026-06-10 10:38:12", "A栋 / 1F / 大厅", "A栋大厅门禁01", "门禁", "李", "98.6%"],
      ["2026-06-10 10:12:06", "微冷园区 / 东门", "东门人脸识别机02", "摄像头", "李", "94.2%"],
      ["2026-06-10 09:46:31", "停车场 / B1 / B区", "停车场摄像机03", "摄像头", "李", "91.8%"],
      ["2026-06-10 08:52:18", "A栋 / 1F / 侧门", "A栋侧门门禁03", "门禁", "-", "-"]
    ]
  },
  "P20260031": {
    code: "P20260031",
    name: "闫卓宇",
    status: "在职",
    type: "外包员工",
    enterprise: "恒泰安保服务",
    department: "巡检组",
    phone: "185 5323 6081",
    lastLocation: "A栋 / 1F / 仓储区",
    source: "摄像头",
    device: "仓库北门01",
    lastTime: "2026-06-10 10:20:06",
    events: [
      ["2026-06-10 10:20:06", "A栋 / 1F / 仓储区", "仓库北门01", "摄像头", "闫", "92.4%"],
      ["2026-06-10 09:18:44", "微冷园区 / 北侧围墙", "北侧围墙03", "摄像头", "闫", "90.7%"],
      ["2026-06-10 08:42:06", "A栋 / 1F / 仓储区", "仓库北门门禁02", "门禁", "-", "-"]
    ]
  },
  "P20260018": {
    code: "P20260018",
    name: "张振新",
    status: "在职",
    type: "正式员工",
    enterprise: "园区运营公司",
    department: "安保部",
    phone: "185 5323 6080",
    lastLocation: "微冷园区 / 东门",
    source: "门禁",
    device: "东门访客闸机02",
    lastTime: "2026-06-10 09:16:45",
    events: [
      ["2026-06-10 09:16:45", "微冷园区 / 东门", "东门访客闸机02", "门禁", "-", "-"],
      ["2026-06-10 08:05:12", "安防中心 / 值班室", "安防中心摄像头01", "摄像头", "张", "96.1%"]
    ]
  }
};

function personBlacklistByCode(code) {
  return blacklistPeople.find(item => item.code === code);
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const initialModule = params.get("module") || "company";
  const initialTab = params.get("tab");
  const initialScheduleMonth = params.get("month");
  if (initialScheduleMonth && /^\d{4}-\d{2}$/.test(initialScheduleMonth)) {
    const [year, month] = initialScheduleMonth.split("-").map(Number);
    scheduleCalendarState = { year, month };
  }
  if (initialTab) currentTab[initialModule] = initialTab;
  renderMenu();
  renderPage(modules.some(item => item.id === initialModule) ? initialModule : "company");
  bindGlobal();
}

function renderMenu() {
  document.getElementById("mainMenu").innerHTML = modules.map(m => {
    const open = m.id === currentModule;
    const rawActiveTab = currentTab[m.id] || m.tabs[0];
    const activeTab = m.id === "inspection" && inspectionPointManageTabs.includes(rawActiveTab) ? "巡检点" : rawActiveTab;
    const showSubmenu = m.tabs.length > 1 || m.id === "device";
    return `<div class="menu-group">
      <button class="menu-item menu-parent ${open ? "open" : ""}" data-module="${m.id}">
        <span class="menu-icon">${m.icon}</span><span>${m.name}</span>${m.badge ? `<span class="menu-badge">${m.badge}</span>` : ""}${showSubmenu ? `<span class="menu-arrow">›</span>` : ""}
      </button>
      ${open && showSubmenu ? `<div class="submenu">${m.tabs.map(t=>`<button class="submenu-item ${t===activeTab?"active":""}" data-tab="${t}"><span class="submenu-dot"></span>${t}</button>`).join("")}</div>` : ""}
    </div>`;
  }).join("");
}

function renderPage(id) {
  currentModule = id;
  const mod = modules.find(x => x.id === id);
  const requestedTab = currentTab[id];
  const validTabs = id === "inspection" ? [...mod.tabs, ...inspectionPointManageTabs] : mod.tabs;
  const tab = validTabs.includes(requestedTab) ? requestedTab : mod.tabs[0];
  currentTab[id] = tab;
  const showTabBreadcrumb = tab !== mod.name || id === "device";
  document.getElementById("breadcrumb").textContent = `综合安防系统 / ${mod.name}${showTabBreadcrumb ? ` / ${tab}` : ""}`;
  renderMenu();
  showLoading();
  let content;
  if (id === "video" && (tab === "实时视频" || tab === "录像回放")) content = renderVideo(mod, tab);
  else if (id === "vehicle" && tab === "岗亭值守（暂放）") content = renderGatehouse(mod);
  else if (id === "patrol" && tab === "视频巡检") content = renderPatrolExecution(mod);
  else if (id === "schedule" && tab === "排班日历") content = renderCalendar(mod);
  else if (["inspection","vehicle"].includes(id) && tab.includes("统计")) content = renderAnalysis(mod);
  else if (id === "visitor" && tab === "基础权限配置") content = renderVisitorConfig(mod);
  else if (id === "perimeter" && tab === "周界设置") content = renderPerimeterSettingsPage(mod, tab);
  else if (id === "perimeter" && tab === "周界告警") content = renderPerimeterAlarmPage(mod, tab);
  else if (id === "alarm" && tab === "安防工单") content = renderSecurityWorkorderPage(mod, tab);
  else content = renderListPage(mod, tab);
  document.getElementById("pageContainer").innerHTML = content;
}

function pageActionButtons(mod, primary) {
  const exportAllowed = ["company","person","access","device"].includes(mod.id);
  const tab = currentTab[mod.id] || modules.find(x => x.id === mod.id)?.tabs[0];
  if (mod.id === "visitor") {
    if (tab === "基础权限配置") return `<div class="visitor-save-actions"><span>上次修改时间： 2023-12-7 14:20:27</span><button class="btn primary action-visitor-config-save" type="button">保存配置</button></div>`;
    if (tab === "访客管理") return `<button class="btn action-visitor-mobile">移动端模拟</button><button class="btn action-visitor-export">导出</button>`;
    return "";
  }
  if (mod.id === "access" && tab === "通行时间段") {
    return `<button class="btn primary action-add">新增时间段</button>`;
  }
  if (mod.id === "access" && tab === "门禁权限组") {
    return `<button class="btn primary action-add">新增权限组</button>`;
  }
  if (mod.id === "access" && tab === "人员权限") {
    return `<button class="btn">导出</button><button class="btn primary action-access-person-authorize">按人员授权</button>`;
  }
  if (mod.id === "person" && tab === "人员档案") {
    return `<button class="btn action-mobile-face">移动端采集人脸</button><button class="btn primary action-add">新增人员</button><button class="btn action-import">批量导入</button><button class="btn">导出</button>`;
  }
  if (mod.id === "person" && tab === "卡片管理") {
    return "";
  }
  if (mod.id === "person" && tab === "人员轨迹") {
    return `<button class="btn primary action-track-query">查询轨迹</button>`;
  }
  if (mod.id === "vehicle" && tab === "通行记录") {
    return `<button class="card-rules-trigger action-vehicle-record-note" type="button">点我点我</button><button class="btn">导出</button>`;
  }
  if (mod.id === "vehicle" && tab === "特殊车辆通行记录") {
    return `<button class="btn action-vehicle-mobile-release">移动端模拟</button><button class="btn">导出</button>`;
  }
  if (mod.id === "inspection" && tab === "巡检点") {
    return `<button class="btn action-import">Excel批量导入</button><button class="btn primary action-add">新增巡检点</button>`;
  }
  if (mod.id === "device" && tab === "设备管理") {
    return `<button class="btn primary action-add">新增</button><button class="btn">导出</button>`;
  }
  const visiblePrimary = primary && !/^导出/.test(primary) ? primary : "";
  const isFormAction = visiblePrimary && !/^(进入|保存|发布|处置待办|批量重试|查询)/.test(visiblePrimary);
  return `${exportAllowed?`<button class="btn">导出</button>`:""}${visiblePrimary ? `<button class="btn primary ${isFormAction?"action-add":"action-query"}">${visiblePrimary}</button>` : ""}`;
}

function pageHead(mod, primary) {
  const actions = pageActionButtons(mod, primary);
  return actions ? `<div class="page-head page-head-actions-only"><div class="head-actions">${actions}</div></div>` : "";
}

function tabs(mod, active) {
  if (mod.id === "inspection" && inspectionPointManageTabs.includes(active)) {
    return `<div class="tabs inspection-point-tabs">${inspectionPointManageTabs.map(t=>`<button class="tab ${t===active?"active":""}" data-tab="${t}">${t}</button>`).join("")}</div>`;
  }
  return "";
}

function tag(v) { return stateClass[v] ? `<span class="tag ${stateClass[v]}">${["在线","离线","停用","故障"].includes(v)?'<i class="dot"></i>':""}${v}</span>` : v; }

function securityAlarmLevelTag(level) {
  const classMap = { "紧急": "critical", "重要": "important", "一般": "normal" };
  return `<span class="alarm-level-tag ${classMap[level] || "normal"}">${level || "--"}</span>`;
}

function securityWorkorderStatusTag(status) {
  const classMap = { "待派单": "pending", "待接单": "pending", "处理中": "processing", "已完成": "done" };
  return `<span class="tag security-workorder-status ${classMap[status] || "pending"}">${status || "--"}</span>`;
}

function renderFilterControl(label, index) {
  if (label === "告警类型") return `<select class="control"><option>全部</option><option>热成像过温告警</option><option>人员聚集告警</option><option>消防通道占用告警</option><option>离岗告警</option><option>睡岗告警</option><option>人员黑名单告警</option></select>`;
  if (label === "告警等级") return `<select class="control"><option>全部</option><option>紧急</option><option>重要</option><option>一般</option></select>`;
  if (label === "告警状态") return `<select class="control"><option>全部</option><option>待确认</option><option>已确认</option><option>已生成工单</option><option>误报关闭</option></select>`;
  if (label === "告警时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "调整月份") return `<select class="control"><option selected>2026年7月</option><option>2026年6月</option><option>2026年8月</option></select>`;
  if (label === "调整类型") return `<select class="control"><option>全部</option><option>请假顶班</option><option>人员调班</option><option>队长请假</option></select>`;
  if (label === "人员") return `<select class="control"><option>全部</option><option>张振新</option><option>李浩</option><option>闫卓宇</option><option>王涛</option><option>陈航</option><option>孙凯</option><option>钱队</option></select>`;
  if (label === "所属园区") return `<select class="control"><option>全部</option><option>微冷园区</option><option>三里园区</option><option>华家园区</option></select>`;
  if (label === "所属园区 / 区域") return `<select class="control"><option>全部</option><option>微冷园区</option><option>A栋 / 1F</option><option>停车场 / B1</option></select>`;
  if (label === "关键字") return `<input class="control" placeholder="请输入巡检点名称 / 标签 / 区域">`;
  if (label === "区域名称") return `<input class="control" placeholder="请输入区域名称">`;
  if (label === "所属区域") return `<select class="control"><option>全部</option><option>海尔西园区</option><option>A栋 / 1F / 东区</option><option>A栋 / 2F / 西区</option><option>外围 / 北区</option></select>`;
  if (label === "标签") return `<select class="control"><option>全部</option><option>消防巡检</option><option>保洁巡检</option><option>安全巡检</option><option>设施巡检</option></select>`;
  if (label === "标签颜色") return `<select class="control"><option>全部</option><option>橙色</option><option>蓝色</option><option>绿色</option><option>红色</option></select>`;
  if (label === "标签状态" || label === "区域状态") return `<select class="control"><option>全部</option><option>启用</option><option>停用</option></select>`;
  if (label === "上级区域") return `<select class="control"><option>全部</option><option>园区根节点</option><option>A栋 / 1F</option><option>A栋 / 2F</option><option>园区外围</option></select>`;
  if (label === "路线名称") return `<input class="control" placeholder="请输入路线名称">`;
  if (label === "巡检路线") return `<input class="control" placeholder="请输入巡检路线">`;
  if (label === "巡检计划/路线") return `<input class="control" placeholder="请输入计划名称 / 巡检路线">`;
  if (label === "巡检计划") return `<input class="control" placeholder="请输入巡检计划名称">`;
  if (label === "巡检频率") return `<select class="control"><option>全部</option><option>每天</option><option>每周</option><option>每月</option></select>`;
  if (label === "是否开启") return `<select class="control"><option>全部</option><option>开启</option><option>关闭</option></select>`;
  if (label === "巡检执行人") return `<select class="control"><option>全部</option><option>张振新</option><option>李浩</option><option>王涛</option><option>闫卓宇</option><option>孙宁</option></select>`;
  if (label === "计划状态") return `<select class="control"><option>全部</option><option>启用</option><option>停用</option></select>`;
  if (label === "任务名称") return `<input class="control" placeholder="请输入任务名称">`;
  if (label === "任务状态") return `<select class="control"><option>请选择任务状态</option><option>未开始</option><option>进行中</option><option>已完成</option><option>超时完成</option><option>漏检</option></select>`;
  if (["预计开始时间","预计结束时间","实际开始时间","实际结束时间"].includes(label)) return `<div class="date-range-control"><input class="control" placeholder="开始日期"><span>-</span><input class="control" placeholder="结束日期"></div>`;
  if (label === "状态 / 类型") return `<select class="control"><option>全部</option><option>正式员工</option><option>外包员工</option><option>实习生</option></select>`;
  if (label === "时间范围" || label === "最后出现时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "名称 / 编号 / 关键词") return `<input class="control" placeholder="请输入姓名 / 工号 / 关键词">`;
  if (label === "姓名/人员编号/联系方式") return `<input class="control" placeholder="请输入姓名 / 人员编号 / 联系方式">`;
  if (label === "车牌号/姓名/编号/联系方式") return `<input class="control" placeholder="请输入车牌号 / 姓名 / 编号 / 联系方式">`;
  if (label === "姓名/人员编号") return `<input class="control" placeholder="请输入姓名 / 人员编号">`;
  if (label === "人员姓名") return `<input class="control" placeholder="请输入人员姓名">`;
  if (label === "人员编号") return `<input class="control" placeholder="请输入人员编号">`;
  if (label === "所属部门") return `<select class="control"><option>全部</option><option>安保部</option><option>生产部</option><option>研发中心</option><option>物流部</option></select>`;
  if (label === "人员类型") return `<select class="control"><option>全部</option><option>正式员工</option><option>外包员工</option><option>实习生</option><option>访客</option></select>`;
  if (label === "通行时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "通行方向") return `<select class="control"><option>全部</option><option>进入</option><option>离开</option></select>`;
  if (label === "设备名称") return `<input class="control" placeholder="请输入设备名称">`;
  if (label === "设备名称/编码") return `<input class="control" placeholder="请输入设备名称 / 设备编码">`;
  if (label === "设备名称/设备编码") return `<input class="control" placeholder="请输入设备名称 / 设备编码">`;
  if (currentModule === "video" && label === "设备类型") return `<select class="control" disabled><option selected>视频监控设备</option></select>`;
  if (currentModule === "video" && label === "设备子类") return `<select class="control"><option>全部</option><option>枪型摄像头</option><option>球形摄像头</option><option>半球摄像头</option></select>`;
  if (currentModule === "video" && label === "在线状态") return `<select class="control"><option>全部</option><option>在线</option><option>离线</option></select>`;
  if (label === "设备分类") return `<select class="control" disabled><option selected>视频监控设备</option></select>`;
  if (label === "设备类型") return `<select class="control"><option>全部</option><option>监控设备</option><option>门禁设备</option><option>道闸设备</option></select>`;
  if (label === "设备子类") return `<select class="control"><option>全部</option><option>枪型摄像头</option><option>球形摄像头</option><option>半球摄像头</option><option>人脸门禁</option><option>刷卡门禁</option><option>直杆道闸</option></select>`;
  if (label === "绑定位置") return `<button type="button" class="control cascader-control">请选择园区 / 楼栋 / 楼层 / 区域<span>⌄</span></button>`;
  if (label === "在线状态") return `<select class="control"><option>全部</option><option>在线</option><option>离线</option><option>故障</option></select>`;
  if (label === "上次在线时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "解锁方式") return `<select class="control"><option>全部</option><option>人脸</option><option>刷卡</option></select>`;
  if (label === "离职时间") return `<input class="control" placeholder="请选择离职时间">`;
  if (label === "性别") return `<select class="control"><option>全部</option><option>男</option><option>女</option><option>未知</option></select>`;
  if (label === "员工类型") return `<select class="control"><option>全部</option><option>正式员工</option><option>外包员工</option><option>实习生</option></select>`;
  if (label === "人员状态") return `<select class="control"><option>全部</option><option>在职</option><option>停用</option></select>`;
  if (label === "卡片状态") return `<select class="control"><option>全部</option><option>正常</option><option>挂失</option><option>注销</option><option>作废</option></select>`;
  if (label === "物理卡号") return `<input class="control" placeholder="请输入物理卡号">`;
  if (label === "操作类型") return `<select class="control"><option>全部</option><option>开卡</option><option>挂失</option><option>解挂</option><option>注销</option><option>作废</option></select>`;
  if (label === "操作时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "部门") return `<button type="button" class="control cascader-control">请选择部门<span>⌄</span></button>`;
  if (label === "所属企业/部门") return `<button type="button" class="control cascader-control">请选择所属企业 / 部门<span>⌄</span></button>`;
  if (label === "关联车辆") return `<input class="control" placeholder="请输入车牌号">`;
  if (label === "黑名单状态") return `<select class="control"><option>全部</option><option>未生效</option><option>生效中</option><option>已失效</option></select>`;
  if (label === "生效时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "企业名称") return `<input class="control" placeholder="请输入企业名称">`;
  if (label === "房间名称") return `<input class="control" placeholder="请输入房间名称">`;
  if (label === "名称") return `<input class="control" placeholder="请输入名称">`;
  if (label === "预约单号") return `<input class="control" placeholder="请输入预约单号">`;
  if (label === "权限组名称") return `<input class="control" placeholder="请输入权限组名称">`;
  if (label === "权限来源") return `<select class="control"><option>全部</option><option>按部门授权</option><option>按人员授权</option></select>`;
  if (label === "下发状态") return `<select class="control"><option>全部</option><option>待下发</option><option>正在下发</option><option>下发成功</option><option>下发失败</option></select>`;
  if (label === "有效期") return `<div class="date-range-control"><input class="control" placeholder="开始日期"><span>至</span><input class="control" placeholder="结束日期"></div>`;
  if (label === "车场名称") return `<input class="control" placeholder="请输入车场名称">`;
  if (label === "车场状态") return `<select class="control"><option>全部</option><option>启用</option><option>禁用</option></select>`;
  if (label === "车牌号/姓名/联系方式") return `<input class="control" placeholder="请输入车牌号 / 姓名 / 联系方式">`;
  if (label === "车牌号/所属单位/负责人/联系方式") return `<input class="control" placeholder="请输入车牌号 / 所属单位 / 负责人 / 联系方式">`;
  if (label === "绑定状态") return `<select class="control"><option>全部</option><option>已绑定</option><option>已解绑</option></select>`;
  if (label === "授权状态") return `<select class="control"><option>全部</option><option>启用</option><option>停用</option><option>未配置</option></select>`;
  if (label === "授权有效期") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "车辆类型") return `<select class="control"><option>全部</option><option>轿车</option><option>货车</option><option>客车</option><option>摩托车</option><option>其他</option></select>`;
  if (label === "车辆类别") return `<select class="control"><option>全部</option><option>货运车辆</option><option>冷链车辆</option><option>快递车辆</option><option>内部转运车</option><option>其他</option></select>`;
  if (label === "所属单位") return `<input class="control" placeholder="请输入所属单位">`;
  if (label === "通行状态") return `<select class="control"><option>全部</option><option>通过</option><option>拦截</option></select>`;
  if (label === "出入口") return `<select class="control"><option>全部</option><option>南入口</option><option>南出口</option><option>货运入口</option><option>货运出口</option></select>`;
  if (label === "负责人/联系方式") return `<input class="control" placeholder="请输入负责人 / 联系方式">`;
  if (label === "记录来源") return `<select class="control"><option>全部</option><option>系统自动</option><option>岗亭值守现场放行</option></select>`;
  if (label === "过车方向") return `<select class="control"><option>全部</option><option>入场</option><option>出场</option></select>`;
  if (label === "放行方式") return `<select class="control"><option>全部</option><option>自动放行</option><option>人工抬杆</option><option>拦截</option></select>`;
  if (label === "禁行原因") return `<input class="control" placeholder="请输入禁行原因">`;
  if (label === "放行原因") return `<input class="control" placeholder="请输入放行原因">`;
  if (label === "访问企业") return `<select class="control"><option>全部</option><option>蓝谷数字能源有限公司</option><option>澄海智造科技有限公司</option><option>园区运营公司</option><option>大连微冷农产品有限公司</option><option>联合林洋食品（大连）有限公司</option></select>`;
  if (label === "访客姓名") return `<input class="control" placeholder="请输入访客姓名">`;
  if (label === "访客姓名/手机号/车牌号") return `<input class="control" placeholder="请输入访客姓名 / 手机号 / 车牌号">`;
  if (label === "访客手机号") return `<input class="control" placeholder="请输入访客手机号">`;
  if (label === "被访人姓名" || label === "被访人") return `<input class="control" placeholder="请输入被访人姓名">`;
  if (label === "被访人联系方式") return `<input class="control" placeholder="请输入被访人联系方式">`;
  if (label === "被访人姓名/联系方式") return `<input class="control" placeholder="请输入被访人姓名 / 联系方式">`;
  if (label === "访问日期") return `<div class="date-range-control"><input class="control" placeholder="开始日期"><span>至</span><input class="control" placeholder="结束日期"></div>`;
  if (label === "拜访时间") return `<div class="date-range-control"><input class="control" placeholder="开始日期"><span>至</span><input class="control" placeholder="结束日期"></div>`;
  if (label === "来访事由") return `<select class="control"><option>全部</option><option>商务拜访</option><option>技术交流</option><option>面试</option><option>参观考察</option><option>设备安装/维修</option><option>其他</option></select>`;
  if (label === "是否驾车") return `<select class="control"><option>全部</option><option>是</option><option>否</option></select>`;
  if (label === "提交时间") return `<div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div>`;
  if (label === "预约状态") return `<select class="control"><option>全部</option><option>待被访人审批</option><option>待安防审批</option><option>已通过</option><option>已拒绝</option><option>已失效</option></select>`;
  if (label === "实际到访状态" || label === "到访状态") return `<select class="control"><option>全部</option><option>未到访</option><option>在园</option><option>已离园</option><option>未离园异常</option><option>无法判断</option></select>`;
  if (label === "权限同步状态") return `<select class="control"><option>全部</option><option>未生成</option><option>下发中</option><option>已生效</option><option>部分失败</option><option>下发失败</option><option>已终止</option><option>已失效</option></select>`;
  if (label === "车牌号") return `<input class="control" placeholder="请输入车牌号">`;
  if (label === "通行位置") return `<input class="control" placeholder="请输入通行位置">`;
  if (label === "进出方向") return `<select class="control"><option>全部</option><option>入园</option><option>出园</option><option>内部通行</option></select>`;
  if (label === "通行方式") return `<select class="control"><option>全部</option><option>人脸</option><option>二维码</option><option>车牌</option></select>`;
  if (label === "通行结果") return `<select class="control"><option>全部</option><option>成功</option><option>失败</option></select>`;
  if (label === "审批结果") return `<select class="control"><option>全部</option><option>待审批</option><option>已通过</option><option>已拒绝</option></select>`;
  if (label === "重复周期") return `<select class="control"><option>全部</option><option>执行一次</option><option>每天</option><option>法定工作日</option><option>法定节假日</option><option>自定义</option></select>`;
  if (label === "营业状态") return `<select class="control"><option>全部</option><option>营业中</option><option>暂停营业</option><option>已注销</option></select>`;
  if (label === "入驻状态") return `<select class="control"><option>全部</option><option>已入驻</option><option>已退租</option></select>`;
  const isKeyword = /名称|编号|编码|代码|手机号|联系方式|关键词|IP 地址/.test(label);
  if (isKeyword || index >= 3) return `<input class="control" placeholder="请输入${label}">`;
  return `<select class="control"><option>全部</option><option>启用 / 正常</option><option>停用 / 异常</option></select>`;
}

function renderAlarmInspectionWorkorderFilters() {
  return `<div class="field"><label>工单编号</label><input class="control" placeholder="请输入工单编号"></div>
      <div class="field"><label>巡检点</label><input class="control" placeholder="请输入巡检点"></div>
      <div class="field"><label>提报时间</label><div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div></div>
      <div class="field"><label>工单状态</label><select class="control"><option>全部</option><option>待派单</option><option>待接单</option><option>处理中</option><option>已完成</option></select></div>
      <div class="field"><label>是否超时</label><select class="control"><option>全部</option><option>是</option><option>否</option></select></div>`;
}

function cardOperationButtons(row) {
  if (row.status === "正常" && row.personCode === "-") {
    return `<button class="btn text action-card-issue" data-card-no="${row.cardNo}">发卡</button><button class="btn text danger action-card-confirm" data-card-act="删除" data-card-no="${row.cardNo}">删除</button>`;
  }
  if (row.status === "正常") {
    return `<button class="btn text action-card-confirm" data-card-act="挂失" data-card-no="${row.cardNo}">挂失</button><button class="btn text action-card-confirm" data-card-act="注销" data-card-no="${row.cardNo}">注销</button><button class="btn text danger action-card-confirm" data-card-act="作废" data-card-no="${row.cardNo}">作废</button>`;
  }
  if (row.status === "挂失") {
    return `<button class="btn text action-card-confirm" data-card-act="解挂" data-card-no="${row.cardNo}">解挂</button><button class="btn text action-card-confirm" data-card-act="注销" data-card-no="${row.cardNo}">注销</button><button class="btn text danger action-card-confirm" data-card-act="作废" data-card-no="${row.cardNo}">作废</button>`;
  }
  return `<span class="muted">终态不可操作</span>`;
}

function renderEnterpriseDepartmentCell(row) {
  if (!row.enterprise || row.enterprise === "-") return `<span class="muted">-</span>`;
  return `<div class="two-line-cell"><b>${row.enterprise}</b><span>${row.department || "-"}</span></div>`;
}

function cardStatusTag(status) {
  const statusClassMap = { 正常: "restore", 挂失: "loss", 注销: "cancel", 作废: "void" };
  return `<span class="tag card-operation-tag ${statusClassMap[status] || "default"}"><i></i>${status}</span>`;
}

function renderCardManagementPage(mod, tab) {
  const filters = ["姓名/人员编号/联系方式","员工类型","所属企业/部门","卡片状态","物理卡号"];
  const selectedCount = selectedCardIds.size;
  return `${tabs(mod,tab)}
    <div class="card filter-card card-management-filter"><div class="filters">
      ${filters.map((f,i)=>`<div class="field"><label>${f}</label>${renderFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span><span class="tag">已选择 ${selectedCount} 项</span><button class="card-rules-trigger action-card-rules" type="button">点我点我</button></div>
        <div class="table-toolbar-right">
          <button class="btn primary action-card-issue">发卡</button>
          <button class="btn action-card-batch" data-card-act="挂失">挂失</button>
          <button class="btn action-card-batch" data-card-act="解挂">解挂</button>
          <button class="btn action-card-batch" data-card-act="注销">注销</button>
          <button class="btn danger action-card-batch" data-card-act="作废">作废</button>
          <button class="btn action-card-import">批量导入</button>
          <button class="btn action-card-export">批量导出</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="card-management-table">
          <thead><tr><th><input type="checkbox" aria-label="全选卡片"></th><th>物理卡号</th><th>姓名</th><th>人员编号</th><th>联系方式</th><th>员工类型</th><th>所属企业/部门</th><th>卡片状态</th><th>开卡时间</th><th>操作</th></tr></thead>
          <tbody>${cardRows.map(row=>`<tr>
            <td><input type="checkbox" data-card-check="${row.cardNo}" ${selectedCardIds.has(row.cardNo)?"checked":""}></td>
            <td>${row.cardNo}</td><td>${row.personName}</td><td>${row.personCode}</td><td>${row.phone}</td><td>${row.type}</td><td>${renderEnterpriseDepartmentCell(row)}</td><td>${cardStatusTag(row.status)}</td><td>${row.openTime}</td><td class="actions">${cardOperationButtons(row)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(62)}
    </div>`;
}

function flattenAccessDepartmentTree(nodes, level = 1, result = []) {
  nodes.forEach(node => {
    result.push({ ...node, level });
    if (node.children) flattenAccessDepartmentTree(node.children, level + 1, result);
  });
  return result;
}

function selectedAccessDepartment() {
  return flattenAccessDepartmentTree(accessDepartmentAuthTree).find(item => item.key === accessDepartmentAuthState.selectedDepartmentKey && !item.children);
}

function renderAccessDepartmentTree(nodes = accessDepartmentAuthTree, level = 1) {
  return nodes.map(node => {
    if (node.children) {
      return `<div class="access-dept-tree-group">
        <div class="access-dept-tree-parent level-${level}"><span>${node.label}</span></div>
        ${renderAccessDepartmentTree(node.children, level + 1)}
      </div>`;
    }
    const active = node.key === accessDepartmentAuthState.selectedDepartmentKey;
    return `<button type="button" class="access-dept-tree-node level-${level} ${active ? "active" : ""}" data-access-dept-key="${node.key}">
      <span>${node.label}</span>
      <em>${node.peopleCount}人</em>
    </button>`;
  }).join("");
}

function accessDepartmentAuthFilteredRows() {
  const selected = selectedAccessDepartment();
  if (!selected) return [];
  const keyword = accessDepartmentAuthState.groupKeyword.trim().toLowerCase();
  const status = accessDepartmentAuthState.groupStatus;
  return (accessDepartmentAuthRows[selected.key] || []).filter(row => {
    const matchesKeyword = !keyword || `${row[0]} ${row[1]}`.toLowerCase().includes(keyword);
    const matchesStatus = !status || row[4] === status;
    return matchesKeyword && matchesStatus;
  });
}

function renderAccessDepartmentAuthTable(rows, selected) {
  if (!selected) {
    return `<div class="access-dept-empty">
      <b>请先在左侧选择部门</b>
      <span>选择部门后，右侧展示该部门已配置的权限组，并允许新增权限组。</span>
    </div>`;
  }
  if (!rows.length) {
    return `<div class="access-dept-empty">
      <b>暂无权限组</b>
      <span>当前部门未配置权限组，点击“新增权限组”后为该部门在职人员授权。</span>
    </div>`;
  }
  return `<div class="table-wrap access-dept-auth-table-wrap">
    <table class="access-dept-auth-table">
      <thead><tr><th>序号</th><th>权限组名称</th><th>通行时间段</th><th>覆盖设备数</th><th>本部门授权人数</th><th>状态</th><th>最近更新时间</th><th>操作</th></tr></thead>
      <tbody>${rows.map((row, index) => `<tr>
        <td>${index + 1}</td>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]} 台</td>
        <td>${row[3]} 人</td>
        <td>${tag(row[4])}</td>
        <td>${row[5]}</td>
        <td class="actions"><button class="btn text danger action-confirm" data-act="移除部门权限组">移除</button></td>
      </tr>`).join("")}</tbody>
    </table>
  </div>`;
}

function renderAccessDepartmentAuthPage(mod, tab) {
  const selected = selectedAccessDepartment();
  const rows = accessDepartmentAuthFilteredRows();
  return `${tabs(mod, tab)}
    <div class="access-dept-auth-layout">
      <aside class="card access-dept-tree-card">
        <div class="access-dept-tree-head">
          <div><b>部门树</b><span>按部门维护门禁权限组</span></div>
        </div>
        <div class="access-dept-tree-search"><input class="control" placeholder="搜索部门名称"></div>
        <div class="access-dept-tree">${renderAccessDepartmentTree()}</div>
      </aside>
      <section class="access-dept-auth-main">
        <div class="card access-dept-selected-card">
          ${selected ? `<div class="access-dept-selected-title"><b>${selected.label}</b><span class="tag primary">已选择</span></div>
          <div class="access-dept-selected-meta">
            <div><label>所属企业</label><b>${selected.enterprise}</b></div>
            <div><label>在职人数</label><b>${selected.peopleCount} 人</b></div>
            <div><label>已授权权限组</label><b>${selected.authorizedCount} 个</b></div>
            <div><label>覆盖设备</label><b>${selected.deviceCount} 台</b></div>
          </div>` : `<div class="access-dept-selected-placeholder"><b>未选择部门</b><span>必须先选中左侧部门，才能点击“新增权限组”。</span></div>`}
        </div>
        <div class="card filter-card access-dept-auth-filter"><div class="filters">
          <div class="field"><label>权限组名称</label><input class="control" value="${accessDepartmentAuthState.groupKeyword}" data-access-dept-group-keyword placeholder="请输入权限组名称"></div>
          <div class="field"><label>状态</label><select class="control" data-access-dept-group-status><option value="">全部</option><option value="启用" ${accessDepartmentAuthState.groupStatus==="启用" ? "selected" : ""}>启用</option><option value="停用" ${accessDepartmentAuthState.groupStatus==="停用" ? "selected" : ""}>停用</option></select></div>
          <div class="filter-actions"><button class="btn action-access-dept-auth-reset">重置</button><button class="btn primary action-access-dept-auth-query">查询</button></div>
        </div></div>
        <div class="card table-card access-dept-auth-table-card">
          <div class="table-toolbar">
            <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span>${selected ? `<span class="tag">当前部门：${selected.label}</span>` : `<span class="tag neutral">未选择部门</span>`}</div>
            <div class="table-toolbar-right"><button class="btn primary action-access-dept-group-add" ${selected ? "" : "disabled"} title="${selected ? "为当前部门新增权限组" : "请先选择部门"}">新增权限组</button></div>
          </div>
          ${renderAccessDepartmentAuthTable(rows, selected)}
          ${pagination(rows.length)}
        </div>
      </section>
    </div>`;
}

function accessIssueRecordsForPerson(person) {
  return person.details.flatMap(detail => {
    const group = accessPermissionGroupByName(detail[0]);
    const devices = group.devices.length ? group.devices : [["未关联设备", "--", "--", "离线"]];
    return devices.map((device, index) => {
      let status = detail[5];
      if (detail[5] === "下发失败" && index > 1) status = "下发成功";
      if ((detail[5] === "正在下发" || detail[5] === "下发中") && index > 0) status = "待下发";
      return {
        groupName: detail[0],
        source: detail[1],
        validPeriod: detail[2],
        timePeriod: detail[3],
        deviceName: device[0],
        deviceCode: device[1],
        status,
        issueTime: detail[6] === "--" ? "--" : detail[6],
        reason: status === "下发失败" ? "门禁设备离线或返回超时" : "--"
      };
    });
  });
}

function accessPersonProfile(person) {
  const archiveRow = tableConfigs.person.rows.find(row => row[1] === person.code);
  const cardRow = cardRows.find(row => row.personCode === person.code);
  const [gender = "男", phoneFromArchive = "--"] = archiveRow ? String(archiveRow[2]).split("|") : [];
  return {
    gender,
    phone: cardRow?.phone || phoneFromArchive || "--",
    certificateNo: `3702********${person.code.slice(-4)}`,
    status: person.personStatus || "在职"
  };
}

function accessIssueStatsForPerson(person) {
  const records = accessIssueRecordsForPerson(person);
  const failed = records.filter(item => item.status === "下发失败").length;
  const issuing = records.filter(item => item.status === "正在下发" || item.status === "下发中").length;
  const pending = records.filter(item => item.status === "待下发").length;
  const status = failed ? "下发失败" : issuing ? "正在下发" : pending ? "待下发" : records.length ? "下发成功" : "--";
  const latest = records.map(item => item.issueTime).filter(item => item && item !== "--").sort().pop() || "--";
  return { total: records.length, failed, status, latest };
}

function accessIssueSortedPeople() {
  const priority = { "下发失败": 1, "正在下发": 2, "待下发": 3, "下发成功": 4 };
  return [...accessPersonPermissionRows].sort((a, b) => {
    const sa = accessIssueStatsForPerson(a);
    const sb = accessIssueStatsForPerson(b);
    const statusDiff = (priority[sa.status] || 9) - (priority[sb.status] || 9);
    if (statusDiff) return statusDiff;
    return String(sb.latest).localeCompare(String(sa.latest));
  });
}

function renderAccessIssueMetrics() {
  const people = accessPersonPermissionRows;
  const allRecords = people.flatMap(accessIssueRecordsForPerson);
  const failedPeople = people.filter(person => accessIssueStatsForPerson(person).failed > 0).length;
  const failedRecords = allRecords.filter(item => item.status === "下发失败").length;
  const peopleFailRate = people.length ? ((failedPeople / people.length) * 100).toFixed(2) : "0.00";
  const recordFailRate = allRecords.length ? ((failedRecords / allRecords.length) * 100).toFixed(2) : "0.00";
  const cards = [
    ["门禁设备总数", `${accessControlDevices.length}`, "台", "neutral"],
    ["授权人员数", `${people.length}`, "人", "primary"],
    ["下发失败人数", `${failedPeople}`, "人", "danger"],
    ["人员下发失败率", `${peopleFailRate}%`, "", "danger"],
    ["授权总数", `${allRecords.length}`, "条", "success"],
    ["授权失败总数", `${failedRecords}`, "条", "danger"],
    ["授权失败率", `${recordFailRate}%`, "", "danger"]
  ];
  return `<div class="access-issue-metrics">
    ${cards.map(card => `<div class="access-issue-metric ${card[3]}"><label>${card[0]}</label><b>${card[1]}</b>${card[2] ? `<span>${card[2]}</span>` : ""}</div>`).join("")}
  </div>`;
}

function renderAccessIssueManagementPage(mod, tab) {
  const people = accessIssueSortedPeople();
  return `${tabs(mod, tab)}
    ${renderAccessIssueMetrics()}
    <div class="card filter-card access-issue-filter"><div class="filters">
      <div class="field"><label>姓名/编号/联系方式</label><input class="control" placeholder="请输入姓名、人员编号或联系方式"></div>
      <div class="field"><label>员工类型</label><select class="control"><option>全部</option><option>正式员工</option><option>外包员工</option><option>实习生</option></select></div>
      <div class="field"><label>所属园区</label><select class="control"><option>三里园区</option></select></div>
      <div class="field"><label>所属企业/部门</label><button type="button" class="control cascader-control">请选择所属企业 / 部门<span>⌄</span></button></div>
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card access-issue-table-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span><span class="tag">失败优先，成功记录按更新时间倒序</span></div>
        <div class="table-toolbar-right"><button class="btn primary action-access-batch-reissue">批量重新授权</button></div>
      </div>
      <div class="table-wrap">
        <table class="access-issue-table">
          <thead><tr><th>序号</th><th>姓名</th><th>人员编号 / 联系方式</th><th>员工类型 / 状态</th><th>所属企业 / 部门</th><th>授权结果(失败/总数)</th><th>更新时间</th><th>操作</th></tr></thead>
          <tbody>${people.map((person, index) => {
            const profile = accessPersonProfile(person);
            const stats = accessIssueStatsForPerson(person);
            return `<tr>
              <td>${index + 1}</td>
              <td>${person.name}</td>
              <td><div class="two-line-cell"><b>${person.code}</b><span>${profile.phone}</span></div></td>
              <td><div class="two-line-cell"><b>${person.employeeType}</b><span>${tag(profile.status)}</span></div></td>
              <td><div class="two-line-cell"><b>${person.enterprise}</b><span>${person.department}</span></div></td>
              <td>${accessIssueResultHtml(stats)}</td>
              <td>${stats.latest}</td>
              <td class="actions"><button class="btn text action-access-issue-detail" data-person-code="${person.code}">查看详情</button></td>
            </tr>`;
          }).join("")}</tbody>
        </table>
      </div>
      ${pagination(people.length * 12 + 5)}
    </div>`;
}

function accessIssueResultHtml(stats) {
  if (stats.failed > 0) {
    return `<span class="access-auth-result fail">授权失败（${stats.failed}/${stats.total}）</span>`;
  }
  return `<span class="access-auth-result success">授权成功</span>`;
}

function renderScheduleRecordsPage(mod, tab) {
  const c = getTabConfig(mod.id, tab);
  return `${tabs(mod, tab)}
    <div class="card filter-card"><div class="filters">
      ${c.filters.map((f,i)=>`<div class="field"><label>${f}</label>${renderFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card schedule-record-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"></div>
        <div class="table-toolbar-right"><button class="btn">导出记录</button></div>
      </div>
      <div class="table-wrap">
        <table class="schedule-record-table">
          <thead><tr><th>序号</th>${c.columns.map(x=>`<th>${x}</th>`).join("")}</tr></thead>
          <tbody>${c.rows.map((row,index)=>`<tr><td>${index + 1}</td>${row.map((value,columnIndex)=>`<td>${columnIndex === 1 ? tag(value) : value}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(c.rows.length)}
    </div>`;
}

function renderListPage(mod, tab) {
  if (mod.id === "inspection" && tab === "巡检点") return renderInspectionPointPage(mod, tab);
  if (mod.id === "inspection" && tab === "自定义标签") return renderInspectionTagPage(mod, tab);
  if (mod.id === "inspection" && tab === "自定义区域") return renderInspectionAreaPage(mod, tab);
  if (mod.id === "inspection" && tab === "巡检任务") return renderInspectionTaskPage(mod, tab);
  if (mod.id === "schedule" && tab === "修改记录") return renderScheduleRecordsPage(mod, tab);
  if (mod.id === "person" && tab === "卡片管理") return renderCardManagementPage(mod, tab);
  if (mod.id === "patrol" && tab === "巡检任务") return renderPatrolTaskPage(mod, tab);
  if (mod.id === "vehicle" && tab === "车辆管理") return renderVehicleManagementPage(mod, tab);
  if (mod.id === "vehicle" && tab === "车辆黑名单") return renderVehicleBlacklistPage(mod, tab);
  if (mod.id === "vehicle" && tab === "车辆白名单") return renderVehicleWhitelistPage(mod, tab);
  if (mod.id === "vehicle" && tab === "特殊车辆管理") return renderSpecialVehiclePage(mod, tab);
  if (mod.id === "access" && tab === "按部门授权") return renderAccessDepartmentAuthPage(mod, tab);
  if (mod.id === "access" && tab === "权限下发管理") return renderAccessIssueManagementPage(mod, tab);
  const c = getTabConfig(mod.id, tab);
  const filterFields = mod.id === "alarm" && tab === "巡检工单"
    ? renderAlarmInspectionWorkorderFilters()
    : c.filters.map((f,i)=>`<div class="field"><label>${f}</label>${renderFilterControl(f,i)}</div>`).join("");
  const supportsBatch = ["person:卡片管理","inspection:巡检任务"].includes(`${mod.id}:${tab}`);
  const pageActions = pageActionButtons(mod, c.primary);
  const showSelection = c.showSelection !== false;
  const showIndex = c.showIndex === true;
  const showActions = c.showActions !== false;
  const refreshButton = c.showRefresh === false ? "" : `<button class="btn">↻ 刷新</button>`;
  const toolbarLeft = c.showToolbarLabel === false ? "" : `<span class="tag primary">当前页签：${tab}</span>`;
  return `${tabs(mod,tab)}
    ${c.note ? `<div class="alert ${mod.id === "perimeter" || mod.id === "alarm" ? "warning" : ""}">ⓘ ${c.note}</div>` : ""}
    ${(mod.id==="visitor"&&tab==="访客管理")||(mod.id==="perimeter"&&tab==="周界告警") ? renderMiniStats(mod.id) : ""}
    <div class="card filter-card"><div class="filters">
      ${filterFields}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card">
      <div class="table-toolbar"><div class="table-toolbar-left">${supportsBatch?`<button class="btn action-batch">批量操作⌄</button>`:""}${toolbarLeft}</div><div class="table-toolbar-right">${pageActions}${refreshButton}</div></div>
      <div class="table-wrap"><table class="${c.tableClass || ""}"><thead><tr>${showSelection?`<th><input type="checkbox"></th>`:""}${showIndex?`<th>序号</th>`:""}${c.columns.map(x=>`<th>${x}</th>`).join("")}${showActions?`<th>操作</th>`:""}</tr></thead>
      <tbody>${c.rows.map((r,ri)=>`<tr>${showSelection?`<td><input type="checkbox"></td>`:""}${showIndex?`<td>${ri+1}</td>`:""}${r.map((v,i)=>`<td>${renderTableCell(mod.id,tab,c.columns[i],v,i,r)}</td>`).join("")}${showActions?`<td class="actions">${rowActions(mod.id,r,ri)}</td>`:""}</tr>`).join("")}</tbody></table></div>
      ${pagination(c.rows.length * 12 + 7)}
    </div>`;
}

function renderInspectionTaskPage(mod, tab) {
  return `${tabs(mod,tab)}
    <div class="card filter-card inspection-task-filter-card"><div class="filters inspection-task-filters">
      <div class="field"><label>任务名称</label><input class="control" placeholder="请输入任务名称"></div>
      <div class="field"><label>所属园区</label><select class="control"><option>全部</option><option>微冷园区</option><option>海尔西园区</option><option>三里园区</option></select></div>
      <div class="field"><label>巡检执行人</label><select class="control"><option>全部</option><option>闫卓宇</option><option>王涛</option><option>张振新</option><option>李浩</option><option>孙宁</option></select></div>
      <div class="field"><label>任务状态</label><select class="control"><option>全部</option><option>待巡检</option><option>巡检中</option><option>已完成</option><option>已作废</option></select></div>
      <div class="field"><label>计划巡检日期</label><div class="date-range-control"><input class="control" placeholder="开始日期"><span>至</span><input class="control" placeholder="结束日期"></div></div>
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card inspection-task-card">
      <div class="table-toolbar inspection-task-toolbar">
        <div class="table-toolbar-left"><span class="selected-count">已选择 0 项</span></div>
        <div class="table-toolbar-right">
          <div class="inspection-task-batch-menu">
            <button class="btn" type="button">批量操作⌄</button>
            <div class="inspection-task-batch-dropdown">
              <button type="button" class="action-inspection-task-batch" data-act="批量转派">批量转派</button>
              <button type="button" class="action-inspection-task-batch danger" data-act="批量作废">批量作废</button>
              <button type="button" class="action-inspection-task-batch" data-act="批量修改巡检时间">批量修改巡检时间</button>
            </div>
          </div>
          <button class="btn primary action-add">新增临时任务</button>
        </div>
      </div>
      <div class="table-wrap"><table class="inspection-task-table">
        <thead><tr><th><input type="checkbox" data-inspection-task-check-all></th><th>序号</th><th>任务名称</th><th>所属园区/巡检人</th><th>计划开始巡检时间</th><th>计划结束巡检时间</th><th>任务状态</th><th>异常/正常/巡检点/完成率</th></tr></thead>
        <tbody>${inspectionTaskRows.map((row,index)=>`<tr>
          <td><input type="checkbox" data-inspection-task-check></td>
          <td>${index + 1}</td>
          <td><button class="table-link action-detail inspection-task-name-link" data-inspection-task-index="${index}">${renderInspectionTaskTimeoutIcon(row)}<span>${row.name}</span></button></td>
          <td><div class="two-line-cell"><b>${row.park}</b><span>${row.executor}</span></div></td>
          <td>${row.start}</td>
          <td>${row.end}</td>
          <td>${renderInspectionTaskStatusTag(row.status)}</td>
          <td>${renderInspectionTaskProgress(row)}</td>
        </tr>`).join("")}</tbody>
      </table></div>
      ${pagination(inspectionTaskRows.length * 12 + 8)}
    </div>`;
}

function renderInspectionTaskTimeoutIcon(row) {
  return row.timedOut ? `<span class="inspection-task-timeout-icon" title="任务超时">超时</span>` : "";
}

function renderInspectionTaskStatusTag(status) {
  const classMap = { "待巡检": "pending", "巡检中": "running", "已完成": "done", "已作废": "voided" };
  return `<span class="inspection-task-status ${classMap[status] || "voided"}">${status}</span>`;
}

function renderInspectionTaskProgress(row) {
  const finished = Math.min(row.points, row.abnormal + row.normal);
  const rate = row.points ? Math.round(finished / row.points * 100) : 0;
  return `<div class="inspection-task-progress">
    <b><span class="danger-text">${row.abnormal}</span> / ${row.normal} / ${row.points} / ${rate}%</b>
    <div class="progress-bar"><i style="width:${rate}%"></i></div>
  </div>`;
}

function updateInspectionTaskSelectedCount() {
  const checks = Array.from(document.querySelectorAll("[data-inspection-task-check]"));
  const selected = checks.filter(item => item.checked).length;
  const count = document.querySelector(".inspection-task-toolbar .selected-count");
  const checkAll = document.querySelector("[data-inspection-task-check-all]");
  if (count) count.textContent = `已选择 ${selected} 项`;
  if (checkAll) {
    checkAll.checked = checks.length > 0 && selected === checks.length;
    checkAll.indeterminate = selected > 0 && selected < checks.length;
  }
}

function renderInspectionPointPage(mod, tab) {
  const c = getTabConfig(mod.id, tab);
  const rows = filteredInspectionPointRows(c.rows);
  const pageActions = pageActionButtons(mod, c.primary);
  return `${tabs(mod, tab)}
    <div class="card filter-card inspection-point-filter-card"><div class="filters inspection-point-filters">
      ${renderInspectionPointFilters()}
      <div class="filter-actions"><button class="btn action-inspection-point-reset">重置</button><button class="btn primary action-inspection-point-query">查询</button></div>
    </div></div>
    <div class="card table-card inspection-point-card">
      <div class="table-toolbar"><div class="table-toolbar-left"></div><div class="table-toolbar-right">${pageActions}</div></div>
      <div class="table-wrap"><table class="${c.tableClass || ""}">
        <thead><tr><th>序号</th>${c.columns.map(x=>`<th>${x}</th>`).join("")}<th>操作</th></tr></thead>
        <tbody>${rows.length ? rows.map((r,ri)=>`<tr><td>${ri+1}</td>${r.map((v,i)=>`<td>${renderTableCell(mod.id,tab,c.columns[i],v,i,r)}</td>`).join("")}<td class="actions">${rowActions(mod.id,r,ri)}</td></tr>`).join("") : `<tr><td colspan="${c.columns.length + 2}" class="table-empty">暂无符合条件的巡检点</td></tr>`}</tbody>
      </table></div>
      ${pagination(rows.length)}
    </div>`;
}

function renderInspectionPointFilters() {
  return `
    <div class="field">
      <label>巡检点名称</label>
      <input class="control" data-point-filter="name" placeholder="请输入巡检点名称" value="${escapeAttr(inspectionPointFilterState.name)}">
    </div>
    <div class="field">
      <label>区域</label>
      <select class="control" data-point-filter="area">
        ${["全部","海尔西园区东南角","海尔西园区西北角","1#东","1#西"].map(item=>`<option ${inspectionPointFilterState.area === item ? "selected" : ""}>${item}</option>`).join("")}
      </select>
    </div>
    <div class="field">
      <label>标签</label>
      <select class="control" data-point-filter="tag">
        ${["全部","消防巡检","安全巡检","设施巡检","保洁巡检"].map(item=>`<option ${inspectionPointFilterState.tag === item ? "selected" : ""}>${item}</option>`).join("")}
      </select>
    </div>
    <div class="field">
      <label>所属园区</label>
      <select class="control" data-point-filter="park">
        ${["全部","海尔西园区","微冷园区"].map(item=>`<option ${inspectionPointFilterState.park === item ? "selected" : ""}>${item}</option>`).join("")}
      </select>
    </div>`;
}

function filteredInspectionPointRows(rows) {
  const name = inspectionPointFilterState.name.trim().toLowerCase();
  const area = inspectionPointFilterState.area;
  const tag = inspectionPointFilterState.tag;
  const park = inspectionPointFilterState.park;
  return rows.filter(row => {
    const nameMatched = !name || String(row[0]).toLowerCase().includes(name);
    const areaMatched = !area || area === "全部" || row[1] === area;
    const tagMatched = !tag || tag === "全部" || row[2] === tag;
    const parkMatched = !park || park === "全部" || row[3] === park;
    return nameMatched && areaMatched && tagMatched && parkMatched;
  });
}

function renderInspectionAreaPage(mod, tab) {
  const c = getTabConfig(mod.id, tab);
  const rows = filteredInspectionAreaRows(c.rows);
  return `${tabs(mod, tab)}
    <div class="card filter-card inspection-area-filter-card"><div class="filters inspection-area-filters">
      ${renderInspectionAreaFilters()}
      <div class="filter-actions"><button class="btn action-inspection-area-reset">重置</button><button class="btn primary action-inspection-area-query">查询</button></div>
    </div></div>
    <div class="card table-card inspection-area-card">
      <div class="inspection-area-toolbar">
        <div class="inspection-area-note">自定义区域，主要是把巡检点按照物业空间进行归类，例如巡检点可能会有：1#东、1#西、1#南小岛等等；这都归属于这里的区域：1#</div>
        <button class="btn primary action-add">批量新增区域</button>
      </div>
      <div class="table-wrap"><table class="${c.tableClass || ""}">
        <thead><tr><th>序号</th>${c.columns.map(x=>`<th>${x}</th>`).join("")}<th>操作</th></tr></thead>
        <tbody>${rows.length ? rows.map((r,ri)=>`<tr><td>${ri+1}</td>${r.map((v,i)=>`<td>${renderTableCell(mod.id,tab,c.columns[i],v,i,r)}</td>`).join("")}<td class="actions">${rowActions(mod.id,r,ri)}</td></tr>`).join("") : `<tr><td colspan="${c.columns.length + 2}" class="table-empty">暂无符合条件的自定义区域</td></tr>`}</tbody>
      </table></div>
      <div class="inspection-area-footnote">已关联巡检点的区域不可执行编辑与删除操作；</div>
      ${pagination(rows.length)}
    </div>`;
}

function renderInspectionAreaFilters() {
  return `
    <div class="field inspection-area-keyword-field">
      <label>区域名称</label>
      <input class="control" data-area-filter="name" placeholder="请输入区域名称" value="${escapeAttr(inspectionAreaFilterState.name)}">
    </div>
    <div class="field">
      <label>所属园区</label>
      <select class="control" data-area-filter="park">
        ${["全部","海尔西园区","微冷园区"].map(item=>`<option ${inspectionAreaFilterState.park === item ? "selected" : ""}>${item}</option>`).join("")}
      </select>
    </div>`;
}

function filteredInspectionAreaRows(rows) {
  const name = inspectionAreaFilterState.name.trim().toLowerCase();
  const park = inspectionAreaFilterState.park;
  return rows.filter(row => {
    const nameMatched = !name || String(row[0]).toLowerCase().includes(name);
    const parkMatched = !park || park === "全部" || row[1] === park;
    return nameMatched && parkMatched;
  });
}

function renderInspectionTagPage(mod, tab) {
  const c = getTabConfig(mod.id, tab);
  const rows = filteredInspectionTagRows(c.rows);
  return `${tabs(mod, tab)}
    <div class="card filter-card inspection-tag-filter-card"><div class="filters inspection-tag-filters">
      ${renderInspectionTagFilters()}
      <div class="filter-actions"><button class="btn action-inspection-tag-reset">重置</button><button class="btn primary action-inspection-tag-query">查询</button></div>
    </div></div>
    <div class="card table-card inspection-tag-card">
      <div class="inspection-tag-toolbar">
        <div class="inspection-tag-note">自定义标签，主要用于把巡检点按照检查类型进行归类，例如消防巡检、安全巡检、设施巡检、保洁巡检等。</div>
        <button class="btn primary action-add">批量新增标签</button>
      </div>
      <div class="table-wrap"><table class="${c.tableClass || ""}">
        <thead><tr><th>序号</th>${c.columns.map(x=>`<th>${x}</th>`).join("")}<th>操作</th></tr></thead>
        <tbody>${rows.length ? rows.map((r,ri)=>`<tr><td>${ri+1}</td>${r.map((v,i)=>`<td>${renderTableCell(mod.id,tab,c.columns[i],v,i,r)}</td>`).join("")}<td class="actions">${rowActions(mod.id,r,ri)}</td></tr>`).join("") : `<tr><td colspan="${c.columns.length + 2}" class="table-empty">暂无符合条件的自定义标签</td></tr>`}</tbody>
      </table></div>
      <div class="inspection-tag-footnote">已关联巡检点的标签不可执行编辑与删除操作；停用后不可被新巡检点选择，历史关联关系保留。</div>
      ${pagination(rows.length)}
    </div>`;
}

function renderInspectionTagFilters() {
  return `
    <div class="field">
      <label>标签名称</label>
      <input class="control" data-tag-filter="name" placeholder="请输入标签名称" value="${escapeAttr(inspectionTagFilterState.name)}">
    </div>
    <div class="field">
      <label>所属园区</label>
      <select class="control" data-tag-filter="park">
        ${["全部","海尔西园区","微冷园区"].map(item=>`<option ${inspectionTagFilterState.park === item ? "selected" : ""}>${item}</option>`).join("")}
      </select>
    </div>`;
}

function filteredInspectionTagRows(rows) {
  const name = inspectionTagFilterState.name.trim().toLowerCase();
  const park = inspectionTagFilterState.park;
  return rows.filter(row => {
    const nameMatched = !name || String(row[0]).toLowerCase().includes(name);
    const parkMatched = !park || park === "全部" || row[1] === park;
    return nameMatched && parkMatched;
  });
}

function renderPatrolTaskPage(mod, tab) {
  const filters = ["任务名称", "任务状态", "预计开始时间", "预计结束时间", "实际开始时间", "实际结束时间"];
  const stats = [
    ["总任务数", "657", "doc"], ["未开始任务数", "1", "pending"], ["已完成任务数", "32", "done"], ["超时完成任务数", "5", "timeout"], ["漏检任务数", "620", "miss"],
    ["总点位数", "7494", "flag"], ["未开始点位数", "0", "pin"], ["已完成点位数", "365", "location"], ["漏检点位数", "7129", "scan"], ["点位巡检完成率", "4.87%", "rate"]
  ];
  const rows = [
    ["7月巡检计划-周巡检3.4_20260701", "7月巡检计划-周巡检3.4", "2026-07-01 15:20", "2026-07-01 17:20", "-", "-", "未开始"],
    ["7月巡检计划-周巡检3.4_20260626", "7月巡检计划-周巡检3.4", "2026-06-26 15:20", "2026-06-26 17:20", "2026-06-26 15:24", "-", "进行中"],
    ["7月巡检计划-周巡检3.4_20260619", "7月巡检计划-周巡检3.4", "2026-06-19 15:20", "2026-06-19 17:20", "2026-06-19 15:28", "2026-06-19 17:31", "超时完成"],
    ["消防设施每日巡检_20260610", "消防设施每日巡检", "2026-06-10 08:00", "2026-06-10 11:00", "2026-06-10 08:02", "2026-06-10 10:46", "已完成"],
    ["仓储区临时专项巡检_20260609", "临时任务", "2026-06-09 15:00", "2026-06-09 17:00", "-", "-", "漏检"]
  ];
  return `${tabs(mod, tab)}
    <div class="card filter-card patrol-task-filter"><div class="filters">
      ${filters.map((f,i)=>`<div class="field"><label>${f}</label>${renderFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="patrol-task-stats">
      ${stats.map(item => `<div class="card patrol-task-stat ${item[2]}"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div></div>`).join("")}
    </div>
    <div class="card table-card patrol-task-card">
      <div class="table-toolbar patrol-task-toolbar">
        <div class="table-toolbar-left"><button class="card-rules-trigger action-patrol-task-status-rules" type="button">点我点我</button><span class="tag primary">当前页签：${tab}</span><span class="tag">视频巡更任务统计</span></div>
        <div class="table-toolbar-right"><button class="btn primary action-add">新增任务</button><button class="btn action-export">导出</button></div>
      </div>
      <div class="table-wrap">
        <table class="patrol-task-table">
          <thead><tr><th>序号</th><th>任务名称</th><th>计划名称</th><th>预计开始时间</th><th>预计结束时间</th><th>实际开始时间</th><th>实际结束时间</th><th>任务状态</th></tr></thead>
          <tbody>${rows.map((row, rowIndex) => `<tr><td>${rowIndex + 1}</td>${row.map((value, index) => `<td>${index === 0 ? `<span class="link action-detail">${value}</span>` : index === 6 ? tag(value) : value}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(657)}
    </div>`;
}

function renderVehicleManagementPage(mod, tab) {
  const filters = ["车牌号/姓名/编号/联系方式", "所属企业/部门", "授权状态", "授权有效期"];
  const selectedCount = selectedVehicleIds.size;
  return `${tabs(mod, tab)}
    <div class="alert">ⓘ 车辆管理页支持一车一人、一人多车。新增车辆仅完成车辆档案和人员绑定，不直接配置通行授权；授权需通过行内“授权”单独配置。</div>
    <div class="card filter-card vehicle-management-filter"><div class="filters">
      ${filters.map((f,i)=>`<div class="field"><label>${f}</label>${renderFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card">
      <div class="table-toolbar vehicle-management-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span><span class="tag">已选择 ${selectedCount} 项</span></div>
        <div class="table-toolbar-right">
          <button class="btn primary action-add">新增车辆</button>
          <button class="btn action-vehicle-import">批量导入</button>
          <button class="btn action-vehicle-export">批量导出</button>
          <button class="btn action-vehicle-batch-auth">批量授权</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="vehicle-management-table">
          <thead><tr><th><input type="checkbox" aria-label="全选车辆"></th><th>序号</th><th>车牌号</th><th>姓名/人员编号</th><th>联系方式</th><th>所属企业/部门</th><th>有效期</th><th>授权出入口数</th><th>授权状态</th><th>操作人/更新时间</th><th>操作</th></tr></thead>
          <tbody>${vehicleManagementRows.map((row,index)=>`<tr>
            <td><input type="checkbox" data-vehicle-check="${row.plate}" ${selectedVehicleIds.has(row.plate) ? "checked" : ""}></td>
            <td>${index + 1}</td>
            <td>${row.plate}</td>
            <td><div class="two-line-cell"><b>${row.personName || "-"}</b><span>${row.personCode || "-"}</span></div></td>
            <td>${row.phone}</td>
            <td><div class="two-line-cell"><b>${row.enterprise || "-"}</b><span>${row.department || "-"}</span></div></td>
            <td>${vehicleValidityText(row)}</td>
            <td>${row.entrances}</td>
            <td>${tag(row.authStatus)}</td>
            <td><div class="two-line-cell"><b>${row.operator || "-"}</b><span>${row.operateTime || "-"}</span></div></td>
            <td class="actions">${vehicleManagementActions(row)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(86)}
    </div>`;
}

function vehicleValidityText(row) {
  if (!row.startTime || row.startTime === "-" || !row.endTime || row.endTime === "-") return "-";
  return `${row.startTime}至${row.endTime}`;
}

function vehicleManagementActions(row) {
  return `<button class="btn text action-vehicle-edit" data-vehicle-plate="${row.plate}">修改</button><button class="btn text action-vehicle-auth" data-vehicle-plate="${row.plate}">授权</button><button class="btn text danger action-vehicle-delete" data-vehicle-plate="${row.plate}">删除</button>`;
}

function renderVehicleBlacklistPage(mod, tab) {
  const filters = ["车牌号/姓名/联系方式", "禁行原因", "有效期", "状态"];
  return `${tabs(mod, tab)}
    <div class="alert warning">ⓘ 黑名单按有效期判断是否生效；有效期内该车辆在所有出入口均被拦截，若同时存在白名单，仍以黑名单为准。</div>
    <div class="card filter-card vehicle-blacklist-filter"><div class="filters">
      ${filters.map((f,i)=>`<div class="field"><label>${f}</label>${vehicleBlacklistFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card">
      <div class="table-toolbar vehicle-management-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span><span class="tag">按有效期生效</span></div>
        <div class="table-toolbar-right">
          <button class="btn primary action-vehicle-blacklist-add">新增黑名单</button>
          <button class="btn action-vehicle-blacklist-export">导出</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="vehicle-blacklist-table">
          <thead><tr><th>序号</th><th>车牌号</th><th>车主姓名/联系方式</th><th>有效期</th><th>禁行原因</th><th>状态</th><th>操作人/更新时间</th><th>操作</th></tr></thead>
          <tbody>${vehicleBlacklistRows.map((row,index)=>`<tr>
            <td>${index + 1}</td>
            <td>${row.plate}</td>
            <td><div class="two-line-cell"><b>${row.ownerName || "-"}</b><span>${row.ownerPhone || "-"}</span></div></td>
            <td>${vehicleBlacklistValidityText(row)}</td>
            <td><span class="vehicle-blacklist-reason" title="${row.reason}">${row.reason}</span></td>
            <td>${tag(vehicleBlacklistStatus(row))}</td>
            <td><div class="two-line-cell"><b>${row.operator}</b><span>${row.operateTime}</span></div></td>
            <td class="actions">${vehicleBlacklistActions(row)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(41)}
    </div>`;
}

function vehicleBlacklistRowByPlate(plate) {
  return vehicleBlacklistRows.find(row => row.plate === plate) || vehicleBlacklistRows[0];
}

function vehicleBlacklistDateOnly(value) {
  return String(value || "-").split(" ")[0] || "-";
}

function vehicleBlacklistValidityText(row) {
  return `${vehicleBlacklistDateOnly(row.startTime)} 至 ${vehicleBlacklistDateOnly(row.endTime)}`;
}

function vehicleBlacklistStatus(row) {
  const today = "2026-07-16";
  const startDate = vehicleBlacklistDateOnly(row.startTime);
  const endDate = vehicleBlacklistDateOnly(row.endTime);
  if (startDate !== "-" && startDate > today) return "未生效";
  if (endDate !== "长期" && endDate !== "-" && endDate < today) return "已失效";
  return "生效中";
}

function vehicleBlacklistFilterControl(label, index) {
  if (label === "状态") return `<select class="control"><option>全部</option><option>未生效</option><option>生效中</option><option>已失效</option></select>`;
  return renderFilterControl(label, index);
}

function vehicleBlacklistActions(row) {
  return `<button class="btn text action-vehicle-blacklist-edit" data-blacklist-plate="${row.plate}">编辑</button><button class="btn text danger action-vehicle-blacklist-delete" data-blacklist-plate="${row.plate}">删除</button>`;
}

function renderVehicleWhitelistPage(mod, tab) {
  const filters = ["车牌号/姓名/联系方式", "放行原因", "有效期", "状态"];
  return `${tabs(mod, tab)}
    <div class="alert">ⓘ 白名单按有效期自动判断状态；生效中车辆参与自动放行判断，若同一车辆同时命中黑名单和白名单，仍以黑名单优先拦截。</div>
    <div class="card filter-card vehicle-whitelist-filter"><div class="filters">
      ${filters.map((f,i)=>`<div class="field"><label>${f}</label>${vehicleWhitelistFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card">
      <div class="table-toolbar vehicle-management-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span><span class="tag">按有效期放行</span></div>
        <div class="table-toolbar-right">
          <button class="btn primary action-vehicle-whitelist-add">新增白名单</button>
          <button class="btn action-vehicle-whitelist-export">导出</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="vehicle-whitelist-table">
          <thead><tr><th>序号</th><th>车牌号</th><th>车主姓名/联系方式</th><th>有效期</th><th>放行原因</th><th>状态</th><th>操作人/更新时间</th><th>操作</th></tr></thead>
          <tbody>${vehicleWhitelistRows.map((row,index)=>`<tr>
            <td>${index + 1}</td>
            <td>${row.plate}</td>
            <td><div class="two-line-cell"><b>${row.ownerName || "-"}</b><span>${row.ownerPhone || "-"}</span></div></td>
            <td>${vehicleWhitelistValidityText(row)}</td>
            <td><span class="vehicle-whitelist-reason" title="${row.reason}">${row.reason}</span></td>
            <td>${vehicleWhitelistStatusTag(row)}</td>
            <td><div class="two-line-cell"><b>${row.operator}</b><span>${row.operateTime}</span></div></td>
            <td class="actions">${vehicleWhitelistActions(row)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(58)}
    </div>`;
}

function vehicleWhitelistRowByPlate(plate) {
  return vehicleWhitelistRows.find(row => row.plate === plate) || vehicleWhitelistRows[0];
}

function vehicleWhitelistValidityText(row) {
  return `${vehicleBlacklistDateOnly(row.startTime)} 至 ${vehicleBlacklistDateOnly(row.endTime)}`;
}

function vehicleWhitelistStatus(row) {
  return vehicleBlacklistStatus(row);
}

function vehicleWhitelistStatusTag(row) {
  const status = vehicleWhitelistStatus(row);
  return status === "生效中" ? `<span class="tag success">${status}</span>` : tag(status);
}

function vehicleWhitelistFilterControl(label, index) {
  if (label === "状态") return `<select class="control"><option>全部</option><option>未生效</option><option>生效中</option><option>已失效</option></select>`;
  return renderFilterControl(label, index);
}

function vehicleWhitelistActions(row) {
  return `<button class="btn text action-vehicle-whitelist-edit" data-whitelist-plate="${row.plate}">编辑</button><button class="btn text danger action-vehicle-whitelist-delete" data-whitelist-plate="${row.plate}">删除</button>`;
}

function renderSpecialVehiclePage(mod, tab) {
  const filters = ["车牌号/所属单位/负责人/联系方式", "有效期", "状态"];
  return `${tabs(mod, tab)}
    <div class="alert warning">ⓘ 特殊车辆只维护准入资料：启用且有效期内的车辆入场自动放行；出场道闸不自动抬杆，必须由门卫在移动端拍照、登记出场原因和备注后手动放行。</div>
    <div class="card special-vehicle-rule-card">
      <div class="special-vehicle-rule"><b>入场规则</b><span>识别车牌 → 校验有效期 → 自动抬杆放行</span></div>
      <div class="special-vehicle-rule"><b>出场规则</b><span>识别车牌 → 道闸保持落杆 → 门卫移动端拍照登记 → 手动放行</span></div>
      <div class="special-vehicle-rule"><b>审计留痕</b><span>出场照片、出场原因、核验备注、门卫账号和放行时间同步写入通行记录</span></div>
    </div>
    <div class="card filter-card special-vehicle-filter"><div class="filters">
      ${filters.map((f,i)=>`<div class="field"><label>${f}</label>${specialVehicleFilterControl(f,i)}</div>`).join("")}
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="card table-card">
      <div class="table-toolbar vehicle-management-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">当前页签：${tab}</span><span class="tag">入场自动放行</span><span class="tag warning">出场需门卫核验</span></div>
        <div class="table-toolbar-right">
          <button class="btn primary action-special-vehicle-add">新增特殊车辆</button>
          <button class="btn action-special-vehicle-export">导出</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="special-vehicle-table">
          <thead><tr><th>序号</th><th>车牌号</th><th>所属单位</th><th>负责人/联系方式</th><th>有效期</th><th>状态</th><th>操作人/更新时间</th><th>操作</th></tr></thead>
          <tbody>${specialVehicleRows.map((row,index)=>`<tr>
            <td>${index + 1}</td>
            <td><span class="special-vehicle-plate">${row.plate}</span></td>
            <td>${row.unit}</td>
            <td><div class="two-line-cell"><b>${row.ownerName}</b><span>${row.ownerPhone}</span></div></td>
            <td>${specialVehicleValidityText(row)}</td>
            <td>${specialVehicleStatusTag(row)}</td>
            <td><div class="two-line-cell"><b>${row.operator}</b><span>${row.operateTime}</span></div></td>
            <td class="actions">${specialVehicleActions(row)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(36)}
    </div>`;
}

function specialVehicleFilterControl(label, index) {
  if (label === "状态") return `<select class="control"><option>全部</option><option>未生效</option><option>生效中</option><option>已失效</option></select>`;
  return renderFilterControl(label, index);
}

function specialVehicleRowByPlate(plate) {
  return specialVehicleRows.find(row => row.plate === plate) || specialVehicleRows[0];
}

function specialVehicleValidityText(row) {
  return `${row.startDate || "-"} 至 ${row.endDate || "-"}`;
}

function specialVehicleStatus(row) {
  const today = "2026-07-16";
  if (row.startDate && row.startDate > today) return "未生效";
  if (row.endDate && row.endDate < today) return "已失效";
  return "生效中";
}

function specialVehicleStatusTag(row) {
  const status = specialVehicleStatus(row);
  return status === "生效中" ? `<span class="tag success">${status}</span>` : tag(status);
}

function specialVehicleActions(row) {
  return `<button class="btn text action-special-vehicle-edit" data-special-plate="${row.plate}">编辑</button><button class="btn text danger action-special-vehicle-delete" data-special-plate="${row.plate}">删除</button>`;
}

function renderTableCell(id, tab, column, value, index, row) {
  if (id === "company" && tab === "企业信息" && column === "关联人员") return `<span class="link action-company-personnel">${value}</span>`;
  if (id === "patrol" && tab === "视频巡检路线" && column === "关联点位数") return `<button class="table-link action-patrol-route-points" data-route-name="${row[0]}">${value}</button>`;
  if (id === "patrol" && tab === "巡检计划" && column === "计划名称") {
    return `<button class="table-link person-name-link action-patrol-plan-detail" data-patrol-plan-row="${encodeURIComponent(JSON.stringify(row))}">${value}</button>`;
  }
  if (id === "inspection" && tab === "巡检计划" && column === "计划名称") {
    return `<button class="table-link person-name-link action-inspection-plan-detail" data-inspection-plan-row="${encodeURIComponent(JSON.stringify(row))}">${value}</button>`;
  }
  if ((id === "patrol" || id === "inspection") && tab === "巡检计划" && column === "巡检路线/生效日期") {
    const [route, dateRange] = String(value).split("|");
    return `<div class="two-line-cell"><b>${route || "-"}</b><span>${dateRange || "-"}</span></div>`;
  }
  if ((id === "patrol" || id === "inspection") && tab === "巡检计划" && column === "巡检频率/时间") {
    const [frequency, time] = String(value).split("|");
    return `<div class="patrol-frequency-time-cell"><b>${frequency || "-"}</b><span>${time || "-"}</span></div>`;
  }
  if ((id === "patrol" || id === "inspection") && tab === "巡检计划" && column === "所属园区/巡检执行人") {
    const [park, executors] = String(value).split("|");
    return `<div class="two-line-cell"><b>${park || "-"}</b><span>${executors || "-"}</span></div>`;
  }
  if (id === "person" && ["人员档案","已离职人员"].includes(tab) && column === "姓名") {
    const code = row?.[1] || "";
    return `<button class="table-link person-name-link action-person-detail" data-person-name="${value}" data-person-code="${code}">${value}</button>`;
  }
  if (id === "person" && ["人员档案","已离职人员","人员轨迹"].includes(tab) && column === "性别/联系方式") {
    const [gender, phone] = String(value).split("|");
    const genderClass = gender === "男" ? "male" : gender === "女" ? "female" : "unknown";
    return `<div class="two-line-cell"><b><span class="gender-tag ${genderClass}">${gender}</span></b><span>${phone}</span></div>`;
  }
  if (id === "person" && tab === "人员轨迹" && column === "采集设备/类型") {
    const [device, type] = String(value).split("|");
    return `<div class="two-line-cell"><b>${device}</b><span>${type || "-"}</span></div>`;
  }
  if (id === "person" && tab === "人员黑名单" && column === "性别/联系方式") {
    const [gender, phone] = String(value).split("|");
    const genderClass = gender === "男" ? "male" : gender === "女" ? "female" : "unknown";
    return `<div class="two-line-cell"><b><span class="gender-tag ${genderClass}">${gender}</span></b><span>${phone}</span></div>`;
  }
  if (id === "person" && tab === "人员黑名单" && column === "所属企业/部门") {
    const [enterprise, department] = String(value).split("|");
    return `<div class="two-line-cell"><b>${enterprise}</b><span>${department}</span></div>`;
  }
  if (id === "person" && tab === "人员黑名单" && column === "关联车辆") {
    return String(value) === "无" ? `<span class="muted">无</span>` : `<div class="vehicle-list-cell">${String(value).split("、").map(x=>`<span>${x}</span>`).join("")}</div>`;
  }
  if (id === "person" && ["人员档案","已离职人员"].includes(tab) && column === "部门/岗位") {
    const [department, position] = String(value).split("|");
    return `<div class="two-line-cell"><b>${department}</b><span>${position}</span></div>`;
  }
  if (id === "person" && tab === "卡片操作日志" && column === "联系方式/员工类型") {
    const [phone, type] = String(value).split("|");
    return `<div class="two-line-cell"><b>${phone}</b><span>${type}</span></div>`;
  }
  if (id === "person" && tab === "卡片操作日志" && column === "所属企业/部门") {
    const [enterprise, department] = String(value).split("|");
    return `<div class="two-line-cell"><b>${enterprise}</b><span>${department}</span></div>`;
  }
  if (id === "person" && tab === "卡片操作日志" && column === "操作类型") {
    const typeClassMap = { 开卡: "issue", 挂失: "loss", 解挂: "restore", 注销: "cancel", 作废: "void" };
    return `<span class="tag card-operation-tag ${typeClassMap[value] || "default"}"><i></i>${value}</span>`;
  }
  if (id === "company" && tab === "企业信息" && column === "联系人/联系方式") {
    const [contact, phone] = String(value).split("|");
    return `<div class="two-line-cell"><b>${contact}</b><span>${phone}</span></div>`;
  }
  if (id === "company" && tab === "房间关联" && column === "操作人/更新时间") {
    const [operator, updateTime] = String(value).split("|");
    return `<div class="two-line-cell"><b>${operator}</b><span>${updateTime}</span></div>`;
  }
  if ((id === "person" || id === "access") && tab === "通行记录" && column === "通行照片") {
    return `<button type="button" class="access-photo-thumb" data-access-photo="${value}" aria-label="放大查看通行照片"><span>${value}</span></button>`;
  }
  if (id === "vehicle" && tab === "通行记录" && column === "抓拍图 / 车牌照片") {
    const [capture, platePhoto] = String(value).split("|");
    return `<div class="vehicle-record-photos"><button type="button" class="access-photo-thumb vehicle-photo-thumb" data-access-photo="${capture || "抓拍"}" aria-label="查看车辆抓拍图"><span>${capture || "抓拍"}</span></button><button type="button" class="access-photo-thumb vehicle-photo-thumb plate" data-access-photo="${platePhoto || "车牌"}" aria-label="查看车牌照片"><span>${platePhoto || "车牌"}</span></button></div>`;
  }
  if (id === "vehicle" && tab === "通行记录" && column === "过车方向") {
    return `<span class="tag ${value === "入场" ? "primary" : "neutral"}">${value}</span>`;
  }
  if (id === "vehicle" && tab === "通行记录" && column === "放行方式") {
    const releaseClassMap = { 自动放行: "success", 人工抬杆: "warning", 拦截: "danger" };
    return `<span class="tag ${releaseClassMap[value] || "neutral"}">${value || "-"}</span>`;
  }
  if (id === "vehicle" && tab === "通行记录" && column === "车主姓名/联系方式") {
    const [owner, phone] = String(value).split("|");
    return `<div class="two-line-cell"><b>${owner || "-"}</b><span>${phone || "-"}</span></div>`;
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录" && column === "负责人/联系方式") {
    const [owner, phone] = String(value).split("|");
    return `<div class="two-line-cell"><b>${owner || "-"}</b><span>${phone || "-"}</span></div>`;
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录" && index === 0) {
    return `<button class="table-link person-name-link action-detail" data-special-vehicle-record-row="${encodeURIComponent(JSON.stringify(row))}">${value}</button>`;
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录" && column === "过车方向") {
    return `<span class="tag ${value === "入场" ? "primary" : "neutral"}">${value}</span>`;
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录" && column === "放行方式/放行原因") {
    const [method, reason] = String(value).split("|");
    const releaseClassMap = { 自动放行: "success", 人工抬杆: "warning" };
    return `<div class="two-line-cell"><b><span class="tag ${releaseClassMap[method] || "neutral"}">${method || "-"}</span></b><span>${reason || "-"}</span></div>`;
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录" && column === "放行人员/放行时间") {
    const [person, time] = String(value).split("|");
    return `<div class="two-line-cell"><b>${person || "-"}</b><span>${time || "-"}</span></div>`;
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录" && column === "放行方式") {
    const releaseClassMap = { 自动放行: "success", 人工抬杆: "warning" };
    return `<span class="tag ${releaseClassMap[value] || "neutral"}">${value || "-"}</span>`;
  }
  if ((id === "person" || id === "access") && tab === "通行记录" && column === "通行方向") {
    return `<span class="tag ${value === "进入" ? "primary" : "neutral"}">${value}</span>`;
  }
  if (id === "access" && tab === "通行时间段" && column === "时间段配置") {
    return `<div class="time-window-cell">${String(value).split("；").map(x=>`<span>${x}</span>`).join("")}</div>`;
  }
  if (id === "access" && tab === "门禁权限组" && column === "权限组名称") {
    return `<button class="table-link person-name-link action-detail" data-access-group-name="${value}">${value}</button>`;
  }
  if (id === "visitor" && tab === "访客管理" && column === "访客姓名") {
    return `<button class="table-link person-name-link action-detail" data-visitor-row="${encodeURIComponent(JSON.stringify(row))}">${value}</button>`;
  }
  if (id === "visitor" && tab === "访客管理" && column === "手机号/车牌号") {
    const [phone, plate] = String(value).split("|");
    return `<div class="two-line-cell"><b>${phone}</b><span>${plate || "-"}</span></div>`;
  }
  if (id === "visitor" && tab === "访客管理" && column === "被访人/联系方式") {
    const [name, phone] = String(value).split(" / ");
    return `<div class="two-line-cell"><b>${name}</b><span>${phone || "-"}</span></div>`;
  }
  if (id === "visitor" && tab === "安防审批" && column === "访客姓名") {
    return `<button class="table-link person-name-link action-detail" data-visitor-approval-row="${encodeURIComponent(JSON.stringify(row))}">${value}</button>`;
  }
  if (id === "visitor" && tab === "安防审批" && column === "手机号/车牌号") {
    const [phone, plate] = String(value).split("|");
    return `<div class="two-line-cell"><b>${phone}</b><span>${plate || "-"}</span></div>`;
  }
  if (id === "visitor" && tab === "安防审批" && column === "被访人/联系方式") {
    const [name, phone] = String(value).split(" / ");
    return `<div class="two-line-cell"><b>${name}</b><span>${phone || "-"}</span></div>`;
  }
  if (id === "vehicle" && tab === "车场配置" && column === "车场名称") {
    return `<button class="table-link action-vehicle-park-detail" data-vehicle-park-name="${value}" data-vehicle-park-tab="出入口">${value}</button>`;
  }
  if (id === "access" && tab === "人员权限" && column === "姓名") {
    const code = row?.[1] || "";
    return `<button class="table-link person-name-link action-access-person-permission-detail" data-person-code="${code}">${value}</button>`;
  }
  if (id === "access" && tab === "人员权限" && column === "所属企业/部门") {
    const [enterprise, department] = String(value).split("|");
    return `<div class="two-line-cell"><b>${enterprise}</b><span>${department}</span></div>`;
  }
  if (id === "access" && tab === "人员权限" && column === "权限组") {
    return `<span class="access-person-plain-text">${String(value)}</span>`;
  }
  if (id === "video" && tab === "监控设备") {
    return column === "在线状态" ? tag(value) : value;
  }
  if (id === "device" && tab === "设备管理") {
    return column === "在线状态" ? tag(value) : value;
  }
  if (id === "inspection" && tab === "巡检点" && column === "区域") {
    return `<span class="inspection-area-pill">${value}</span>`;
  }
  if (id === "inspection" && tab === "巡检点" && column === "标签") {
    return `<span class="inspection-label-pill">${value}</span>`;
  }
  if (id === "inspection" && tab === "自定义标签" && column === "标签颜色") {
    const colorClass = { "红色": "red", "橙色": "orange", "蓝色": "blue", "绿色": "green" }[value] || "blue";
    return `<span class="inspection-color-pill ${colorClass}"><i></i>${value}</span>`;
  }
  if (id === "inspection" && tab === "自定义区域" && column === "关联巡检点") {
    return Number(value) > 0 ? `<button class="table-link action-area-points" data-area-name="${row[0]}">${value}</button>` : value;
  }
  if (id === "inspection" && tab === "巡检路线" && column === "路线名称") {
    return `<button class="table-link person-name-link action-inspection-route-detail" data-inspection-route-row="${encodeURIComponent(JSON.stringify(row))}">${value}</button>`;
  }
  if (id === "inspection" && tab === "巡检路线" && column === "所含巡检点") {
    const text = String(value || "");
    const countMatch = text.match(/(\d+)\s*个/);
    const count = countMatch ? countMatch[1] : "";
    const summary = text.replace(/等\s*\d+\s*个/g, "").trim();
    return `<div class="inspection-route-point-count-cell"><b>${count || "--"} 个</b><span title="${escapeAttr(text)}">${summary || text}</span></div>`;
  }
  if (id === "alarm" && tab === "巡检工单" && column === "提报人/提报时间") {
    const [name, time] = String(value || "").split(" / ");
    return `<div class="two-line-cell alarm-workorder-reporter"><b>${name || "--"}</b><span>${time || "--"}</span></div>`;
  }
  if (id === "alarm" && tab === "巡检工单" && column === "工单状态") {
    return inspectionWorkorderStatusTag(value);
  }
  if (id === "alarm" && tab === "巡检工单" && column === "工单编号") {
    return `<span class="link action-detail" data-alarm-workorder-row="${encodeURIComponent(JSON.stringify(row))}">${value}</span>`;
  }
  if (id === "alarm" && tab === "告警事件" && column === "告警位置/关联设备") {
    const [location, device] = String(value || "").split("|");
    return `<div class="two-line-cell security-alarm-location-device"><b>${location || "--"}</b><span>${device || "--"}</span></div>`;
  }
  if (id === "alarm" && tab === "告警事件" && ["告警等级", "告警状态"].includes(column)) {
    return tag(value);
  }
  if (index === 0 && hasDocumentedDetail(id, tab) && !(id === "person" && tab === "人员轨迹")) return `<span class="link action-detail">${value}</span>`;
  return tag(value);
}

function inspectionWorkorderStatusTag(status) {
  const classMap = {
    "待派单": "pending",
    "待接单": "pending",
    "处理中": "processing",
    "已完成": "done"
  };
  return `<span class="tag inspection-workorder-status ${classMap[status] || "default"}">${status}</span>`;
}

function getTabConfig(id, tab) {
  const base = tableConfigs[id];
  const clone = JSON.parse(JSON.stringify(base));
  const variants = {
    "已离职人员": [["姓名","人员编号","性别/联系方式","员工类型","所属企业","部门/岗位","离职办理人","离职时间","离职原因"], [["周明","P20240018","男|186 5323 6018","正式员工","园区运营公司","工程部|工程主管","陈晓","2026-06-08 15:20","人员离职"],["赵凯","P20230026","男|185 5323 6026","外包员工","恒泰安保服务","巡检组|巡检员","张振新","2026-05-18 09:30","合同终止"]], "导出"],
    "房间关联": [["房间名称","所属园区","楼栋","楼层","位置全称","绑定企业","操作人/更新时间"], [["18","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 18","大连微冷食品股份有限公司","张明|2026-03-03 08:44"],["16","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 16","大连微冷食品股份有限公司","张明|2026-03-03 08:44"],["17","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 17","大连瑞兴天宝水产品有限公司","吴林|2026-03-03 08:44"],["13","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 13","大连微冷农产品有限公司","孙宁|2026-03-03 08:44"],["14","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 14","联合林洋食品（大连）有限公司","林建东|2026-03-03 08:44"],["12","三里园区","德济楼","1F","三里园区 / 德济楼 / 1F / 12","海洋食品设计与创制高新技术研究院","周明远|2026-03-03 08:44"]], "批量绑定"],
    "人员黑名单": [["姓名","人员编号","性别/联系方式","所属企业/部门","关联车辆","拉黑原因","生效时间","黑名单状态"], [["高启","P20250061","男|185 5323 6108","大连瑞兴天宝水产品有限公司|物流部","鲁B·C1108、鲁B·K3208","多次违规闯入","2026-06-08 10:20 至 2026-12-31 23:59","生效中"],["林峰","P20240028","男|186 0411 3306","联合林洋食品（大连）有限公司|施工组","鲁B·Q8821","证件信息异常","2026-08-01 00:00 至 2026-12-31 23:59","未生效"],["王某","P20230013","女|138 0013 9013","大连微冷农产品有限公司|原生产一部","鲁B·P320F","历史违规","2026-02-12 09:00 至 2026-05-12 23:59","已失效"],["赵凯","P20230026","男|185 5323 6026","海洋食品设计与创制高新技术研究院|巡检组","无","通行权限复核未通过","2026-04-01 00:00 至 2026-04-30 23:59","已失效"]], "新增黑名单"],
    "通行记录": [["姓名","人员编号","通行时间","通行照片","通行方向","设备名称","设备位置","解锁方式","创建时间"], [["李晨","P20260042","2026-06-10 10:38:12","李","进入","A栋大厅门禁01","A栋 / 1F / 大厅","人脸","2026-06-10 10:38:13"],["张振新","P20260018","2026-06-10 09:16:45","张","离开","东门访客闸机02","微冷园区 / 东门","刷卡","2026-06-10 09:16:46"],["闫卓宇","P20260031","2026-06-10 08:42:06","闫","进入","仓库北门门禁02","A栋 / 1F / 仓储区","人脸","2026-06-10 08:42:07"],["王浩","P20250077","2026-06-09 18:21:33","王","离开","A栋侧门门禁03","A栋 / 1F / 侧门","刷卡","2026-06-09 18:21:34"]], "导出记录"],
    "人员轨迹": [["姓名","人员编号","性别/联系方式","员工类型","最后出现位置","采集设备/类型","最后出现时间"], [["李晨","P20260042","男|186 6178 2304","正式员工","A栋 / 1F / 大厅","A栋大厅门禁01|门禁","2026-06-10 10:38:12"],["闫卓宇","P20260031","男|185 5323 6081","外包员工","A栋 / 1F / 仓储区","仓库北门01|摄像头","2026-06-10 10:20:06"],["张振新","P20260018","男|185 5323 6080","正式员工","微冷园区 / 东门","东门访客闸机02|门禁","2026-06-10 09:16:45"]], "查询轨迹"],
    "卡片管理": [["物理卡号","姓名","人员编号","联系方式","员工类型","所属企业/部门","卡片状态","开卡时间"], [["800001","张振新","P20260018","185 5323 6080","正式员工","园区运营公司|安保部","正常","2026-05-12 09:10"],["800018","闫卓宇","P20260031","185 5323 6081","外包员工","恒泰安保服务|巡检组","挂失","2026-05-18 10:20"],["800026","-","-","-","-","-","正常","-"]], "发卡"],
    "卡片操作日志": [["姓名","人员编号","联系方式/员工类型","所属企业/部门","物理卡号","操作类型","操作人","操作时间"], [["张振新","P20260018","185 5323 6080|正式员工","园区运营公司|安保部","800001","开卡","陈晓","2026-05-12 09:10"],["闫卓宇","P20260031","185 5323 6081|外包员工","恒泰安保服务|巡检组","800018","挂失","张振新","2026-06-09 16:20"],["闫卓宇","P20260031","185 5323 6081|外包员工","恒泰安保服务|巡检组","800018","解挂","张振新","2026-06-10 09:08"],["李晨","P20260042","186 6178 2304|正式员工","蓝谷数字能源|研发中心","800031","注销","陈晓","2026-06-11 14:22"],["陈航","P20260052","185 5323 6086|正式员工","园区运营公司|安保部","800045","作废","张振新","2026-06-12 11:08"]], "导出日志"],
    "通行时间段": [["名称","重复周期","时间段配置","关联权限组数","备注","操作人","更新时间"], [["工作日通行","法定工作日","08:00-12:00；13:00-18:00","3","办公区工作日通行","张振新","2026-06-08 09:20"],["全天通行","每天","00:00-23:59","5","安保和运维岗位全天通行","李浩","2026-06-01 10:10"],["节假日值守","法定节假日","09:00-12:00；14:00-18:00","1","节假日值班人员使用","王涛","2026-05-22 16:30"],["临时施工通行","执行一次","2026-06-20 08:30-17:30","2","仅用于当日施工人员临时授权","陈晓","2026-06-18 11:05"]], "新增时间段"],
    "门禁权限组": [["权限组名称","通行时间段","关联设备数","关联人员数","状态"], accessPermissionGroups.map(item => [item.name, item.timePeriod, `${item.deviceCount}`, `${item.personCount}`, item.status]), "新增权限组"],
    "按部门授权": [["部门名称","所属企业","人员数","已授权权限组","覆盖设备数","最近更新时间"], [["安保部","园区运营公司","18","全天通行组、重点区域组","20","2026-06-08 10:20"],["研发中心","蓝谷数字能源","46","主楼门禁组","12","2026-06-05 14:10"]], "配置权限组"],
    "人员权限": [["姓名","人员编号","所属企业/部门","员工类型","人员状态","权限组","有效期","综合下发状态"], accessPersonPermissionRows.map(item => [item.name, item.code, `${item.enterprise}|${item.department}`, item.employeeType, item.personStatus, item.permissionGroups.join("、"), item.validPeriod, accessPersonOverallIssueStatus(item.details)]), "按人员授权"],
    "基础权限配置": null,
    "车辆管理": [["车牌号","车辆品牌","车辆颜色","绑定人员","绑定状态","通行时段","有效期","授权状态","最近修改时间"], [["鲁B·A726Q","大众","白色","李晨","已绑定","工作日 07:00-22:00","2026-12-31","启用","2026-06-08 09:20"],["鲁B·F918D","丰田","黑色","张振新","已绑定","全天通行","长期","启用","2026-06-01 10:10"],["鲁B·C1108","厢式货车","蓝色","高启","已绑定","未配置","-","停用","2026-05-18 08:20"],["鲁B·D520M","特斯拉","灰色","陈可","已解绑","-","-","停用","2026-05-20 14:15"]], "新增车辆"],
    "车辆黑名单": [["车牌号","车主姓名/联系方式","有效期","禁行原因","状态","操作人/更新时间"], [["鲁B·C1108","高启|185 5323 6108","2026-05-01 至 2026-08-01","多次违规停放","生效中","张振新|2026-06-08 10:22:13"],["鲁B·Q8821","林峰|186 0411 3306","2026-06-08 至 长期","安全事件关联车辆","生效中","张振新|2026-06-08 10:35:41"],["鲁B·H3320","陈可|186 6178 2307","2026-04-01 至 2026-05-31","证件异常","已失效","李浩|2026-06-01 09:12:20"],["鲁B·K3208","高启|185 5323 6108","2026-08-01 至 2026-12-31","人员黑名单关联车辆","未生效","系统同步|2026-06-08 10:20:05"]], "新增黑名单"],
    "车辆白名单": [["车牌号","车主姓名/联系方式","有效期","放行原因","状态","操作人/更新时间"], [["鲁B·F918D","张振新|185 5323 6080","2026-01-01 至 长期","园区管理层固定车辆","生效中","张振新|2026-06-08 10:12:28"],["鲁B·S5506","孙宁|139 5323 1137","2026-05-01 至 2026-06-30","长期供应商冷链配送车辆","已失效","李浩|2026-06-08 09:41:16"]], "新增白名单"],
    "特殊车辆管理": [["车牌号","所属单位","负责人/联系方式","有效期","状态","操作人/更新时间"], [["鲁B·L8899","青岛冷链物流有限公司","赵强|138****6677","2026-06-10 至 2027-06-09","生效中","李浩|2026-06-10 09:36:12"],["鲁B·K3208","恒曜供应链有限公司","孙宁|139****1137","2026-03-01 至 2026-12-31","生效中","张振新|2026-06-08 11:18:30"],["临时-0616-003","临时承运","陈一鸣|186****6020","2026-06-16 至 2026-06-16","已失效","门卫王涛|2026-06-16 17:28:09"]], "新增特殊车辆"],
    "特殊车辆通行记录": [["车牌号","所属单位","负责人/联系方式","通过时间","出入口","过车方向","放行方式/放行原因","放行人员/放行时间"], specialVehicleAccessRecordRows, "导出记录"],
    "视频巡检路线": [["路线名称","点位最短播放时长（s）","关联点位数","是否开启","备注","操作人","更新时间"], [["园区主干道视频路线","10","8","启用","覆盖正门、围墙、仓储区等重点视频点位","张振新","2026-06-08 09:20"],["园区外围视频路线","15","12","启用","覆盖园区外围道路、围墙和夜间巡更区域","李浩","2026-05-28 16:12"],["地下车库视频路线","20","6","停用","地下空间视频点位，启用前需复核离线摄像头","王涛","2026-05-21 11:32"]], "新增路线"],
    "巡更计划": [["计划名称","巡检路线","巡检频率","开始时间","生效日期","是否开启"], [["重点区域每日巡更","园区主干道视频路线","每天","08:30-09:30","2026-01-01 至 2026-12-31","启用"],["夜间周界巡更","园区外围视频路线","每天","22:00-23:30","2026-01-01 至 2026-12-31","启用"]], "新增计划"],
    "周界设置": [["任务名称","任务状态","关联摄像头","所属园区 / 区域","规则数量","告警级别","去重冷却时长","最近修改人"], [["东北门外围夜间防攀爬","已启用","CAM-2024-001 东北门外围02","微冷园区 / 东北门","区域入侵 1 + 越线 1","紧急","30 秒","张振新"],["仓储区禁入监测","已启用","CAM-2024-018 仓库北门01","A栋 / 仓储区","区域入侵 2","重要","60 秒","李浩"],["西南门反向闯入","已停用","CAM-2024-006 西南门01","微冷园区 / 西南门","越线入侵 1","重要","30 秒","张振新"]], "新增周界任务"],
    "监控设备": null,
    "告警配置": [["告警类型","告警等级","备注","更新人","更新时间"], [["热成像过温告警","紧急","热成像识别到设备或区域温度超过安全阈值时使用。","张振新","2026-07-21 09:20"],["人员聚集告警","重要","监控区域内人员密度异常升高时使用。","张振新","2026-07-21 09:20"],["消防通道占用告警","重要","消防通道被车辆、货物或其他物品占用时使用。","张振新","2026-07-21 09:20"],["离岗告警","一般","值守岗位在规定时间内未检测到人员时使用。","张振新","2026-07-21 09:20"],["睡岗告警","一般","值守人员出现睡岗行为时使用。","张振新","2026-07-21 09:20"],["人员黑名单告警","紧急","识别到人员黑名单对象进入管控区域时使用。","张振新","2026-07-21 09:20"]], ""],
    "巡检工单": [["工单编号","巡检点","提报内容","预计关单时间","提报人/提报时间","工单状态"], [["XJGD-20260721-004","A栋 / 1F / 消防栓-03","消防栓箱门无法正常闭合，需现场核查","--","王涛 / 2026-07-21 10:18","待派单"],["XJGD-20260721-003","南门入口闸机","核查黑名单人员是否已进入管控区域","2026-07-21 11:30","张振新 / 2026-07-21 10:02","待接单"],["XJGD-20260721-002","A栋 / 2F / 疏散通道","确认消防通道是否被货物占用并清理现场","2026-07-21 10:30","闫卓宇 / 2026-07-21 09:26","处理中"],["XJGD-20260721-001","A栋 / 卸货区","核查卸货区人员聚集原因并完成疏导","2026-07-21 09:30","李浩 / 2026-07-21 08:28","已完成"]], "导出工单"],
    "自定义标签": [["标签名称","标签颜色","关联巡检点数","创建人","创建时间","状态"], [["消防巡检","红色","18","张振新","2026-05-10 09:20","启用"],["安全巡检","橙色","26","张振新","2026-05-10 09:22","启用"]], "新增标签"],
    "自定义区域": [["区域名称","所属园区","上级区域","关联巡检点数","创建人","状态"], [["A栋东区","微冷园区","A栋 / 1F","8","张振新","启用"],["外围北区","微冷园区","园区外围","12","张振新","启用"]], "新增区域"],
    "巡检计划": [["计划名称","巡检路线","巡检频率","巡检执行人","计划时间","生成任务数","状态"], [["消防设施每日巡检","A栋消防巡检路线","每天","闫卓宇、王涛","08:00-11:00","162","启用"],["园区外围每日巡检","外围设施路线","每天","张振新","07:30-09:00","165","启用"],["季度专项安全巡检","全园区专项路线","每季度","巡检组全员","09:00-17:00","2","停用"]], "新增计划"],
    "巡检路线": [["路线名称","路线编码","巡检点数","预计时长","关联计划数","状态","最近修改时间"], [["A栋消防巡检路线","IR-001","12","120 分钟","1","启用","2026-06-02 09:20"],["外围设施路线","IR-002","16","90 分钟","1","启用","2026-05-28 16:12"],["地下车库路线","IR-003","10","100 分钟","1","启用","2026-05-21 11:32"]], "新增路线"],
    "巡检点": [["巡检点编号","巡检点名称","所属园区","自定义区域","标签","检查要求","基础状态"], [["IP-001","A栋 1F 消防栓-03","微冷园区","A栋 / 1F / 东区","消防巡检","检查压力、铅封、外观","启用"],["IP-018","A栋 2F 疏散通道","微冷园区","A栋 / 2F / 西区","安全巡检","检查通道畅通与照明","启用"],["IP-026","北侧围墙 04","微冷园区","外围 / 北区","设施巡检","检查围墙与围栏完整性","停用"]], "新增巡检点"],
    "修改记录": [["调整日期","调整类型","原排班人员","调整后人员","调整原因","操作人","更新时间"], [["2026-07-09","请假顶班","陈航","闫卓宇","陈航病假，闫卓宇顶班","管理员","2026-07-10 09:20"],["2026-07-13","人员调班","李浩","王涛","李浩与王涛互换班次","管理员","2026-07-12 18:10"],["2026-07-13","人员调班","王涛","李浩","王涛与李浩互换班次","管理员","2026-07-12 18:10"],["2026-07-24","队长请假","钱队","未安排顶替","钱队外出培训，不安排顶替","管理员","2026-07-21 08:30"]], "导出记录"],
    "设备维护": [["设备名称","设备编码","设备类型","维护类型","操作说明","操作人","操作时间"], [["东北门外围02","CAM-2024-001","监控设备","设备注册","新设备录入系统","张振新","2026-05-27 09:30"],["A栋大厅门禁01","ACC-2024-008","门禁设备","设备移机","从 A栋侧门移至大厅","李浩","2026-06-03 14:20"],["南门车辆道闸01","BAR-2024-003","道闸设备","设备停用","网络故障，暂时停用","王涛","2026-06-10 09:18"]], "新增维护记录"],
    "位置绑定": [["位置路径","区域节点","已绑定设备数","监控设备","门禁设备","道闸设备","最近更新时间"], [["微冷园区 / A栋 / 1F / 大厅","大厅","8","4","4","0","2026-06-10 09:20"],["微冷园区 / 东北门","东北门","5","3","1","1","2026-06-08 16:12"],["微冷园区 / 停车场 / B1 / B区","B区","6","4","0","2","2026-06-02 11:32"]], "绑定设备"],
    "操作日志": [["操作类型","设备名称","设备编码","设备类型","操作详情","操作人","操作时间","IP 地址"], [["设备停用","南门车辆道闸01","BAR-2024-003","道闸设备","设备网络故障，暂停服务","王涛","2026-06-10 09:18","10.10.1.28"],["位置绑定","仓库北门01","CAM-2024-018","监控设备","绑定至 A栋 / 1F / 仓储区","李浩","2026-06-09 14:20","10.10.1.22"]], "导出日志"]
  };
  const scopedVariants = {
    "access:通行记录": [["姓名","人员编号","人员类型","通行时间","通行照片","通行方向","设备名称","设备位置","解锁方式","创建时间"], [["李晨","P20260042","正式员工","2026-06-10 10:38:12","李","进入","A栋大厅门禁01","A栋 / 1F / 大厅","人脸","2026-06-10 10:38:13"],["张振新","P20260018","正式员工","2026-06-10 09:16:45","张","离开","东门访客闸机02","微冷园区 / 东门","刷卡","2026-06-10 09:16:46"],["闫卓宇","P20260031","外包员工","2026-06-10 08:42:06","闫","进入","仓库北门门禁02","A栋 / 1F / 仓储区","人脸","2026-06-10 08:42:07"],["王浩","P20250077","实习生","2026-06-09 18:21:33","王","离开","A栋侧门门禁03","A栋 / 1F / 侧门","刷卡","2026-06-09 18:21:34"],["赵一凡","访客","访客","2026-06-10 10:20:07","赵","进入","东门访客闸机02","微冷园区 / 东门","人脸","2026-06-10 10:20:08"]], "导出记录"],
    "visitor:安防审批": [["访客姓名","手机号/车牌号","访问企业","被访人/联系方式","拜访时间","来访事由","预约状态"], visitorSecurityApprovalRows(), ""],
    "vehicle:通行记录": [["车牌号","抓拍图 / 车牌照片","通过时间","出入口","过车方向","放行方式","放行原因","车主姓名/联系方式"], vehicleAccessRecordRows, "导出记录"],
    "patrol:巡检计划": [["计划名称","巡检路线","生效日期","巡检频率/时间","是否开启","更新时间"], [
      ["重点区域每日巡更","园区主干道视频路线","2026-01-01 至 2026-12-31","每天3次|9:00 - 10:00、12:00 - 14:00、20:00 - 22:00","开启","2026-07-15 09:20"],
      ["夜间周界巡更","园区外围视频路线","2026-01-01 至 2026-12-31","每天1次|22:00 - 23:30","开启","2026-07-12 17:42"],
      ["消防通道视频巡更","消防通道视频路线","2026-07-01 至 长期","每周3次（周一、周三、周五）|9:00 - 10:00","开启","2026-07-10 11:16"],
      ["地下空间巡更","地下车库视频路线","2026-06-01 至 2026-12-31","每周3次（周一、周二、周三）|9:00-11:00","关闭","2026-07-08 14:08"],
      ["冷链仓储巡更","冷库外围视频路线","2026-07-15 至 长期","每周2次（周二、周四）|15:00 - 16:30","开启","2026-07-07 16:32"],
      ["月度园区全域巡更","全园区视频巡更路线","2026-01-01 至 2026-12-31","每月3次（1日、15日、28日）|9:30 - 11:30","开启","2026-07-01 10:05"]
    ], "新增计划"],
    "patrol:巡检任务": [base.columns,base.rows,"导出任务"],
    "perimeter:周界告警": [base.columns,base.rows,"导出告警"],
    "inspection:巡检点": [["巡检点名称","区域","标签","所属园区","备注"], [["室外消火栓-27","海尔西园区东南角","消防巡检","海尔西园区","检查环境周围是否有积水"],["室外消火栓-28","海尔西园区西北角","保洁巡检","海尔西园区","检查环境周围是否有积水"],["25号动火巡检","1#东","安全巡检","微冷园区","检查动火区域安全防护"],["售楼部一楼玻璃","1#西","保洁巡检","微冷园区","检查玻璃及周边环境"]], "新增巡检点"],
    "inspection:自定义标签": [["标签名称","所属园区","关联巡检点"], [["消防巡检","海尔西园区","18"],["保洁巡检","海尔西园区","26"],["安全巡检","微冷园区","15"],["设施巡检","微冷园区","0"]], "批量新增标签"],
    "inspection:自定义区域": [["区域名称","所属园区","关联巡检点"], [["海尔西园区东南角","海尔西园区","32"],["海尔西园区西北角","海尔西园区","45"],["1#东","微冷园区","0"],["1#西","微冷园区","0"]], "批量新增区域"],
    "inspection:巡检计划": [["计划名称","巡检路线/生效日期","巡检频率/时间","所属园区/巡检执行人","更新时间","计划状态"], [
      ["日常保洁巡检计划","黑龙江路主路线（预计：1小时30分钟）|2025-07-01 至 2025-09-30","每周3次（周一、周三、周五）|13:00 - 14:30","海尔西园区|张三、李四、王五","2025-08-01 13:14","启用"],
      ["消防设施每日巡检","A栋消防巡检路线（预计：2小时）|2026-01-01 至 长期","每天1次|08:00 - 10:00","微冷园区|闫卓宇、王涛","2026-07-15 09:20","启用"],
      ["园区外围每日巡检","外围设施路线（预计：1小时30分钟）|2026-01-01 至 长期","每天1次|07:30 - 09:00","微冷园区|张振新","2026-07-12 17:42","启用"],
      ["地下车库环境巡检","地下车库路线（预计：1小时40分钟）|2026-06-01 至 2026-12-31","每周3次（周一、周三、周五）|14:00 - 15:40","微冷园区|李浩","2026-07-08 14:08","停用"],
      ["季度专项安全巡检","全园区专项路线（预计：8小时）|2026-01-01 至 2026-12-31","每季度1次|09:00 - 17:00","微冷园区|巡检组全员","2026-07-01 10:05","停用"]
    ], "新增计划"],
    "inspection:巡检路线": [["路线名称","所含巡检点","所属园区","预估时间"], [["A栋消防巡检路线","A栋 1F 消防栓-03、A栋 2F 疏散通道、A栋配电间等 12 个","微冷园区","120 分钟"],["外围设施路线","北侧围墙 04、南门通道、卸货区、外围北区等 16 个","微冷园区","90 分钟"],["地下车库路线","B1 车道入口、B1 配电间、B区消防栓等 10 个","微冷园区","100 分钟"]], "新增路线"],
    "inspection:巡检任务": [base.columns,base.rows,"新增临时任务"]
  };
  const v = scopedVariants[`${id}:${tab}`] || variants[tab];
  if (v) { clone.columns=v[0]; clone.rows=v[1]; clone.primary=v[2]; clone.filters=["状态 / 类型","所属园区 / 区域","时间范围","名称 / 编号 / 关键词"]; }
  if (id === "schedule" && tab === "修改记录") {
    clone.filters = ["调整月份", "调整类型", "人员"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.tableClass = "schedule-record-table";
    clone.note = "修改记录用于排班调整留痕和考勤对账，仅支持查询和导出，不提供编辑或删除。";
  }
  if (id === "inspection" && inspectionPointManageTabs.includes(tab)) {
    clone.filters = tab === "巡检点" ? ["巡检点名称", "区域", "标签", "所属园区"]
      : tab === "自定义标签" ? ["标签名称", "所属园区"]
      : ["区域名称", "所属园区"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = tab === "巡检点" ? "inspection-point-table" : tab === "自定义标签" ? "inspection-tag-table" : "inspection-area-table";
    clone.note = tab === "自定义区域" ? "自定义区域，主要是把巡检点按照物业空间进行归类，例如巡检点可能会有：1#东、1#西、1#南小岛等等；这都归属于这里的区域：1#" : "";
  }
  if (id === "person" && tab === "已离职人员") {
    clone.filters = ["姓名/人员编号/联系方式", "性别", "员工类型", "所属企业/部门", "离职时间"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showRefresh = false;
    clone.tableClass = "personnel-resigned-table";
    clone.note = "已离职人员仅用于查询和导出离职记录，不支持新增、编辑或再次办理离职。";
  }
  if (id === "person" && tab === "人员黑名单") {
    clone.filters = ["姓名/人员编号","所属企业/部门","关联车辆","黑名单状态","生效时间"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.tableClass = "person-blacklist-table";
    clone.note = "黑名单状态按生效时间段自动判断：未到开始时间为未生效，时间段内为生效中，超过结束时间为已失效；有关联车辆时，系统提示同步限制关联车辆通行。";
  }
  if (id === "alarm" && tab === "告警配置") {
    clone.filters = ["告警类型", "告警等级"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "alarm-level-config-table";
    clone.note = "告警类型固定为六类，仅配置告警等级：紧急、重要、一般；修改后默认仅对后续新产生的告警事件生效。";
  }
  if (id === "alarm" && tab === "告警事件") {
    clone.filters = ["告警编号/位置/设备", "告警类型", "告警等级", "告警状态", "告警时间"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.tableClass = "alarm-event-table";
    clone.note = "告警等级由告警配置带出；已确认的告警可生成安防工单。";
  }
  if (id === "alarm" && tab === "巡检工单") {
    clone.filters = ["工单编号", "巡检点", "提报时间", "工单状态", "是否超时"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.tableClass = "alarm-workorder-table";
    clone.note = "巡检工单列表不展示统计卡片；列表字段为序号、工单编号、巡检点、提报内容、预计关单时间、提报人/提报时间、工单状态。工单状态包括待派单、待接单、处理中、已完成。巡检工单不支持直接回复并关单。";
  }
  if ((id === "person" || id === "access") && tab === "通行记录") {
    clone.filters = id === "access" ? ["姓名/人员编号","人员类型","通行时间","通行方向","设备名称","解锁方式"] : ["姓名/人员编号","通行时间","通行方向","设备名称","解锁方式"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showActions = true;
    clone.showRefresh = false;
    clone.tableClass = "access-record-table";
    clone.note = "通行记录由门禁设备自动上报生成，仅支持查询和导出，不支持人工新增、编辑或删除。";
  }
  if (id === "vehicle" && tab === "通行记录") {
    clone.filters = ["车牌号/姓名/联系方式", "出入口", "过车方向", "放行方式", "放行原因", "通行时间"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.tableClass = "vehicle-access-record-table";
    clone.note = "车辆通行记录由车牌识别与道闸设备自动采集，列表仅支持查询和导出，不支持人工新增、编辑、删除或查看详情。";
  }
  if (id === "person" && tab === "人员轨迹") {
    clone.filters = ["姓名/人员编号/联系方式","员工类型","最后出现时间"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showRefresh = false;
    clone.tableClass = "personnel-track-table";
    clone.note = "列表展示人员最后一次出现位置、采集设备/类型和最后出现时间；轨迹明细通过“查看详情”或工具栏“查询轨迹”查看。";
  }
  if (id === "person" && tab === "卡片操作日志") {
    clone.filters = ["姓名/人员编号/联系方式","员工类型","所属企业/部门","物理卡号","操作类型","操作时间"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.tableClass = "card-log-table";
    clone.note = "卡片操作日志用于追溯开卡、挂失、解挂、注销、作废操作，仅支持查询和导出，不支持新增、编辑或删除。";
  }
  if (id === "company" && tab === "房间关联") {
    clone.filters = ["所属园区","企业名称","房间名称"];
    clone.tableClass = "company-room-relation-table";
  }
  if (id === "visitor" && tab === "访客管理") {
    clone.filters = ["访客姓名/手机号/车牌号", "访问企业", "被访人姓名/联系方式", "拜访时间", "预约状态", "到访状态"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.tableClass = "visitor-appointment-table";
    clone.note = "预约状态和到访状态独立展示；PC端不提供审批、取消预约、修改预约、代客预约、签到或签退。";
  }
  if (id === "visitor" && tab === "安防审批") {
    clone.filters = ["访客姓名/手机号/车牌号", "访问企业", "被访人姓名/联系方式", "拜访时间"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showActions = true;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "visitor-security-approval-table";
    clone.note = "安防审批仅处理被访人已通过的第二级审批任务；不支持批量通过或批量拒绝。";
  }
  if (id === "access" && tab === "通行时间段") {
    clone.filters = ["名称", "重复周期"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "access-time-period-table";
    clone.note = "";
  }
  if (id === "access" && tab === "门禁权限组") {
    clone.filters = ["权限组名称", "通行时间段", "状态"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "access-permission-group-table";
    clone.note = "";
  }
  if (id === "access" && tab === "人员权限") {
    clone.filters = ["姓名/人员编号", "所属企业/部门", "员工类型", "权限组名称", "下发状态", "有效期"];
    clone.showSelection = false;
    clone.showIndex = true;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "access-person-permission-table";
    clone.note = "列表按人员聚合展示，一人一行；“综合下发状态”为该人员全部权限组的聚合状态：任一权限组下发失败则显示失败，存在正在下发或待下发则显示对应状态，全部成功才显示下发成功。";
  }
  if (id === "vehicle" && tab === "车场配置") {
    clone.filters = ["车场名称", "所属园区", "车场状态"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "vehicle-parking-table";
    clone.note = "列表统计字段由系统自动汇总；详情大抽屉展示出入口和监控配置。";
  }
  if (id === "vehicle" && tab === "车辆管理") {
    clone.filters = ["所属园区", "车牌号", "人员姓名", "绑定状态", "授权状态"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "vehicle-binding-table";
    clone.note = "车辆管理页统一维护车牌档案和人车绑定；新增车辆不直接授权，车辆授权通过行内“授权配置”打开弹窗。";
  }
  if (id === "vehicle" && tab === "车辆黑名单") {
    clone.filters = ["车牌号/姓名/联系方式", "禁行原因", "有效期", "状态"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
  }
  if (id === "vehicle" && tab === "车辆白名单") {
    clone.filters = ["状态", "车牌号", "放行原因", "生效时间"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
  }
  if (id === "vehicle" && tab === "特殊车辆管理") {
    clone.filters = ["车牌号/所属单位/负责人/联系方式", "有效期", "状态"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
  }
  if (id === "vehicle" && tab === "通行记录") {
    clone.filters = ["车牌号/姓名/联系方式", "出入口", "过车方向", "放行方式", "放行原因", "通行时间"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.note = "车辆通行记录由车牌识别设备自动采集，仅支持查询和导出，不支持人工新增、编辑、删除或查看详情。";
  }
  if (id === "vehicle" && tab === "特殊车辆通行记录") {
    clone.filters = ["车牌号/所属单位/负责人/联系方式", "出入口", "过车方向", "放行方式", "放行人员", "通行时间"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showActions = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.note = "特殊车辆通行记录为车辆通行记录子集，汇总已登记特殊车辆和岗亭值守现场放行的特殊车辆记录，仅支持查询和导出。";
  }
  if (id === "patrol" && tab === "视频巡检路线") {
    clone.filters = ["路线名称", "是否开启"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.tableClass = "patrol-route-table";
    clone.note = "视频巡检路线用于维护在线视频巡更路线；点位序列通过行内“巡检点位”进入配置。";
  }
  if (id === "patrol" && tab === "巡检计划") {
    clone.filters = ["巡检计划/路线", "巡检频率", "是否开启"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "patrol-plan-table";
    clone.note = "";
  }
  if (id === "inspection" && tab === "巡检计划") {
    clone.filters = ["巡检计划", "所属园区", "巡检执行人", "计划状态"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "inspection-plan-table";
    clone.note = "";
  }
  if (id === "inspection" && tab === "巡检路线") {
    clone.filters = ["巡检路线", "所属园区"];
    clone.showIndex = true;
    clone.showSelection = false;
    clone.showRefresh = false;
    clone.showToolbarLabel = false;
    clone.tableClass = "inspection-route-table";
    clone.note = "";
  }
  return clone;
}

function rowActions(id,row,ri) {
  const tab = currentTab[id] || modules.find(x=>x.id===id).tabs[0];
  if (id === "visitor" && tab === "访客管理") {
    const rowData = encodeURIComponent(JSON.stringify(row));
    return `<button class="btn text action-detail" data-visitor-row="${rowData}">查看详情</button>`;
  }
  if (id === "visitor" && tab === "安防审批") {
    if (row[6] === "待安防审批") return `<button class="btn text action-business" data-act="审批通过">通过</button><button class="btn text danger action-business" data-act="审批拒绝">拒绝</button>`;
    return "—";
  }
  const editableTabs = ["企业信息","房间关联","人员档案","卡片管理","权限下发管理","通行时间段","门禁权限组","按部门授权","按人员授权","基础权限配置","车辆管理","车辆黑名单","车辆白名单","特殊车辆管理","视频巡检路线","巡检计划","周界设置","告警配置","自定义标签","自定义区域","巡检路线","巡检点","设备台账","位置绑定"];
  const deleteTabs = ["企业信息","车辆黑名单","车辆白名单","特殊车辆管理","视频巡检路线","巡检计划","周界设置","自定义标签","自定义区域","巡检路线","巡检点"];
  const toggleTabs = ["通行时间段","门禁权限组","车辆白名单","特殊车辆管理","视频巡检路线","巡检计划","周界设置","自定义标签","自定义区域","巡检路线","巡检计划","巡检点","设备台账"];
  if (id === "access" && tab === "通行时间段") return `<button class="btn text action-edit">编辑</button><button class="btn text danger action-confirm" data-act="删除时间段">删除</button>`;
  if (id === "access" && tab === "门禁权限组") return `<button class="btn text action-edit" data-access-group-name="${row[0]}">编辑</button><button class="btn text action-access-group-devices" data-access-group-name="${row[0]}">关联设备</button><button class="btn text danger action-confirm" data-act="删除权限组">删除</button>`;
  if (id === "access" && tab === "人员权限") return `<button class="btn text action-access-person-single-authorize" data-person-code="${row[1]}">个人授权</button>`;
  if (id === "company" && tab === "房间关联") return `<button class="btn text danger" data-action="解绑房间" data-room-name="${row[0]}">解绑</button>`;
  if (id === "person" && tab === "已离职人员") return `<button class="btn text danger action-resigned-delete" data-person-name="${row[0]}" data-person-code="${row[1]}">删除</button>`;
  if (id === "person" && tab === "人员黑名单") return `<button class="btn text action-edit" data-blacklist-code="${row[1]}" data-blacklist-reason="${row[5]}" data-blacklist-time="${row[6]}">编辑</button>${row[7] !== "已失效" ? `<button class="btn text danger action-confirm" data-act="解除拉黑">解除拉黑</button>` : ""}`;
  if (id === "alarm" && tab === "告警配置") return `<button class="btn text action-edit" data-alarm-type="${escapeAttr(row[0])}" data-alarm-level="${escapeAttr(row[1])}" data-alarm-remark="${escapeAttr(row[2])}">编辑</button>`;
  if (id === "device" && tab === "设备管理") {
    const rowData = encodeURIComponent(JSON.stringify(row));
    return `<button class="btn text action-device-bind-location" data-device-row="${rowData}">绑定位置</button><button class="btn text action-device-edit">编辑</button><button class="btn text danger action-device-delete">删除</button>`;
  }
  if (id === "alarm" && tab === "告警事件") {
    if (row.includes("待确认")) return `<button class="btn text action-business" data-act="确认告警">确认</button><button class="btn text danger action-business" data-act="误报关闭">误报关闭</button>`;
    if (row.includes("已确认")) return `<button class="btn text action-business" data-act="生成工单">生成工单</button>`;
    return "—";
  }
  if (id === "alarm" && tab === "巡检工单") {
    if (row.includes("待派单")) return `<button class="btn text action-detail">查看</button><button class="btn text action-business" data-act="派单">派单</button>`;
    if (row.includes("处理中")) return `<button class="btn text action-detail">查看</button><button class="btn text action-business" data-act="处理工单">处理</button>`;
    return `<button class="btn text action-detail">查看</button>`;
  }
  if (id === "person" && tab === "人员轨迹") return `<button class="btn text action-detail" data-person-code="${row[1]}">查看详情</button>`;
  if (id === "vehicle" && tab === "车场配置") {
    const lotName = row[0];
    return `<button class="btn text action-edit">编辑</button><button class="btn text action-vehicle-park-detail" data-vehicle-park-name="${lotName}" data-vehicle-park-tab="出入口">出入口配置</button><button class="btn text action-vehicle-monitor-bind" data-vehicle-park-name="${lotName}">绑定监控</button><button class="btn text danger action-confirm" data-act="删除车场">删除</button>`;
  }
  if (id === "vehicle" && tab === "车辆管理") return `<button class="btn text action-vehicle-auth">授权配置</button><button class="btn text action-confirm" data-act="下发至边缘端">下发</button><button class="btn text danger action-confirm" data-act="解绑车辆">解绑</button>`;
  if (id === "vehicle" && ["车辆白名单","特殊车辆管理"].includes(tab)) {
    const toggleText = row.includes("启用") ? "停用" : "启用";
    return `<button class="btn text action-edit">编辑</button><button class="btn text action-confirm" data-act="${toggleText}${tab.replace("车辆","")}">${toggleText}</button><button class="btn text danger action-confirm" data-act="删除">删除</button>`;
  }
  if (id === "inspection" && tab === "自定义标签") {
    const linkedCount = Number(row[2] || 0);
    if (linkedCount > 0) return `<button class="btn text disabled-action" title="已关联巡检点，不可编辑">编辑</button><button class="btn text danger disabled-action" title="已关联巡检点，不可删除">删除</button>`;
    return `<button class="btn text action-edit">编辑</button><button class="btn text danger action-confirm" data-act="删除标签">删除</button>`;
  }
  if (id === "inspection" && tab === "自定义区域") {
    const linkedCount = Number(row[2] || 0);
    if (linkedCount > 0) return `<button class="btn text disabled-action" title="已关联巡检点，不可编辑">编辑</button><button class="btn text danger disabled-action" title="已关联巡检点，不可删除">删除</button>`;
    return `<button class="btn text action-edit" data-area-name="${row[0]}" data-area-park="${row[1]}">编辑</button><button class="btn text danger action-confirm" data-act="删除区域">删除</button>`;
  }
  if (id === "inspection" && tab === "巡检路线") {
    const rowData = encodeURIComponent(JSON.stringify(row));
    return `<button class="btn text action-edit" data-inspection-route-row="${rowData}">编辑</button><button class="btn text danger action-confirm" data-act="删除">删除</button>`;
  }
  if (id === "inspection" && tab === "巡检计划") {
    return `<button class="btn text action-edit">编辑</button><button class="btn text danger action-confirm" data-act="删除">删除</button>`;
  }
  if (id === "inspection" && inspectionPointManageTabs.includes(tab)) {
    return `<button class="btn text action-edit">编辑</button><button class="btn text danger action-confirm" data-act="删除">删除</button>`;
  }
  if (id === "patrol" && tab === "视频巡检路线") {
    return `<button class="btn text action-patrol-route-points" data-route-name="${row[0]}">巡检点位</button><button class="btn text action-edit">修改</button><button class="btn text danger action-confirm" data-act="删除">删除</button>`;
  }
  if (id === "patrol" && tab === "巡检计划") {
    return `<button class="btn text action-edit">编辑</button><button class="btn text danger action-patrol-plan-delete" data-plan-name="${row[0]}">删除</button>`;
  }
  if (id === "video" && tab === "监控设备") {
    const [, code] = row;
    return `<button class="btn text action-detail" data-device-code="${code}">查看详情</button>`;
  }
  let actions = `${hasDocumentedDetail(id,tab)?`<button class="btn text action-detail">查看</button>`:""}${editableTabs.includes(tab)?`<button class="btn text action-edit">编辑</button>`:""}`;
  if (id === "perimeter" && row.includes("待确认")) actions += `<button class="btn text action-business" data-act="确认告警">确认</button><button class="btn text danger action-business" data-act="误报关闭">误报</button>`;
  else if (id === "perimeter" && row.includes("已确认")) actions += `<button class="btn text action-business" data-act="生成工单">生成工单</button>`;
  else if (id === "alarm" && tab === "告警事件" && row.includes("待确认")) actions += `<button class="btn text action-business" data-act="确认告警">确认</button><button class="btn text danger action-business" data-act="误报关闭">误报关闭</button>`;
  else if (id === "alarm" && tab === "告警事件" && row.includes("已确认")) actions += `<button class="btn text action-business" data-act="生成工单">生成工单</button>`;
  else if (id === "visitor" && row.includes("待安防审批")) actions += `<button class="btn text action-business" data-act="审批通过">通过</button><button class="btn text danger action-business" data-act="审批拒绝">拒绝</button>`;
  else if (id === "alarm" && tab === "巡检工单" && row.includes("待派单")) actions += `<button class="btn text action-business" data-act="派单">派单</button>`;
  else if (id === "vehicle" && tab === "特殊车辆通行记录" && row.includes("待核验")) actions += `<button class="btn text action-business" data-act="出场核验">核验</button>`;
  else {
    if (id === "company" && tab === "企业信息") actions += `<button class="btn text action-add">关联房间</button>`;
    if (id === "person" && tab === "人员档案") actions += `<button class="btn text danger action-confirm" data-act="人员离职">离职</button>`;
    if (toggleTabs.includes(tab)) actions += `<button class="btn text action-confirm" data-act="停用">停用</button>`;
    if (deleteTabs.includes(tab)) actions += `<button class="btn text danger action-confirm" data-act="删除">删除</button>`;
  }
  return actions || "—";
}

function hasDocumentedDetail(id,tab) {
  return ["person:人员轨迹","access:门禁权限组","visitor:访客管理","visitor:安防审批","vehicle:特殊车辆通行记录","patrol:巡检任务","perimeter:周界告警","video:监控设备","alarm:告警事件","alarm:巡检工单","inspection:巡检计划","inspection:巡检任务","device:设备台账"].includes(`${id}:${tab}`);
}

function pagination(total) {
  return `<div class="pagination"><span>共 ${total} 条</span><select class="control" style="width:82px"><option>20 条/页</option></select><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button><button class="page-btn">…</button><button class="page-btn">8</button><button class="page-btn">›</button></div>`;
}

function renderMiniStats(id) {
  const data = id==="visitor" ? [["今日预约","28","↑ 12%"],["待安防审批","3","需及时处理"],["当前在园","16","2 人未离园异常"],["今日已离园","42","正常"]]
    : id==="perimeter" ? [["今日告警","68","↑ 8.2%"],["待确认","4","最早 10 分钟前"],["已生成工单","12","闭环率 91.6%"],["误报关闭","8","误报率 11.8%"]]
    : id==="inspection" ? [["今日任务","38","已完成 24"],["任务完成率","86.2%","↑ 3.1%"],["异常点","5","已生成工单"],["待派单工单","5","2 单已超时"]]
    : [["告警总数","256","↑ 8.2%"],["待处理","12","需及时处理"],["处理中","8","平均 36 分钟"],["已完成","210","闭环率 85.9%"]];
  return `<div class="stats ${id}-stats">${data.map((x,i)=>`<div class="card stat"><div class="stat-title">${x[0]}</div><div class="stat-value">${x[1]}</div><div class="stat-note ${i===0?"trend-up":""}">${x[2]}</div></div>`).join("")}</div>`;
}

function progress(name,value,type) {
  const colors={success:"#2ba471",primary:"#0052d9",warning:"#ed7b2f"};
  return `<div style="margin-bottom:17px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span>${name}</span><b>${value}%</b></div><div style="height:7px;background:#eef0f3;border-radius:6px;overflow:hidden"><i style="display:block;height:100%;width:${value}%;background:${colors[type]};border-radius:6px"></i></div></div>`;
}

function trendChart(title) {
  const vals=[55,78,48,92,67,84,63,110,76,98,72,126];
  return `<div class="card chart"><h3>${title}</h3><div class="bars">${vals.map((v,i)=>`<div class="bar" data-label="${v}" style="height:${v}px"></div>`).join("")}</div><div class="chart-labels"><span>06-04</span><span>06-05</span><span>06-06</span><span>06-07</span><span>06-08</span><span>06-09</span><span>06-10</span></div></div>`;
}

function renderAnalysis(mod) {
  const cfg={
    alarm:{cards:[["告警总数","256"],["待处理","12"],["处理中","8"],["误报率","11.8%"]],chart:"告警趋势与级别分布",head:["区域 / 类型","告警总数","已完成","误报数","闭环率"],rows:[["周界入侵","86","72","8","83.7%"],["AI 检测","64","58","6","90.6%"]]},
    vehicle:{cards:[["今日车流量","1,286"],["入园车辆","648"],["出园车辆","638"],["黑名单拦截","12"]],chart:"每日车流量与出入口流量",head:["日期 / 出入口","通行总数","入园","出园","异常拦截"],rows:[["2026-06-10","1,286","648","638","12"],["2026-06-09","1,198","601","597","8"]]},
    inspection:{cards:[["任务完成率","86.2%"],["任务超时率","3.8%"],["巡检点完成率","91.4%"],["异常率","4.6%"]],chart:"任务完成趋势与区域异常分布",head:["巡检人 / 区域","任务数","正常点","异常点","超时点"],rows:[["闫卓宇","38","286","12","3"],["A栋 / 仓储区","24","168","9","2"]]}
  }[mod.id];
  const stats=`<div class="stats">${cfg.cards.map(x=>`<div class="card stat"><div class="stat-title">${x[0]}</div><div class="stat-value">${x[1]}</div><div class="stat-note">当前筛选范围</div></div>`).join("")}</div>`;
  return `${pageHead(mod,"导出分析报告")}${stats}
  <div class="grid-2">${trendChart(cfg.chart)}<div class="card chart"><h3>${mod.id==="vehicle"?"车辆类型分布":"状态 / 类型分布"}</h3><div class="donut-wrap"><div class="donut"></div><div class="legend"><span style="--c:#d54941">异常 20%</span><span style="--c:#ed7b2f">超时 14%</span><span style="--c:#0052d9">正常 66%</span></div></div></div></div>
  <div class="card table-card" style="margin-top:14px"><div class="card-head"><h3>统计明细</h3></div><div class="table-wrap"><table><thead><tr>${cfg.head.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${cfg.rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
}

function videoDeviceByCode(code) {
  return videoDevices.find(item => item.code === code) || videoDevices[0];
}

function escapeAttr(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatPlaybackInputDateTime(date) {
  const pad = value => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatPlaybackDisplayDateTime(date) {
  return formatPlaybackInputDateTime(date).replace(/-/g, "/").replace("T", " ");
}

function playbackInputLimits() {
  const minDate = new Date(PLAYBACK_NOW.getTime() - PLAYBACK_RETENTION_DAYS * 24 * 60 * 60 * 1000);
  return {
    min: formatPlaybackInputDateTime(minDate),
    max: formatPlaybackInputDateTime(PLAYBACK_NOW),
    minText: formatPlaybackDisplayDateTime(minDate),
    maxText: formatPlaybackDisplayDateTime(PLAYBACK_NOW)
  };
}

function videoBlockedMessage(device, mode) {
  if (device.status === "在线") return "";
  const target = mode === "playback" ? "录像回放" : "实时视频";
  if (device.status === "离线") return `设备离线，无法播放${target}`;
  return `设备状态异常，无法播放${target}`;
}

function videoDeviceGroups() {
  return [
    { key: "phase-1", name: "微冷园区一期", codes: ["CAM-2024-001", "CAM-2024-018", "CAM-2024-032"] },
    { key: "perimeter", name: "园区外围", codes: ["CAM-2024-006"] },
    { key: "parking", name: "停车场", codes: ["CAM-2024-026"] }
  ].map(group => ({ ...group, devices: group.codes.map(videoDeviceByCode) }));
}

function renderVideoTree(activeCode, mode) {
  const keyword = (videoState.treeKeyword || "").trim().toLowerCase();
  const isPlayback = mode === "playback";
  const deviceMatched = device => !keyword || [device.name, device.code, device.location, device.status].some(value => String(value).toLowerCase().includes(keyword));
  const groups = videoDeviceGroups().map(group => ({
    ...group,
    devices: group.devices.filter(deviceMatched)
  })).filter(group => group.devices.length || group.name.toLowerCase().includes(keyword));
  const deviceButton = code => {
    const device = videoDeviceByCode(code);
    const active = device.code === activeCode;
    const disabled = device.status !== "在线";
    return `<button type="button" class="tree-node device-node ${active ? "active" : ""} ${disabled ? "disabled" : ""}" data-video-device="${device.code}" data-video-mode="${mode}">
      <span class="tree-device-main">${isPlayback ? `<i class="playback-radio" aria-hidden="true"></i>` : ""}<span><b>${device.name}</b><small>${device.code}</small></span></span>
      <span class="tree-device-status ${device.status === "在线" ? "online" : "offline"}">${device.status}</span>
    </button>`;
  };
  const groupHtml = group => {
    const collapsed = !keyword && videoState.collapsedGroups.has(group.key);
    const onlineCount = group.devices.filter(device => device.status === "在线").length;
    return `<section class="video-tree-group">
      <button type="button" class="tree-node tree-folder ${collapsed ? "collapsed" : ""}" data-video-group="${group.key}">
        <span class="tree-folder-main"><i>${collapsed ? "›" : "⌄"}</i><b>${group.name}</b></span>
        <span class="tree-count">${onlineCount}/${group.devices.length}</span>
      </button>
      <div class="video-tree-devices ${collapsed ? "collapsed" : ""}">
        ${group.devices.map(device => deviceButton(device.code)).join("")}
      </div>
    </section>`;
  };
  return `<div class="card tree-panel video-tree-panel">
    <input class="control tree-search" data-video-tree-search value="${escapeAttr(videoState.treeKeyword || "")}" placeholder="搜索设备名称 / 编码 / 位置">
    <div class="video-tree-scroll">
      <div class="tree-node video-tree-root"><span class="tree-folder-main"><i>⌄</i><b>微冷园区监控资源</b></span></div>
      ${groups.length ? groups.map(groupHtml).join("") : `<div class="video-tree-empty">未找到匹配设备</div>`}
    </div>
  </div>`;
}

function realtimeGridDevices(activeDevice, screenMode) {
  const ordered = [activeDevice, ...videoDevices.filter(item => item.code !== activeDevice.code)];
  return Array.from({ length: screenMode }, (_, index) => ordered[index] || null);
}

function renderRealtimeTile(device, index, activeCode) {
  if (!device) {
    return `<div class="video-tile empty">
      <div class="video-stage-center"><div>＋</div><b>空闲窗口</b><span>从左侧设备树选择在线摄像头</span></div>
    </div>`;
  }
  const playing = videoState.realtimePlaying && device.status === "在线";
  const active = device.code === activeCode;
  const message = videoBlockedMessage(device, "realtime");
  return `<div role="button" tabindex="0" class="video-tile ${playing ? "" : "is-stopped"} ${active ? "active" : ""}" data-video-tile="${device.code}">
    ${playing ? `<div class="scan-line"></div>` : ""}
    <div class="video-tile-badge">${String(index + 1).padStart(2, "0")}</div>
    <div class="video-tile-status">${tag(device.status)}</div>
    <div class="video-stage-center"><div>◉</div><b>${playing ? "FLV 实时视频流播放中" : (message || "实时视频已停止")}</b><span>${device.name} · ${device.code}</span></div>
    <div class="video-tile-name">${device.location}</div>
  </div>`;
}

function renderRealtimeGrid(activeDevice) {
  const screenMode = Number(videoState.realtimeScreenMode) || 1;
  const tiles = realtimeGridDevices(activeDevice, screenMode).map((device, index) => renderRealtimeTile(device, index, activeDevice.code)).join("");
  return `<div class="video-stage video-screen-grid screen-${screenMode}">${tiles}</div>`;
}

function renderScreenSwitcher() {
  return `<div class="video-screen-switcher" aria-label="分屏切换">
    ${[1, 4, 9].map(size => `<button class="btn ${videoState.realtimeScreenMode === size ? "primary" : ""}" data-video-screen="${size}">${size}分屏</button>`).join("")}
  </div>`;
}

function renderPtzPanel(device, enabled) {
  return `<aside class="video-ptz-panel ${enabled ? "" : "disabled"}">
    <div class="video-ptz-head"><b>云台控制</b><button type="button" class="ptz-close" data-ptz-close>×</button></div>
    <div class="ptz-target">
      <div><label>设备名称</label><b>${device.name}</b></div>
      <div><label>设备编码</label><b>${device.code}</b></div>
    </div>
    <div class="ptz-main">
      <div class="ptz-wheel" aria-label="云台方向控制">
        <button class="ptz-dir up-left" data-ptz="左上" ${enabled ? "" : "disabled"}>↖</button>
        <button class="ptz-dir up" data-ptz="上" ${enabled ? "" : "disabled"}>↑</button>
        <button class="ptz-dir up-right" data-ptz="右上" ${enabled ? "" : "disabled"}>↗</button>
        <button class="ptz-dir left" data-ptz="左" ${enabled ? "" : "disabled"}>←</button>
        <button class="ptz-stop" data-ptz="停止" ${enabled ? "" : "disabled"}>Ⅱ</button>
        <button class="ptz-dir right" data-ptz="右" ${enabled ? "" : "disabled"}>→</button>
        <button class="ptz-dir down-left" data-ptz="左下" ${enabled ? "" : "disabled"}>↙</button>
        <button class="ptz-dir down" data-ptz="下" ${enabled ? "" : "disabled"}>↓</button>
        <button class="ptz-dir down-right" data-ptz="右下" ${enabled ? "" : "disabled"}>↘</button>
      </div>
      <div class="ptz-lens">
        ${[["光圈","光圈-","光圈+"],["变倍","变倍-","变倍+"],["聚焦","聚焦-","聚焦+"]].map(row => `<div>
          <button class="btn" data-ptz="${row[1]}" ${enabled ? "" : "disabled"}>-</button>
          <label>${row[0]}</label>
          <button class="btn" data-ptz="${row[2]}" ${enabled ? "" : "disabled"}>+</button>
        </div>`).join("")}
      </div>
    </div>
    <div class="ptz-speed">
      <label>速度</label>
      <input type="range" min="1" max="8" value="4" ${enabled ? "" : "disabled"}>
      <span>4</span>
    </div>
    <div class="ptz-presets">
      <label>预置位</label>
      <div>
        ${["全景","入口","车道","围墙"].map(name => `<button class="btn" data-ptz="调用预置位：${name}" ${enabled ? "" : "disabled"}>${name}</button>`).join("")}
      </div>
    </div>
    <div class="ptz-guard">
      <button class="btn" data-ptz="开始巡航" ${enabled ? "" : "disabled"}>开始巡航</button>
      <button class="btn" data-ptz="停止巡航" ${enabled ? "" : "disabled"}>停止巡航</button>
    </div>
    <p>${enabled ? "云台指令仅对当前选中在线窗口生效，并写入设备控制日志。" : "设备离线或未播放时不可控制云台。"}</p>
  </aside>`;
}

function renderRealtimeVideo(device) {
  const playing = videoState.realtimePlaying && device.status === "在线";
  return `<div class="card video-player-card">
    <div class="card-head"><h3>实时视频监控</h3><div class="video-head-actions">${renderScreenSwitcher()}</div></div>
    <div class="card-body">
      <div class="video-live-layout mode-${videoState.realtimeScreenMode}">
        <div class="video-grid-shell">
          ${renderRealtimeGrid(device)}
          ${videoState.realtimePtzVisible ? renderPtzPanel(device, playing) : ""}
        </div>
      </div>
      <div class="video-control-bar">
        <span>选中窗口：${playing ? `01 · ${device.name}` : "-"}　分屏模式：${videoState.realtimeScreenMode}分屏　会话时长：${playing ? "00:15:30" : "00:00:00"}</span>
        <div><button class="btn action-video-fullscreen" ${playing ? "" : "disabled"}>全屏</button><button class="btn primary action-video-stop" ${playing ? "" : "disabled"}>停止播放</button></div>
      </div>
    </div>
  </div>`;
}

function renderPlaybackVideo(device) {
  const playable = device.status === "在线";
  const isPlaying = playable && videoState.playbackStatus === "播放中";
  const message = videoBlockedMessage(device, "playback");
  const limits = playbackInputLimits();
  return `<div class="card video-player-card playback-player-card">
    <div class="card-head">
      <div class="playback-title">
        <h3>录像回放 · ${device.name}<span>${device.code}</span></h3>
        <small>安装位置：${device.location}</small>
      </div>
      <div class="video-head-actions"><span class="video-last-online">上次在线 ${device.heartbeat}</span>${tag(device.status)}</div>
    </div>
    <div class="card-body">
      <div class="filters video-playback-filters">
        <div class="field"><label>开始时间</label><input class="control" type="datetime-local" data-playback-start min="${limits.min}" max="${limits.max}" value="${videoState.playbackStart}"></div>
        <div class="field"><label>结束时间</label><input class="control" type="datetime-local" data-playback-end min="${limits.min}" max="${limits.max}" value="${videoState.playbackEnd}"></div>
        <div class="filter-actions"><button class="btn primary action-playback-start" ${playable ? "" : "disabled"}>开始回放</button><button class="btn action-playback-stop" ${playable ? "" : "disabled"}>停止回放</button></div>
      </div>
      <div class="video-stage playback-stage ${isPlaying ? "" : "is-stopped"}">
        ${isPlaying ? `<div class="scan-line"></div>` : ""}
        <div class="video-stage-center"><div>◉</div><b>${isPlaying ? `录像回放 · ${videoState.playbackSpeed}` : (message || `回放状态：${videoState.playbackStatus}`)}</b><span>${playable ? "支持播放暂停、进度跳转和倍速切换" : "仅在线设备可回放录像"}</span></div>
      </div>
      <div class="video-playback-control">
        <button class="btn primary action-playback-toggle" ${playable ? "" : "disabled"}>${isPlaying ? "暂停" : "播放"}</button>
        <label>进度</label><input type="range" min="0" max="100" value="${videoState.playbackProgress}" class="video-progress" data-playback-progress ${playable ? "" : "disabled"}>
        <span>${videoState.playbackProgress}% / 120:00</span>
        <label>倍速</label><select class="control video-speed" data-playback-speed ${playable ? "" : "disabled"}>${["0.5x","1x","2x","4x","8x"].map(speed => `<option ${speed === videoState.playbackSpeed ? "selected" : ""}>${speed}</option>`).join("")}</select>
      </div>
      <div class="video-control-summary">当前回放：${playable ? device.name : "-"}　回放时段：${videoState.playbackStart.replace("T", " ")} 至 ${videoState.playbackEnd.replace("T", " ")}　回放状态：${playable ? videoState.playbackStatus : "不可播放"}</div>
    </div>
  </div>`;
}

function renderVideo(mod,tab) {
  const mode = tab === "录像回放" ? "playback" : "realtime";
  const activeCode = mode === "playback" ? videoState.playbackDeviceCode : videoState.realtimeDeviceCode;
  const device = videoDeviceByCode(activeCode);
  return `${tabs(mod,tab)}
  <div class="special-layout video-monitor-layout">
    ${renderVideoTree(activeCode, mode)}
    ${mode === "playback" ? renderPlaybackVideo(device) : renderRealtimeVideo(device)}
  </div>`;
}

function syncPlaybackInputs() {
  const startInput = document.querySelector("[data-playback-start]");
  const endInput = document.querySelector("[data-playback-end]");
  if (startInput) videoState.playbackStart = startInput.value;
  if (endInput) videoState.playbackEnd = endInput.value;
}

function validatePlaybackRange() {
  syncPlaybackInputs();
  const start = new Date(videoState.playbackStart);
  const end = new Date(videoState.playbackEnd);
  const limits = playbackInputLimits();
  const now = new Date(limits.max);
  const min = new Date(limits.min);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "请选择完整的回放开始时间和结束时间";
  if (start < min || end < min) return "录像只支持查询近30天内的时间";
  if (end > now) return "结束时间不能晚于当前时间";
  if (start >= end) return "开始时间必须早于结束时间";
  if (end - start > 24 * 60 * 60 * 1000) return "回放时间范围不能超过 24 小时";
  return "";
}

function renderPatrolExecution(mod) {
  const points = [
    { no: 1, point: "正门全景点位", camera: "正门全景-01", code: "CAM-2024-001", location: "微冷园区 / 正门", status: "已完成", cameraStatus: "在线", duration: "18 秒", note: "画面正常" },
    { no: 2, point: "围墙监控点位", camera: "围墙监控-03", code: "CAM-2024-003", location: "微冷园区 / 北侧围墙", status: "当前", cameraStatus: "在线", duration: "22 秒", note: "已提报人员徘徊异常" },
    { no: 3, point: "仓库入口点位", camera: "仓库入口-01", code: "CAM-2024-018", location: "A栋 / 1F / 仓储区", status: "待查看", cameraStatus: "故障", duration: "-", note: "需按顺序查看" },
    { no: 4, point: "卸货区点位", camera: "卸货区-02", code: "CAM-2024-014", location: "A栋 / 卸货区", status: "待查看", cameraStatus: "在线", duration: "-", note: "待当前点位完成" },
    { no: 5, point: "停车场点位", camera: "停车场B区-03", code: "CAM-2024-026", location: "停车场 / B1 / B区", status: "待查看", cameraStatus: "离线", duration: "-", note: "待当前点位完成" }
  ];
  const current = points[1];
  const pointStatus = item => {
    if (item.status === "已完成") return `<span class="patrol-exec-point-mark done">✓</span>`;
    if (item.status === "当前") return `<span class="patrol-exec-point-mark current">▶</span>`;
    return `<span class="patrol-exec-point-mark pending">○</span>`;
  };
  const cameraTag = status => tag(status === "在线" ? "在线" : status === "故障" ? "故障" : "离线");
  return `${pageHead(mod)}
  <div class="patrol-exec-page">
    <div class="card patrol-exec-summary">
      <div class="patrol-exec-title">
        <div class="patrol-exec-task-picker">
          <label>选择任务</label>
          <select class="control">
            <option>7月巡检计划-周巡检3.4_20260626</option>
            <option>7月巡检计划-周巡检3.4_20260701</option>
            <option>冷链仓储巡更_20260717</option>
          </select>
        </div>
        <div class="patrol-current-user">当前巡检人：闫卓宇</div>
      </div>
      <div class="patrol-exec-meta">
        <div><label>巡检路线</label><b>园区主干道视频路线</b></div>
        <div><label>任务状态</label>${tag("进行中")}</div>
        <div><label>点位进度</label><b>2 / 5</b></div>
        <div><label>预计时间</label><b>2026-06-26 15:20 至 17:20</b></div>
        <div><label>实际开始</label><b>2026-06-26 15:24</b></div>
      </div>
    </div>
    <div class="patrol-exec-layout">
      <section class="card patrol-exec-player-card">
        <div class="card-head">
          <h3>${current.point} · ${current.camera}</h3>
          <div class="patrol-exec-head-tags">${cameraTag(current.cameraStatus)}<span class="tag warning">查看时长 ${current.duration}</span></div>
        </div>
        <div class="card-body">
          <div class="video-stage patrol-exec-video">
            <div class="scan-line"></div>
            <div class="patrol-exec-video-center">
              <div class="patrol-exec-live-icon">◉</div>
              <b>FLV 实时视频流播放中</b>
              <span>${current.code} · ${current.location}</span>
            </div>
          </div>
          <div class="patrol-exec-controls">
            <div class="patrol-exec-control-left">
              <button class="btn">暂停</button>
              <button class="btn">播放</button>
              <button class="btn">音量</button>
              <button class="btn">全屏</button>
            </div>
            <span>每个点位至少查看 10 秒后方可标记完成</span>
          </div>
          <div class="patrol-exec-bottom">
            <button class="btn disabled-action" type="button">上一个点位</button>
            <button class="btn disabled-action" type="button">下一个点位</button>
            <button class="btn primary action-business" data-act="完成巡检任务">完成巡检任务</button>
          </div>
        </div>
      </section>
      <aside class="patrol-exec-side">
        <section class="card patrol-exec-current">
          <div class="card-head"><h3>当前点位</h3><span class="tag primary">第 ${current.no} 号位</span></div>
          <div class="card-body">
            <div class="patrol-exec-info-list">
              <div><label>摄像头</label><b>${current.camera}</b></div>
              <div><label>摄像头编码</label><b>${current.code}</b></div>
              <div><label>所属位置</label><b>${current.location}</b></div>
              <div><label>摄像头状态</label>${cameraTag(current.cameraStatus)}</div>
            </div>
            <div class="patrol-exec-actions">
              <button class="btn primary action-business" data-act="完成点位">标记完成</button>
              <button class="btn danger action-business" data-act="提报异常">提报异常</button>
            </div>
          </div>
        </section>
        <section class="card patrol-exec-points">
          <div class="card-head"><h3>点位序列</h3><span>严格按序执行</span></div>
          <div class="patrol-exec-point-list">
            ${points.map(item => `<div class="patrol-exec-point ${item.status === "当前" ? "active" : item.status === "已完成" ? "done" : "pending"}">
              ${pointStatus(item)}
              <div>
                <b>${item.no}. ${item.point}</b>
                <span>${item.camera} · ${item.duration} · ${item.note}</span>
              </div>
              ${cameraTag(item.cameraStatus)}
            </div>`).join("")}
          </div>
        </section>
      </aside>
    </div>
  </div>`;
}

const patrolRoutePointRows = [
  ["1", "正门全景点位", "正门全景-01", "CAM-2024-001", "微冷园区 / 正门", "flv://camera/CAM-2024-001/live", "在线"],
  ["2", "围墙监控点位", "围墙监控-03", "CAM-2024-003", "微冷园区 / 北侧围墙", "flv://camera/CAM-2024-003/live", "在线"],
  ["3", "仓库入口点位", "仓库入口-01", "CAM-2024-018", "A栋 / 1F / 仓储区", "flv://camera/CAM-2024-018/live", "故障"],
  ["4", "卸货区点位", "卸货区-02", "CAM-2024-014", "A栋 / 卸货区", "flv://camera/CAM-2024-014/live", "在线"],
  ["5", "停车场点位", "停车场B区-03", "CAM-2024-026", "停车场 / B1 / B区", "flv://camera/CAM-2024-026/live", "离线"]
];

const patrolDevicePickerSpaceTree = [
  { name: "全部空间", key: "全部", count: 18, level: 1, children: [
    { name: "微冷园区", key: "微冷园区", count: 7, level: 2, children: [
      { name: "正门", key: "微冷园区 / 正门", count: 3, level: 3 },
      { name: "北侧围墙", key: "微冷园区 / 北侧围墙", count: 4, level: 3 }
    ]},
    { name: "A栋", key: "A栋", count: 7, level: 2, children: [
      { name: "1F / 仓储区", key: "A栋 / 1F / 仓储区", count: 5, level: 3 },
      { name: "卸货区", key: "A栋 / 卸货区", count: 2, level: 3 }
    ]},
    { name: "停车场", key: "停车场", count: 4, level: 2, children: [
      { name: "B1 / B区", key: "停车场 / B1 / B区", count: 4, level: 3 }
    ]}
  ]}
];

const patrolDevicePickerRows = [
  ["正门全景-02", "CAM-2024-002", "在线", "微冷园区 / 正门"],
  ["正门通道-03", "CAM-2024-009", "在线", "微冷园区 / 正门"],
  ["北侧围墙-04", "CAM-2024-021", "在线", "微冷园区 / 北侧围墙"],
  ["仓库南门-02", "CAM-2024-019", "在线", "A栋 / 1F / 仓储区"],
  ["仓储走廊-05", "CAM-2024-020", "离线", "A栋 / 1F / 仓储区"],
  ["卸货平台-01", "CAM-2024-013", "在线", "A栋 / 卸货区"],
  ["停车场入口-01", "CAM-2024-025", "故障", "停车场 / B1 / B区"],
  ["停车场出口-02", "CAM-2024-027", "在线", "停车场 / B1 / B区"]
];

const patrolDevicePickerState = {
  activeSpace: "全部",
  expandedSpaces: new Set(["全部", "微冷园区", "A栋", "停车场"]),
  selectedCodes: new Set(["CAM-2024-002", "CAM-2024-009"])
};

function patrolDevicePickerFilteredRows() {
  if (patrolDevicePickerState.activeSpace === "全部") return patrolDevicePickerRows;
  return patrolDevicePickerRows.filter(row => row[3] === patrolDevicePickerState.activeSpace || row[3].startsWith(`${patrolDevicePickerState.activeSpace} /`));
}

function patrolDeviceSpaceTreeHtml(nodes) {
  return nodes.map(node => {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const expanded = patrolDevicePickerState.expandedSpaces.has(node.key);
    return `<div class="patrol-device-tree-node">
      <button class="${node.key === patrolDevicePickerState.activeSpace ? "active" : ""}" data-patrol-space="${node.key}" data-has-children="${hasChildren ? "1" : "0"}" type="button" style="--level:${node.level}">
        <i>${hasChildren ? (expanded ? "⌄" : "›") : ""}</i><span>${node.name}</span><b>${node.count}</b>
      </button>
      ${hasChildren && expanded ? `<div>${patrolDeviceSpaceTreeHtml(node.children)}</div>` : ""}
    </div>`;
  }).join("");
}

function patrolDevicePickerHtml() {
  const selectedRows = patrolDevicePickerRows.filter(row => patrolDevicePickerState.selectedCodes.has(row[1]));
  const rows = patrolDevicePickerFilteredRows();
  return `
    <div class="patrol-device-selected">
      <div class="patrol-device-selected-head"><b>已选设备（${selectedRows.length}）</b><button class="btn action-patrol-selected-toggle" type="button">收起⌃</button></div>
      <div class="patrol-device-selected-list">
        ${selectedRows.map(row=>`<span><b>${row[0]}</b><small>${row[1]}</small><button class="action-patrol-device-remove" data-device-code="${row[1]}" type="button">×</button></span>`).join("") || `<em>暂未选择设备</em>`}
      </div>
    </div>
    <div class="patrol-device-picker">
      <aside class="patrol-device-spaces">
        ${patrolDeviceSpaceTreeHtml(patrolDevicePickerSpaceTree)}
      </aside>
      <section class="patrol-device-main">
        <div class="patrol-device-toolbar">
          <input class="control" placeholder="设备名称 / 设备编码">
          <div><button class="btn primary action-query">查询</button><button class="btn action-reset">重置</button></div>
        </div>
        <div class="table-wrap">
          <table class="patrol-device-picker-table">
            <thead><tr><th><input type="checkbox" class="action-patrol-device-check-all" ${rows.every(row => patrolDevicePickerState.selectedCodes.has(row[1])) ? "checked" : ""}></th><th>设备名称</th><th>设备编码</th><th>状态</th><th>所属位置</th></tr></thead>
            <tbody>${rows.map(row=>`<tr>
              <td><input type="checkbox" class="action-patrol-device-check" data-device-code="${row[1]}" ${patrolDevicePickerState.selectedCodes.has(row[1]) ? "checked" : ""}></td>
              <td>${row[0]}</td><td>${row[1]}</td><td>${tag(row[2])}</td><td>${row[3]}</td>
            </tr>`).join("")}</tbody>
          </table>
        </div>
        ${pagination(rows.length)}
      </section>
    </div>`;
}

function rerenderPatrolDeviceDrawer() {
  document.getElementById("subDrawerBody").innerHTML = patrolDevicePickerHtml();
}

function openPatrolRoutePointsDrawer(routeName = "园区主干道视频路线") {
  const drawer = document.getElementById("drawer");
  document.querySelector("#drawer .drawer-head").innerHTML = `
    <div><span class="eyebrow">DETAIL</span><h2 id="drawerTitle">${routeName}</h2></div>
    <button class="close-btn" data-close="drawer">×</button>`;
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = `
    <div class="patrol-route-detail">
      <section class="card patrol-route-basic-card">
        <div class="patrol-route-basic-head"><div class="section-title">基本信息</div><span class="tag success">启用</span></div>
        <div class="patrol-route-basic-grid">
          ${["点位最短播放时长|10 秒", `关联点位数|${patrolRoutePointRows.length} 个`, "备注|覆盖正门、围墙、仓储区、卸货区、停车场"].map(x=>{const[a,b]=x.split("|");return `<div><label>${a}</label><b>${b}</b></div>`}).join("")}
        </div>
      </section>
      <section class="card table-card patrol-route-point-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">点位列表</span></div>
        <div class="table-toolbar-right"><button class="btn primary action-patrol-point-add">新增点位</button></div>
      </div>
      <div class="table-wrap">
        <table class="patrol-route-point-table">
          <thead><tr><th>序号</th><th>设备名称</th><th>设备编码</th><th>所属位置</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>${patrolRoutePointRows.map((row,index)=>`<tr>
            <td>${row[0]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${tag(row[6])}</td>
            <td class="actions"><button class="btn text action-patrol-point-move" data-direction="up" ${index === 0 ? "disabled" : ""}>上移</button><button class="btn text action-patrol-point-move" data-direction="down" ${index === patrolRoutePointRows.length - 1 ? "disabled" : ""}>下移</button><button class="btn text danger action-confirm" data-act="删除点位">删除</button></td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(patrolRoutePointRows.length)}
      </section>
    </div>`;
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">返回路线列表</button>`;
  drawer.classList.add("wide", "patrol-route-points-drawer");
  document.getElementById("drawerOverlay").classList.add("show");
}

function openPatrolPointModal(editMode = false) {
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = editMode ? "保存点位调整" : "新增点位";
  document.getElementById("modalTitle").textContent = editMode ? "编辑路线点位" : "新增路线点位";
  document.getElementById("modalBody").innerHTML = `
    <div class="alert">点位只关联到当前视频巡检路线；保存后不新增独立点位页面数据。</div>
    <div class="form-grid">
      <div class="form-field"><label>所属方案</label><input class="control" value="园区主干道视频路线" disabled></div>
      <div class="form-field"><label>选择摄像头 <span>*</span></label><select class="control"><option>正门全景-01 / CAM-2024-001 / 在线</option><option>围墙监控-03 / CAM-2024-003 / 在线</option><option>仓库入口-01 / CAM-2024-018 / 故障</option><option>卸货区-02 / CAM-2024-014 / 在线</option></select></div>
      <div class="form-field"><label>点位序号</label><input class="control" value="${editMode ? "2" : "自动追加"}" disabled></div>
      <div class="form-field"><label>最短查看时长</label><input class="control" value="10 秒" disabled></div>
      <div class="form-field full"><label>点位说明</label><textarea class="control" rows="3" placeholder="请输入本路线中该点位的巡查说明"></textarea></div>
    </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalOverlay").classList.add("show");
}

function openPatrolPointDeviceDrawer() {
  const subDrawer = document.querySelector("#subDrawerOverlay .subdrawer");
  patrolDevicePickerState.activeSpace = "全部";
  patrolDevicePickerState.expandedSpaces = new Set(["全部", "微冷园区", "A栋", "停车场"]);
  patrolDevicePickerState.selectedCodes = new Set(["CAM-2024-002", "CAM-2024-009"]);
  subDrawer.classList.add("wide", "patrol-device-picker-drawer");
  document.querySelector("#subDrawerOverlay .drawer-head .eyebrow").textContent = "SELECT DEVICES";
  document.querySelector("#subDrawerOverlay .drawer-head h2").textContent = "新增点位";
  rerenderPatrolDeviceDrawer();
  document.querySelector("#subDrawerOverlay .drawer-foot").innerHTML = `<button class="btn" data-close="subDrawer">取消</button><button class="btn primary action-patrol-device-save">确定</button>`;
  document.getElementById("subDrawerOverlay").classList.add("show");
}

function perimeterTaskRuleSummary(task) {
  const parts = [];
  if (task.regionCount) parts.push(`区域入侵 ${task.regionCount} 条`);
  if (task.lineCount) parts.push(`越线入侵 ${task.lineCount} 条`);
  return parts.join(" + ") || "未配置";
}

function perimeterTaskById(taskId) {
  return perimeterTasks.find(item => item.id === taskId) || perimeterTasks[0];
}

function perimeterAlarmById(alarmId) {
  return perimeterAlarms.find(item => item.id === alarmId) || perimeterAlarms[0];
}

function renderPerimeterSettingsPage(mod, tab) {
  return `${tabs(mod, tab)}
    <div class="card filter-card perimeter-filter-card">
      <div class="filters perimeter-filters">
        <div class="field"><label>任务名称</label><input class="control" placeholder="请输入任务名称"></div>
        <div class="field"><label>任务状态</label><select class="control"><option>全部</option><option>草稿</option><option>已启用</option><option>已停用</option><option>异常停用</option></select></div>
        <div class="field"><label>告警级别</label><select class="control"><option>全部</option><option>紧急</option><option>重要</option><option>一般</option></select></div>
        <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
      </div>
    </div>
    <div class="card table-card perimeter-task-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">摄像头启用任务独占</span><span class="muted">最多10条规则，警戒线最多1条</span></div>
        <div class="table-toolbar-right"><button class="btn primary action-add">新增任务</button></div>
      </div>
      <div class="table-wrap">
        <table class="perimeter-task-table">
          <thead><tr><th>序号</th><th>任务名称</th><th>任务状态</th><th>关联摄像头/所属位置</th><th>规则数量</th><th>告警级别</th><th>更新人/更新时间</th><th>操作</th></tr></thead>
          <tbody>${perimeterTasks.map((task, index) => `<tr data-task-id="${task.id}">
            <td>${index + 1}</td>
            <td><button class="table-link person-name-link action-perimeter-task-edit" data-task-id="${task.id}">${task.name}</button></td>
            <td>${tag(task.status)}</td>
            <td><div class="two-line-cell"><b>${task.camera}</b><span>${task.area}</span></div></td>
            <td>${perimeterTaskRuleSummary(task)}</td>
            <td>${tag(task.level)}</td>
            <td><div class="two-line-cell"><b>${task.updatedBy}</b><span>${task.updatedAt}</span></div></td>
            <td class="actions">${perimeterTaskActions(task)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(perimeterTasks.length)}
    </div>`;
}

function perimeterTaskActions(task) {
  if (task.status === "已启用") return `<button class="btn text action-perimeter-task-op" data-task-id="${task.id}" data-act="停用任务">停用</button>`;
  if (task.status === "已停用") return `<button class="btn text action-perimeter-task-op" data-task-id="${task.id}" data-act="启用任务">启用</button><button class="btn text danger action-perimeter-task-op" data-task-id="${task.id}" data-act="删除任务">删除</button>`;
  if (task.status === "草稿") return `<button class="btn text action-perimeter-task-op" data-task-id="${task.id}" data-act="启用任务">启用</button>`;
  return `<button class="btn text action-perimeter-task-op" data-task-id="${task.id}" data-act="启用任务">启用</button>`;
}

function renderPerimeterAlarmPage(mod, tab) {
  const stats = [
    ["今日告警", perimeterAlarms.length, "按状态变更实时重算"],
    ["待确认", perimeterAlarms.filter(item => item.status === "待确认").length, "值班员需优先核验"],
    ["已确认", perimeterAlarms.filter(item => item.status === "已确认").length, "可继续生成工单"],
    ["已生成工单", perimeterAlarms.filter(item => item.status === "已生成工单").length, "同告警仅允许1张"],
    ["误报关闭", perimeterAlarms.filter(item => item.status === "误报关闭").length, "终态不可再流转"]
  ];
  return `${tabs(mod, tab)}
    <div class="stats perimeter-alarm-stats">${stats.map(item => `<div class="card stat"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div><div class="stat-note">${item[2]}</div></div>`).join("")}</div>
    <div class="card filter-card perimeter-filter-card">
      <div class="filters perimeter-alarm-filters">
        <div class="field"><label>告警编号/抓拍设备</label><input class="control" placeholder="请输入告警编号或抓拍设备"></div>
        <div class="field"><label>告警类型</label><select class="control"><option>全部</option><option>区域入侵</option><option>越线入侵</option></select></div>
        <div class="field"><label>告警级别</label><select class="control"><option>全部</option><option>紧急</option><option>重要</option><option>一般</option></select></div>
        <div class="field perimeter-time-field"><label>告警时间</label><div class="date-range-control"><input class="control" value="2026-07-20 00:00"><span>至</span><input class="control" value="2026-07-20 23:59"></div></div>
        <div class="field"><label>告警状态</label><select class="control"><option>全部</option><option>待确认</option><option>已确认</option><option>已生成工单</option><option>误报关闭</option></select></div>
        <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
      </div>
    </div>
    <div class="card table-card perimeter-alarm-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">逐条处理</span><span class="muted">待确认可确认或误报关闭；已确认可生成工单；终态无操作</span></div>
        <div class="table-toolbar-right"><button class="btn action-perimeter-export">导出</button></div>
      </div>
      <div class="table-wrap">
        <table class="perimeter-alarm-table">
          <thead><tr><th>序号</th><th>告警编号</th><th>告警缩略图</th><th>告警级别</th><th>告警时间/告警类型</th><th>所属位置/抓拍设备</th><th>任务/规则</th><th>重复次数</th><th>告警状态</th><th>操作</th></tr></thead>
          <tbody>${perimeterAlarms.map((alarm, index) => `<tr data-alarm-id="${alarm.id}">
            <td>${index + 1}</td>
            <td><button class="table-link person-name-link action-perimeter-alarm-detail" data-alarm-id="${alarm.id}">${alarm.id}</button></td>
            <td>${perimeterAlarmThumb(alarm)}</td>
            <td>${tag(alarm.level)}</td>
            <td><div class="two-line-cell perimeter-alarm-time-type"><b>${alarm.triggerTime}</b>${tag(alarm.type)}</div></td>
            <td><div class="two-line-cell"><b>${alarm.location}</b><span>${alarm.camera}</span></div></td>
            <td><div class="two-line-cell"><b>${alarm.task}</b><span>${alarm.rule}</span></div></td>
            <td>${alarm.repeat}</td>
            <td>${tag(alarm.status)}</td>
            <td class="actions">${perimeterAlarmActions(alarm)}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(perimeterAlarms.length)}
    </div>`;
}

function perimeterAlarmThumb(alarm) {
  return `<button class="perimeter-thumb action-perimeter-image-preview" data-alarm-id="${alarm.id}" title="查看抓拍图">
    <span class="perimeter-thumb-target"></span>
    <span class="perimeter-thumb-line ${alarm.type === "区域入侵" ? "region" : ""}"></span>
    <small>${alarm.camera.split(" ")[1] || "抓拍"}</small>
  </button>`;
}

function perimeterAlarmVideoRange(triggerTime) {
  const date = new Date(triggerTime.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "告警前10秒 - 告警后10秒";
  const fmt = value => value.toTimeString().slice(0, 8);
  return `${fmt(new Date(date.getTime() - 10000))} - ${fmt(new Date(date.getTime() + 10000))}`;
}

function perimeterAlarmActions(alarm) {
  if (alarm.status === "待确认") return `<button class="btn text action-perimeter-alarm-op" data-alarm-id="${alarm.id}" data-act="确认告警">确认</button><button class="btn text danger action-perimeter-alarm-op" data-alarm-id="${alarm.id}" data-act="误报关闭">误报关闭</button>`;
  if (alarm.status === "已确认") return `<button class="btn text action-perimeter-alarm-op" data-alarm-id="${alarm.id}" data-act="生成工单">生成工单</button>`;
  return "—";
}

function renderPerimeterBuilder(mod) {
  return `${pageHead(mod,"保存并启用")}${renderPerimeterDesigner(perimeterTasks[0], false)}`;
}

function renderPerimeterDesigner(task = perimeterTasks[0], readonly = false) {
  const disabled = readonly ? "disabled" : "";
  return `<div class="alert warning perimeter-rule-alert">绘制约束：区域最少 3 个、最多 20 个顶点且不可自交，区域面积不小于画面 1%；同一任务最多 1 条虚拟警戒线，任务最多 10 条规则。</div>
  <div class="perimeter-builder">
    <div class="resource-list">
      <div class="builder-section-title"><b>点位资源</b><span>设备中心同步</span></div>
      <div class="camera-list">
        ${perimeterCameraOptions.map((camera, index) => {
          const selectable = camera.status === "在线" && !camera.reason.includes("周界启用任务中");
          const taskCameraCode = task.camera.split(" ")[0];
          const active = camera.code === taskCameraCode || (!perimeterCameraOptions.some(item => item.code === taskCameraCode) && index === 0);
          const marker = camera.status === "在线" && (selectable || active) ? "●" : "○";
          const reason = active && camera.reason.includes("周界启用任务中") ? "当前任务使用中" : camera.reason;
          return `<button class="camera-card ${active ? "active" : ""} ${selectable || active ? "" : "disabled"} action-perimeter-camera" data-code="${camera.code}" ${disabled}>
            <b>${marker} ${camera.name}</b>
            <small>${camera.code} · ${camera.status}</small>
            <span>${camera.area}</span>
            ${reason ? `<em>${reason}</em>` : ""}
          </button>`;
        }).join("")}
      </div>
    </div>
    <div class="canvas-stage perimeter-canvas-stage">
      <div class="perimeter-draw-toolbar">
        <button class="btn action-perimeter-draw" data-draw="警戒线" ${disabled}>↗ 绘制警戒线</button>
        <button class="btn action-perimeter-draw" data-draw="区域" ${disabled}>▱ 绘制区域</button>
        <button class="btn action-perimeter-draw" data-draw="撤销" ${disabled}>↶ 撤销</button>
        <button class="btn danger action-perimeter-draw" data-draw="清空" ${disabled}>清空</button>
      </div>
      <div class="video-label"><b>实时视频流</b><span>摄像头：${task.camera}</span></div>
      <div class="zone selected"><i></i><i></i><i></i><i></i><strong>Region 1</strong></div>
      <div class="warning-line selected"><strong>A→B</strong></div>
      <div class="motion-path"></div>
      <span class="canvas-hint">Canvas 规则绘制画布</span>
    </div>
    <div class="rule-panel">
      <div class="builder-section-title"><b>任务基础信息</b><span>手动保存</span></div>
      <div class="field"><label>任务名称 <span>*</span></label><input class="control" value="${task.name}" maxlength="50" ${disabled}></div>
      <div class="field"><label>任务描述</label><textarea class="control" rows="3" ${disabled}>${task.description}</textarea></div>
      <div class="builder-section-title rules-title"><b>检测规则列表</b><span>OR 逻辑独立触发</span></div>
      ${perimeterRuleCards(task, readonly)}
    </div>
  </div>`;
}

function perimeterDesignerRules(task = perimeterTasks[0]) {
  return [
    { index: 1, type: "越线入侵", name: "东北墙越线 A→B", direction: "A→B", level: task.level || "紧急", dedup: task.dedup || 30, targetRatio: "--", active: true },
    { index: 2, type: "区域入侵", name: "绿化带禁区", direction: "--", level: "重要", dedup: task.dedup || 30, targetRatio: "50", active: false }
  ];
}

function perimeterRuleCards(task = perimeterTasks[0], readonly = false) {
  const disabled = readonly ? "disabled" : "";
  const rules = perimeterDesignerRules(task);
  return `<div class="rule-summary" data-rule-card>
    <div class="rule-summary-head"><b>规则概览</b><span>${rules.length} / 10</span></div>
    <div class="rule-summary-list">
      ${rules.map(rule => `<div class="rule-summary-row ${rule.active ? "active" : ""}">
        <button class="rule-summary-main action-perimeter-rule-select" type="button"
          data-index="${rule.index}" data-type="${rule.type}" data-name="${rule.name}" data-direction="${rule.direction}" data-level="${rule.level}" data-dedup="${rule.dedup}" data-target-ratio="${rule.targetRatio}" ${disabled}>
          <span class="rule-summary-title"><em>${rule.index}</em>${tag(rule.type)}<b>${rule.name}</b></span>
          <span class="rule-summary-meta"><span>方向：${rule.direction}</span>${tag(rule.level)}<span>冷却：${rule.dedup} 秒</span></span>
        </button>
        <button class="btn text danger action-perimeter-rule-delete" ${disabled}>删除</button>
      </div>`).join("")}
    </div>
  </div>
  <div class="perimeter-rule-editor" data-readonly="${readonly ? "1" : "0"}">
    ${perimeterRuleEditorHtml(rules[0], readonly)}
  </div>`;
}

function perimeterRuleEditorHtml(rule, readonly = false) {
  const disabled = readonly ? "disabled" : "";
  const directionOptions = ["A→B", "B→A", "双向"].map(item => `<option ${item === rule.direction ? "selected" : ""}>${item}</option>`).join("");
  const levelOptions = ["紧急", "重要", "一般"].map(item => `<option ${item === rule.level ? "selected" : ""}>${item}</option>`).join("");
  const targetRatioField = rule.type === "区域入侵"
    ? `<div class="field"><label>检测目标占比</label><div class="unit-input"><input class="control" value="${rule.targetRatio}" ${disabled}><span>%</span></div></div>`
    : "";
  return `<div class="rule-editor-head" data-editor-rule-index="${rule.index}"><b>当前规则配置</b><span>规则 ${rule.index}</span></div>
    <div class="field"><label>规则名称 <span>*</span></label><input class="control" value="${rule.name}" ${disabled}></div>
    <div class="rule-editor-grid">
      <div class="field"><label>规则类型</label>${tag(rule.type)}</div>
      <div class="field"><label>告警级别</label><select class="control action-perimeter-rule-level" ${disabled}>${levelOptions}</select></div>
    </div>
    <div class="field"><label>方向</label>${rule.type === "越线入侵" ? `<select class="control" ${disabled}>${directionOptions}</select>` : `<input class="control" value="不涉及" disabled>`}</div>
    <div class="field"><label>去重冷却时长 <span>*</span></label><div class="unit-input"><input class="control" type="number" min="10" max="300" value="${rule.dedup}" ${disabled}><span>秒</span></div></div>
    ${targetRatioField}`;
}

function syncActivePerimeterRuleLevel(level) {
  const activeRule = document.querySelector(".rule-summary-row.active .action-perimeter-rule-select");
  if(!activeRule) return;
  activeRule.dataset.level = level;
  const meta = activeRule.querySelector(".rule-summary-meta");
  if(meta) meta.innerHTML = `<span>方向：${activeRule.dataset.direction}</span>${tag(level)}<span>冷却：${activeRule.dataset.dedup} 秒</span>`;
}

function openPerimeterTaskDrawer(editMode=false, taskId = currentPerimeterTaskId, readonly = false) {
  const task = perimeterTaskById(taskId);
  currentPerimeterTaskId = task.id;
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("wide", "perimeter-task-drawer");
  document.getElementById("drawerTitle").textContent = readonly ? "查看周界任务" : editMode ? "编辑周界任务" : "新增周界安防任务";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = renderPerimeterDesigner(task, readonly);
  document.getElementById("drawerFoot").innerHTML = readonly
    ? `<button class="btn" data-close="drawer">关闭</button>`
    : `<button class="btn action-perimeter-unsaved-close">取消</button><button class="btn action-perimeter-save-draft">保存草稿</button><button class="btn primary action-perimeter-save-enable">保存并启用</button>`;
  document.getElementById("drawerOverlay").classList.add("show");
}

function openPerimeterAlarmDrawer(alarmId = currentPerimeterAlarmId) {
  const alarm = perimeterAlarmById(alarmId);
  currentPerimeterAlarmId = alarm.id;
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("wide", "perimeter-alarm-drawer");
  document.getElementById("drawerTitle").textContent = "周界告警详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = renderPerimeterAlarmDetail(alarm);
  document.getElementById("drawerFoot").innerHTML = perimeterAlarmDrawerFoot(alarm);
  document.getElementById("drawerOverlay").classList.add("show");
}

function renderPerimeterAlarmDetail(alarm) {
  const info = [
    ["告警编号", alarm.id],
    ["告警类型", alarm.type],
    ["告警级别", alarm.level],
    ["触发时间", alarm.triggerTime],
    ["关联摄像头", alarm.camera],
    ["所属位置", alarm.location],
    ["关联任务", alarm.task],
    ["命中规则", `${alarm.rule} / ${alarm.ruleType}`],
    ["方向结果", alarm.direction],
    ["重复次数", `${alarm.repeat} 次`],
    ["告警状态", alarm.status],
    ["工单编号", alarm.workorderNo || "--"]
  ];
  return `<div class="perimeter-alarm-detail">
    <section class="perimeter-alarm-info">
      <h3 class="section-title">基础信息</h3>
      <div class="info-grid perimeter-info-grid">${info.map(([label, value]) => `<div class="info-item"><label>${label}</label><div>${tag(value)}</div></div>`).join("")}</div>
      <h3 class="section-title">去重与命中信息</h3>
      <div class="info-grid perimeter-info-grid">
        <div class="info-item"><label>目标信息</label><div>${alarm.target}</div></div>
        <div class="info-item"><label>命中坐标</label><div>${alarm.coordinates}</div></div>
        <div class="info-item"><label>首次触发</label><div>${alarm.triggerTime}</div></div>
        <div class="info-item"><label>最近触发</label><div>${alarm.latestTime}</div></div>
      </div>
      <h3 class="section-title">处理记录</h3>
      <div class="timeline perimeter-timeline">${alarm.audit.map(item => `<div class="timeline-item"><time>${item[0]}</time><b>${item[1]}</b><span>${item[2]}</span></div>`).join("")}</div>
      <h3 class="section-title">关联工单</h3>
      <div class="info-grid perimeter-info-grid">
        <div class="info-item"><label>工单生成状态</label><div>${alarm.workorderNo ? tag("已生成工单") : tag("未生成")}</div></div>
        <div class="info-item"><label>生成限制</label><div>同一告警仅允许生成一张工单</div></div>
        <div class="info-item"><label>责任部门</label><div>${alarm.ownerDept}</div></div>
      </div>
    </section>
    <section class="perimeter-media-panel">
      <div class="perimeter-snapshot">
        <div class="snapshot-toolbar"><b>抓拍图片</b><button class="btn">下载原图</button></div>
        <div class="snapshot-image">
          <span class="snapshot-target"></span>
          <span class="snapshot-rule ${alarm.type === "区域入侵" ? "region" : ""}"></span>
          <span class="snapshot-path"></span>
          <em>${alarm.type} / ${alarm.level}</em>
        </div>
      </div>
      <div class="perimeter-video-clip">
        <div class="snapshot-toolbar"><b>关联视频（前后各10秒）</b><button class="btn">下载视频</button></div>
        <div class="video-clip-box">
          <button class="video-play">▶</button>
          <span class="clip-time">${perimeterAlarmVideoRange(alarm.triggerTime)}</span>
          <div class="clip-progress"><i></i></div>
        </div>
      </div>
    </section>
  </div>`;
}

function perimeterAlarmDrawerFoot(alarm) {
  const close = `<button class="btn" data-close="drawer">关闭详情</button>`;
  if (alarm.status === "待确认") return `${close}<button class="btn danger action-perimeter-alarm-op" data-alarm-id="${alarm.id}" data-act="误报关闭">误报关闭</button><button class="btn primary action-perimeter-alarm-op" data-alarm-id="${alarm.id}" data-act="确认告警">确认告警</button>`;
  if (alarm.status === "已确认") return `${close}<button class="btn primary action-perimeter-alarm-op" data-alarm-id="${alarm.id}" data-act="生成工单">生成工单</button>`;
  return close;
}

function openPerimeterOperationModal(action, alarmId = currentPerimeterAlarmId) {
  const alarm = perimeterAlarmById(alarmId);
  const modal = document.getElementById("modal");
  modal.className = "modal perimeter-operation-modal";
  modal.dataset.action = `周界:${action}`;
  modal.dataset.perimeterAlarmId = alarm.id;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = action;
  document.getElementById("modalConfirm").textContent = action === "生成工单" ? "确认生成" : "确认";
  const base = {
    "确认告警": `确认后告警状态将从“待确认”变更为“已确认”，并记录确认人和确认时间。`,
    "误报关闭": `误报关闭后告警进入终态，不可再确认或生成工单。仅待确认告警允许执行误报关闭。`,
    "生成工单": `系统将创建 1 张处置工单并回写工单编号。该告警已生成工单后不可再次建单。`
  }[action] || "确认执行该操作？";
  const workorderPreview = action === "生成工单" ? `<div class="workorder-preview">
    <div><label>工单标题</label><b>【周界告警】【微冷园区】${alarm.type}-${alarm.camera.split(" ")[1]}-${alarm.triggerTime.replace(/[-: ]/g,"")}</b></div>
    <div><label>告警位置</label><b>${alarm.location}</b></div>
    <div><label>关联任务/规则</label><b>${alarm.task} / ${alarm.rule}</b></div>
    <div><label>现场情况描述</label><b>系统检测到周界告警。告警类型：${alarm.type}；级别：${alarm.level}；摄像头：${alarm.camera}；时间：${alarm.triggerTime}</b></div>
    <div><label>建议处理措施</label><b>请立即前往现场核查，确认是否存在非法入侵</b></div>
    <div><label>责任部门</label><b>${alarm.ownerDept}</b></div>
  </div>` : "";
  const falseReason = action === "误报关闭" ? `<div class="field perimeter-false-reason"><label>误报原因 <span>*</span></label><textarea class="control action-perimeter-false-reason" maxlength="200" placeholder="请填写核验依据，例如树影晃动、施工人员已报备、画面遮挡误识别"></textarea></div>` : "";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">${base}</div>${falseReason}${workorderPreview}`;
  document.getElementById("modalOverlay").classList.add("show");
}

function handlePerimeterOperationConfirm(action, alarmId) {
  const alarm = perimeterAlarmById(alarmId);
  const now = "2026-07-20 10:45:00";
  if (action === "确认告警") {
    if (alarm.status !== "待确认") {
      toast("仅待确认告警可确认");
      return false;
    }
    alarm.status = "已确认";
    alarm.audit.push([now, "确认告警", "张明确认告警有效。"]);
    toast("告警已确认，状态变更为已确认");
  } else if (action === "误报关闭") {
    if (alarm.status !== "待确认") {
      toast("仅待确认告警可误报关闭");
      return false;
    }
    const reasonInput = document.querySelector(".action-perimeter-false-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";
    if (!reason) {
      toast("请填写误报原因");
      reasonInput?.focus();
      return false;
    }
    alarm.status = "误报关闭";
    alarm.audit.push([now, "误报关闭", `张明核验后关闭为误报。原因：${reason}`]);
    toast("告警已关闭为误报，进入终态");
  } else if (action === "生成工单") {
    if (alarm.status !== "已确认" || alarm.workorderNo) {
      toast("仅已确认且未生成工单的告警可生成工单");
      return false;
    }
    alarm.workorderNo = `WO-20260720-00${18 + perimeterAlarms.filter(item => item.workorderNo).length}`;
    alarm.status = "已生成工单";
    alarm.audit.push([now, "生成工单", `已创建工单 ${alarm.workorderNo}。`]);
    toast(`工单已生成：${alarm.workorderNo}`);
  }
  if (currentModule === "perimeter") renderPage("perimeter");
  if (document.getElementById("drawerOverlay").classList.contains("show")) openPerimeterAlarmDrawer(alarm.id);
  return true;
}

function securityWorkorderRows() {
  return [
    {
      no: "AFGD-20260721-004",
      alarmNo: "ALM-20260721-0128",
      alarmType: "热成像过温告警",
      level: "紧急",
      location: "A栋 / 冷库机房 / 配电柜01",
      requirement: "请前往现场核查配电柜温度、负载和散热状态。",
      expectedCloseTime: "--",
      handler: "--",
      createdAt: "2026-07-21 10:38:12",
      status: "待派单",
      alarmStatus: "处理中",
      device: "THERM-2025-006 热成像测温仪",
      target: "配电柜01 最高温度 86.5°C",
      description: "热成像识别到配电柜温度超过安全阈值。",
      suggestion: "请前往现场核查配电柜温度、负载和散热状态。",
      dispatcher: "--",
      dispatchTime: "--",
      acceptTime: "--",
      startTime: "--",
      finishTime: "--",
      result: "待主管派单，暂未进入现场处理。",
      timeout: "未超时",
      attachment: "--",
      flow: [["2026-07-21 10:38:12", "生成工单", "张振新", "由热成像过温告警生成现场核查工单，状态进入待派单。"]]
    },
    {
      no: "AFGD-20260721-003",
      alarmNo: "ALM-20260721-0119",
      alarmType: "人员黑名单告警",
      level: "紧急",
      location: "南门入口闸机",
      requirement: "请核实人员身份并按安防要求现场处置。",
      expectedCloseTime: "2026-07-21 11:30",
      handler: "王涛",
      createdAt: "2026-07-21 10:02:28",
      status: "待接单",
      alarmStatus: "处理中",
      device: "FACE-2024-018 南门人脸闸机",
      target: "高启 / P20250061",
      description: "人脸识别命中人员黑名单。",
      suggestion: "请核实人员身份并按安防要求现场处置。",
      dispatcher: "张振新",
      dispatchTime: "2026-07-21 10:08:12",
      acceptTime: "--",
      startTime: "--",
      finishTime: "--",
      result: "已派单给处理人，等待处理人确认接单。",
      timeout: "未超时",
      attachment: "--",
      flow: [
        ["2026-07-21 10:02:28", "生成工单", "张振新", "由人员黑名单告警生成现场核查工单，状态进入待派单。"],
        ["2026-07-21 10:08:12", "派单", "张振新", "派单给王涛，工单状态由待派单变更为待接单。"]
      ]
    },
    {
      no: "AFGD-20260721-002",
      alarmNo: "ALM-20260721-0107",
      alarmType: "消防通道占用告警",
      level: "重要",
      location: "A栋 / 2F / 疏散通道",
      requirement: "请现场清理占用物并上传处理照片。",
      expectedCloseTime: "2026-07-21 10:30",
      handler: "闫卓宇",
      createdAt: "2026-07-21 09:21:06",
      status: "处理中",
      alarmStatus: "处理中",
      device: "CAM-2024-032 南门通道01",
      target: "通道堆放货物",
      description: "视频识别到消防通道被货物占用。",
      suggestion: "请现场清理占用物并上传处理照片。",
      dispatcher: "李浩",
      dispatchTime: "2026-07-21 09:30:18",
      acceptTime: "2026-07-21 09:42:06",
      startTime: "2026-07-21 09:45:20",
      finishTime: "--",
      result: "处理人已到达现场，正在联系责任区域人员清理占用物。",
      timeout: "未超时",
      attachment: "现场照片 1 张",
      flow: [
        ["2026-07-21 09:21:06", "生成工单", "系统", "由消防通道占用告警生成现场核查工单，状态进入待派单。"],
        ["2026-07-21 09:30:18", "派单", "李浩", "派单给闫卓宇，工单状态由待派单变更为待接单。"],
        ["2026-07-21 09:42:06", "接单", "闫卓宇", "处理人确认接单，工单状态由待接单变更为处理中。"],
        ["2026-07-21 09:45:20", "现场处理", "闫卓宇", "已到达 A栋 2F 疏散通道，上传现场照片并开始清理协调。"]
      ]
    },
    {
      no: "AFGD-20260721-001",
      alarmNo: "ALM-20260721-0096",
      alarmType: "人员聚集告警",
      level: "重要",
      location: "A栋 / 卸货区",
      requirement: "请现场疏导并确认是否存在安全风险。",
      expectedCloseTime: "2026-07-21 09:30",
      handler: "李浩",
      createdAt: "2026-07-21 08:22:16",
      status: "已完成",
      alarmStatus: "已完成",
      device: "CAM-2024-014 卸货区全景",
      target: "卸货区 8 人聚集",
      description: "视频识别到卸货区短时间内人员聚集。",
      suggestion: "请现场疏导并确认是否存在安全风险。",
      dispatcher: "张振新",
      dispatchTime: "2026-07-21 08:30:00",
      acceptTime: "2026-07-21 08:36:12",
      startTime: "2026-07-21 08:40:08",
      finishTime: "2026-07-21 09:08:32",
      result: "现场人员已疏导，确认无安全事件，告警处置闭环。",
      timeout: "否",
      attachment: "现场照片 2 张",
      flow: [
        ["2026-07-21 08:22:16", "生成工单", "系统", "由人员聚集告警生成现场核查工单，状态进入待派单。"],
        ["2026-07-21 08:30:00", "派单", "张振新", "派单给李浩，工单状态由待派单变更为待接单。"],
        ["2026-07-21 08:36:12", "接单", "李浩", "处理人确认接单，工单状态由待接单变更为处理中。"],
        ["2026-07-21 08:40:08", "现场处理", "李浩", "到达卸货区进行人员疏导，并核实是否存在安全风险。"],
        ["2026-07-21 09:08:32", "完成", "李浩", "提交处置说明和现场照片，工单状态变更为已完成。"]
      ]
    }
  ];
}

function renderSecurityWorkorderPage(mod, tab) {
  const rows = securityWorkorderRows();
  return `${tabs(mod, tab)}
    <div class="card filter-card">
      <div class="filters">
        <div class="field"><label>工单编号</label><input class="control" placeholder="请输入工单编号"></div>
        <div class="field"><label>关联告警类型</label><select class="control"><option>全部</option><option>热成像过温告警</option><option>人员聚集告警</option><option>消防通道占用告警</option><option>人员黑名单告警</option></select></div>
        <div class="field"><label>工单状态</label><select class="control"><option>全部</option><option>待派单</option><option>待接单</option><option>处理中</option><option>已完成</option></select></div>
        <div class="field security-workorder-created-filter"><label>创建时间</label><div class="date-range-control"><input class="control" placeholder="开始时间"><span>至</span><input class="control" placeholder="结束时间"></div></div>
        <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
      </div>
    </div>
    <div class="card table-card">
      <div class="table-toolbar">
        <div class="table-toolbar-left"><span class="tag primary">告警核查工单</span><span class="muted">由处理中告警手动生成；工单闭环后同步支撑告警完成</span></div>
        <div class="table-toolbar-right"><button class="btn">导出</button></div>
      </div>
      <div class="table-wrap">
        <table class="alarm-workorder-table">
          <thead><tr><th>序号</th><th>工单编号</th><th>关联告警类型/等级</th><th>告警位置</th><th>预计关单时间</th><th>处理人</th><th>工单状态</th><th>创建时间</th></tr></thead>
          <tbody>${rows.map((row, index) => `<tr>
            <td>${index + 1}</td>
            <td><button class="table-link action-detail" data-security-workorder-row="${encodeURIComponent(JSON.stringify(row))}">${row.no}</button></td>
            <td><div class="two-line-cell alarm-workorder-type-level"><b>${row.alarmType}</b>${securityAlarmLevelTag(row.level)}</div></td>
            <td>${row.location}</td>
            <td>${row.expectedCloseTime}</td>
            <td>${row.handler}</td>
            <td>${securityWorkorderStatusTag(row.status)}</td>
            <td>${row.createdAt}</td>
          </tr>`).join("")}</tbody>
        </table>
      </div>
      ${pagination(rows.length)}
    </div>`;
}

function securityWorkorderDetailFromRow(row = securityWorkorderRows()[0] || {}) {
  const alarm = securityAlarmById(row.alarmNo);
  return {
    no: row.no || "AFGD-20260721-001",
    alarmNo: row.alarmNo || "--",
    alarmType: alarm?.type || row.alarmType || "--",
    level: alarm?.level || row.level || "--",
    location: alarm?.location || row.location || "--",
    expectedCloseTime: row.expectedCloseTime || "--",
    handler: row.handler || "--",
    status: row.status || "待派单",
    createdAt: row.createdAt || "--",
    requirement: alarm?.suggestion || row.requirement || "按告警要求到现场核查并上传处置结果",
    alarmStatus: row.alarmStatus || "--",
    device: alarm?.device || row.device || "--",
    target: alarm?.target || row.target || "--",
    description: alarm?.description || row.description || "--",
    suggestion: alarm?.suggestion || row.suggestion || row.requirement || "--",
    triggerTime: alarm?.triggerTime || "--",
    latestTime: alarm?.latestTime || "--",
    dispatcher: row.dispatcher || "--",
    dispatchTime: row.dispatchTime || "--",
    acceptTime: row.acceptTime || "--",
    startTime: row.startTime || "--",
    finishTime: row.finishTime || "--",
    result: row.result || "--",
    timeout: row.timeout || "--",
    attachment: row.attachment || "--",
    flow: Array.isArray(row.flow) ? row.flow : []
  };
}

function securityWorkorderFocus(detail) {
  const map = {
    "待派单": ["待主管派单", "当前工单尚未指派处理人，需从今日值班人员中选择处理人并确认处理时限。"],
    "待接单": ["等待处理人接单", `${detail.handler} 已被指派，等待确认接单；如需调整处理人可直接换人。`],
    "处理中": ["现场处理中", `${detail.handler} 已接单并开始处理，可按现场情况换人继续处理。`],
    "已完成": ["处置已完成", detail.result || "现场核查已完成，处理结果和附件已留痕。"]
  };
  const [title, desc] = map[detail.status] || map["待派单"];
  return { title, desc };
}

function renderSecurityWorkorderDetail(activeTab = "关联告警") {
  const detail = currentSecurityWorkorderDetail || securityWorkorderDetailFromRow();
  const tabs = ["关联告警", "处理重点", "流程明细"];
  const focus = securityWorkorderFocus(detail);
  const alarmRows = [
    [["告警编号", detail.alarmNo], ["告警类型/等级", `${detail.alarmType} / ${securityAlarmLevelTag(detail.level)}`]],
    [["告警时间", detail.triggerTime]],
    [["告警位置", detail.location], ["关联设备", detail.device]],
    [["处置建议", detail.suggestion]]
  ];
  return `<section class="alarm-workorder-detail security-workorder-detail">
    <div class="alarm-workorder-title-row">
      <h3>${detail.no}</h3>
      ${securityWorkorderStatusTag(detail.status)}
    </div>
    <div class="security-workorder-focus">
      <div class="security-workorder-focus-main">
        <span>${detail.alarmType} ${securityAlarmLevelTag(detail.level)}</span>
        <h4>${focus.title}</h4>
        <p>${focus.desc}</p>
      </div>
      <div class="security-workorder-focus-meta">
        <div><label>处理人</label><b>${detail.handler}</b></div>
        <div><label>预计关单</label><b>${detail.expectedCloseTime}</b></div>
        <div><label>告警位置</label><b>${detail.location}</b></div>
        <div><label>创建时间</label><b>${detail.createdAt}</b></div>
      </div>
    </div>
    <div class="alarm-workorder-tabs">
      ${tabs.map(tabName=>`<button class="${tabName===activeTab?"active":""}" data-security-workorder-detail-tab="${tabName}">${tabName}</button>`).join("")}
    </div>
    <div class="alarm-workorder-tabbody">
      ${activeTab === "关联告警" ? renderSecurityWorkorderAlarmTab(detail, alarmRows) : activeTab === "流程明细" ? renderSecurityWorkorderFlow(detail) : renderSecurityWorkorderProcess(detail)}
    </div>
  </section>`;
}

function renderSecurityWorkorderAlarmTab(detail, rows) {
  return `<div class="security-workorder-alarm-tab">
    <div class="security-workorder-alarm-content">
      <div class="snapshot-image security-workorder-alarm-shot">
        <span class="snapshot-target"></span>
        <span class="snapshot-rule region"></span>
        <em>告警抓拍 / ${detail.alarmType} / ${detail.level}</em>
      </div>
      ${renderSecurityWorkorderInfoGrid(rows)}
    </div>
  </div>`;
}

function renderSecurityWorkorderProcess(detail) {
  const rows = [
    [["派单人", detail.dispatcher], ["派单时间", detail.dispatchTime]],
    [["接单时间", detail.acceptTime], ["开始处理", detail.startTime]],
    [["完成时间", detail.finishTime], ["是否超时", detail.timeout]],
    [["处理附件", detail.attachment], ["处理结果", detail.result]]
  ];
  return `<div class="security-workorder-process">
    ${rows.map(row=>row.map(([label,value])=>`<div><label>${label}</label><b>${value || "--"}</b></div>`).join("")).join("")}
  </div>`;
}

function renderSecurityWorkorderInfoGrid(rows) {
  return `<div class="alarm-workorder-basic-grid">${rows.map(row=>row.map(([label,value])=>`<div class="alarm-workorder-basic-item"><label>${label}</label><div>${value || "--"}</div></div>`).join("")).join("")}</div>`;
}

function renderSecurityWorkorderFlow(detail = currentSecurityWorkorderDetail || securityWorkorderDetailFromRow()) {
  const rows = detail.flow.length ? detail.flow : [[detail.createdAt, "生成工单", "系统", `由告警 ${detail.alarmNo} 生成安防现场核查工单，状态进入待派单。`]];
  return `<div class="alarm-workorder-flow">${rows.map(([time,node,operator,content])=>`<div class="alarm-workorder-flow-item"><time>${time || "--"}</time><i></i><div><b>${node}</b><span>${operator}：${content}</span></div></div>`).join("")}</div>`;
}

function openPerimeterTaskOperationModal(action, taskId = currentPerimeterTaskId) {
  const task = perimeterTaskById(taskId);
  const modal = document.getElementById("modal");
  modal.className = "modal perimeter-operation-modal";
  modal.dataset.action = `周界任务:${action}`;
  modal.dataset.perimeterTaskId = task.id;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = action;
  document.getElementById("modalConfirm").textContent = "确认";
  const tips = {
    "启用任务": `启用前需校验必填项、至少1条启用规则、摄像头在线且无周界启用任务冲突。`,
    "停用任务": task.status === "异常停用" ? `确认后任务由“异常停用”转为“已停用”，摄像头恢复后不再自动恢复检测。` : `停用后任务不再产生新告警，历史告警记录保留。`,
    "删除任务": `仅已停用任务允许删除；删除任务不会删除历史告警记录。`
  };
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">${tips[action] || "确认执行该任务操作？"}</div>
    <div class="info-grid perimeter-info-grid"><div class="info-item"><label>任务名称</label><div>${task.name}</div></div><div class="info-item"><label>当前状态</label><div>${tag(task.status)}</div></div><div class="info-item"><label>关联摄像头</label><div>${task.camera}</div></div></div>`;
  document.getElementById("modalOverlay").classList.add("show");
}

function handlePerimeterTaskOperationConfirm(action, taskId) {
  const task = perimeterTaskById(taskId);
  if (action === "启用任务") {
    const camera = perimeterCameraOptions.find(item => item.code === task.camera.split(" ")[0]);
    if (camera && camera.status !== "在线") {
      toast("启用失败：关联摄像头不在线");
      return;
    }
    const hasConflict = perimeterTasks.some(item => item.id !== task.id && item.status === "已启用" && item.camera.split(" ")[0] === task.camera.split(" ")[0]);
    if (hasConflict) {
      toast("启用失败：同一摄像头已存在启用中的周界任务");
      return;
    }
    task.status = "已启用";
    task.updatedAt = "2026-07-20 10:45:00";
    task.updatedBy = "张明";
    toast("任务已启用并下发至AI分析引擎");
  } else if (action === "停用任务") {
    task.status = "已停用";
    task.updatedAt = "2026-07-20 10:45:00";
    task.updatedBy = "张明";
    toast("任务已停用，历史告警记录保留");
  } else if (action === "删除任务") {
    if (task.status !== "已停用") {
      toast("仅已停用任务可删除");
      return;
    }
    const index = perimeterTasks.findIndex(item => item.id === task.id);
    if (index >= 0) perimeterTasks.splice(index, 1);
    toast("任务已删除，历史告警记录保留");
  }
  if (currentModule === "perimeter") renderPage("perimeter");
}

function securityAlarmById(alarmId) {
  return securityAlarmEvents.find(item => item.id === alarmId) || securityAlarmEvents[0];
}

function securityAlarmDrawerFoot(alarm) {
  const close = `<button class="btn" data-close="drawer">关闭详情</button>`;
  if (alarm.status === "待确认") return `${close}<button class="btn danger action-security-alarm-op" data-alarm-id="${alarm.id}" data-act="误报关闭">误报关闭</button><button class="btn primary action-security-alarm-op" data-alarm-id="${alarm.id}" data-act="确认告警">确认告警</button>`;
  if (alarm.status === "已确认") return `${close}<button class="btn primary action-security-alarm-op" data-alarm-id="${alarm.id}" data-act="生成工单">生成工单</button>`;
  return close;
}

function syncSecurityAlarmTableRow(alarm) {
  const row = tableConfigs.alarm.rows.find(item => item[0] === alarm.id);
  if (!row) return;
  row[2] = alarm.level;
  row[3] = `${alarm.location}|${alarm.device}`;
  row[4] = alarm.triggerTime;
  row[5] = alarm.status;
}

function openSecurityAlarmOperationModal(action, alarmId) {
  const alarm = securityAlarmById(alarmId);
  const modal = document.getElementById("modal");
  modal.className = "modal perimeter-operation-modal";
  modal.dataset.action = `安防告警:${action}`;
  modal.dataset.securityAlarmId = alarm.id;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = action;
  document.getElementById("modalConfirm").textContent = action === "生成工单" ? "确认生成" : "确认";
  const base = {
    "确认告警": `确认后告警状态将从“待确认”变更为“已确认”，并记录确认人和确认时间。`,
    "误报关闭": `误报关闭后告警进入终态，不可再确认或生成工单。仅待确认告警允许执行误报关闭。`,
    "生成工单": `系统将创建 1 张安防工单并回写工单编号。该告警已生成工单后不可再次建单。`
  }[action] || "确认执行该操作？";
  const workorderPreview = action === "生成工单" ? `<div class="workorder-preview">
    <div><label>工单标题</label><b>【安防告警】【微冷园区】${alarm.type}-${alarm.location.split(" / ").slice(-1)[0]}-${alarm.triggerTime.replace(/[-: ]/g,"")}</b></div>
    <div><label>告警位置</label><b>${alarm.location}</b></div>
    <div><label>关联信息</label><b>${alarm.device} / ${alarm.target}</b></div>
    <div><label>现场情况描述</label><b>${alarm.description} 告警类型：${alarm.type}；级别：${alarm.level}；设备：${alarm.device}；时间：${alarm.triggerTime}</b></div>
    <div><label>建议处理措施</label><b>${alarm.suggestion}</b></div>
    <div><label>责任部门</label><b>${alarm.ownerDept}</b></div>
  </div>` : "";
  const falseReason = action === "误报关闭" ? `<div class="field perimeter-false-reason"><label>误报原因 <span>*</span></label><textarea class="control action-security-alarm-false-reason" maxlength="200" placeholder="请填写核验依据，例如树影晃动、施工人员已报备、画面遮挡误识别"></textarea></div>` : "";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">${base}</div>${falseReason}${workorderPreview}`;
  document.getElementById("modalOverlay").classList.add("show");
}

function handleSecurityAlarmOperationConfirm(action, alarmId) {
  const alarm = securityAlarmById(alarmId);
  const now = "2026-07-21 10:45:00";
  if (action === "确认告警") {
    if (alarm.status !== "待确认") {
      toast("仅待确认告警可确认");
      return false;
    }
    alarm.status = "已确认";
    alarm.audit.push([now, "确认告警", "张明确认告警有效。"]);
    toast("告警已确认，状态变更为已确认");
  } else if (action === "误报关闭") {
    if (alarm.status !== "待确认") {
      toast("仅待确认告警可误报关闭");
      return false;
    }
    const reasonInput = document.querySelector(".action-security-alarm-false-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";
    if (!reason) {
      toast("请填写误报原因");
      reasonInput?.focus();
      return false;
    }
    alarm.status = "误报关闭";
    alarm.audit.push([now, "误报关闭", `张明核验后关闭为误报。原因：${reason}`]);
    toast("告警已关闭为误报，进入终态");
  } else if (action === "生成工单") {
    if (alarm.status !== "已确认" || alarm.workorderNo) {
      toast("仅已确认且未生成工单的告警可生成工单");
      return false;
    }
    const nextNo = Math.max(0, ...securityAlarmEvents.map(item => Number((item.workorderNo || "").match(/(\d+)$/)?.[1] || 0))) + 1;
    alarm.workorderNo = `AFGD-20260721-${String(nextNo).padStart(3, "0")}`;
    alarm.workorderStatus = "待派单";
    alarm.currentOwner = "安保主管";
    alarm.handler = "--";
    alarm.expectedCloseTime = "2026-07-21 12:00";
    alarm.status = "已生成工单";
    alarm.audit.push([now, "生成工单", `已创建工单 ${alarm.workorderNo}。`]);
    toast(`工单已生成：${alarm.workorderNo}`);
  }
  syncSecurityAlarmTableRow(alarm);
  if (currentModule === "alarm" && (currentTab.alarm || "告警配置") === "告警事件") renderPage("alarm");
  if (document.getElementById("drawerOverlay").classList.contains("show")) openSecurityAlarmDrawer(alarm.id);
  return true;
}

function openSecurityAlarmDrawer(alarmId) {
  const alarm = securityAlarmById(alarmId);
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("wide", "perimeter-alarm-drawer", "security-alarm-drawer");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "DETAIL";
  document.getElementById("drawerTitle").textContent = "安防告警详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = `<div class="security-alarm-detail">
    <section class="security-alarm-main">
      <h3 class="section-title">告警信息</h3>
      <div class="info-grid security-alarm-info-grid">
        <div class="info-item"><label>告警编号</label><div>${alarm.id}</div></div>
        <div class="info-item"><label>告警类型</label><div>${alarm.type}</div></div>
        <div class="info-item"><label>告警等级</label><div>${tag(alarm.level)}</div></div>
        <div class="info-item"><label>告警时间</label><div>${alarm.triggerTime}</div></div>
        <div class="info-item wide"><label>告警位置</label><div>${alarm.location}</div></div>
        <div class="info-item wide"><label>关联设备</label><div>${alarm.device}</div></div>
        <div class="info-item wide"><label>目标信息</label><div>${alarm.target}</div></div>
        <div class="info-item"><label>告警状态</label><div>${tag(alarm.status)}</div></div>
      </div>
      <h3 class="section-title">处理记录</h3>
      <div class="timeline perimeter-timeline">${alarm.audit.map(item => `<div class="timeline-item"><time>${item[0]}</time><b>${item[1]}</b><span>${item[2]}</span></div>`).join("")}</div>
    </section>
    <aside class="security-alarm-side">
      <div class="perimeter-snapshot">
        <div class="snapshot-toolbar"><b>告警抓拍</b><button class="btn">下载图片</button></div>
        <div class="snapshot-image security-alarm-shot"><span class="snapshot-target"></span><span class="snapshot-rule region"></span><em>${alarm.type} / ${alarm.level}</em></div>
      </div>
      <div class="security-alarm-workorder-card">
        <h3>关联工单</h3>
        <div class="info-item"><label>工单状态</label><div>${alarm.workorderNo ? tag("已生成工单") : tag("未生成")}</div></div>
        <div class="info-item"><label>工单编号</label><div>${alarm.workorderNo ? `<button class="table-link action-alarm-workorder-link" data-workorder-no="${alarm.workorderNo}">${alarm.workorderNo}</button>` : "--"}</div></div>
        <div class="info-item"><label>生成规则</label><div>同一告警仅允许生成一张安防工单</div></div>
      </div>
    </aside>
  </div>`;
  document.getElementById("drawerFoot").innerHTML = securityAlarmDrawerFoot(alarm);
  document.getElementById("drawerOverlay").classList.add("show");
}

function openCompanyPersonnelDrawer(trigger) {
  const row = trigger.closest("tr");
  const cells = [...row.querySelectorAll("td")].map(x => x.textContent.trim());
  const companyName = cells[2] || "企业";
  const count = trigger.textContent.trim();
  const rows = [
    ["李晨","P20260042","正式员工","研发中心","算法工程师","186 6178 2304","在职"],
    ["陈可","P20260045","正式员工","研发中心","测试工程师","185 5323 6120","在职"],
    ["周雨","P20260058","外包员工","实施服务部","项目工程师","139 0013 9000","在职"],
    ["王浩","P20250077","实习生","制造中心","生产助理","178 5321 0019","停用"],
    ["孙宁","P20250106","正式员工","运营管理部","运营专员","156 1002 8473","在职"]
  ];
  document.getElementById("drawerTitle").textContent=`${companyName} / 关联人员`;
  document.getElementById("drawerTabs").innerHTML=`<button class="tab active">绑定人员（${count}）</button>`;
  document.getElementById("drawerBody").innerHTML=`<div class="alert">展示该企业下已绑定的人员档案，数据来源于人员管理模块。</div>
  <div class="card filter-card company-personnel-filter"><div class="filters"><div class="field keyword"><label>姓名/人员编号/联系方式</label><input class="control" placeholder="请输入姓名/人员编号/联系方式"></div><div class="field"><label>部门</label><select class="control"><option>全部</option><option>研发中心</option><option>实施服务部</option><option>制造中心</option><option>运营管理部</option></select></div><div class="field"><label>人员状态</label><select class="control"><option>全部</option><option>在职</option><option>停用</option><option>离职</option></select></div><div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div></div></div>
  <div class="card table-card"><div class="table-wrap"><table class="company-personnel-table"><thead><tr><th>序号</th><th>姓名</th><th>人员编号</th><th>员工类型</th><th>所属部门</th><th>岗位</th><th>联系方式</th><th>人员状态</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td>${r.map(v=>`<td>${tag(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${pagination(Number.parseInt(count,10)||rows.length)}</div>`;
  document.getElementById("drawerFoot").innerHTML=`<button class="btn" data-close="drawer">关闭</button><button class="btn primary" data-module="person">进入人员管理</button>`;
  document.getElementById("drawer").classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function openCompanyRoomsModal(trigger) {
  const row = trigger.closest("tr");
  const cells = [...row.querySelectorAll("td")].map(x => x.textContent.trim());
  const companyName = cells[2] || "企业";
  const modal = document.getElementById("modal");
  modal.className = "modal company-room-modal";
  document.getElementById("modalTitle").textContent = "企业关联房间";
  document.getElementById("modalBody").innerHTML = `
    <div class="company-room-head">
      <div><b>${companyName}</b><span>已关联 ${companyLinkedRooms.length} 间房间</span></div>
      <button class="btn primary" data-action="绑定新房间">＋ 绑定新房间</button>
    </div>
    <div class="company-room-table table-wrap">
      <table>
        <thead><tr><th>房间名称</th><th>园区</th><th>楼栋</th><th>楼层</th><th>位置全称</th><th>创建时间</th><th>操作</th></tr></thead>
        <tbody>${companyLinkedRooms.map(room=>`<tr><td>${room[0]}</td><td>${room[1]}</td><td>${room[2]}</td><td>${room[3]}</td><td title="${room[4]}">${room[4]}</td><td>${room[5].replace(" ","<br>")}</td><td><button class="btn text danger" data-action="解绑房间" data-room-name="${room[0]}">解绑</button></td></tr>`).join("")}</tbody>
      </table>
    </div>
    ${companyRoomPager(companyLinkedRooms.length, 1, 1)}`;
  document.getElementById("modalConfirm").textContent = "关闭";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
  document.getElementById("modalOverlay").classList.add("show");
}

function companyRoomPager(total, page, totalPages) {
  return `<div class="room-modal-pagination"><span>共 ${total} 条</span><select class="control"><option>10条/页</option></select><button class="page-btn" ${page===1?"disabled":""}>‹</button>${Array.from({length:totalPages},(_,i)=>`<button class="page-btn ${page===i+1?"active":""}">${i+1}</button>`).join("")}<button class="page-btn" ${page===totalPages?"disabled":""}>›</button><span>前往</span><input class="control" value="${page}"><span>页</span></div>`;
}

function selectedRoomChips() {
  const selected = companySelectableRooms.filter(room => selectedCompanyRoomIds.has(room[0]));
  return selected.length ? selected.map(room=>`<span class="room-selected-chip"><b>${room[0]}</b><small>${room[1]} / ${room[2]} / ${room[3]}</small><button type="button" data-remove-room="${room[0]}" aria-label="移除${room[0]}">×</button></span>`).join("") : `<span class="room-selected-empty">暂无已选房间</span>`;
}

function renderSelectedRoomArea() {
  const area = document.getElementById("selectedRoomChips");
  const count = document.getElementById("selectedRoomCount");
  if(area) area.innerHTML = selectedRoomChips();
  if(count) count.textContent = selectedCompanyRoomIds.size;
}

function openRoomPickerModal() {
  document.getElementById("roomPickerTitle").textContent = "选择房间";
  document.getElementById("roomPickerBody").innerHTML = `
    <div class="room-picker-filter">
      <label>房间名称</label><input class="control" placeholder="请输入房间名称">
      <button class="btn primary action-query">搜索</button><button class="btn action-reset">重置</button>
    </div>
    <div class="room-selected-panel">
      <div class="room-selected-title"><b>已选房间（<em id="selectedRoomCount">${selectedCompanyRoomIds.size}</em>）：</b><span>点击右侧 × 可快速移除</span></div>
      <div class="room-selected-list" id="selectedRoomChips">${selectedRoomChips()}</div>
    </div>
    <div class="company-room-table table-wrap">
      <table>
        <thead><tr><th><input type="checkbox" checked aria-label="全选房间"></th><th>房间名称</th><th>园区</th><th>楼栋</th><th>楼层</th><th>房间面积</th><th>状态</th></tr></thead>
        <tbody>${companySelectableRooms.map(room=>`<tr><td><input type="checkbox" data-room-check="${room[0]}" ${selectedCompanyRoomIds.has(room[0])?"checked":""}></td><td>${room[0]}</td><td>${room[1]}</td><td>${room[2]}</td><td>${room[3]}</td><td>${room[4]}</td><td>${room[5]}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    ${companyRoomPager(60, 1, 7)}`;
  document.getElementById("roomPickerOverlay").classList.add("show");
}

function openCompanyRoomBatchModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal company-room-picker-modal company-room-batch-modal";
  document.getElementById("modalTitle").textContent = "批量绑定";
  document.getElementById("modalBody").innerHTML = `
    <div class="batch-bind-company">
      <label class="required">选择企业</label>
      <select class="control">
        <option>大连微冷食品股份有限公司</option>
        <option>大连瑞兴天宝水产品有限公司</option>
        <option>大连微冷农产品有限公司</option>
        <option>联合林洋食品（大连）有限公司</option>
        <option>海洋食品设计与创制高新技术研究院</option>
      </select>
    </div>
    <div class="room-picker-filter">
      <label>房间名称</label><input class="control" placeholder="请输入房间名称">
      <button class="btn primary action-query">搜索</button><button class="btn action-reset">重置</button>
    </div>
    <div class="room-selected-panel">
      <div class="room-selected-title"><b>已选房间（<em id="selectedRoomCount">${selectedCompanyRoomIds.size}</em>）：</b><span>点击右侧 × 可快速移除</span></div>
      <div class="room-selected-list" id="selectedRoomChips">${selectedRoomChips()}</div>
    </div>
    <div class="company-room-table table-wrap">
      <table>
        <thead><tr><th><input type="checkbox" checked aria-label="全选房间"></th><th>房间名称</th><th>园区</th><th>楼栋</th><th>楼层</th><th>房间面积</th><th>状态</th></tr></thead>
        <tbody>${companySelectableRooms.map(room=>`<tr><td><input type="checkbox" data-room-check="${room[0]}" ${selectedCompanyRoomIds.has(room[0])?"checked":""}></td><td>${room[0]}</td><td>${room[1]}</td><td>${room[2]}</td><td>${room[3]}</td><td>${room[4]}</td><td>${room[5]}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    ${companyRoomPager(60, 1, 7)}`;
  document.getElementById("modalConfirm").textContent = "确认绑定";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalOverlay").classList.add("show");
}

function openRoomUnbindConfirm(roomName) {
  pendingUnbindRoomName = roomName;
  document.getElementById("roomConfirmBody").innerHTML = `<div class="confirm-message">确认解绑房间“${roomName}”吗？解绑后该房间将不再关联当前企业。</div>`;
  document.getElementById("roomConfirmOverlay").classList.add("show");
}

function renderGatehouse(mod) {
  return `${pageHead(mod)}${tabs(mod,"岗亭值守（暂放）")}
  <div class="gatehouse-workbench">
    <div class="gate-topline">
      <div class="gate-brand"><span class="gate-logo">P</span><b>微冷园区 - 南侧广场车场</b><span>⌄</span></div>
      <div class="gate-lane"><span class="lane-icon">↔</span><b>南出口</b><span>⌄</span></div>
      <time>2026-06-16&nbsp;&nbsp;10 : 46 : 22</time>
    </div>
    <section class="gate-main-video gate-video-tile">
      <b>南出口 - 车牌监测</b><span class="video-play">▶</span><time>2026-06-16 10:46:22</time>
    </section>
    <section class="gate-side-videos">
      <div class="gate-video-tile small"><b>车辆出入口全景</b><span class="video-play small">▶</span><time>2026-06-16 10:46:20</time></div>
      <div class="gate-video-empty">未配置关联视频</div>
    </section>
    <section class="gate-record-panel">
      <div class="gate-panel-title">当日过车记录</div>
      <div class="gate-search"><input class="control" placeholder="车牌号"><button class="btn primary action-query">查询</button></div>
      <table class="gate-record-table"><thead><tr><th>序号</th><th>车牌号 / 通过时间</th><th>抬杆方式</th></tr></thead><tbody>
        <tr><td>1</td><td><b>鲁B·A726Q</b><span>2026-06-16 10:31:44</span></td><td>自动放行</td></tr>
        <tr class="active no-permission" title="特殊车辆出场需门卫移动端拍照登记后处理"><td>2</td><td><b>鲁B·L8899</b><em>出场待核验</em><span>2026-06-16 10:46:22</span></td><td>待处理</td></tr>
        <tr><td>3</td><td><b>鲁B·K3208</b><span>2026-06-16 10:42:18</span></td><td>入场自动放行</td></tr>
        <tr><td>4</td><td><b>鲁B·C1108</b><span>2026-06-16 10:22:09</span></td><td>拦截</td></tr>
        <tr><td>5</td><td><b>鲁B·F918D</b><span>2026-06-16 10:08:36</span></td><td>自动放行</td></tr>
        <tr><td>6</td><td><b>鲁B·S5506</b><span>2026-06-16 09:56:13</span></td><td>自动放行</td></tr>
      </tbody></table>
    </section>
    <section class="gate-latest-panel">
      <div class="gate-panel-title">最新过车信息面板</div>
      <div class="latest-photo gate-video-tile tiny"><b>南出口 - 车牌监测</b><time>2026-06-16 10:46:22</time></div>
      <div class="latest-detail">
        <div class="latest-head"><span>车牌号：</span><b>鲁B·L8899</b><em class="danger">出场待核验</em><button class="btn danger action-business" data-act="特殊车辆出场核验">移动端放行登记</button></div>
        <div class="latest-info">
          <div><label>车辆权限状态</label><b>特殊车辆登记有效</b></div>
          <div><label>车辆类型</label><b>冷链车辆</b></div>
          <div><label>入场时间</label><b>2026-06-16 09:38:24</b></div>
          <div><label>出场时间</label><b>待登记</b></div>
          <div><label>抬杆方式</label><b>待处理</b></div>
          <div><label>放行状态</label><b>等待门卫移动端核验</b></div>
        </div>
        <div class="latest-status"><strong>特殊车辆出场不自动抬杆，必须拍照、登记出场信息后手动放行。</strong></div>
      </div>
    </section>
    <section class="gate-control-panel">
      <div class="gate-panel-title">道闸控制面板</div>
      <div class="gate-control-grid">
        <button class="gate-control" disabled title="当前存在特殊车辆出场待核验，请先完成移动端拍照登记">抬杆</button>
        <button class="gate-control" disabled title="当前存在特殊车辆出场待核验，请先完成移动端拍照登记">落杆</button>
        <button class="gate-control warn" disabled title="当前存在特殊车辆出场待核验，请先完成移动端拍照登记">常抬</button>
        <button class="gate-control warn" disabled title="当前存在特殊车辆出场待核验，请先完成移动端拍照登记">常落</button>
      </div>
    </section>
  </div>`;
}

function renderCalendar(mod) {
  const { year, month } = scheduleCalendarState;
  const daysInMonth = new Date(year, month, 0).getDate();
  const prevMonthDays = new Date(year, month - 1, 0).getDate();
  const leadingEmptyDays = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const trailingEmptyDays = (7 - ((leadingEmptyDays + daysInMonth) % 7)) % 7;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const isScheduledMonth = year === 2026 && month === 7;
  const selectValue = `${year}-${String(month).padStart(2, "0")}`;
  const monthOptions = [-1, 0, 1].map(offset => {
    const optionDate = new Date(year, month - 1 + offset, 1);
    const optionYear = optionDate.getFullYear();
    const optionMonth = optionDate.getMonth() + 1;
    const value = `${optionYear}-${String(optionMonth).padStart(2, "0")}`;
    return `<option value="${value}" ${value === selectValue ? "selected" : ""}>${optionYear}年${optionMonth}月</option>`;
  }).join("");
  const renderPersonChip = name => `<button class="schedule-person security action-schedule-adjust" data-act="排班调整"><b>${name}</b></button>`;
  const renderDay = day => {
    if (!isScheduledMonth) {
      return `<div class="security-month-day unscheduled">
        <div class="security-day-head">
          <div><b>${day}</b><span>${month}月${day}日</span></div>
        </div>
        <button class="schedule-unassigned action-schedule-adjust" data-act="设置排班" data-schedule-date="${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}">未排班</button>
      </div>`;
    }
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const item = getSecurityDutyByDate(dateKey);
    return `<div class="security-month-day">
      <div class="security-day-head">
        <div><b>${day}</b><span>${month}月${day}日</span></div>
      </div>
      <div class="schedule-people security-people">${item.people.map(renderPersonChip).join("")}</div>
      <button class="schedule-person leader action-schedule-adjust" data-act="${item.leader.includes("请假") ? "队长请假" : "排班调整"}"><b>${item.leader}</b></button>
    </div>`;
  };
  return `${tabs(mod,"排班日历")}
  <div class="card filter-card schedule-month-filter">
    <div class="filters">
      <div class="field"><label>排班月份</label><select class="control" data-schedule-month-select>${monthOptions}</select></div>
      <div class="filter-actions"><button class="btn" data-schedule-month-step="-1">‹ 上月</button><button class="btn primary" data-schedule-month-today>本月</button><button class="btn" data-schedule-month-step="1">下月 ›</button></div>
    </div>
  </div>
  <div class="card schedule-board">
    <div class="schedule-board-head">
      <div><b>${year} 年 ${month} 月安防排班月历</b><span>${isScheduledMonth ? "点击人员可进行请假顶班、人员调班或队长请假。" : "当前月份尚未排班，日期格显示未排班占位。"}</span></div>
    </div>
    <div class="security-month-calendar">
      ${["周一","周二","周三","周四","周五","周六","周日"].map(x => `<div class="security-month-weekday">${x}</div>`).join("")}
      ${Array.from({ length: leadingEmptyDays }, (_, i) => `<div class="security-month-day outside"><b>${prevMonthDays - leadingEmptyDays + i + 1}</b><span>${month === 1 ? 12 : month - 1}月</span></div>`).join("")}
      ${days.map(renderDay).join("")}
      ${Array.from({ length: trailingEmptyDays }, (_, i) => `<div class="security-month-day outside"><b>${i + 1}</b><span>${month === 12 ? 1 : month + 1}月</span></div>`).join("")}
    </div>
  </div>`;
}

function getSecurityDutyByDate(dateKey = "2026-07-21") {
  const shiftGroups = [
    { people: ["张振新", "李浩"] },
    { people: ["闫卓宇", "王涛"] },
    { people: ["陈航", "孙凯"] }
  ];
  const adjustments = {
    "2026-07-09": { people: ["闫卓宇", "孙凯"], leader: "钱队" },
    "2026-07-13": { people: ["张振新", "王涛"], leader: "钱队" },
    "2026-07-24": { people: ["闫卓宇", "王涛"], leader: "钱队 · 请假" }
  };
  if (adjustments[dateKey]) return adjustments[dateKey];
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const baseDate = new Date(2026, 6, 1);
  const diffDays = Math.round((date - baseDate) / 86400000);
  const base = shiftGroups[((diffDays % shiftGroups.length) + shiftGroups.length) % shiftGroups.length];
  return { people: base.people, leader: "钱队" };
}

function todaySecurityDutyText() {
  const duty = getSecurityDutyByDate("2026-07-21");
  return [...duty.people, duty.leader].join("、");
}

function renderVisitorConfig(mod) {
  const vehicleDisabled = !visitorConfigState.allowVehicle;
  const personDeviceSummary = visitorDeviceSummary("person");
  const vehicleDeviceSummary = visitorDeviceSummary("vehicle");
  return `${pageHead(mod,"保存配置")}${tabs(mod,"基础权限配置")}
  <div class="visitor-config-page">
    <div class="visitor-config-main">
      <section class="card visitor-config-section visitor-rule-card" id="visitor-date-rule">
        <div class="card-head"><h3><i>日</i>预约日期规则</h3></div>
        <div class="card-body visitor-setting-grid">
          <div class="visitor-setting-item">
            <div><label>可提前预约天数</label><p>最早到访日期。</p></div>
            <div class="unit-control"><input class="control" type="text" inputmode="numeric" value="7"><span>天</span></div>
          </div>
          <div class="visitor-setting-item">
            <div><label>单次最多预约天数</label><p>连续到访天数。</p></div>
            <div class="unit-control"><input class="control" type="text" inputmode="numeric" value="3"><span>天</span></div>
          </div>
          <div class="visitor-setting-item">
            <div><label>是否允许当天预约</label><p>当天是否可约。</p></div>
            <label class="switch-control"><input type="checkbox" checked><span></span><b>允许</b></label>
          </div>
        </div>
      </section>
      <section class="card visitor-config-section visitor-rule-card" id="visitor-time-rule">
        <div class="card-head"><h3><i>时</i>通行时间规则</h3></div>
        <div class="card-body visitor-setting-grid">
          <div class="visitor-setting-item">
            <div><label>通行有效开始时间</label><p>早于该时间不可通行。</p></div>
            <input class="control" type="text" value="06:00">
          </div>
          <div class="visitor-setting-item">
            <div><label>通行有效结束时间</label><p>晚于该时间权限失效。</p></div>
            <input class="control" type="text" value="22:00">
          </div>
        </div>
      </section>
      <section class="card visitor-config-section visitor-rule-card" id="visitor-count-rule">
        <div class="card-head"><h3><i>人</i>访客人数规则</h3></div>
        <div class="card-body visitor-setting-grid">
          <div class="visitor-setting-item">
            <div><label>单次预约访客人数上限</label><p>含主访客和随行访客。</p></div>
            <div class="unit-control"><input class="control" type="text" inputmode="numeric" value="5"><span>人</span></div>
          </div>
        </div>
      </section>
      <section class="card visitor-config-section visitor-rule-card" id="visitor-vehicle-rule">
        <div class="card-head"><h3><i>车</i>访客车辆规则</h3></div>
        <div class="card-body visitor-setting-grid">
          <div class="visitor-setting-item">
            <div><label>是否允许预约车辆</label><p>关闭后不填写车辆信息。</p></div>
            <label class="switch-control"><input type="checkbox" class="visitor-vehicle-toggle" ${visitorConfigState.allowVehicle ? "checked" : ""}><span></span><b>${visitorConfigState.allowVehicle ? "允许" : "不允许"}</b></label>
          </div>
          <div class="visitor-setting-item dependent ${vehicleDisabled ? "disabled" : ""}">
            <div><label>访客车辆数量限制</label><p>限制可登记车牌数量。</p></div>
            <div class="unit-control"><input class="control" type="text" inputmode="numeric" value="1" ${vehicleDisabled ? "disabled" : ""}><span>辆</span></div>
          </div>
        </div>
      </section>
      <section class="card visitor-config-section visitor-wide-section" id="visitor-reason-rule">
        <div class="card-head"><h3><i>由</i>来访事由配置</h3><span>维护访客预约时可选择的标准事由，便于审批判断和后续统计。</span></div>
        <div class="card-body">
          <div class="visitor-reason-editor">
            ${visitorConfigState.reasons.map(x=>`<span>${x}<button class="action-visitor-reason-remove" data-visitor-reason="${x}" aria-label="移除${x}">×</button></span>`).join("")}
            <button class="btn action-visitor-reason-add" type="button">新增事由</button>
          </div>
          <p class="visitor-config-hint">预约提交时必须从已启用事由中选择；事由停用后不影响历史预约记录展示。</p>
        </div>
      </section>
      <section class="card visitor-config-section visitor-wide-section" id="visitor-device-rule">
        <div class="card-head"><h3><i>通</i>通行范围配置</h3><span>配置审批通过后默认下发的人行和车行设备范围。</span></div>
        <div class="card-body visitor-device-list">
          <div class="visitor-device-picker">
            <div>
              <b>默认人行通行设备</b>
              <p>从门禁设备库中选择访客可通行的人行闸机和门禁，不在页面直接铺开全部设备。</p>
            </div>
            <div class="selected-summary"><strong>${personDeviceSummary.title}</strong><span>${personDeviceSummary.text}</span></div>
            <button class="btn action-visitor-device-picker" data-visitor-device-scope="person">选择设备</button>
          </div>
          <div class="visitor-device-picker vehicle-scope ${vehicleDisabled ? "disabled" : ""}">
            <div>
              <b>默认车行通行设备</b>
              <p>仅在允许预约车辆时配置，从道闸设备库中选择访客车辆可通行范围。</p>
            </div>
            <div class="selected-summary"><strong>${vehicleDeviceSummary.title}</strong><span>${vehicleDisabled ? "允许预约车辆后可配置默认车行设备" : vehicleDeviceSummary.text}</span></div>
            <button class="btn action-visitor-device-picker" data-visitor-device-scope="vehicle" ${vehicleDisabled ? "disabled" : ""}>选择设备</button>
          </div>
        </div>
      </section>
    </div>
  </div>`;
}

function visitorDeviceSummary(scope) {
  const selected = [...(scope === "vehicle" ? visitorConfigState.vehicleDevices : visitorConfigState.personDevices)];
  return {
    title: selected.length ? `已选 ${selected.length} 台` : "未选择设备",
    text: selected.length ? selected.join("、") : "点击选择设备配置默认通行范围"
  };
}

function visitorDevicePickerHtml(scope) {
  const title = scope === "vehicle" ? "默认车行通行设备" : "默认人行通行设备";
  const selected = scope === "vehicle" ? visitorConfigState.vehicleDevices : visitorConfigState.personDevices;
  return `<div class="visitor-device-modal">
    <div class="visitor-device-modal-tip">从设备库中选择${title}。此处只展示可被访客权限引用的设备，保存后回写到基础权限配置页。</div>
    <div class="visitor-device-option-grid">
      ${visitorDeviceOptions[scope].map(name=>`<label class="visitor-device-option"><input type="checkbox" data-visitor-device-option="${name}" ${selected.has(name) ? "checked" : ""}><span><b>${name}</b><small>${scope === "vehicle" ? "道闸设备" : "门禁 / 闸机设备"}</small></span></label>`).join("")}
    </div>
  </div>`;
}

function openVisitorDevicePickerModal(scope) {
  visitorConfigState.deviceScope = scope;
  const modal = document.getElementById("modal");
  modal.className = "modal visitor-device-modal-shell";
  modal.dataset.action = "访客设备选择";
  document.getElementById("modalTitle").textContent = scope === "vehicle" ? "选择默认车行通行设备" : "选择默认人行通行设备";
  document.getElementById("modalBody").innerHTML = visitorDevicePickerHtml(scope);
  document.getElementById("modalConfirm").textContent = "确定";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalOverlay").classList.add("show");
}

function saveVisitorDevicePicker() {
  const scope = visitorConfigState.deviceScope;
  const next = new Set([...document.querySelectorAll("[data-visitor-device-option]:checked")].map(x=>x.dataset.visitorDeviceOption));
  if(scope === "vehicle") visitorConfigState.vehicleDevices = next;
  else visitorConfigState.personDevices = next;
  renderPage("visitor");
  toast("访客默认通行设备已更新");
}

function openVisitorReasonModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal visitor-reason-modal-shell";
  modal.dataset.action = "新增访客来访事由";
  document.getElementById("modalTitle").textContent = "新增来访事由";
  document.getElementById("modalBody").innerHTML = `<div class="visitor-reason-modal">
    <div class="field"><label class="required">事由名称</label><input class="control" data-visitor-reason-input maxlength="12" placeholder="请输入来访事由，例如：商务拜访"></div>
    <p>新增后将作为访客预约时可选择的标准事由；历史预约记录不受影响。</p>
  </div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalOverlay").classList.add("show");
  setTimeout(()=>document.querySelector("[data-visitor-reason-input]")?.focus(), 0);
}

function saveVisitorReason() {
  const input = document.querySelector("[data-visitor-reason-input]");
  const value = input ? input.value.trim() : "";
  if(!value){ toast("请输入来访事由名称"); return false; }
  if(visitorConfigState.reasons.includes(value)){ toast("该来访事由已存在"); return false; }
  visitorConfigState.reasons.push(value);
  renderPage("visitor");
  toast(`已新增来访事由：${value}`);
  return true;
}

function removeVisitorReason(value) {
  if(visitorConfigState.reasons.length <= 1){ toast("至少保留一个来访事由"); return; }
  visitorConfigState.reasons = visitorConfigState.reasons.filter(x => x !== value);
  renderPage("visitor");
  toast(`已移除来访事由：${value}`);
}

function openVisitorConfigSaveModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "保存访客规则配置";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "保存配置";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">确认保存当前访客基础权限配置吗？</div>`;
  document.getElementById("modalConfirm").textContent = "确认保存";
  document.getElementById("modalOverlay").classList.add("show");
}

const detailSchemas = {
  "person:通行记录": {title:"人员通行记录详情",panels:[["通行信息",["记录编号|REC-0610-8932","人员姓名|李晨","人员编号|P20260042","通行设备|A栋大厅门禁01","安装位置|A栋 / 1F / 大厅","通行方向|进入","通行结果|通行成功","通行时间|2026-06-10 10:38:12"]],["抓拍信息",["抓拍照片|现场抓拍图片","识别方式|人脸识别","相似度|98.6%"]]]},
  "access:门禁权限组": {title:"门禁权限组详情",panels:[["权限组信息",["权限组名称|主楼门禁组","权限组编码|MAIN","通行时间段|工作日通行","设备类型|门禁控制器","状态|启用"]],["关联设备",["关联设备数|12 台","设备范围|A栋办公区门禁"]],["关联人员",["关联人员数|86 人","授权方式|按部门授权、按人员授权"]]]},
  "visitor:访客管理": {title:"访客详情",wide:true,panels:[
    ["基本信息",null,"visitorBasicInfo"],
    ["审批记录",null,"visitorApprovalTimeline"],
    ["通行记录",null,"visitorPassageRecords"]
  ]},
  "visitor:安防审批": {title:"访客详情",panels:[
    ["预约信息",["访问企业|蓝谷数字能源有限公司","被访人|李晨 / 18661782304","访问日期|2026-07-20","访客姓名|赵一凡","访客手机号|13812348000","身份证信息|3702********1836","人脸照片|已采集","来访事由|技术交流","是否驾车|是","车牌号|鲁B·T912F","备注|携带调试设备"]],
    ["被访人审批",["被访人审批结果|通过","被访人审批时间|2026-07-15 09:26:18","被访人审批意见|确认接待，请按预约日期放行"]]
  ]},
  "vehicle:岗亭值守": {title:"岗亭过车详情",panels:[["通行基本信息",["记录编号|VEH-REC-0616-0088","车牌号|鲁B·T6632","通行道闸|南门入口道闸01","通行方向|进入","通行结果|无权限","抬杆方式|待处理","通行时间|2026-06-16 10:46:22"]],["岗亭处置",["门卫|王涛","车辆类型|临时车辆","放行要求|填写备注并二次确认","道闸控制|放行前置灰"]],["抓拍留痕",["抓拍图片|车辆抓拍图片","关联视频|南门入口视频片段"]]]},
  "vehicle:特殊车辆通行记录": {title:"特殊车辆通行记录详情",wide:true,panels:[]},
  "patrol:巡检任务": {title:"视频巡更任务详情",panels:[["任务信息",["任务名称|20260610-园区重点区域早巡","来源计划|重点区域每日巡更","视频巡检路线|园区主干道视频路线","执行人|闫卓宇","任务状态|执行中","计划时间|2026-06-10 08:30 至 09:30"]],["点位与异常记录",null,"patrolTable"]]},
  "perimeter:周界告警": {title:"周界告警详情",wide:true,panels:[["告警信息",["告警编号|PAM-20260720-0068","告警任务|东北门外围夜间防攀爬","检测规则|东北墙越线 A→B","告警级别|紧急","所属区域|微冷园区 / 东北门","关联摄像头|CAM-2024-001 东北门外围02","告警时间|2026-07-20 10:32:18","告警状态|待确认"],"media"],["处理记录",null,"timeline"],["关联工单",["工单生成状态|未生成","生成限制|同一告警仅允许生成一张工单"]]]},
  "video:监控设备": {title:"监控设备详情",panels:[["基础信息",["设备名称|东北门外围02","设备编码|CAM-2024-001","设备类型|视频监控设备","设备子类|枪型摄像头","在线状态|在线","上次在线时间|2026-07-20 10:42:12","IP地址|192.168.10.101","绑定位置|微冷园区 / 东北门"]],["位置信息",["录入位置|微冷园区","绑定位置|微冷园区 / 东北门"]]]},
  "alarm:告警事件": {title:"安防告警详情",panels:[["告警信息",["告警编号|ALM-20260721-0128","告警类型|热成像过温告警","告警等级|紧急","告警位置|A栋 / 冷库机房 / 配电柜01","关联设备|THERM-2025-006 热成像测温仪","告警时间|2026-07-21 10:32:18","目标信息|配电柜01 最高温度 86.5°C","告警状态|待确认"],"media"],["关联工单",["工单状态|未生成","工单编号|--","生成规则|同一告警仅允许生成一张安防工单"]],["处理记录",null,"timeline"]]},
  "alarm:安防工单": {title:"安防工单详情",wide:true,panels:[]},
  "inspection:巡检计划": {title:"巡检计划详情",panels:[["计划信息",["计划名称|消防设施每日巡检","巡检路线|A栋消防巡检路线","生效日期|2026-01-01 至长期","巡检频率|每天","执行时间|08:00","巡检执行人|闫卓宇、王涛","计划状态|启用"]],["任务生成记录",null,"timeline"]]},
  "inspection:巡检任务": {title:"巡检任务详情",panels:[["概要信息",["任务名称|消防重点点位巡检（2026-06-10）","所属园区|微冷园区","巡检人|闫卓宇、王涛","巡检计划|消防设施每日巡检","巡检路线|A栋消防巡检路线","计划时间|2026-06-10 08:00 至 11:00","完成进度|8 / 12","异常点|2","任务状态|巡检中"]],["巡检明细",null,"inspectionTable"]]},
  "alarm:巡检工单": {title:"巡检工单详情",panels:[
    ["基础信息",["工单编号|XJGD-20260721-002","巡检点|A栋 / 2F / 疏散通道","提报内容|确认消防通道是否被货物占用并清理现场","提报人|闫卓宇","提报时间|2026-07-21 09:26","预计关单时间|2026-07-21 10:30","工单状态|处理中"]],
    ["处理信息",["当前状态|处理中","当前处理人|李浩","处理人|李浩","接单时间|2026-07-21 09:42","处理开始时间|2026-07-21 09:45","是否超时|否"]],
    ["派单信息",["派单人|张振新","派单时间|2026-07-21 09:36","派单说明|请现场确认占用物品来源并完成清理","处理时限|2026-07-21 10:30","派单限制|巡检工单不支持直接回复并关单"]],
    ["处置信息",["处理结果|处理中","处置说明|已到达现场，正在联系责任区域人员清理通道","处理附件|现场照片 2 张","完成时间|--","闭环人|--","闭环时间|--"]],
    ["流转记录",null,"inspectionWorkorderTimeline"]
  ]},
  "device:设备台账": {title:"设备详情",panels:[["基础信息",["设备名称|东北门外围02","设备编码|CAM-2024-001","设备类型|监控设备","品牌|海康","型号|DS-2CD","IP 地址|192.168.10.101","端口号|8000","注册时间|2026-05-27 09:30","当前状态|启用"]],["类型与在线状态",["监控类型|枪型摄像机","流传输协议|TCP","在线状态|在线","最近心跳|2026-06-10 10:42:12"]],["位置与引用",["安装位置|微冷园区 / 东北门","被引用模块|视频监控、周界安全"]],["维护记录",null,"timeline"]]}
};

function renderDrawer(moduleId) {
  const tab=currentTab[moduleId]||modules.find(x=>x.id===moduleId).tabs[0];
  const schema=detailSchemas[`${moduleId}:${tab}`];
  if(!schema){ toast("设计文档未定义该列表的独立详情页"); return; }
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.remove("visitor-detail-drawer", "visitor-security-approval-drawer", "special-vehicle-record-drawer", "video-device-detail-drawer");
  document.getElementById("drawerTitle").textContent=schema.title;
  if(moduleId==="visitor"&&tab==="访客管理"){
    drawer.classList.add("visitor-detail-drawer");
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=renderVisitorDetailPage(currentVisitorDetail || visitorDetailFromRow(tableConfigs.visitor.rows[0]));
  } else if(moduleId==="visitor"&&tab==="安防审批"){
    drawer.classList.add("visitor-detail-drawer", "visitor-security-approval-drawer");
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=renderVisitorSecurityApprovalDetail(currentVisitorSecurityApprovalDetail || visitorSecurityApprovalDetailFromRow(getTabConfig("visitor", "安防审批").rows[0]));
  } else if(moduleId==="vehicle"&&tab==="特殊车辆通行记录"){
    drawer.classList.add("special-vehicle-record-drawer");
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=renderSpecialVehicleRecordDetail(currentSpecialVehicleRecordDetailRow || getTabConfig("vehicle", "特殊车辆通行记录").rows[0]);
  } else if(moduleId==="video"&&tab==="监控设备"){
    const device = videoDeviceByCode(currentVideoDeviceDetailCode);
    drawer.classList.add("video-device-detail-drawer");
    document.getElementById("drawerTitle").textContent=device.name;
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=videoDeviceDetailHtml(device);
  } else if(moduleId==="inspection"&&tab==="巡检任务"){
    drawer.classList.add("inspection-task-detail-drawer");
    document.querySelector("#drawer .drawer-head .eyebrow").textContent = "DETAIL";
    document.getElementById("drawerTitle").textContent="巡检任务详情";
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=renderInspectionTaskDetailDrawer(currentInspectionTaskDetail || inspectionTaskRows[0]);
  } else if(moduleId==="alarm"&&tab==="巡检工单"){
    drawer.classList.add("alarm-workorder-detail-drawer", "inspection-workorder-detail-drawer", "wide");
    currentAlarmInspectionWorkorderDetail = currentAlarmInspectionWorkorderDetail || alarmInspectionWorkorderDetailFromRow(getTabConfig("alarm", "巡检工单").rows[0]);
    document.querySelector("#drawer .drawer-head .eyebrow").textContent = "WORKORDER";
    document.getElementById("drawerTitle").textContent="巡检工单详情";
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=renderAlarmInspectionWorkorderDetail("基础信息");
  } else if(moduleId==="alarm"&&tab==="安防工单"){
    drawer.classList.add("alarm-workorder-detail-drawer", "wide");
    currentSecurityWorkorderDetail = currentSecurityWorkorderDetail || securityWorkorderDetailFromRow();
    document.querySelector("#drawer .drawer-head .eyebrow").textContent = "WORKORDER";
    document.getElementById("drawerTitle").textContent="安防工单详情";
    document.getElementById("drawerTabs").innerHTML="";
    document.getElementById("drawerBody").innerHTML=renderSecurityWorkorderDetail("关联告警");
  } else {
    document.getElementById("drawerTabs").innerHTML=schema.panels.map((x,i)=>`<button class="tab ${i===0?"active":""}" data-drawer-tab="${x[0]}">${x[0]}</button>`).join("");
    document.getElementById("drawerBody").innerHTML=drawerContent(moduleId,schema.panels[0][0]);
  }
  document.getElementById("drawerFoot").innerHTML=drawerFoot(moduleId,tab);
  drawer.classList.toggle("wide",!!schema.wide || (moduleId==="visitor"&&tab==="安防审批") || (moduleId==="inspection"&&tab==="巡检任务") || (moduleId==="alarm"&&["巡检工单","安防工单"].includes(tab)));
  document.getElementById("drawerOverlay").classList.add("show");
}

function specialVehicleRecordPhone(owner, maskedPhone) {
  const phoneMap = {
    "赵强": "13888886677",
    "孙宁": "13900001137",
    "刘凯": "13788886620",
    "周雨": "13953219000"
  };
  return phoneMap[owner] || maskedPhone || "-";
}

function renderSpecialVehicleRecordDetail(row) {
  const [plate, company, ownerPhone, passTime, entrance, direction, releaseMethodReason, releasePersonTime] = row;
  const [releaseMethod, releaseReason] = String(releaseMethodReason || "").split("|");
  const [releasePerson, releaseTime] = String(releasePersonTime || "").split("|");
  const [owner, maskedPhone] = String(ownerPhone || "").split("|");
  const fullPhone = specialVehicleRecordPhone(owner, maskedPhone);
  const isManualRelease = releaseMethod === "人工抬杆";
  const hasPhotos = isManualRelease;
  const photos = [
    ["车辆侧面照片", "assets/vehicle-record/special-vehicle-01.png"],
    ["车辆尾部照片", "assets/vehicle-record/special-vehicle-02.png"],
    ["货物装载照片", "assets/vehicle-record/special-vehicle-03.png"]
  ];
  return `<div class="special-vehicle-record-detail">
    <div class="special-record-head">
      <div class="special-record-title">
        <b>${plate}-${owner || "-"}</b>
        <span>${company || "-"}</span>
      </div>
      <div class="special-record-status">
        <span class="tag ${direction === "入场" ? "primary" : "neutral"}">${direction || "-"}</span>
        <span class="tag ${isManualRelease ? "warning" : "success"}">${releaseMethod || "-"}</span>
      </div>
    </div>
    <section class="special-record-section">
      <h3><span class="special-record-section-icon blue"></span>通行信息</h3>
      <div class="special-record-pass-grid">
        <div><label>所属单位</label><b>${company || "-"}</b></div>
        <div><label>负责人/联系方式</label><b>${owner || "-"} / ${fullPhone}</b></div>
        <div><label>通行时间</label><b>${passTime || "-"}</b></div>
        <div><label>通行方向</label><b>${direction || "-"}</b></div>
        <div><label>出入口</label><b>${entrance || "-"}</b></div>
      </div>
    </section>
    <section class="special-record-section">
      <h3><span class="special-record-section-icon green"></span>${isManualRelease ? "放行处理" : "通行结果"}</h3>
      <div class="special-record-handle-grid">
        <div><label>放行方式</label><b>${releaseMethod || "-"}</b></div>
        ${isManualRelease ? `<div><label>放行人/时间</label><b>${releasePerson || "-"} / ${releaseTime || "-"}</b></div>` : ""}
        <div><label>放行原因</label><b>${releaseReason || "-"}</b></div>
        ${isManualRelease ? `<div><label>核验备注</label><b>核对送货单与车辆照片后放行</b></div>` : ""}
      </div>
    </section>
    <section class="special-record-section">
      <h3><span class="special-record-section-icon blue"></span>现场照片</h3>
      ${hasPhotos ? `<div class="special-record-photo-grid">
        ${photos.map(([name, src], index)=>`<button type="button" class="special-record-photo scene-${index + 1}" data-access-photo="${src}" data-access-photo-title="${name}" aria-label="查看${name}">
          <span class="special-record-photo-preview"><img src="${src}" alt="${name}"><i></i></span>
          <span class="special-record-photo-zoom">放大</span>
        </button>`).join("")}
      </div>` : `<div class="special-record-empty">当前记录未上传现场照片</div>`}
    </section>
  </div>`;
}

function vehicleParkingLotByName(name) {
  return vehicleParkingLots.find(item => item.name === name) || vehicleParkingLots[0];
}

function openVehicleParkDrawer(name = vehicleParkingLots[0].name, tab = "出入口") {
  vehicleParkDetailState = { name, tab };
  const drawer = document.getElementById("drawer");
  resetMainDrawerChrome();
  drawer.classList.add("vehicle-park-drawer", "wide");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "CAR PARK";
  document.getElementById("drawerTitle").textContent = "车场详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = vehicleParkDrawerHtml();
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary" data-close="drawer">确定</button>`;
  document.getElementById("drawerOverlay").classList.add("show");
}

function vehicleParkDrawerHtml() {
  const lot = vehicleParkingLotByName(vehicleParkDetailState.name);
  const activeTab = vehicleParkDetailState.tab || "出入口";
  return `<div class="vehicle-park-detail">
    <div class="vehicle-park-title"><b>${lot.name}</b>${tag(lot.status === "启用" ? "启用" : "禁用")}</div>
    <div class="vehicle-park-basic">
      <div><label>所属园区</label><b>${lot.park}</b></div>
      <div><label>车位总数</label><b>${lot.spaces}</b></div>
      <div><label>入口 / 出口</label><b>${lot.entranceCount} / ${lot.exitCount}</b></div>
      <div><label>绑定监控</label><b>${lot.monitors.length}</b></div>
    </div>
    <div class="vehicle-park-remark"><label>备注</label><span>${lot.remark || "-"}</span></div>
    <div class="vehicle-detail-tabs">
      ${["出入口","监控"].map(name => `<button class="${name === activeTab ? "active" : ""}" data-vehicle-park-tab="${name}">${name}</button>`).join("")}
    </div>
    <div class="vehicle-detail-tabbody">${activeTab === "监控" ? vehicleParkMonitorTable(lot) : vehicleParkGatewayTable(lot)}</div>
  </div>`;
}

function vehicleParkGatewayTable(lot) {
  return `<div class="vehicle-detail-toolbar"><button class="btn primary action-vehicle-gateway-add">新增车场出入口</button></div>
  <div class="table-wrap vehicle-detail-table"><table>
    <thead><tr><th>序号</th><th>类型 / 名称</th><th>设备商</th><th>设备Key</th><th>操作</th></tr></thead>
    <tbody>${lot.gateways.map((row,index)=>`<tr><td>${index + 1}</td><td>${row[0]} - ${row[1]}</td><td>${row[2] || "-"}</td><td>${row[3] || "-"}</td><td><button class="btn text danger action-vehicle-gateway-remove" data-gateway-name="${row[1]}">删除</button></td></tr>`).join("")}</tbody>
  </table></div>`;
}

function vehicleParkMonitorTable(lot) {
  const gatewayOptions = (lot.gateways || []).map(row => `<option>${row[1]}</option>`).join("");
  return `<div class="vehicle-detail-toolbar"><button class="btn primary action-vehicle-monitor-bind">绑定监控</button></div>
  <div class="table-wrap vehicle-detail-table vehicle-monitor-relation-table"><table>
    <thead><tr><th>序号</th><th>设备名称</th><th>关联出入口</th><th>操作</th></tr></thead>
    <tbody>${lot.monitors.map((row,index)=>`<tr><td>${index + 1}</td><td>${row[0]}</td><td><select class="control"><option selected disabled>请选择</option>${gatewayOptions}</select></td><td><button class="btn text danger action-vehicle-monitor-unbind">删除</button></td></tr>`).join("")}</tbody>
  </table></div>`;
}

function vehicleMonitorBindRows() {
  const selected = vehicleMonitorBindState.selected;
  const rows = vehicleMonitorBindState.tab === "selected" ? [...selected] : vehicleMonitorOptions.filter(name => !selected.has(name));
  if (!rows.length) return `<div class="vehicle-monitor-empty">${vehicleMonitorBindState.tab === "selected" ? "暂无已选监控" : "暂无可选监控"}</div>`;
  return rows.map(name => `<label class="vehicle-monitor-candidate ${selected.has(name) ? "selected" : ""}" data-vehicle-monitor-row>
    <input type="checkbox" value="${name}" ${selected.has(name) ? "checked" : ""}>
    <span>${name}</span>
  </label>`).join("");
}

function vehicleMonitorBindModalHtml(lot) {
  const selectedCount = vehicleMonitorBindState.selected.size;
  const candidateCount = Math.max(0, vehicleMonitorOptions.length - selectedCount);
  return `<div class="vehicle-monitor-bind-layout">
    <aside class="vehicle-monitor-picker">
      <div class="vehicle-monitor-tabs">
        <button class="${vehicleMonitorBindState.tab === "candidate" ? "active" : ""}" data-monitor-bind-tab="candidate" type="button">待选（${candidateCount}）</button>
        <button class="${vehicleMonitorBindState.tab === "selected" ? "active" : ""}" data-monitor-bind-tab="selected" type="button">已选（<span data-monitor-selected-count>${selectedCount}</span>）</button>
      </div>
      <div class="vehicle-monitor-search">
        <input class="control" placeholder="输入关键词搜索">
        <button class="btn primary" type="button">搜索</button>
      </div>
      <div class="vehicle-monitor-candidate-list">${vehicleMonitorBindRows()}</div>
    </aside>
    <section class="vehicle-monitor-preview-panel">
      <div class="vehicle-monitor-preview-head">
        <h3>实时视频 / 截图</h3>
        <span>当前画面：${vehicleMonitorBindState.preview}</span>
      </div>
      <div class="vehicle-monitor-preview">
        <div class="vehicle-monitor-camera-meta">2024年04月02日 星期五 11:17:03</div>
        <div class="vehicle-monitor-snapshot-card">
          <b data-monitor-preview-name>${vehicleMonitorBindState.preview}</b>
          <span>${lot.name}</span>
        </div>
        <div class="vehicle-monitor-camera-code">P3301103</div>
      </div>
    </section>
  </div>`;
}

function openVehicleMonitorBindModal(lotName = vehicleParkDetailState.name) {
  const lot = vehicleParkingLotByName(lotName);
  vehicleMonitorBindState = { tab: "candidate", selected: new Set(), preview: vehicleMonitorOptions[0], lotName };
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-monitor-bind-modal";
  modal.dataset.action = "绑定监控";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "绑定监控";
  document.getElementById("modalBody").innerHTML = vehicleMonitorBindModalHtml(lot);
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function rerenderVehicleMonitorBindModal() {
  const modal = document.getElementById("modal");
  if (!modal || modal.dataset.action !== "绑定监控") return;
  const lot = vehicleParkingLotByName(vehicleMonitorBindState.lotName);
  document.getElementById("modalBody").innerHTML = vehicleMonitorBindModalHtml(lot);
}

function syncVehicleMonitorBindModal(input) {
  const name = input.value;
  if (input.checked) {
    vehicleMonitorBindState.selected.add(name);
    vehicleMonitorBindState.preview = name;
  } else {
    vehicleMonitorBindState.selected.delete(name);
    vehicleMonitorBindState.preview = [...vehicleMonitorBindState.selected].at(-1) || vehicleMonitorOptions[0];
  }
  rerenderVehicleMonitorBindModal();
}

function rerenderVehicleParkDrawer(tab = vehicleParkDetailState.tab) {
  vehicleParkDetailState.tab = tab;
  document.getElementById("drawerBody").innerHTML = vehicleParkDrawerHtml();
}

function vehicleGatewayModalRow(index, type = "入口", name = "") {
  return `<tr>
    <td>${index + 1}</td>
    <td>
      <div class="vehicle-gateway-type-name">
        <select class="control"><option ${type === "入口" ? "selected" : ""}>入口</option><option ${type === "出口" ? "selected" : ""}>出口</option></select>
        <input class="control" value="${name}" placeholder="请输入名称">
      </div>
    </td>
    <td><select class="control"><option>设备商名称</option><option>捷顺</option><option>海康</option><option>大华</option><option>宇视</option></select></td>
    <td><input class="control" placeholder="设备Key"></td>
    <td><button class="btn text danger action-vehicle-gateway-row-remove" type="button">删除</button></td>
  </tr>`;
}

function vehicleGatewayModalRows() {
  return [["入口", "北入口"], ["出口", "中出入口"], ["出口", "南出口"]].map((row, index) => vehicleGatewayModalRow(index, row[0], row[1])).join("");
}

function vehicleGatewayModalHtml(lot) {
  return `<div class="vehicle-gateway-modal-body">
    <h3>${lot.park} - ${lot.name}</h3>
    <div class="vehicle-gateway-modal-table-wrap">
      <table class="vehicle-gateway-modal-table">
        <thead><tr><th>序号</th><th>类型 / 名称</th><th>设备商</th><th>设备Key</th><th>操作</th></tr></thead>
        <tbody>${vehicleGatewayModalRows()}</tbody>
      </table>
    </div>
    <button class="vehicle-gateway-add-row action-vehicle-gateway-row-add" type="button"><span>＋</span>继续添加</button>
  </div>`;
}

function openVehicleGatewayModal() {
  const lot = vehicleParkingLotByName(vehicleParkDetailState.name);
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-gateway-modal";
  modal.dataset.action = "新增车场出入口";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "新增车场出入口";
  document.getElementById("modalBody").innerHTML = vehicleGatewayModalHtml(lot);
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleGatewayDeleteModal(gatewayName = "该出入口") {
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除出入口";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除出入口";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">确认删除“${gatewayName}”吗？删除后该出入口将从当前车场配置中移除。</div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleMonitorDeleteModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除监控";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除监控";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">确认删除该监控绑定吗？删除后该监控将从当前车场配置中移除。</div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function openPatrolPlanDeleteModal(planName = "该巡检计划") {
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除巡检计划";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除巡检计划";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-message">确认删除“${planName}”吗？</div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function patrolPlanRowFromDataset(value) {
  return decodeRowDataset(value) || getTabConfig("patrol", "巡检计划").rows[0];
}

function patrolPlanRouteMeta(routeName = "") {
  const routeMap = {
    "园区主干道视频路线": "微冷园区",
    "园区外围视频路线": "微冷园区",
    "消防通道视频路线": "A栋",
    "地下车库视频路线": "停车场 / B1",
    "冷库外围视频路线": "冷链仓储区",
    "全园区视频巡更路线": "微冷园区"
  };
  return routeMap[routeName] || "微冷园区";
}

function patrolPlanOwner(name = "") {
  const ownerMap = {
    "重点区域每日巡更": "张振新",
    "夜间周界巡更": "李浩",
    "消防通道视频巡更": "王涛",
    "地下空间巡更": "闫卓宇",
    "冷链仓储巡更": "孙宁",
    "月度园区全域巡更": "张明"
  };
  return ownerMap[name] || "张振新";
}

function patrolPlanDetailFromRow(row = []) {
  const [name = "重点区域每日巡更", route = "园区主干道视频路线", dateRange = "2026-01-01 至 2026-12-31", frequencyTime = "每天3次|9:00-11:00", status = "开启", updated = "2026-07-15 09:20"] = row;
  const area = patrolPlanRouteMeta(route);
  const [frequency = "-", timeText = "-"] = String(frequencyTime).split("|");
  return { name, route, area, dateRange, frequency, timeText, status, updated, owner: patrolPlanOwner(name) };
}

function inspectionPlanRowFromDataset(value) {
  return decodeRowDataset(value) || getTabConfig("inspection", "巡检计划").rows[0];
}

function inspectionPlanDetailFromRow(row = []) {
  const [name = "日常保洁巡检计划", routeDate = "黑龙江路主路线（预计：1小时30分钟）|2025-07-01 至 2025-09-30", frequencyTime = "每周3次（周一、周三、周五）|13:00 - 14:30", parkExecutor = "海尔西园区|张三、李四、王五", updated = "2025-08-01 13:14", status = "启用"] = row;
  const [route = "黑龙江路主路线（预计：1小时30分钟）", dateRange = "2025-07-01 至 2025-09-30"] = String(routeDate).split("|");
  const [area = "海尔西园区", executors = "张三、李四、王五"] = String(parkExecutor).split("|");
  const [frequency = "-", timeText = "-"] = String(frequencyTime).split("|");
  return { name, route, area, dateRange, frequency, timeText, status, updated, executors, owner: patrolPlanOwner(name) };
}

function patrolPlanScheduleRows(detail) {
  const frequency = detail.frequency || "";
  const timeText = detail.timeText || "-";
  const match = frequency.match(/（(.+)）/);
  const selectedDays = match ? match[1].split(/[、,，]/).filter(Boolean) : [];
  const timeSlots = timeText.split("、").filter(Boolean);
  const rows = timeSlots.map((slot, index) => {
    const label = selectedDays[index] || `第${index + 1}次`;
    return [label, slot];
  });
  if (selectedDays.length > timeSlots.length) {
    selectedDays.slice(timeSlots.length).forEach(day => rows.push([day, timeText]));
  }
  return rows.length ? rows : [["任务时间", timeText]];
}

function renderPatrolPlanDetailTab(detail) {
  const scheduleRows = patrolPlanScheduleRows(detail);
  return `<div class="patrol-plan-detail-section">
    <div class="patrol-plan-info-lines">
      <div><label>生效日期：</label><span>${detail.dateRange}</span></div>
      <div><label>巡检频率：</label><span>${detail.frequency.replace(/（.+）/, "")}</span></div>
      <div><label>巡检次数：</label><span>${detail.frequency.match(/\d+次/)?.[0] || `${scheduleRows.length}次`}</span></div>
    </div>
    <div class="patrol-plan-schedule-list">
      ${scheduleRows.map((row,index)=>`<div class="patrol-plan-schedule-row"><label>任务${index + 1}开始时间：</label><span class="patrol-plan-day-badge">${row[0]}</span><b>${row[1]}</b></div>`).join("")}
    </div>
  </div>`;
}

function renderPatrolPlanUpdateTab(detail) {
  const rows = [
    ["1", "admin", "2026-05-16 13:52", "修改", `字段 生效时间 由 <a>2026-12-31</a> 修改为了 <a>长期</a>`],
    ["2", "yangrenxuan", "2026-05-16 10:33", "修改", `执行人添加了 <a>田发胜</a>`],
    ["3", "yanjiashuo", "2026-05-15 09:11", "修改", `执行人添加了 <a>张振新</a>`]
  ];
  return `<div class="patrol-plan-update-table table-wrap"><table>
    <thead><tr><th>序号</th><th>账号</th><th>时间</th><th>操作类型</th><th>详情</th></tr></thead>
    <tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function renderPatrolPlanDetailHtml(detail, activeTab = "detail") {
  return `<div class="patrol-plan-detail-page">
    <div class="patrol-plan-title-row"><h3 class="patrol-plan-detail-title">${detail.name}</h3><span class="patrol-plan-title-status">${tag(detail.status)}</span></div>
    <div class="patrol-plan-summary-band">
      <div><label>所属园区</label><b>${detail.area}</b></div>
      <div><label>巡检路线</label><b>${detail.route}</b></div>
      <div><label>更新时间</label><b>${detail.updated}</b></div>
      <div><label>计划制定人</label><b>${detail.owner}</b></div>
    </div>
    <div class="dorm-detail-tabs patrol-plan-detail-tabs">
      <button class="${activeTab === "detail" ? "active" : ""}" type="button" data-patrol-plan-tab="detail">详细信息</button>
      <button class="${activeTab === "updates" ? "active" : ""}" type="button" data-patrol-plan-tab="updates">更新记录</button>
    </div>
    <div class="dorm-detail-tabbody patrol-plan-detail-tabbody">${activeTab === "updates" ? renderPatrolPlanUpdateTab(detail) : renderPatrolPlanDetailTab(detail)}</div>
    ${detail.executors ? `<div class="patrol-plan-executor-line"><label>巡检执行人：</label><span>${detail.executors}</span></div>` : ""}
  </div>`;
}

function openPatrolPlanDetailDrawer(row = getTabConfig("patrol", "巡检计划").rows[0], activeTab = "detail") {
  currentPatrolPlanDetail = patrolPlanDetailFromRow(row);
  const drawer = document.getElementById("drawer");
  resetMainDrawerChrome();
  drawer.classList.add("wide", "patrol-plan-detail-drawer");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "PATROL PLAN";
  document.getElementById("drawerTitle").textContent = "巡检计划详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = renderPatrolPlanDetailHtml(currentPatrolPlanDetail, activeTab);
  document.getElementById("drawerFoot").innerHTML = "";
  document.getElementById("drawerOverlay").classList.add("show");
}

function openInspectionPlanDetailDrawer(row = getTabConfig("inspection", "巡检计划").rows[0], activeTab = "detail") {
  currentPatrolPlanDetail = inspectionPlanDetailFromRow(row);
  const drawer = document.getElementById("drawer");
  resetMainDrawerChrome();
  drawer.classList.add("wide", "patrol-plan-detail-drawer");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "INSPECTION PLAN";
  document.getElementById("drawerTitle").textContent = "巡检计划详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = renderPatrolPlanDetailHtml(currentPatrolPlanDetail, activeTab);
  document.getElementById("drawerFoot").innerHTML = "";
  document.getElementById("drawerOverlay").classList.add("show");
}

function personnelTrackByCode(code) {
  return personnelTracks[code] || personnelTracks.P20260042;
}

function trackPhoto(value) {
  return value && value !== "-" ? `<button type="button" class="track-photo-thumb" data-access-photo="${value}" aria-label="查看采集照片"><span>${value}</span></button>` : `<span class="muted">-</span>`;
}

function personnelTrackTimeline(person) {
  return `<div class="person-track-timeline track-route-list">
    ${person.events.map((item, index) => {
      const [time, location, device, source, photo, similarity] = item;
      const [date, clock] = time.split(" ");
      const similarityValue = Number.parseFloat(similarity);
      return `<article class="track-route-item ${index === 0 ? "latest" : ""}">
        <time class="track-route-time"><b>${clock || time}</b><span>${date || ""}</span></time>
        <div class="track-route-marker"><span>${index + 1}</span></div>
        <div class="track-route-card">
          <div class="track-route-primary">
            <div class="track-route-location">
              <small>${index === 0 ? "最后出现位置" : "历史出现位置"}</small>
              <b>${location}</b>
            </div>
          </div>
          <div class="track-route-body">
            <div class="track-route-device">
              <span class="tag ${source === "摄像头" ? "primary" : "success"}">${source}</span>
              <b>${device}</b>
            </div>
            <div class="track-route-proof">
              <div class="track-route-photo">${trackPhoto(photo)}</div>
              <div class="track-route-score ${Number.isFinite(similarityValue) ? "" : "empty"}">
                <label>相似度</label>
                <b>${Number.isFinite(similarityValue) ? similarity : "-"}</b>
              </div>
            </div>
          </div>
        </div>
      </article>`;
    }).join("")}
  </div>`;
}

function personnelTrackDetailHtml(person) {
  return `<div class="dorm-person-detail person-track-detail">
    <div class="dorm-person-title"><b>${person.name}-${person.code}</b><span class="tag success">${person.status}</span></div>
    <div class="dorm-person-basic">
      <div><label>联系方式</label><b>${person.phone}</b></div>
      <div><label>员工类型</label><b>${person.type}</b></div>
      <div><label>所属企业/部门</label><b>${person.enterprise} / ${person.department}</b></div>
      <div><label>最后出现时间</label><b>${person.lastTime}</b></div>
      <div><label>最后出现位置</label><b>${person.lastLocation}</b></div>
      <div><label>采集设备/类型</label><b>${person.device} / ${person.source}</b></div>
    </div>
    <div class="dorm-detail-tabs"><button class="active">时间轴轨迹</button></div>
    <div class="dorm-detail-tabbody">${personnelTrackTimeline(person)}</div>
  </div>`;
}

function personnelTrackResultTable(person) {
  return `<div class="card table-card person-track-result-table">
    <div class="card-head"><h3>轨迹明细</h3><span class="muted">按最后出现时间倒序</span></div>
    <div class="table-wrap"><table>
      <thead><tr><th>序号</th><th>采集设备</th><th>位置</th><th>时间</th><th>照片</th><th>相似度</th></tr></thead>
      <tbody>${person.events.map((item,index) => {
        const [time, location, device, source, photo, similarity] = item;
        return `<tr><td>${index + 1}</td><td><div class="two-line-cell"><b>${device}</b><span>${source}</span></div></td><td>${location}</td><td>${time}</td><td>${trackPhoto(photo)}</td><td>${similarity}</td></tr>`;
      }).join("")}</tbody>
    </table></div>
  </div>`;
}

function openPersonnelTrackDetail(code) {
  const person = personnelTrackByCode(code);
  document.getElementById("drawerTitle").textContent = "人员轨迹详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = personnelTrackDetailHtml(person);
  document.getElementById("drawerFoot").innerHTML = "";
  document.getElementById("drawer").classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function openPersonnelTrackQueryDrawer() {
  const person = personnelTracks.P20260042;
  document.getElementById("drawerTitle").textContent = "查询轨迹";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = `<div class="person-track-query">
    <div class="card filter-card"><div class="filters">
      <div class="field"><label>姓名</label><input class="control" value="${person.name}" placeholder="请输入姓名"></div>
      <div class="field"><label>工号</label><input class="control" value="${person.code}" placeholder="请输入工号"></div>
      <div class="field long"><label>时间范围</label><div class="date-range-control"><input class="control" value="2026-06-10 08:00:00"><span>至</span><input class="control" value="2026-06-10 11:00:00"></div></div>
      <div class="filter-actions"><button class="btn action-reset">重置</button><button class="btn primary action-query">查询</button></div>
    </div></div>
    <div class="track-query-result-head">
      <div><label>匹配人员</label><b>${person.name}</b><span>${person.code} / ${person.type} / ${person.department}</span></div>
      <div><label>查询范围</label><b>2026-06-10 08:00:00 至 2026-06-10 11:00:00</b><span>共 ${person.events.length} 条采集记录</span></div>
      <div><label>最近出现</label><b>${person.lastLocation}</b><span>${person.device} / ${person.lastTime}</span></div>
    </div>
    ${personnelTrackResultTable(person)}
    <div class="card track-query-timeline-card">
      <div class="card-head"><h3>时间轴预览</h3><span class="muted">用于快速核对轨迹顺序</span></div>
      <div class="card-body">${personnelTrackTimeline(person)}</div>
    </div>
  </div>`;
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">关闭</button>`;
  document.getElementById("drawer").classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function accessPermissionGroupByName(name) {
  return accessPermissionGroups.find(item => item.name === name) || accessPermissionGroups[0];
}

function accessPermissionGroupFilteredPeople(group) {
  const keyword = accessGroupDetailFilterState.peopleKeyword.trim().toLowerCase();
  if (!keyword) return group.people;
  return group.people.filter(row => `${row[0]} ${row[1]}`.toLowerCase().includes(keyword));
}

function accessPermissionGroupFilteredDevices(group) {
  const keyword = accessGroupDetailFilterState.deviceKeyword.trim().toLowerCase();
  if (!keyword) return group.devices;
  return group.devices.filter(row => `${row[0]} ${row[1]}`.toLowerCase().includes(keyword));
}

function removeAccessPermissionGroupDevice(deviceCode) {
  const group = accessPermissionGroupByName(currentAccessGroupDetailName);
  const beforeCount = group.devices.length;
  group.devices = group.devices.filter(row => row[1] !== deviceCode);
  if (group.devices.length === beforeCount) return false;
  group.deviceCount = Math.max(0, Number(group.deviceCount || 0) - 1);
  return true;
}

function accessPermissionGroupDetailFilterHtml(activeTab) {
  const isDevice = activeTab === "关联设备";
  return `<div class="access-group-detail-tools">
    <div class="access-group-detail-filter">
      <div class="field">
        <label>${isDevice ? "设备名称/编码" : "姓名/人员编号"}</label>
        <input class="control" value="${isDevice ? accessGroupDetailFilterState.deviceKeyword : accessGroupDetailFilterState.peopleKeyword}" data-access-group-detail-keyword placeholder="${isDevice ? "请输入设备名称 / 设备编码" : "请输入姓名 / 人员编号"}">
      </div>
      <div class="filter-actions"><button class="btn primary action-access-group-detail-query">查询</button><button class="btn action-access-group-detail-reset">重置</button></div>
    </div>
    ${isDevice ? `<div class="access-group-detail-toolbar"><button class="btn primary action-access-group-devices" data-access-group-name="${currentAccessGroupDetailName}">关联设备</button></div>` : ""}
  </div>`;
}

function accessPermissionGroupTabHtml(group, activeTab = "关联人员") {
  if (activeTab === "关联设备") {
    const rows = accessPermissionGroupFilteredDevices(group);
    return `${accessPermissionGroupDetailFilterHtml(activeTab)}<div class="dorm-record-table access-group-detail-table">
      <table>
        <thead><tr><th>序号</th><th>设备名称</th><th>设备编码</th><th>安装位置</th><th>设备状态</th><th>关联时间</th><th>操作</th></tr></thead>
        <tbody>${rows.length ? rows.map((row,index)=>`<tr><td>${index + 1}</td><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${tag(row[3])}</td><td>${row[4]}</td><td><button class="btn text danger action-access-group-device-remove" data-access-group-device-code="${row[1]}" data-access-group-device-name="${row[0]}">移除</button></td></tr>`).join("") : `<tr><td colspan="7"><div class="access-device-empty-table">暂无符合条件的关联设备</div></td></tr>`}</tbody>
      </table>
    </div>`;
  }
  const rows = accessPermissionGroupFilteredPeople(group);
  return `${accessPermissionGroupDetailFilterHtml(activeTab)}<div class="dorm-record-table access-group-detail-table">
    <table>
      <thead><tr><th>序号</th><th>姓名</th><th>人员编号</th><th>所属企业</th><th>所属部门</th><th>授权来源</th><th>授权时间</th></tr></thead>
      <tbody>${rows.length ? rows.map((row,index)=>`<tr><td>${index + 1}</td><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td></tr>`).join("") : `<tr><td colspan="7"><div class="access-device-empty-table">暂无符合条件的关联人员</div></td></tr>`}</tbody>
    </table>
  </div>`;
}

function accessPermissionGroupDetailHtml(group, activeTab = "关联人员") {
  return `<div class="dorm-person-detail access-group-detail">
    <div class="dorm-person-title"><b>${group.name}</b>${tag(group.status)}</div>
    <div class="dorm-person-basic access-group-basic">
      <div><label>通行时间段</label><b>${group.timePeriod}</b></div>
      <div><label>关联设备数</label><b>${group.deviceCount} 台</b></div>
      <div><label>关联人员数</label><b>${group.personCount} 人</b></div>
    </div>
    <div class="dorm-detail-tabs">
      ${["关联人员","关联设备"].map(tab=>`<button class="access-group-detail-tab ${tab===activeTab?"active":""}" data-access-group-detail-tab="${tab}">${tab}</button>`).join("")}
    </div>
    <div class="dorm-detail-tabbody" id="accessGroupDetailTabBody">${accessPermissionGroupTabHtml(group, activeTab)}</div>
  </div>`;
}

function openAccessPermissionGroupDrawer(groupName, activeTab = "关联人员") {
  const group = accessPermissionGroupByName(groupName);
  currentAccessGroupDetailName = group.name;
  accessGroupDetailFilterState = { activeTab, peopleKeyword: "", deviceKeyword: "" };
  const drawer = document.getElementById("drawer");
  drawer.classList.add("property-drawer", "access-group-drawer");
  document.querySelector("#drawer .drawer-head").classList.add("property-drawer-head");
  document.querySelector("#drawer .drawer-body").classList.add("property-drawer-body");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "SECURITY";
  document.getElementById("drawerTitle").textContent = "权限组详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = accessPermissionGroupDetailHtml(group, activeTab);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn primary" data-close="drawer">关闭</button>`;
  drawer.classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function rerenderAccessPermissionGroupDetailDrawer(activeTab = accessGroupDetailFilterState.activeTab) {
  const drawer = document.getElementById("drawer");
  const body = document.getElementById("drawerBody");
  if (!drawer?.classList.contains("access-group-drawer") || !body) return;
  accessGroupDetailFilterState.activeTab = activeTab;
  body.innerHTML = accessPermissionGroupDetailHtml(accessPermissionGroupByName(currentAccessGroupDetailName), activeTab);
}

function accessPersonPermissionByCode(code) {
  return accessPersonPermissionRows.find(item => item.code === code) || accessPersonPermissionRows[0];
}

function accessPersonOverallIssueStatus(details = []) {
  const statuses = details.map(row => row[5]).filter(Boolean);
  if (statuses.includes("下发失败")) return "下发失败";
  if (statuses.includes("正在下发") || statuses.includes("下发中")) return "正在下发";
  if (statuses.includes("待下发")) return "待下发";
  if (statuses.length && statuses.every(status => status === "下发成功")) return "下发成功";
  return "--";
}

function syncAccessPersonPermissionSummary(person) {
  person.permissionGroups = person.details.map(row => row[0]);
  person.permissionSources = [...new Set(person.details.map(row => row[1]).filter(Boolean))];
  person.validPeriod = person.details.length ? [...new Set(person.details.map(row => row[2]).filter(Boolean))].join("、") : "--";
  person.issueStatus = accessPersonOverallIssueStatus(person.details);
  person.issueTime = person.details.length ? person.details[0][6] : "--";
}

function removeAccessPersonPermissionGroup(personCode, groupName) {
  const person = accessPersonPermissionByCode(personCode);
  const row = person.details.find(item => item[0] === groupName);
  if (!row || row[1] !== "按人员授权") return false;
  person.details = person.details.filter(item => !(item[0] === groupName && item[1] === "按人员授权"));
  syncAccessPersonPermissionSummary(person);
  return true;
}

function accessPersonPermissionDetailTableHtml(person) {
  return `<div class="dorm-record-table access-group-detail-table access-person-permission-detail-table">
    <table>
      <thead><tr><th>序号</th><th>权限组</th><th>权限来源</th><th>有效期</th><th>通行时段</th><th>覆盖设备</th><th>下发状态</th><th>最近下发</th><th>操作</th></tr></thead>
      <tbody>${person.details.length ? person.details.map((row,index)=>{
        const canRemove = row[1] === "按人员授权";
        return `<tr>
        <td>${index + 1}</td>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
        <td>${row[4]}</td>
        <td>${tag(row[5])}</td>
        <td>${row[6]}</td>
        <td>${canRemove
          ? `<button class="btn text danger action-access-person-permission-remove" data-person-code="${person.code}" data-group-name="${row[0]}">移除</button>`
          : `<button class="btn text danger disabled-action" type="button" disabled title="部门授权权限不可在人员明细中移除，请到按部门授权调整">移除</button>`}</td>
      </tr>`;
      }).join("") : `<tr><td colspan="9"><div class="access-device-empty-table">暂无权限组明细</div></td></tr>`}</tbody>
    </table>
  </div>`;
}

function accessPersonPermissionDetailHtml(person) {
  return `<div class="dorm-person-detail access-group-detail access-person-permission-detail">
    <div class="dorm-person-title"><b>${person.name}-${person.code}</b>${tag(person.personStatus)}</div>
    <div class="dorm-person-basic access-group-basic access-person-basic">
      <div><label>所属企业</label><b>${person.enterprise}</b></div>
      <div><label>所属部门</label><b>${person.department}</b></div>
      <div><label>权限组数量</label><b>${person.permissionGroups.length} 个</b></div>
      <div><label>权限来源</label><b>${person.permissionSources.join("、")}</b></div>
      <div><label>有效期</label><b>${person.validPeriod}</b></div>
      <div><label>综合下发状态</label><b>${accessPersonOverallIssueStatus(person.details)}</b></div>
    </div>
    <div class="dorm-detail-tabs">
      <button class="active" type="button">权限组明细</button>
    </div>
    <div class="dorm-detail-tabbody">${accessPersonPermissionDetailTableHtml(person)}</div>
  </div>`;
}

function accessIssueDetailTableHtml(person) {
  const records = accessIssueAuthorizationRows(person);
  return `<div class="access-group-detail-tools access-issue-detail-tools">
    <div class="access-group-detail-filter access-issue-detail-filter">
      <div class="field"><label>关键字</label><input class="control" placeholder="权限名称 / 授权内容"></div>
      <div class="field"><label>下发状态</label><select class="control"><option>全部</option><option>下发失败</option><option>正在下发</option><option>待下发</option><option>下发成功</option></select></div>
      <div class="filter-actions"><button class="btn primary action-query">查询</button><button class="btn action-reset">重置</button></div>
    </div>
    <div class="access-group-detail-toolbar"><button class="btn primary action-access-batch-reissue">批量重新授权</button></div>
  </div>
  <div class="dorm-record-table access-group-detail-table access-person-permission-detail-table access-issue-detail-table">
    <table>
      <thead><tr><th>序号</th><th>权限名称/门禁设备</th><th>授权内容</th><th>授权状态</th><th>授权时间</th><th>失败原因</th><th>操作</th></tr></thead>
      <tbody>${records.length ? records.map((row,index)=>{
        return `<tr>
        <td>${index + 1}</td>
        <td><div class="two-line-cell"><b>${row.permissionName}</b><span>${row.deviceCode}</span></div></td>
        <td>${accessIssueAuthorizationContentHtml(row, person)}</td>
        <td>${tag(row.status)}</td>
        <td>${row.issueTime}</td>
        <td>${row.reason}</td>
        <td>${row.status === "下发失败" ? `<button class="btn text action-access-person-reissue" data-person-code="${person.code}">重新授权</button>` : `<span class="muted">--</span>`}</td>
      </tr>`;
      }).join("") : `<tr><td colspan="7"><div class="access-device-empty-table">暂无权限下发明细</div></td></tr>`}</tbody>
    </table>
  </div>`;
}

function accessIssueAuthorizationRows(person) {
  const priority = { "下发失败": 1, "正在下发": 2, "下发中": 2, "待下发": 3, "下发成功": 4 };
  const authTypes = ["人员", "人脸", "卡片"];
  return accessIssueRecordsForPerson(person)
    .flatMap(record => authTypes.map(type => ({
      ...record,
      authType: type,
      permissionName: `${record.deviceName}-${type}`
    })))
    .sort((a, b) => {
      const statusDiff = (priority[a.status] || 9) - (priority[b.status] || 9);
      if (statusDiff) return statusDiff;
      return String(b.issueTime || "").localeCompare(String(a.issueTime || ""));
    });
}

function accessIssueAuthorizationContentHtml(row, person) {
  if (row.authType === "人员") {
    return `<span class="access-auth-sync-text">个人信息同步</span>`;
  }
  if (row.authType === "人脸") {
    return `<span class="access-auth-face-thumb">${person.name.slice(0, 1)}</span>`;
  }
  const card = cardRows.find(item => item.personCode === person.code);
  return `<span class="access-auth-card-no">${card?.cardNo || "--"}</span>`;
}

function accessIssueDetailHtml(person) {
  const profile = accessPersonProfile(person);
  const stats = accessIssueStatsForPerson(person);
  return `<div class="dorm-person-detail access-group-detail access-person-permission-detail">
    <div class="dorm-person-title"><b>${person.name}-${person.code}</b>${tag(stats.status)}</div>
    <div class="dorm-person-basic access-group-basic access-person-basic">
      <div><label>联系方式</label><b>${profile.phone}</b></div>
      <div><label>员工类型 / 状态</label><b>${person.employeeType} / ${profile.status}</b></div>
      <div><label>所属企业/部门</label><b>${person.enterprise} / ${person.department}</b></div>
    </div>
    <div class="dorm-detail-tabs">
      <button class="active" type="button">授权记录</button>
    </div>
    <div class="dorm-detail-tabbody">${accessIssueDetailTableHtml(person)}</div>
  </div>`;
}

function openAccessPersonPermissionDrawer(personCode) {
  const person = accessPersonPermissionByCode(personCode);
  currentAccessPersonPermissionCode = person.code;
  const drawer = document.getElementById("drawer");
  drawer.classList.add("property-drawer", "access-person-permission-drawer");
  document.querySelector("#drawer .drawer-head").classList.add("property-drawer-head");
  document.querySelector("#drawer .drawer-body").classList.add("property-drawer-body");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "SECURITY";
  document.getElementById("drawerTitle").textContent = "人员权限明细";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = accessPersonPermissionDetailHtml(person);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn primary" data-close="drawer">关闭</button>`;
  drawer.classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function openAccessIssueDetailDrawer(personCode) {
  const person = accessPersonPermissionByCode(personCode);
  const drawer = document.getElementById("drawer");
  drawer.classList.add("property-drawer", "access-person-permission-drawer");
  document.querySelector("#drawer .drawer-head").classList.add("property-drawer-head");
  document.querySelector("#drawer .drawer-body").classList.add("property-drawer-body");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "SECURITY";
  document.getElementById("drawerTitle").textContent = "门禁权限下发详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = accessIssueDetailHtml(person);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn primary" data-close="drawer">关闭</button>`;
  drawer.classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function resetMainDrawerChrome() {
  const drawer = document.getElementById("drawer");
  if (!drawer) return;
  drawer.classList.remove("property-drawer", "access-group-drawer", "access-device-relation-drawer", "access-authorize-drawer", "access-person-permission-drawer", "visitor-detail-drawer", "visitor-security-approval-drawer", "vehicle-park-drawer", "patrol-route-points-drawer", "patrol-plan-drawer", "patrol-video-plan-drawer", "patrol-plan-detail-drawer", "perimeter-task-drawer", "perimeter-alarm-drawer", "video-device-detail-drawer", "inspection-route-drawer", "inspection-task-detail-drawer", "alarm-workorder-detail-drawer", "inspection-workorder-detail-drawer", "wide");
  const head = document.querySelector("#drawer .drawer-head");
  head?.classList.remove("property-drawer-head");
  if (head) head.innerHTML = `<div><span class="eyebrow">DETAIL</span><h2 id="drawerTitle">详情</h2></div><button class="close-btn" data-close="drawer">×</button>`;
  document.querySelector("#drawer .drawer-body")?.classList.remove("property-drawer-body");
}

function resetSubDrawerChrome() {
  const subDrawer = document.querySelector("#subDrawerOverlay .subdrawer");
  if (!subDrawer) return;
  subDrawer.classList.remove("access-device-relation-drawer", "patrol-device-picker-drawer", "inspection-point-result-drawer", "wide");
  const eyebrow = document.querySelector("#subDrawerOverlay .drawer-head .eyebrow");
  const title = document.querySelector("#subDrawerOverlay .drawer-head h2");
  if (eyebrow) eyebrow.textContent = "INSPECTION RESULT";
  if (title) title.textContent = "巡检点详情";
  document.querySelector("#subDrawerOverlay .drawer-foot").innerHTML = `<button class="btn" data-close="subDrawer">关闭</button>`;
}

function drawerContent(id,panelName) {
  const tab=currentTab[id]||modules.find(x=>x.id===id).tabs[0];
  const schema=detailSchemas[`${id}:${tab}`];
  const panel=schema.panels.find(x=>x[0]===panelName);
  if(panel[2]==="visitorBasicInfo") return renderVisitorBasicInfo();
  if(panel[2]==="timeline") return renderTimeline(id,tab);
  if(panel[2]==="inspectionWorkorderTimeline") return renderInspectionWorkorderTimeline();
  if(panel[2]==="visitorApprovalTimeline") return renderVisitorApprovalTimeline();
  if(panel[2]==="visitorOperationTimeline") return renderVisitorOperationTimeline();
  if(panel[2]==="visitorPermissionTable") return renderVisitorPermissionInfo();
  if(panel[2]==="visitorPassageRecords") return renderVisitorPassageRecords();
  if(panel[2]==="inspectionTable") return renderInspectionDetail();
  if(panel[2]==="patrolTable") return renderPatrolDetail();
  const media=panel[2]==="media"?`<div class="media-grid"><div class="media"><span>抓拍图片</span></div><div class="media"><span class="play">▶</span><span>关联视频片段</span></div></div>`:"";
  return `${media}<h3 class="section-title">${panel[0]}</h3><div class="info-grid">${panel[1].map(x=>{const [a,b]=x.split("|");return `<div class="info-item"><label>${a}</label><div>${tag(b)}</div></div>`}).join("")}</div>`;
}

const visitorAppointmentExtra = {
  "VIS-20260715-0008": { phone: "13812348000", idNo: "3702********1836", faceStatus: "已采集", companion: "1 人", submitTime: "2026-07-15 09:10", hostApproveTime: "2026-07-15 09:26", hostApproveOpinion: "确认接待，请按预约日期放行", remark: "携带调试设备" },
  "VIS-20260715-0012": { phone: "13953219000", idNo: "3702********0926", faceStatus: "已采集", companion: "0 人", submitTime: "2026-07-15 10:18", hostApproveTime: "2026-07-15 10:30", hostApproveOpinion: "设备维修已确认", remark: "设备维修随行工具已登记" },
  "VIS-20260714-0026": { phone: "15641128473", idNo: "2102********5148", faceStatus: "已采集", companion: "0 人", submitTime: "2026-07-14 16:08", hostApproveTime: "2026-07-14 16:22", hostApproveOpinion: "确认接待", remark: "商务洽谈" },
  "VIS-20260714-0019": { phone: "18604119081", idNo: "2102********9081", faceStatus: "已采集", companion: "2 人", submitTime: "2026-07-14 13:52", hostApproveTime: "2026-07-14 14:11", hostApproveOpinion: "确认接待，需安防复核参观区域", remark: "参观路线待确认" },
  "VIS-20260713-0015": { phone: "13753212560", idNo: "3702********2560", faceStatus: "已采集", companion: "1 人", submitTime: "2026-07-13 11:26", hostApproveTime: "2026-07-13 11:40", hostApproveOpinion: "确认接待", remark: "业务对接" },
  "VIS-20260716-0003": { phone: "13841127603", idNo: "2102********7603", faceStatus: "已采集", companion: "0 人", submitTime: "2026-07-16 08:42", hostApproveTime: "2026-07-16 08:55", hostApproveOpinion: "供应商例行对接，确认接待", remark: "携带样品箱" },
  "VIS-20260716-0004": { phone: "18653219026", idNo: "3702********9026", faceStatus: "已采集", companion: "2 人", submitTime: "2026-07-16 09:05", hostApproveTime: "2026-07-16 09:18", hostApproveOpinion: "面试安排已确认", remark: "需进入研发中心会议室" },
  "VIS-20260716-0005": { phone: "13904112658", idNo: "2102********2658", faceStatus: "已采集", companion: "1 人", submitTime: "2026-07-16 09:36", hostApproveTime: "2026-07-16 09:50", hostApproveOpinion: "设备巡检已预约", remark: "随行携带检测仪器" },
  "VIS-20260716-0006": { phone: "15141120988", idNo: "2102********0988", faceStatus: "已采集", companion: "0 人", submitTime: "2026-07-16 10:12", hostApproveTime: "2026-07-16 10:25", hostApproveOpinion: "业务洽谈已确认", remark: "预计停留 2 小时" },
  "VIS-20260716-0007": { phone: "13700082519", idNo: "3702********2519", faceStatus: "已采集", companion: "3 人", submitTime: "2026-07-16 10:28", hostApproveTime: "2026-07-16 10:41", hostApproveOpinion: "参观路线已确认", remark: "需安防确认参观区域" }
};

function visitorAppointmentIdForName(name) {
  const ids = {
    "赵一凡": "VIS-20260715-0008",
    "周雨": "VIS-20260715-0012",
    "刘启明": "VIS-20260714-0026",
    "沈璐": "VIS-20260714-0019",
    "孙可": "VIS-20260713-0015",
    "闫卓宇": "VIS-20260716-0003",
    "皮亦舒": "VIS-20260716-0004",
    "陈一鸣": "VIS-20260716-0005",
    "韩知夏": "VIS-20260716-0006",
    "顾明远": "VIS-20260716-0007"
  };
  return ids[name] || "VIS-20260715-0008";
}

function visitorAppointmentById(appointmentId) {
  return tableConfigs.visitor.rows.find(row => visitorAppointmentIdForName(row[0]) === appointmentId) || tableConfigs.visitor.rows[0];
}

function visitorSecurityStatusFromAppointment(status) {
  if (status === "待安防审批") return "待审批";
  if (status === "已通过") return "已通过";
  if (status === "已拒绝") return "已拒绝";
  return status || "待审批";
}

function visitorSecurityApprovalRows() {
  const sourceRows = [
    tableConfigs.visitor.rows.find(row => row[6] === "待安防审批"),
    ["闫卓宇","13841127603|-","园区运营公司","张振新 / 18553236080","2026-07-21","供应商对接","待安防审批","未到访"],
    ["皮亦舒","18653219026|鲁B·P0926","蓝谷数字能源有限公司","李晨 / 18661782304","2026-07-21 13:30 至 17:00","面试","待安防审批","未到访"],
    ["陈一鸣","13904112658|辽B·8M265","大连瑞兴天宝水产品有限公司","刘海涛 / 04116242812","2026-07-22","设备巡检","待安防审批","未到访"],
    ["韩知夏","15141120988|-","海洋食品设计与创制高新技术研究院","周明远 / 04116242855","2026-07-22 09:00 至 12:00","业务洽谈","待安防审批","未到访"],
    ["顾明远","13700082519|鲁B·V2519","联合林洋食品（大连）有限公司","林建东 / 04116242833","2026-07-23","参观考察","待安防审批","未到访"]
  ].filter(Boolean).filter(row => row[6] === "待安防审批");
  return sourceRows.map(row => {
      const appointmentId = visitorAppointmentIdForName(row[0]);
      const extra = visitorAppointmentExtra[appointmentId] || {};
      const [phone = "-", plate = "-"] = String(row[1] || "").split("|");
      return [
        row[0],
        `${extra.phone || phone}|${plate}`,
        row[2],
        row[3],
        row[4],
        row[5],
        row[6]
      ];
    });
}

function visitorSecurityApprovalDetailFromRow(row) {
  const appointmentId = visitorAppointmentIdForName(row?.[0]);
  const extra = visitorAppointmentExtra[appointmentId] || {};
  const [phone = "--", plate = "-"] = String(row?.[1] || "").split("|");
  const [hostName = "--", hostPhone = "--"] = String(row?.[3] || "").split(" / ");
  return {
    appointmentId,
    name: row?.[0] || "赵一凡",
    phone: extra.phone || phone,
    plate: plate || "-",
    company: row?.[2] || "蓝谷数字能源有限公司",
    hostName,
    hostPhone,
    host: `${hostName}${hostPhone && hostPhone !== "--" ? ` / ${hostPhone}` : ""}`,
    visitDate: row?.[4] || "2026-07-20",
    reason: row?.[5] || "技术交流",
    appointmentStatus: row?.[6] || "待安防审批",
    visitStatus: "未到访",
    companions: extra.companion || "0 人",
    companion: extra.companion || "0 人",
    faceStatus: extra.faceStatus || "已采集",
    idNo: extra.idNo || "--",
    hostApproveTime: extra.hostApproveTime || "--",
    hostApproveOpinion: extra.hostApproveOpinion || "确认接待，请按预约日期放行",
    submitTime: extra.submitTime || "--",
    approvalStatus: visitorSecurityStatusFromAppointment(row?.[6] || "待安防审批"),
    vehicleText: plate && plate !== "-" ? "是" : "否",
    remark: extra.remark || "--",
    note: extra.remark || "--",
    permissionMode: plate && plate !== "-" ? "人脸 / 二维码 / 车牌" : "人脸 / 二维码"
  };
}

function decodeRowDataset(value) {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (error) {
    return null;
  }
}

function renderVisitorSecurityApprovalDetail(detail) {
  return renderVisitorDetailPage(detail);
}

function splitBrandModel(value = "") {
  const [brand = "--", model = "--"] = String(value || "").split(" / ");
  return { brand, model };
}

function videoDeviceDetailTable(rows) {
  return `<div class="video-device-detail-table">
    ${rows.map(row => `<div class="video-device-detail-row ${row.length === 1 ? "single" : ""}">
      ${row.map(([label, value]) => `<div class="video-device-detail-label">${label}</div><div class="video-device-detail-value">${label === "在线状态" ? tag(value) : (value || "--")}</div>`).join("")}
    </div>`).join("")}
  </div>`;
}

function videoDeviceDetailHtml(device = videoDevices[0]) {
  const { brand, model } = splitBrandModel(device.brandModel);
  const baseInfo = [
    [["设备名称", device.name], ["设备标识", device.identifier || "--"]],
    [["设备编码", device.code], ["设备类型", device.category]],
    [["设备子类", device.type], ["设备型号", model]],
    [["IP地址", device.ip], ["MAC地址", device.mac || "--"]],
    [["在线状态", device.status], ["在线状态更新时间", device.statusUpdateTime || device.heartbeat]],
    [["上次在线时间", device.heartbeat], ["设备品牌", brand]],
    [["备注", device.remark || "--"]]
  ];
  const positionInfo = [
    [["录入位置", device.entryLocation || "--"], ["绑定位置", device.location || "--"]]
  ];
  return `<div class="video-device-detail">
    <section class="video-device-section">
      <h3>基本信息</h3>
      ${videoDeviceDetailTable(baseInfo)}
    </section>
    <section class="video-device-section">
      <h3>位置信息</h3>
      ${videoDeviceDetailTable(positionInfo)}
    </section>
  </div>`;
}

function visitorIcon(name) {
  const icons = {
    status: `<path d="M8 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M2 20c0-3.3 2.7-6 6-6 1.2 0 2.4.4 3.3 1"/><path d="m14 17 2 2 4-4"/>`,
    calendar: `<path d="M7 2v4M17 2v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>`,
    pass: `<path d="M6 3h9a3 3 0 0 1 3 3v15H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M9 8h5M9 12h6M9 16h4"/><path d="m17 9 3 3-3 3"/>`,
    phone: `<path d="M7 3 4.8 5.2c-.5.5-.7 1.2-.4 1.9 1.7 5.1 5.4 8.8 10.5 10.5.7.2 1.4.1 1.9-.4L19 15l-3.5-3.5-2 2c-1.8-.9-3.1-2.2-4-4l2-2L7 3Z"/>`,
    company: `<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 8h2a2 2 0 0 1 2 2v11"/><path d="M8 7h4M8 11h4M8 15h4M9 21v-3h2v3"/>`,
    host: `<path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>`,
    reason: `<path d="M6 3h9l3 3v15H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v4h4"/><path d="M8 12h8M8 16h5"/>`,
    car: `<path d="M5 16h14l-1.6-5.2A3 3 0 0 0 14.5 9h-5a3 3 0 0 0-2.9 1.8L5 16Z"/><path d="M4 16v3M20 16v3M7 19h.01M17 19h.01"/><path d="M8 13h8"/>`,
    people: `<path d="M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M3 20c0-3.3 2.7-6 6-6 1.4 0 2.6.5 3.6 1.3"/><path d="M17 11a2.5 2.5 0 1 0 0-5"/><path d="M15 20c0-1.9 1.2-3.5 3-4"/>`,
    time: `<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`,
    note: `<path d="M5 5h14v11H8l-3 3V5Z"/><path d="M8 9h8M8 13h5"/>`,
    info: `<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>`,
    approval: `<path d="M8 4h8l1 2h3v15H4V6h3l1-2Z"/><path d="M9 13l2 2 4-5"/>`,
    passage: `<path d="M5 3h9a2 2 0 0 1 2 2v16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M10 12h10"/><path d="m17 9 3 3-3 3"/>`
  };
  return `<svg class="visitor-svg-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
}

function visitorDetailFromRow(row = []) {
  const [name = "赵一凡", phonePlate = "13812348000|鲁B·T912F", company = "蓝谷数字能源有限公司", hostContact = "李晨 / 18661782304", visitDate = "2026-07-20", reason = "技术交流", appointmentStatus = "待安防审批", visitStatus = "未到访"] = row;
  const [phone = "--", plateRaw = "-"] = String(phonePlate).split("|");
  const [host = "--", hostPhone = "--"] = String(hostContact).split(" / ");
  const appointmentId = visitorAppointmentIdForName(name);
  const extra = visitorAppointmentExtra[appointmentId] || {};
  return {
    appointmentId,
    name,
    phone: extra.phone || phone,
    plate: plateRaw && plateRaw !== "-" ? plateRaw : "-",
    company,
    host,
    hostPhone,
    hostContact,
    visitDate,
    reason,
    appointmentStatus,
    visitStatus,
    submitTime: extra.submitTime || "-",
    companion: extra.companion || "0 人",
    note: extra.remark || "-",
    permissionMode: plateRaw && plateRaw !== "-" ? "人脸 / 二维码 / 车牌" : "人脸 / 二维码"
  };
}

function renderVisitorBasicInfo(detail = visitorDetailFromRow(tableConfigs.visitor.rows[0])) {
  const basic = [
    ["phone", "访客手机号", detail.phone],
    ["company", "访问企业", detail.company],
    ["host", "被访人", detail.hostContact],
    ["reason", "来访事由", detail.reason],
    ["car", "车牌号", detail.plate && detail.plate !== "-" ? detail.plate : "未登记车辆"],
    ["people", "随行人数", detail.companion],
    ["time", "提交时间", detail.submitTime],
    ["note", "备注", detail.note]
  ];
  return `<div class="visitor-basic-detail">
    <div class="visitor-profile-card">
      <div class="visitor-face-panel">
        <div class="visitor-face-photo" aria-label="访客人脸照片">
          <span class="visitor-face-head">${detail.name.slice(0,1)}</span>
          <span class="visitor-face-shoulder"></span>
        </div>
      </div>
      <div class="visitor-profile-main">
        <div class="dorm-person-title visitor-title-line"><b>${detail.name}</b>${tag(detail.appointmentStatus)}</div>
        <div class="visitor-profile-summary">
          <div><span class="visitor-summary-icon">${visitorIcon("status")}</span><label>到访状态</label><b>${detail.visitStatus}</b></div>
          <div><span class="visitor-summary-icon">${visitorIcon("calendar")}</span><label>拜访时间</label><b>${detail.visitDate}</b></div>
          <div><span class="visitor-summary-icon">${visitorIcon("pass")}</span><label>通行方式</label><b>${detail.permissionMode}</b></div>
        </div>
      </div>
    </div>
    <section class="visitor-info-card">
      <h3><span class="visitor-card-icon">${visitorIcon("info")}</span>基础信息</h3>
      <div class="dorm-person-basic visitor-basic-band">
        ${basic.map(([icon,label,value])=>`<div><span class="visitor-field-icon">${visitorIcon(icon)}</span><label>${label}</label><b>${value}</b></div>`).join("")}
      </div>
    </section>
  </div>`;
}

function renderVisitorDetailPage(detail = visitorDetailFromRow(tableConfigs.visitor.rows[0])) {
  return `<div class="visitor-one-page-detail">
    ${renderVisitorBasicInfo(detail)}
    <section class="visitor-detail-section visitor-record-card">
      <h3><span class="visitor-card-icon">${visitorIcon("approval")}</span>审批记录</h3>
      ${renderVisitorApprovalTimeline(detail)}
    </section>
    <section class="visitor-detail-section visitor-record-card">
      <h3><span class="visitor-card-icon">${visitorIcon("passage")}</span>通行记录</h3>
      ${renderVisitorPassageRecords(detail)}
    </section>
  </div>`;
}

function renderVisitorApprovalTimeline(detail = visitorDetailFromRow(tableConfigs.visitor.rows[0])) {
  const isRejected = detail.appointmentStatus === "已拒绝";
  const isPending = detail.appointmentStatus === "待安防审批";
  const rows = isRejected
    ? [["被访人审批", detail.host, "拒绝", detail.submitTime, "-", "被访人不便接待"]]
    : [
      ["被访人审批", detail.host, "通过", detail.submitTime, "确认接待，请按预约日期放行", "-"],
      ["安防审批", isPending ? "待安防责任人处理" : "安防责任人", isPending ? "待审批" : "通过", isPending ? "-" : detail.submitTime, isPending ? "-" : "审批通过", "-"]
    ];
  return `<div class="card table-card"><div class="table-wrap"><table class="visitor-detail-table"><thead><tr><th>审批节点</th><th>审批人</th><th>审批结果</th><th>审批时间</th><th>审批意见</th><th>拒绝原因</th></tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,index)=>`<td>${index===2?tag(cell):cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
}

function renderVisitorPermissionInfo() {
  const rows = [
    ["人脸权限", "未生成", "东门访客闸机01、东门访客闸机02、南门通行闸机01", "2026-07-20 06:00 至 22:00", "-", "-", "-"],
    ["二维码权限", "未生成", "默认人行通行设备", "2026-07-20 06:00 至 22:00", "-", "-", "-"],
    ["车牌权限", "未生成", "南门车辆道闸01、东门车辆道闸01", "2026-07-20 06:00 至 22:00", "-", "-", "-"]
  ];
  return `<div class="alert">审批通过后生成访客动态二维码，并同步人脸、二维码、预约车牌和有效期；权限同步失败不回退预约状态。</div>
  <div class="card table-card"><div class="table-wrap"><table class="visitor-detail-table"><thead><tr><th>权限项</th><th>权限状态</th><th>可通行设备范围</th><th>权限有效期</th><th>下发时间</th><th>同步结果</th><th>失败原因</th></tr></thead><tbody>${rows.map(row=>`<tr>${row.map((cell,index)=>`<td>${index===1||index===5?tag(cell):cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
}

function renderVisitorPassageRecords(detail = visitorDetailFromRow(tableConfigs.visitor.rows[0])) {
  const recordMap = {
    "周雨": [
      ["2026-07-20 09:08:16", "微冷园区 / 东门", "东门访客闸机02", "入园", "人脸", "成功", "-"],
      ["2026-07-20 11:30:20", "微冷园区 / 南门", "南门车辆道闸01", "出园", "车牌", "成功", "-"],
      ["2026-07-20 14:02:44", "微冷园区 / 南门", "南门车辆道闸01", "入园", "车牌", "成功", "-"]
    ],
    "刘启明": [["2026-07-19 10:16:31", "A栋 / 1F / 大厅", "A栋大厅门禁01", "入园", "二维码", "失败", "二维码权限未同步至该设备"]],
    "孙可": [["2026-07-17 09:22:08", "微冷园区 / 东门", "东门访客闸机02", "入园", "人脸", "成功", "-"]]
  };
  const rows = recordMap[detail.name] || [];
  const body = rows.length
    ? rows.map(row=>`<tr>${row.map((cell,index)=>`<td>${index===5?tag(cell):cell}</td>`).join("")}</tr>`).join("")
    : `<tr><td colspan="7"><div class="empty-table-cell">暂无通行记录</div></td></tr>`;
  return `<div class="card table-card"><div class="table-wrap"><table class="visitor-detail-table"><thead><tr><th>通行时间</th><th>通行位置</th><th>设备名称</th><th>进出方向</th><th>通行方式</th><th>通行结果</th><th>失败原因</th></tr></thead><tbody>${body}</tbody></table></div></div>`;
}

function renderVisitorOperationTimeline() {
  const items = [
    ["2026-07-15 09:10:32", "访客提交预约", "赵一凡通过访客小程序提交预约，系统校验被访人精确匹配成功。"],
    ["2026-07-15 09:26:18", "被访人审批通过", "李晨审批通过，预约状态更新为待安防审批。"],
    ["2026-07-15 09:26:20", "生成安防审批任务", "系统推送至安防责任人待办，不允许重复审批。"]
  ];
  return `<div class="card"><div class="card-body"><div class="timeline">${items.map(x=>`<div class="timeline-item"><time>${x[0]}</time><b>${x[1]}</b><span>${x[2]}</span></div>`).join("")}</div></div></div>`;
}

function renderTimeline(id,tab) {
  const items=id==="visitor"?[["2026-07-15 09:10:32","访客提交预约","预约进入待被访人审批。"],["2026-07-15 09:26:18","被访人审批通过","李晨确认接待，流转至安防审批。"]]
    :id==="device"?[["2026-05-27 09:30","设备注册","张振新完成设备录入和位置绑定。"],["2026-06-03 14:20","设备移机","李浩更新设备安装位置。"]]
    :id==="inspection"?[["2026-06-10 08:02","任务开始","巡检员闫卓宇开始执行任务。"],["2026-06-10 09:12","异常点提交","自动生成巡检工单 XJ-20260610-001。"]]
    :[["2026-06-10 10:32:18","告警产生","系统生成告警并推送当班人员。"],["2026-06-10 10:32:20","消息推送","已推送至当班值班员张振新。"]];
  return `<div class="card"><div class="card-body"><div class="timeline">${items.map(x=>`<div class="timeline-item"><time>${x[0]}</time><b>${x[1]}</b><span>${x[2]}</span></div>`).join("")}</div></div></div>`;
}

function alarmInspectionWorkorderDetailFromRow(row = []) {
  const [no, point, content, dueTime, reporterText, status] = row;
  const [reporter, reportTime] = String(reporterText || "").split(" / ");
  const profileMap = {
    "待派单": { handler: "--", dispatcher: "--", dispatchTime: "--", remark: "待巡检主管派单", deadline: "--" },
    "待接单": { handler: "余晓峰", dispatcher: "梁侃", dispatchTime: "2026-07-21 10:08", remark: "请跟进", deadline: dueTime || "--", urgency: "一般" },
    "处理中": { handler: "余晓峰", dispatcher: "梁侃", dispatchTime: "2023-12-06 10:49", remark: "请跟进", deadline: "2023-12-10 00:00", urgency: "一般" },
    "已完成": { handler: "李浩", dispatcher: "梁侃", dispatchTime: "2026-07-21 08:40", remark: "现场已完成处置", deadline: dueTime || "--", urgency: "一般" }
  };
  const profile = profileMap[status] || profileMap["待派单"];
  return {
    no: no || "XJGD-20260721-004",
    point: point || "A栋 / 1F / 消防栓-03",
    content: content || "消防栓箱门无法正常闭合，需现场核查",
    dueTime: dueTime || "--",
    reporter: reporter || "--",
    reportTime: reportTime || "--",
    status: status || "待派单",
    title: `${String(point || "巡检点").replace(/\s*\/\s*/g, "")}巡检异常处理`,
    ...profile
  };
}

function renderAlarmInspectionWorkorderDetail(activeTab = "基础信息") {
  const tabs = ["基础信息", "流程明细"];
  const detail = currentAlarmInspectionWorkorderDetail || alarmInspectionWorkorderDetailFromRow(getTabConfig("alarm", "巡检工单").rows[0]);
  const handlerValue = detail.handler && detail.handler !== "--" && detail.status !== "已完成"
    ? `${detail.handler} <button class="btn primary alarm-workorder-change-btn" type="button">换人</button>`
    : (detail.handler || "--");
  const baseRows = [
    [["处理人", handlerValue], ["派单人", detail.dispatcher]],
    [["补充留言", detail.remark], ["派单时间", detail.dispatchTime]],
    [["处理时限", detail.deadline]]
  ];
  return `<section class="alarm-workorder-detail inspection-workorder-detail">
    <div class="alarm-workorder-title-row">
      <h3>${detail.title}</h3>
      ${inspectionWorkorderStatusTag(detail.status)}
    </div>
    <div class="alarm-workorder-summary">
      <div><label>巡检点</label><b>${detail.point}</b></div>
      <div><label>提报人</label><b>${detail.reporter}</b></div>
      <div><label>提报时间</label><b>${detail.reportTime}</b></div>
      <div><label>工单编号</label><b>${detail.no}</b></div>
    </div>
    <div class="alarm-workorder-report-box">
      <div class="alarm-workorder-report-text"><span>提报内容：</span><b>${detail.content}</b></div>
      <div class="alarm-workorder-photo-row">
        <div class="alarm-workorder-photo"><span>现场照片</span></div>
        <div class="alarm-workorder-upload"><b>+</b><span>1/3</span></div>
        <p>上传的图片无法删除</p>
      </div>
    </div>
    <div class="alarm-workorder-tabs">
      ${tabs.map(tab=>`<button class="${tab===activeTab?"active":""}" data-alarm-workorder-detail-tab="${tab}">${tab}</button>`).join("")}
    </div>
    <div class="alarm-workorder-tabbody">
      ${activeTab === "流程明细" ? renderAlarmInspectionWorkorderFlow(detail) : renderAlarmInspectionWorkorderBase(baseRows)}
    </div>
  </section>`;
}

function renderAlarmInspectionWorkorderBase(rows) {
  return `<div class="alarm-workorder-basic-grid">${rows.map(row=>row.map(([label,value])=>`<div class="alarm-workorder-basic-item"><label>${label}</label><div>${value}</div></div>`).join("")).join("")}</div>`;
}

function renderAlarmInspectionWorkorderFlow(detail = currentAlarmInspectionWorkorderDetail || alarmInspectionWorkorderDetailFromRow()) {
  const rows = [["待生成", "异常提报", detail.reporter, `提交巡检异常，系统自动生成巡检工单 ${detail.no}，状态进入待派单。`]];
  rows[0][0] = detail.reportTime || "待生成";
  if (["待接单", "处理中", "已完成"].includes(detail.status)) rows.push([detail.dispatchTime, "派单", detail.dispatcher, `派单给${detail.handler}，工单状态由待派单变更为待接单。`]);
  if (["处理中", "已完成"].includes(detail.status)) rows.push(["2026-07-21 09:42", "接单", detail.handler, "确认接单，工单状态由待接单变更为处理中。"]);
  if (detail.status === "处理中") rows.push(["2026-07-21 09:45", "处理", detail.handler, "到达现场并上传现场照片，正在处理巡检异常。"]);
  if (detail.status === "已完成") rows.push(["2026-07-21 09:58", "完成", detail.handler, "提交处置结果，工单状态变更为已完成。"]);
  return `<div class="alarm-workorder-flow">${rows.map(([time,node,operator,content])=>`<div class="alarm-workorder-flow-item"><time>${time}</time><i></i><div><b>${node}</b><span>${operator}：${content}</span></div></div>`).join("")}</div>`;
}

function renderInspectionWorkorderTimeline() {
  const items = [
    ["2026-07-21 09:26:00", "异常提报", "闫卓宇提交巡检异常，系统自动生成巡检工单，状态进入待派单。"],
    ["2026-07-21 09:36:18", "派单", "张振新派单给李浩，工单状态由待派单变为待接单。"],
    ["2026-07-21 09:42:06", "接单", "李浩确认接单，工单状态由待接单变为处理中。"],
    ["2026-07-21 09:45:20", "开始处理", "李浩到达现场，上传现场照片并记录正在清理消防通道。"],
    ["待完成", "提交完成", "处理人提交处置说明和处理附件后，工单状态变为已完成。"]
  ];
  return `<div class="card"><div class="card-body"><div class="timeline">${items.map(x=>`<div class="timeline-item"><time>${x[0]}</time><b>${x[1]}</b><span>${x[2]}</span></div>`).join("")}</div></div></div>`;
}

function renderInspectionDetail() {
  return renderInspectionTaskDetailDrawer(currentInspectionTaskDetail || inspectionTaskRows[0]);
}

function renderInspectionTaskDetailDrawer(row = inspectionTaskRows[0]) {
  const task = inspectionTaskDetailFromRow(row);
  const statusClass = { "待巡检": "waiting", "巡检中": "running", "已完成": "done", "已作废": "voided" }[task.status] || "running";
  return `<div class="inspection-task-detail">
    <div class="inspection-task-detail-title">
      <div class="inspection-task-detail-title-main">
        <h3>${task.name}</h3>
        ${task.timedOut ? `<span class="inspection-task-detail-timeout">超时1小时30分钟</span>` : ""}
      </div>
      <span class="inspection-task-detail-status ${statusClass}">${task.status}</span>
    </div>
    <section class="inspection-task-detail-summary">
      <div><label>所属园区</label><b>${task.park}</b></div>
      <div><label>巡检人</label><b>${task.executor}</b></div>
      <div><label>巡检计划</label><b>${task.plan}</b></div>
      <div><label>计划巡检开始 / 结束时间</label><b>${task.start} 至 ${task.end}</b></div>
      <div><label>异常 / 正常 / 巡检点 / 完成率</label><b><i class="danger-text">${task.abnormal}</i> / <i class="success-text">${task.normal}</i> / ${task.points} / ${task.rate}</b></div>
    </section>
    <div class="inspection-task-detail-tabs"><button type="button" class="active">巡检明细</button></div>
    <div class="inspection-task-detail-table">
      <table>
        <thead><tr><th>序号</th><th>巡检点</th><th>巡检时间</th><th>巡检结果</th><th>巡检人</th></tr></thead>
        <tbody>${task.pointRows.map(point=>renderInspectionTaskPointRow(point)).join("")}</tbody>
      </table>
    </div>
    <div class="inspection-task-detail-rules">
      <p>1、蓝色巡检点，代表已巡检结束，可点击查看详情；</p>
      <p>2、如果巡检超期了，巡检时间颜色标红，且有标签；</p>
      <p>3、已经巡检完的，序号就是他巡检的顺序序号，其他没有巡检的序号只是标识作用，理论上如果（海尔6号门）是第5个巡检的点，则顺序会升至第5位；</p>
    </div>
  </div>`;
}

function inspectionTaskDetailFromRow(row = {}) {
  const pointTotal = row.points || 12;
  const finished = Math.min(pointTotal, (row.abnormal || 0) + (row.normal || 0));
  const rate = pointTotal ? `${Math.round(finished / pointTotal * 1000) / 10}%` : "0%";
  const waiting = row.status === "待巡检";
  const completed = row.status === "已完成";
  return {
    name: row.name || "日常定期保洁巡检线路（2025-07-01）",
    park: row.park || "海尔西园区",
    executor: row.executor || "张三、李四、王武",
    plan: row.name?.includes("临时") ? "临时任务" : "日常保洁巡检",
    start: row.start || "2025-07-01 9:00",
    end: row.end || "2025-07-02 9:00",
    status: row.status || "巡检中",
    abnormal: row.abnormal ?? 1,
    normal: row.normal ?? 5,
    points: pointTotal,
    rate,
    timedOut: !!row.timedOut,
    pointRows: inspectionTaskPointRows(waiting, completed)
  };
}

function inspectionTaskPointRows(waiting = false, completed = false) {
  if (waiting) {
    return ["大国璟A号", "大国璟B号", "大国璟C号", "大国璟D号", "大国璟E号", "大国璟F号", "大国璟G号", "海尔6号门"].map((name, index) => ({
      index: index + 1,
      name,
      time: "",
      result: "",
      inspector: "",
      clickable: false,
      timeout: false,
      rowStatus: "pending"
    }));
  }
  return [
    { index: 1, name: "大国璟A号", time: "2025-07-10 12:15", result: "异常", inspector: "闫卓宇", phone: "18553236080", clickable: true, rowStatus: "done" },
    { index: 2, name: "大国璟B号", time: "2025-07-10 12:15", result: "正常", inspector: "王涛", phone: "18553236081", clickable: true, rowStatus: "done" },
    { index: 3, name: "大国璟C号", time: "2025-07-10 12:15", result: "异常", inspector: "闫卓宇", phone: "18553236080", clickable: true, rowStatus: "done" },
    { index: 4, name: "大国璟D号", time: "2025-07-10 12:15", result: "正常", inspector: "王涛", phone: "18553236081", clickable: true, timeout: true, rowStatus: "done timeout-done" },
    { index: 5, name: "大国璟E号", time: completed ? "2025-07-10 12:28" : "", result: completed ? "正常" : "", inspector: completed ? "闫卓宇" : "", phone: completed ? "18553236080" : "", clickable: completed, rowStatus: completed ? "done" : "pending" },
    { index: 6, name: "大国璟F号", time: completed ? "2025-07-10 12:35" : "", result: completed ? "正常" : "", inspector: completed ? "王涛" : "", phone: completed ? "18553236081" : "", clickable: completed, rowStatus: completed ? "done" : "pending" },
    { index: 7, name: "大国璟G号", time: completed ? "2025-07-10 12:42" : "", result: completed ? "正常" : "", inspector: completed ? "闫卓宇" : "", phone: completed ? "18553236080" : "", clickable: completed, rowStatus: completed ? "done" : "pending" },
    { index: 8, name: "海尔6号门", time: completed ? "2025-07-10 12:50" : "", result: completed ? "正常" : "", inspector: completed ? "王涛" : "", phone: completed ? "18553236081" : "", clickable: completed, rowStatus: completed ? "done" : "pending" }
  ];
}

function renderInspectionTaskPointRow(point) {
  const nameHtml = point.clickable
    ? `<button type="button" class="inspection-task-point-link action-point-detail" data-point-name="${point.name}" data-point-result="${point.result}" data-point-inspector="${point.inspector}" data-point-time="${point.time}">${point.name}</button>`
    : `<span>${point.name}</span>`;
  const timeoutBadge = point.timeout && point.rowStatus !== "timeout-pending" ? `<span class="inspection-task-point-timeout">超时</span>` : "";
  const resultClass = point.result === "异常" ? "abnormal" : point.result === "正常" ? "normal" : "";
  const inspector = point.inspector ? `${point.inspector}<small>${point.phone || ""}</small>` : "";
  return `<tr class="${point.rowStatus || ""}">
    <td>${point.index}</td>
    <td>${nameHtml}${timeoutBadge}</td>
    <td>${point.time || ""}</td>
    <td>${point.result ? `<span class="inspection-task-point-result ${resultClass}">${point.result}</span>` : ""}</td>
    <td>${inspector}</td>
  </tr>`;
}

function decodeInspectionRouteRow(value) {
  if (!value) return null;
  try {
    const row = JSON.parse(decodeURIComponent(value));
    return Array.isArray(row) ? row : null;
  } catch (error) {
    return null;
  }
}

function inspectionRoutePointsFromSummary(summary = "") {
  const cleaned = String(summary).replace(/等\s*\d+\s*个/g, "").trim();
  return cleaned.split("、").map(item => item.trim()).filter(Boolean).slice(0, 8);
}

function inspectionRouteFormHtml(route = null) {
  const [name = "", points = "", park = "微冷园区", duration = ""] = route || [];
  const selectedPoints = inspectionRoutePointsFromSummary(points || "巡检点1、巡检点2、巡检点3、巡检点4、巡检点5、巡检点6、巡检点7");
  const durationMinutes = Number(String(duration).match(/\d+/)?.[0] || 0);
  const durationHours = durationMinutes >= 60 ? Math.floor(durationMinutes / 60) : "";
  const durationRemainMinutes = durationMinutes >= 60 ? durationMinutes % 60 : (durationMinutes || "");
  const routePointRows = [
    ["1", "巡检点1", "1#", "通用", "检查下周围环境是否安好"],
    ["2", "巡检点2", "1#", "管线巡检", "检查下设备度数是否正常、有没有异味"],
    ["3", "巡检点3", "1#", "管线巡检、日常巡检", "..."],
    ["4", "巡检点4", "1#", "季度巡检、管线巡检", "..."],
    ["5", "巡检点5", "地库", "工程巡检", "..."],
    ["6", "巡检点6", "地库", "工程巡检", "..."]
  ];
  const allSelected = routePointRows.every(row => selectedPoints.includes(row[1]));
  return `<div class="inspection-route-form">
    <section class="inspection-route-top">
      <div class="inspection-route-base-fields">
        <div class="inspection-route-inline-field">
          <label class="required">所属园区：</label>
          <select class="control" data-route-required>
            ${["微冷园区", "海尔西园区"].map(option => `<option ${option === park ? "selected" : ""}>${option}</option>`).join("")}
          </select>
        </div>
        <div class="inspection-route-inline-field">
          <label class="required">巡检路线名称：</label>
          <input class="control" data-route-required value="${escapeAttr(name)}" placeholder="请输入巡检路线名称">
        </div>
        <div class="inspection-route-inline-field inspection-route-duration-field">
          <label class="required">预估时间：</label>
          <div class="inspection-route-duration">
            <input class="control" value="" aria-label="天数"><span>天</span>
            <input class="control" value="${escapeAttr(durationHours)}" aria-label="小时"><span>小时</span>
            <input class="control" value="${escapeAttr(durationRemainMinutes)}" aria-label="分钟"><span>分钟</span>
          </div>
        </div>
        <p class="inspection-route-duration-tip">Tips：预估时间会影响后期巡检任务的闭环时间，请合理填写！</p>
        <div class="inspection-route-inline-field inspection-route-selected-field">
          <label>所含巡检点：</label>
          <div class="inspection-route-selected-points" data-inspection-route-selected-points>
            ${selectedPoints.map(point => `<span data-selected-point="${escapeAttr(point)}">${point}<button type="button" class="inspection-route-point-remove" data-remove-point="${escapeAttr(point)}">×</button></span>`).join("")}
          </div>
        </div>
      </div>
      <p class="inspection-route-page-tip">巡检路线页面中，所有的新增、编辑等都用抽屉进行交互操作，因为涉及到从大量的巡检点中进行筛选，故提供大篇幅操作空间</p>
    </section>
    <section class="inspection-route-picker-section">
      <h3>巡检路线</h3>
      <div class="inspection-route-picker-filter">
        <div class="inspection-route-filter-row">
          <label>巡检点：</label>
          <input class="control" placeholder="请输入巡检点">
          <div class="inspection-route-filter-actions"><button class="btn primary" type="button">查询</button><button class="btn" type="button">重置</button></div>
        </div>
        <div class="inspection-route-filter-row">
          <label>标签：</label>
          <div class="inspection-route-segments">${["全部", "管线巡检", "普井巡检", "第三方施工巡检", "日常巡检", "季度巡检"].map(item => `<button type="button">${item}</button>`).join("")}</div>
        </div>
        <div class="inspection-route-filter-row">
          <label>区域：</label>
          <div class="inspection-route-segments inspection-route-area-segments">${["全部", "1#", "2#", "3#", "4#", "5#", "6#", "7#", "8#", "地库", "前门大堂"].map(item => `<button type="button">${item}</button>`).join("")}</div>
          <span class="inspection-route-multiselect-tip">可多选</span>
        </div>
      </div>
      <div class="table-wrap">
        <table class="inspection-route-point-preview-table">
          <thead><tr><th><input type="checkbox" data-route-point-check-all aria-label="全选巡检点" ${allSelected ? "checked" : ""}></th><th>序号</th><th>巡检点</th><th>区域</th><th>标签</th><th>备注</th></tr></thead>
          <tbody>${routePointRows.map(row => {
            const checked = selectedPoints.includes(row[1]);
            return `<tr class="inspection-route-point-row ${checked ? "is-selected" : ""}" data-route-point-name="${escapeAttr(row[1])}"><td><input type="checkbox" data-route-point-check aria-label="选择${row[1]}" ${checked ? "checked" : ""}></td>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`;
          }).join("")}</tbody>
        </table>
      </div>
      <p class="inspection-route-foot-tip">这里要做到：点击某一行，即选中；</p>
    </section>
  </div>`;
}

function inspectionRouteSelectedPointNames() {
  return [...document.querySelectorAll("[data-inspection-route-selected-points] [data-selected-point]")]
    .map(item => item.dataset.selectedPoint)
    .filter(Boolean);
}

function renderInspectionRouteSelectedPoints(names) {
  const container = document.querySelector("[data-inspection-route-selected-points]");
  if (!container) return;
  container.innerHTML = names.length
    ? names.map(point => `<span data-selected-point="${escapeAttr(point)}">${point}<button type="button" class="inspection-route-point-remove" data-remove-point="${escapeAttr(point)}">×</button></span>`).join("")
    : `<em>请选择巡检点</em>`;
}

function syncInspectionRoutePointRows(names) {
  const selected = new Set(names);
  const rows = [...document.querySelectorAll(".inspection-route-point-row")];
  rows.forEach(row => {
    const checked = selected.has(row.dataset.routePointName);
    row.classList.toggle("is-selected", checked);
    const checkbox = row.querySelector("[data-route-point-check]");
    if (checkbox) checkbox.checked = checked;
  });
  const allCheckbox = document.querySelector("[data-route-point-check-all]");
  if (allCheckbox) allCheckbox.checked = rows.length > 0 && rows.every(row => selected.has(row.dataset.routePointName));
}

function updateInspectionRoutePointSelection(pointName, selected) {
  if (!pointName) return;
  const names = inspectionRouteSelectedPointNames();
  const next = new Set(names);
  if (selected) next.add(pointName);
  else next.delete(pointName);
  const ordered = [...document.querySelectorAll(".inspection-route-point-row")].map(row => row.dataset.routePointName).filter(Boolean);
  const sorted = [...next].sort((a, b) => {
    const ai = ordered.indexOf(a);
    const bi = ordered.indexOf(b);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  renderInspectionRouteSelectedPoints(sorted);
  syncInspectionRoutePointRows(sorted);
}

function setAllInspectionRoutePointSelection(selected) {
  const names = selected ? [...document.querySelectorAll(".inspection-route-point-row")].map(row => row.dataset.routePointName).filter(Boolean) : [];
  renderInspectionRouteSelectedPoints(names);
  syncInspectionRoutePointRows(names);
}

function openInspectionRouteDrawer(editMode = false, route = null) {
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("inspection-route-drawer");
  document.querySelector("#drawer .drawer-head").innerHTML = `<div><span class="eyebrow">INSPECTION ROUTE</span><h2 id="drawerTitle">${editMode ? "编辑路线" : "新增路线"}</h2></div><button class="close-btn" data-close="drawer">×</button>`;
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = inspectionRouteFormHtml(route);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary action-inspection-route-save">${editMode ? "保存" : "确定"}</button>`;
  document.getElementById("drawerOverlay").classList.add("show");
}

function openInspectionRouteDetailDrawer(route = null) {
  const [name = "A栋消防巡检路线", points = "A栋 1F 消防栓-03、A栋 2F 疏散通道、A栋配电间等 12 个", park = "微冷园区", duration = "120 分钟"] = route || [];
  const pointRows = inspectionRoutePointsFromSummary(points);
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("inspection-route-drawer");
  document.querySelector("#drawer .drawer-head").innerHTML = `<div><span class="eyebrow">DETAIL</span><h2 id="drawerTitle">${name}</h2></div><button class="close-btn" data-close="drawer">×</button>`;
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = `<div class="inspection-route-detail">
    <section class="card inspection-route-basic-card">
      <div class="inspection-route-basic-grid">
        ${[`路线名称|${name}`, `所属园区|${park}`, `预估时间|${duration}`, `所含巡检点|${points}`].map(item => { const [label, value] = item.split("|"); return `<div><label>${label}</label><b>${value}</b></div>`; }).join("")}
      </div>
    </section>
    <section class="card table-card">
      <div class="table-toolbar"><div class="table-toolbar-left"><span class="tag primary">巡检点明细</span></div></div>
      <div class="table-wrap">
        <table class="inspection-route-point-preview-table">
          <thead><tr><th>序号</th><th>巡检点名称</th><th>所属园区</th></tr></thead>
          <tbody>${pointRows.map((point, index) => `<tr><td>${index + 1}</td><td>${point}</td><td>${park}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    </section>
  </div>`;
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">关闭</button>`;
  document.getElementById("drawerOverlay").classList.add("show");
}

function openInspectionPointDetail(point = {}) {
  const pointName = point.name || "大国璟A号";
  const pointResult = point.result || "异常";
  const pointInspector = point.inspector || "闫卓宇";
  const pointTime = point.time || "2025-07-10 12:15";
  resetSubDrawerChrome();
  document.querySelector("#subDrawerOverlay .subdrawer").classList.add("inspection-point-result-drawer");
  document.querySelector("#subDrawerOverlay .drawer-head .eyebrow").textContent = "DETAIL";
  document.querySelector("#subDrawerOverlay .drawer-head h2").textContent = "巡检点详情";
  document.getElementById("subDrawerBody").innerHTML=`<div class="inspection-point-result-detail">
    <div class="inspection-point-result-title">
      <h3>${pointName}</h3>
      <span>${pointResult}</span>
    </div>
    <section class="inspection-point-result-summary">
      <div><label>所属园区</label><b>海尔西园区</b></div>
      <div><label>区域</label><b>东南角区域</b></div>
      <div><label>标签</label><b>保洁巡检</b></div>
    </section>
    <div class="inspection-point-result-fields">
      <div><label>巡检人：</label><span>${pointInspector}</span></div>
      <div><label>巡检时间：</label><span>${pointTime}</span></div>
      <div class="description"><label>巡检描述：</label><p>测试共耗时一周时间，共5人参与，分别从额定载重、电池续航、工业防水、外观设计、城市级停泊、推进动力等方面进行了综合评估；</p></div>
      <div class="photos"><label>巡检图片：</label><div class="inspection-point-photo-list">
        <img src="assets/inspection/inspection-point-photo-01.png" alt="巡检现场图片1">
        <img src="assets/inspection/inspection-point-photo-02.png" alt="巡检现场图片2">
      </div></div>
      <div><label>巡检工单：</label><a href="javascript:void(0)">XJGD - 20250901 - 001</a></div>
    </div>
    <div class="inspection-point-result-note">仅巡检异常才有巡检工单</div>
  </div>`;
  document.querySelector("#subDrawerOverlay .drawer-foot").innerHTML = `<button class="btn" data-close="subDrawer">取消</button><button class="btn primary" data-close="subDrawer">确定</button>`;
  document.getElementById("subDrawerOverlay").classList.add("show");
}

function renderPatrolDetail() {
  return `<div class="card table-card"><table><thead><tr><th>序号</th><th>视频巡检点位</th><th>关联摄像头</th><th>查看时长</th><th>完成状态</th><th>异常记录</th></tr></thead><tbody><tr><td>1</td><td>正门全景点位</td><td>正门全景-01</td><td>18 秒</td><td>${tag("已完成")}</td><td>-</td></tr><tr><td>2</td><td>围墙监控点位</td><td>围墙监控-03</td><td>22 秒</td><td>${tag("已完成")}</td><td class="link">人员徘徊异常</td></tr><tr><td>3</td><td>仓库入口点位</td><td>仓库入口-01</td><td>-</td><td>待查看</td><td>-</td></tr></tbody></table></div>`;
}

function drawerFoot(id,tab) {
  if(id==="perimeter"&&tab==="周界告警") return perimeterAlarmDrawerFoot(perimeterAlarmById(currentPerimeterAlarmId));
  if(id==="alarm"&&tab==="告警事件") return `<button class="btn" data-close="drawer">关闭详情</button>`;
  if(id==="alarm"&&tab==="巡检工单") {
    const detail = currentAlarmInspectionWorkorderDetail || alarmInspectionWorkorderDetailFromRow(getTabConfig("alarm", "巡检工单").rows[0]);
    return detail.status === "待派单"
      ? `<button class="btn" data-close="drawer">关闭</button><button class="btn primary action-business" data-act="派单">派单</button>`
      : `<button class="btn" data-close="drawer">关闭</button>`;
  }
  if(id==="alarm"&&tab==="安防工单") {
    const detail = currentSecurityWorkorderDetail || securityWorkorderDetailFromRow(securityWorkorderRows()[0]);
    if (detail.status === "待派单") return `<button class="btn" data-close="drawer">关闭</button><button class="btn primary action-business" data-act="派单">派单</button>`;
    if (["待接单", "处理中"].includes(detail.status)) return `<button class="btn" data-close="drawer">关闭</button><button class="btn primary action-business" data-act="换人">换人</button>`;
    return `<button class="btn" data-close="drawer">关闭</button>`;
  }
  if(id==="video"&&tab==="监控设备") return "";
  if(id==="visitor"&&tab==="访客管理") return "";
  if(id==="visitor"&&tab==="安防审批") {
    const detail = currentVisitorSecurityApprovalDetail || visitorSecurityApprovalDetailFromRow(getTabConfig("visitor", "安防审批").rows[0]);
    return detail.approvalStatus === "待审批"
      ? `<button class="btn" data-close="drawer">关闭</button><button class="btn danger action-business" data-act="审批拒绝">拒绝</button><button class="btn primary action-business" data-act="审批通过">通过</button>`
      : `<button class="btn" data-close="drawer">关闭</button>`;
  }
  if(id==="inspection"&&tab==="巡检任务") return `<button class="btn" data-close="drawer">取消</button><button class="btn primary" data-close="drawer">确定</button>`;
  return `<button class="btn" data-close="drawer">关闭</button>`;
}

function openAlarmInspectionWorkorderDispatchModal() {
  const detail = currentAlarmInspectionWorkorderDetail || alarmInspectionWorkorderDetailFromRow(getTabConfig("alarm", "巡检工单").rows[0]);
  const handlerOptions = ["张振新", "李浩", "闫卓宇", "王涛", "陈航", "孙凯", "余晓峰"].map(name => `<option value="${name}"></option>`).join("");
  const modal = document.getElementById("modal");
  modal.className = "modal alarm-dispatch-modal";
  modal.dataset.action = "派单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "派单";
  document.getElementById("modalBody").innerHTML = `<div class="alarm-dispatch-form">
    <div class="form-grid">
      <div class="form-field">
        <label>工单编号（只读）</label>
        <input class="control" readonly value="${detail.no || "系统自动带出"}">
        <small class="form-help">字段与当前模块详细设计保持一致</small>
      </div>
      <div class="form-field">
        <label class="required">处理人（来源：园区员工，必填）</label>
        <input class="control" list="alarmDispatchHandlerOptions" placeholder="请输入或选择处理人，支持模糊搜索">
        <datalist id="alarmDispatchHandlerOptions">${handlerOptions}</datalist>
      </div>
      <div class="form-field">
        <label class="required">处理时限</label>
        <input class="control" type="text" placeholder="年/月/日 --:--">
      </div>
      <div class="form-field full">
        <label>派单说明（选填）</label>
        <textarea class="control" placeholder="请输入派单说明（选填）"></textarea>
      </div>
      <div class="form-field">
        <label>今日值班人（来自排班日历）</label>
        <input class="control" readonly value="${todaySecurityDutyText()}">
      </div>
    </div>
  </div>`;
  document.getElementById("modalConfirm").textContent = "确认";
  document.getElementById("modalOverlay").classList.add("show");
}

function renderTodaySecurityDutyPanel(selectedName = "") {
  const duty = getSecurityDutyByDate("2026-07-21");
  const people = [...duty.people, duty.leader].filter(Boolean);
  return `<div class="security-duty-panel">
    <div class="security-duty-panel-head"><b>今日值班人员</b><span>来源：排班管理 / 排班日历 / 2026-07-21</span></div>
    <div class="security-duty-list">${people.map(name => `<span class="${selectedName && name.includes(selectedName) ? "active" : ""}">${name}</span>`).join("")}</div>
  </div>`;
}

function openSecurityWorkorderDispatchModal(mode = "派单") {
  const detail = currentSecurityWorkorderDetail || securityWorkorderDetailFromRow(securityWorkorderRows()[0]);
  const duty = getSecurityDutyByDate("2026-07-21");
  const handlerOptions = [...duty.people, duty.leader.replace(" · 请假", "")].map(name => `<option value="${name}"></option>`).join("");
  const isChange = mode === "换人";
  const modal = document.getElementById("modal");
  modal.className = "modal alarm-dispatch-modal";
  modal.dataset.action = isChange ? "安防工单换人" : "安防工单派单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = isChange ? "换人" : "派单";
  document.getElementById("modalBody").innerHTML = `<div class="alarm-dispatch-form security-workorder-dispatch-form">
    ${renderTodaySecurityDutyPanel(isChange ? detail.handler : "")}
    <div class="form-grid">
      <div class="form-field">
        <label>工单编号（只读）</label>
        <input class="control" readonly value="${detail.no}">
      </div>
      <div class="form-field">
        <label class="required">${isChange ? "新处理人" : "处理人"}</label>
        <input class="control" list="securityDispatchHandlerOptions" placeholder="请选择今日值班人员" ${isChange ? "" : `value="${duty.people[0] || ""}"`}>
        <datalist id="securityDispatchHandlerOptions">${handlerOptions}</datalist>
      </div>
      <div class="form-field">
        <label class="required">处理时限</label>
        <input class="control" type="text" placeholder="请选择或填写处理时限" value="${isChange && detail.expectedCloseTime !== "--" ? detail.expectedCloseTime : ""}">
      </div>
      <div class="form-field">
        <label>告警位置</label>
        <input class="control" readonly value="${detail.location}">
      </div>
      <div class="form-field full">
        <label>关联告警处置建议</label>
        <textarea class="control" readonly>${detail.requirement}</textarea>
      </div>
      <div class="form-field full">
        <label>${isChange ? "换人说明" : "派单说明"}</label>
        <textarea class="control" placeholder="请输入说明">${isChange ? `原处理人：${detail.handler}。请新处理人继续跟进当前现场核查。` : "请按关联告警处置建议完成现场核查，并上传处理结果。"}</textarea>
      </div>
    </div>
  </div>`;
  document.getElementById("modalConfirm").textContent = isChange ? "确认换人" : "确认派单";
  document.getElementById("modalOverlay").classList.add("show");
}

function openAlarmConfigModal(options = {}) {
  const alarmType = options.alarmType || "热成像过温告警";
  const alarmLevel = options.alarmLevel || "紧急";
  const remark = options.remark || "";
  const levelOptions = ["紧急", "重要", "一般"].map(level => `<option ${level === alarmLevel ? "selected" : ""}>${level}</option>`).join("");
  document.getElementById("modalTitle").textContent = "编辑告警配置";
  document.getElementById("modalBody").innerHTML = `
    <div class="alert warning">ⓘ 告警类型为系统固定枚举，编辑时不可修改；本页面仅维护该告警类型对应的告警等级和备注。</div>
    <div class="form-section">
      <div class="form-grid">
        <div class="form-field">
          <label class="required">告警类型</label>
          <input class="control" value="${escapeAttr(alarmType)}" disabled>
          <small class="form-help">告警类型置灰展示，不允许修改。</small>
        </div>
        <div class="form-field">
          <label class="required">告警等级</label>
          <select class="control">${levelOptions}</select>
        </div>
        <div class="form-field full">
          <label>备注</label>
          <textarea class="control" rows="4" placeholder="请输入备注">${remark}</textarea>
        </div>
      </div>
    </div>`;
  const modal = document.getElementById("modalOverlay");
  modal.dataset.action = "编辑告警配置";
  modal.classList.add("show");
}

function resolveFormSchema(title) {
  const tab = currentTab[currentModule] || modules.find(x=>x.id===currentModule).tabs[0];
  if (currentModule === "patrol" && tab === "视频巡检路线") return formSchemas["patrol:视频巡检路线"];
  if (currentModule === "patrol" && tab === "巡检计划") return formSchemas["patrol:巡更计划"];
  if (currentModule === "patrol" && tab === "巡检任务") return formSchemas["patrol:巡检任务"];
  const titleRoutes = [
    [/周界任务/, "perimeter:周界设置"], [/巡更任务|新增任务/, "patrol:巡检任务"], [/巡更计划/, "patrol:巡更计划"], [/新增方案/, "patrol:视频巡检路线"],
    [/新增标签/, "inspection:自定义标签"], [/新增区域/, "inspection:自定义区域"], [/巡检点/, "inspection:巡检点"],
    [/巡检路线/, "inspection:巡检路线"], [/临时任务/, "inspection:巡检任务"], [/新增设备/, "device:设备台账"],
    [/维护记录/, "device:设备维护"], [/绑定设备/, "device:位置绑定"],
    [/配置权限组/, currentTab.access==="按部门授权"?"access:按部门授权":"access:人员权限"],
    [/新增授权/, "access:权限下发管理"], [/时间段/, "access:通行时间段"], [/权限组/, "access:门禁权限组"],
    [/车场配置|新增车场|编辑车场/, "vehicle:车场配置"], [/出入口/, "vehicle:出入口配置"], [/绑定监控/, "vehicle:监控绑定"], [/授权配置|配置授权|新增车辆|绑定车辆/, "vehicle:车辆管理"], [/出场核验/, "vehicle:特殊车辆通行记录"], [/特殊车辆/, "vehicle:特殊车辆管理"], [/无权限车辆放行/, "vehicle:岗亭值守"], [/排班调整|队长请假/, "schedule:排班日历"], [/发卡/, "person:卡片管理"],
    [/新增企业/, "company:企业信息"], [/批量绑定|关联房间/, "company:房间关联"], [/新增人员/, "person:人员档案"],
    [/新增黑名单/, currentModule==="vehicle"?"vehicle:车辆黑名单":"person:人员黑名单"], [/新增白名单/, "vehicle:车辆白名单"],
    [/新增配置/, "alarm:告警配置"]
  ];
  const routed = titleRoutes.find(x=>x[0].test(title));
  return formSchemas[routed ? routed[1] : `${currentModule}:${tab}`] || Object.entries(formSchemas).find(([key])=>key.startsWith(currentModule+":"))?.[1];
}

function patrolFrequencyPanelHtml() {
  const count = patrolPlanFrequencyState.counts[patrolPlanFrequency] || 1;
  const countUnitMap = { "每天": "次 / 每天", "每周": "次 / 每周", "每月": "次 / 每月", "每季度": "次 / 每季度", "自定义": "次 / 自定义周期" };
  const countUnit = countUnitMap[patrolPlanFrequency] || "次";
  const tips = `<span class="patrol-frequency-tip"><b>Tips：</b>请在下方选择巡检任务的生成时间</span>`;
  const timeRange = (start = "", end = "", extra = "") => `<div class="patrol-task-time-row" data-patrol-time-row>
    <input class="control" type="time" value="${start}" aria-label="开始时间" title="开始时间" data-patrol-start-time>
    <span>—</span>
    <input class="control" type="time" value="${end}" aria-label="结束时间" title="结束时间" data-patrol-end-time>
    ${extra ? `<em>${extra}</em>` : ""}
    <small class="patrol-time-error"></small>
  </div>`;
  const sharedStartTime = (note = "") => `<div class="patrol-frequency-time patrol-shared-time">
    <label class="required">开始时间：</label>
    <div class="patrol-time-group">${timeRange("", "", note)}</div>
  </div>`;
  if (patrolPlanFrequency === "每周") {
    const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
    return `<div class="patrol-frequency-detail">
      <div class="patrol-frequency-count"><label class="required">巡检次数：</label><input class="control" type="number" min="1" max="7" value="${count}" data-patrol-frequency-count><span>${countUnit}</span>${tips}</div>
      <div class="patrol-weekdays">${weekdays.map(day => `<button type="button" class="${patrolPlanFrequencyState.weekdays.includes(day) ? "active" : ""}" data-patrol-weekday="${day}">${day}</button>`).join("")}</div>
      <small class="patrol-frequency-help">已选择 ${patrolPlanFrequencyState.weekdays.length} 天，需与巡检次数 ${count} 次保持一致。</small>
      <div class="patrol-frequency-time"><label class="required">时间段：</label><div class="patrol-time-group">${timeRange("10:10", "13:23")}</div></div>
    </div>`;
  }
  if (patrolPlanFrequency === "每月") {
    const days = Array.from({ length: 28 }, (_, index) => index + 1);
    return `<div class="patrol-frequency-detail">
      <div class="patrol-frequency-count"><label class="required">巡检次数：</label><input class="control" type="number" min="1" max="28" value="${count}" data-patrol-frequency-count><span>${countUnit}</span>${tips}</div>
      <div class="patrol-month-days">${days.map(day => `<button type="button" class="${patrolPlanFrequencyState.monthDays.includes(day) ? "active" : ""}" data-patrol-month-day="${day}">${day}</button>`).join("")}</div>
      <small class="patrol-frequency-help">已选择 ${patrolPlanFrequencyState.monthDays.length} 个日期，需与巡检次数 ${count} 次保持一致。</small>
      <div class="patrol-frequency-time"><label class="required">时间段：</label><div class="patrol-time-group">${timeRange()}</div></div>
    </div>`;
  }
  if (patrolPlanFrequency === "每季度") {
    const quarterMonthOptions = ["首月", "第二月", "第三月"];
    const dayOptions = Array.from({ length: 31 }, (_, index) => `${index + 1}号`);
    return `<div class="patrol-frequency-detail">
      <div class="patrol-frequency-count"><label class="required">巡检次数：</label><input class="control" type="number" min="1" max="12" value="${count}" data-patrol-frequency-count><span>${countUnit}</span>${tips}</div>
      <div class="patrol-quarter-anchors">
        ${patrolPlanFrequencyState.quarterAnchors.map((anchor, index) => `<div class="patrol-quarter-anchor">
          <select class="control" data-patrol-quarter-month="${index}">${quarterMonthOptions.map(item => `<option ${anchor.month === item ? "selected" : ""}>${item}</option>`).join("")}</select>
          <select class="control" data-patrol-quarter-day="${index}">${dayOptions.map(item => `<option ${anchor.day === item ? "selected" : ""}>${item}</option>`).join("")}</select>
        </div>`).join("")}
      </div>
      ${sharedStartTime("季度巡检的所有巡检共用一个任务开始时间")}
    </div>`;
  }
  if (patrolPlanFrequency === "自定义") {
    const selectedDates = patrolPlanFrequencyState.customDates.length ? patrolPlanFrequencyState.customDates : ["01-01"];
    const dateOptions = Array.from({ length: 12 }, (_, monthIndex) => {
      const month = `${monthIndex + 1}`.padStart(2, "0");
      return Array.from({ length: 31 }, (_, dayIndex) => `${month}-${`${dayIndex + 1}`.padStart(2, "0")}`);
    }).flat();
    return `<div class="patrol-frequency-detail">
      <div class="patrol-custom-dates">
        ${selectedDates.map((date, index) => `<div class="patrol-custom-date-row">
          <select class="control" data-patrol-custom-date="${index}">${dateOptions.map(item => `<option ${date === item ? "selected" : ""}>${item}</option>`).join("")}</select>
          ${selectedDates.length > 1 && index > 0 ? `<button type="button" class="btn text action-patrol-custom-date-delete" data-patrol-custom-date-delete="${index}">删除</button>` : ""}
        </div>`).join("")}
        <button type="button" class="patrol-custom-date-add action-patrol-custom-date-add">＋ 添加</button>
      </div>
      ${sharedStartTime("自定义巡检的所有巡检共用一个任务开始时间")}
    </div>`;
  }
  return `<div class="patrol-frequency-detail">
    <div class="patrol-frequency-count"><label class="required">巡检次数：</label><input class="control" type="number" min="1" max="8" value="${count}" data-patrol-frequency-count><span>${countUnit}</span>${tips}</div>
    <div class="patrol-daily-times">
      ${Array.from({ length: count }, () => timeRange()).join("")}
    </div>
  </div>`;
}

function rerenderPatrolFrequencyPanel() {
  const panel = document.querySelector("[data-patrol-frequency-panel]");
  if (panel) panel.innerHTML = patrolFrequencyPanelHtml();
}

function normalizePatrolPlanFrequencyState() {
  const weekdayOrder = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
  const weeklyCount = Math.min(7, Math.max(1, patrolPlanFrequencyState.counts["每周"] || 1));
  const monthlyCount = Math.min(28, Math.max(1, patrolPlanFrequencyState.counts["每月"] || 1));
  const quarterCount = Math.min(12, Math.max(1, patrolPlanFrequencyState.counts["每季度"] || 1));
  const fillWeekdays = weekdayOrder.filter(day => !patrolPlanFrequencyState.weekdays.includes(day)).slice(0, Math.max(0, weeklyCount - patrolPlanFrequencyState.weekdays.length));
  patrolPlanFrequencyState.weekdays = [...patrolPlanFrequencyState.weekdays, ...fillWeekdays].filter(day => weekdayOrder.includes(day)).slice(0, weeklyCount);
  const selectedMonthDays = patrolPlanFrequencyState.monthDays.filter(day => day >= 1 && day <= 28);
  const fillMonthDays = Array.from({ length: 28 }, (_, index) => index + 1).filter(day => !selectedMonthDays.includes(day)).slice(0, Math.max(0, monthlyCount - selectedMonthDays.length));
  patrolPlanFrequencyState.monthDays = [...selectedMonthDays, ...fillMonthDays].slice(0, monthlyCount);
  const quarterMonthOptions = ["首月", "第二月", "第三月"];
  const selectedQuarterAnchors = (patrolPlanFrequencyState.quarterAnchors || [])
    .map(anchor => ({
      month: quarterMonthOptions.includes(anchor?.month) ? anchor.month : "首月",
      day: /^([1-9]|[12]\d|3[01])号$/.test(anchor?.day || "") ? anchor.day : "1号"
    }))
    .slice(0, quarterCount);
  const fillQuarterAnchors = Array.from({ length: Math.max(0, quarterCount - selectedQuarterAnchors.length) }, () => ({ month: "首月", day: "1号" }));
  patrolPlanFrequencyState.quarterAnchors = [...selectedQuarterAnchors, ...fillQuarterAnchors];
  patrolPlanFrequencyState.customDates = (patrolPlanFrequencyState.customDates || []).filter(date => /^\d{2}-\d{2}$/.test(date));
  if (!patrolPlanFrequencyState.customDates.length) patrolPlanFrequencyState.customDates = ["01-01"];
}

function updatePatrolFrequencyCount(input) {
  const max = patrolPlanFrequency === "每周" ? 7 : patrolPlanFrequency === "每月" ? 28 : patrolPlanFrequency === "每季度" ? 12 : 8;
  const value = Math.min(max, Math.max(1, Number(input.value) || 1));
  patrolPlanFrequencyState.counts[patrolPlanFrequency] = value;
  normalizePatrolPlanFrequencyState();
  rerenderPatrolFrequencyPanel();
}

function validatePatrolTimeRows(requireAll = false) {
  let valid = true;
  const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;
  document.querySelectorAll("[data-patrol-time-row]").forEach(row => {
    const startInput = row.querySelector("[data-patrol-start-time]");
    const endInput = row.querySelector("[data-patrol-end-time]");
    const error = row.querySelector(".patrol-time-error");
    const start = startInput?.value || "";
    const end = endInput?.value || "";
    let message = "";
    if (requireAll && (!start || !end)) message = "请填写开始时间和结束时间";
    else if ((start || end) && (!start || !end)) message = "开始时间和结束时间需成对填写";
    else if ((start && !timePattern.test(start)) || (end && !timePattern.test(end))) message = "时间格式为 HH:mm";
    else if (start && end && end <= start) message = "结束时间需晚于开始时间";
    row.classList.toggle("invalid", !!message);
    if (error) error.textContent = message;
    if (message) valid = false;
  });
  return valid;
}

function patrolPlanFormHtml(editMode = false) {
  return `<div class="patrol-plan-form patrol-video-plan-form">
    <section class="form-section patrol-plan-section">
      <div class="form-grid patrol-plan-grid">
        <div class="form-field patrol-plan-compact-field">
          <label class="required">计划名称</label>
          <input class="control" value="${editMode ? "重点区域每日巡更" : ""}" placeholder="请输入计划名称">
        </div>
        <div class="form-field patrol-plan-compact-field">
          <label class="required">巡检路线</label>
          <select class="control">
            <option>园区主干道视频路线</option>
            <option>园区外围视频路线</option>
            <option>地下车库视频路线</option>
          </select>
        </div>
        <div class="form-field full">
          <label class="required">生效日期</label>
          <div class="patrol-date-range">
            <input class="control" type="text" value="2026/07/17" placeholder="年 / 月 / 日">
            <span>至</span>
            <input class="control" type="text" value="${editMode ? "2026/12/31" : ""}" data-patrol-plan-end-date placeholder="年 / 月 / 日">
            <label class="patrol-long-term"><input type="checkbox" data-patrol-plan-long-term ${editMode ? "" : "checked"}>长期</label>
          </div>
        </div>
        <div class="form-field full">
          <label class="required">巡检频率</label>
          <div class="patrol-frequency" role="radiogroup" aria-label="巡检频率">
            ${["每天", "每周", "每月"].map(item => `<label><input type="radio" name="patrolFrequency" value="${item}" data-patrol-frequency ${patrolPlanFrequency === item ? "checked" : ""}><span>${item}</span></label>`).join("")}
          </div>
        </div>
        <div class="form-field full" data-patrol-frequency-panel>${patrolFrequencyPanelHtml()}</div>
        <div class="form-field">
          <label class="required">是否开启</label>
          <label class="switch-control form-switch-control"><input type="checkbox" checked><span></span><b>启用</b></label>
        </div>
        <div class="form-field full">
          <label>备注</label>
          <textarea class="control" placeholder="请输入备注">${editMode ? "覆盖正门、围墙、仓储区等重点视频点位" : ""}</textarea>
        </div>
      </div>
    </section>
  </div>`;
}

function inspectionPlanFormHtml(editMode = false) {
  return `<div class="patrol-plan-form">
    <section class="form-section patrol-plan-section">
      <div class="patrol-plan-fields">
        <div class="patrol-plan-row">
          <label class="required">所属园区：</label>
          <select class="control"><option>请选择所属园区</option><option ${editMode ? "selected" : ""}>海尔西园区</option><option>微冷园区</option><option>三里园区</option></select>
        </div>
        <div class="patrol-plan-row">
          <label class="required">巡检计划名称：</label>
          <input class="control" value="${editMode ? "日常保洁巡检计划" : ""}" placeholder="请输入巡检任务名称">
        </div>
        <div class="patrol-plan-row patrol-plan-route-row">
          <label class="required">巡检路线：</label>
          <select class="control">
            <option>请选择巡检路线</option>
            <option ${editMode ? "selected" : ""}>黑龙江路主路线</option>
            <option>园区主干道视频路线</option>
            <option>园区外围视频路线</option>
            <option>地下车库视频路线</option>
          </select>
          <span class="patrol-route-duration">1天3小时30分钟</span>
          <em class="patrol-plan-side-tip">预估时间根据选择的巡检路线自动带出</em>
        </div>
        <div class="patrol-plan-row patrol-plan-date-row">
          <label class="required">生效日期：</label>
          <div class="patrol-date-range">
            <input class="control" type="date" value="${editMode ? "2025-07-01" : ""}" placeholder="选择开始日期">
            <span>—</span>
            <input class="control" type="date" value="${editMode ? "2025-09-30" : ""}" data-patrol-plan-end-date placeholder="选择结束日期">
            <label class="patrol-long-term"><input type="checkbox" data-patrol-plan-long-term ${editMode ? "" : ""}>长期</label>
          </div>
          <em class="patrol-plan-side-tip">勾选长期，结束时间置灰不用操作；时间格式：YYYYMMDD</em>
        </div>
        <div class="patrol-plan-row patrol-plan-frequency-row">
          <label class="required">巡检频率：</label>
          <div class="patrol-frequency" role="radiogroup" aria-label="巡检频率">
            ${["每天", "每周", "每月", "每季度", "自定义"].map(item => `<label><input type="radio" name="patrolFrequency" value="${item}" data-patrol-frequency ${patrolPlanFrequency === item ? "checked" : ""}><span>${item}</span></label>`).join("")}
          </div>
        </div>
        <div class="patrol-plan-row patrol-plan-frequency-panel-row">
          <label></label>
          <div data-patrol-frequency-panel>${patrolFrequencyPanelHtml()}</div>
          <em class="patrol-plan-side-tip">1、时间格式：HH:mm<br>2、选择任务开始时间后，结束时间根据路线的预估时间自动带出</em>
        </div>
        <div class="patrol-plan-row patrol-plan-status-row">
          <label class="required">计划状态：</label>
          <label class="switch-control form-switch-control"><input type="checkbox" checked><span></span></label>
        </div>
      </div>
    </section>
    <section class="form-section patrol-plan-section patrol-plan-executor-section">
      <div class="patrol-plan-row patrol-plan-executor-row">
        <label class="required">巡检执行人：</label>
        <select class="control"><option>请选择巡检执行人</option><option ${editMode ? "selected" : ""}>张三、李四、王五</option><option>张振新、闫卓宇</option><option>李浩、王涛</option></select>
        <em class="patrol-plan-side-tip">多选，这里可以多人共同执行一个巡检任务，支持快速搜索</em>
      </div>
      <div class="patrol-plan-row">
        <label></label>
        <em class="patrol-plan-side-tip patrol-plan-generate-tip">任务生成的时候，不能生成今天之前的任务；指定日期的个数，要和巡检次数相匹配，否则保存不成功。</em>
      </div>
    </section>
  </div>`;
}

function openPatrolPlanModal(editMode = false) {
  patrolPlanFrequency = "每天";
  patrolPlanFrequencyState = {
    counts: { "每天": 3, "每周": 3, "每月": 3 },
    weekdays: ["周一", "周三", "周五"],
    monthDays: [1, 15, 28],
    quarterAnchors: [
      { month: "首月", day: "1号" },
      { month: "首月", day: "1号" },
      { month: "首月", day: "1号" }
    ],
    customDates: ["01-01", "04-01"]
  };
  normalizePatrolPlanFrequencyState();
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("patrol-plan-drawer", "patrol-video-plan-drawer");
  document.querySelector("#drawer .drawer-head").innerHTML = `<div><span class="eyebrow">PATROL PLAN</span><h2 id="drawerTitle">${editMode ? "编辑计划" : "新增计划"}</h2></div><button class="close-btn" data-close="drawer">×</button>`;
  document.getElementById("drawerBody").innerHTML = patrolPlanFormHtml(editMode);
  const longTerm = document.querySelector("[data-patrol-plan-long-term]");
  const endDate = document.querySelector("[data-patrol-plan-end-date]");
  if (longTerm && endDate && longTerm.checked) {
    endDate.disabled = true;
    endDate.value = "";
  }
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary action-patrol-plan-save">保存</button>`;
  document.getElementById("drawerOverlay").classList.add("show");
}

function openInspectionPlanDrawer(editMode = false) {
  patrolPlanFrequency = "每天";
  patrolPlanFrequencyState = {
    counts: { "每天": 3, "每周": 3, "每月": 3, "每季度": 3, "自定义": 3 },
    weekdays: ["周一", "周三", "周五"],
    monthDays: [1, 15, 28],
    quarterAnchors: [
      { month: "首月", day: "1号" },
      { month: "首月", day: "1号" },
      { month: "首月", day: "1号" }
    ],
    customDates: ["01-01", "04-01"]
  };
  normalizePatrolPlanFrequencyState();
  resetMainDrawerChrome();
  const drawer = document.getElementById("drawer");
  drawer.classList.add("patrol-plan-drawer");
  document.querySelector("#drawer .drawer-head").innerHTML = `<div><span class="eyebrow">INSPECTION PLAN</span><h2 id="drawerTitle">${editMode ? "编辑巡检计划" : "新增巡检计划"}</h2></div><button class="close-btn" data-close="drawer">×</button>`;
  document.getElementById("drawerBody").innerHTML = inspectionPlanFormHtml(editMode);
  const longTerm = document.querySelector("[data-patrol-plan-long-term]");
  const endDate = document.querySelector("[data-patrol-plan-end-date]");
  if (longTerm && endDate && longTerm.checked) {
    endDate.disabled = true;
    endDate.value = "";
  }
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary action-inspection-plan-save">确定</button>`;
  document.getElementById("drawerOverlay").classList.add("show");
}

function inspectionTaskTempFormHtml(editMode = false) {
  return `<div class="inspection-task-temp-form">
    <div class="inspection-task-form-row">
      <label class="required">所属园区：</label>
      <select class="control"><option>请选择所属园区</option><option selected>微冷园区</option><option>海尔西园区</option><option>三里园区</option></select>
    </div>
    <div class="inspection-task-form-row">
      <label class="required">巡检任务名称：</label>
      <input class="control" value="${editMode ? "地下车库环境巡检（2026-07-21）" : ""}" placeholder="请输入巡检任务名称">
    </div>
    <div class="inspection-task-form-row inspection-task-route-row">
      <label class="required">巡检路线：</label>
      <select class="control"><option>请选择巡检路线</option><option selected>仓储区专项路线</option><option>A栋消防巡检路线</option><option>外围设施路线</option><option>地下车库路线</option></select>
      <b>3小时30分钟</b>
    </div>
    <div class="inspection-task-form-row inspection-task-time-row">
      <label class="required">任务开始时间：</label>
      <input class="control" value="${editMode ? "2026-07-21 14:00" : ""}" placeholder="选择开始时间">
      <em>YYYY-MM-DD HH:mm</em>
    </div>
    <div class="inspection-task-form-row inspection-task-time-row">
      <label class="required">任务结束时间：</label>
      <input class="control" value="${editMode ? "2026-07-21 17:30" : ""}" placeholder="任务结束时间" readonly>
      <em>根据路线的预估时间自动带出，不可修改</em>
    </div>
    <div class="inspection-task-form-row inspection-task-executor-row">
      <label class="required">巡检执行人：</label>
      <div class="inspection-task-executor-control">
        ${editMode ? `<span>李浩 <button type="button">×</button></span>` : ""}
        <span>闫卓宇 <button type="button">×</button></span>
        <span>王涛 <button type="button">×</button></span>
        <input placeholder="请选择巡检执行人">
      </div>
    </div>
    <div class="inspection-task-form-row inspection-task-note-row">
      <label></label>
      <em>多选，这里可以多人共同执行一个巡检任务，支持快速搜索</em>
    </div>
  </div>`;
}

function openInspectionTaskModal(editMode = false) {
  const modal = document.getElementById("modal");
  modal.className = "modal inspection-task-modal";
  modal.dataset.action = editMode ? "编辑巡检任务" : "新增临时任务";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = editMode ? "编辑巡检任务" : "新增临时任务";
  document.getElementById("modalBody").innerHTML = inspectionTaskTempFormHtml(editMode);
  document.getElementById("modalConfirm").textContent = editMode ? "保存" : "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function openInspectionTaskBatchModal(action) {
  const modal = document.getElementById("modal");
  const dangerous = action === "批量作废";
  modal.className = "modal inspection-task-batch-modal";
  modal.dataset.action = action;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = action;
  if (action === "批量转派") {
    document.getElementById("modalBody").innerHTML = `<div class="alert warning">请先勾选需要转派的巡检任务；仅未开始、待巡检、巡检中任务允许转派。</div>
      <div class="form-grid"><div class="form-field"><label class="required">转派至</label><select class="control"><option>请选择巡检执行人</option><option>张振新</option><option>闫卓宇</option><option>王涛</option><option>李浩</option></select></div>
      <div class="form-field full"><label>转派说明</label><textarea class="control" placeholder="请输入转派原因"></textarea></div></div>`;
  } else if (action === "批量修改巡检时间") {
    document.getElementById("modalBody").innerHTML = `<div class="alert warning">修改后任务结束时间仍按所选路线预估时长自动推算。</div>
      <div class="form-grid"><div class="form-field"><label class="required">计划开始巡检时间</label><input class="control" placeholder="YYYY-MM-DD HH:mm"></div>
      <div class="form-field"><label class="required">计划结束巡检时间</label><input class="control" placeholder="自动带出" readonly></div>
      <div class="form-field full"><label>修改说明</label><textarea class="control" placeholder="请输入修改原因"></textarea></div></div>`;
  } else {
    document.getElementById("modalBody").innerHTML = `<div class="alert danger">作废后任务不可继续执行；仅未开始、待巡检且未提交点位结果的任务允许作废。</div>
      <div class="field"><label>作废原因（必填）</label><textarea class="control" placeholder="请输入作废原因"></textarea></div>`;
  }
  document.getElementById("modalConfirm").textContent = dangerous ? "确认作废" : "确认";
  document.getElementById("modalOverlay").classList.add("show");
}

function renderFormField(field, editMode) {
  const [label,type,value,required,help,size] = field;
  const cls = `form-field ${size==="full"||type==="textarea"||type==="upload"||type==="choice"||type==="multiselect"?"full":""}`;
  const readonly = editMode && /编码|编号|统一社会信用代码/.test(label) ? "disabled" : "";
  let control = "";
  if(type==="select") control=`<select class="control" ${readonly}>${value.split("|").map(x=>`<option>${x}</option>`).join("")}</select>`;
  else if(type==="switch") control=`<label class="switch-control form-switch-control"><input type="checkbox" ${value !== "禁用" && value !== "停用" ? "checked" : ""} ${readonly}><span></span><b>${value !== "禁用" && value !== "停用" ? "启用" : "禁用"}</b></label>`;
  else if(type==="textarea") control=`<textarea class="control" ${readonly}>${editMode?value:""}</textarea>`;
  else if(type==="upload") control=`<div class="upload-box">＋ ${value}<small class="form-help">${editMode?"当前文件可预览或替换":"点击或拖拽文件至此区域"}</small></div>`;
  else if(type==="choice") control=`<div class="choice-box">${value.split("|").map((x,i)=>`<span class="choice-pill">${i<2?"✓ ":"＋ "}${x}</span>`).join("")}</div>`;
  else if(type==="multiselect") {
    const options = value.split("|");
    const selected = editMode ? options.slice(0,2).join("、") : "请选择标签";
    control=`<div class="multi-select-control" tabindex="0"><span>${selected}</span><b>⌄</b><div class="multi-select-menu">${options.map((x,i)=>`<label><input type="checkbox" ${editMode && i<2 ? "checked" : ""}>${x}</label>`).join("")}</div></div>`;
  }
  else control=`<input class="control" type="${type==="number"?"number":"text"}" value="${editMode?value:""}" placeholder="${value}" ${readonly}>`;
  return `<div class="${cls}"><label class="${required?"required":""}">${label}</label>${control}${help && help!=="full"?`<small class="form-help">${help}</small>`:""}</div>`;
}

function renderSchemaForm(schema, editMode) {
  if(!schema) return `<div class="alert warning">该页面为查询或业务处置页面，文档未定义新增/编辑表单。</div>`;
  return `${schema.tip?`<div class="alert warning">ⓘ ${schema.tip}</div>`:""}${schema.sections.map(section=>`<section class="form-section"><h3 class="form-section-title">${section[0]}</h3><div class="form-grid">${section[1].map(f=>renderFormField(f,editMode)).join("")}</div></section>`).join("")}<small style="color:var(--danger)">* 为必填字段；关键字段保存后将记录操作日志。</small>`;
}

function accessPersonAuthorizeFilteredPersons() {
  const keyword = accessPersonPermissionAuthState.personKeyword.trim().toLowerCase();
  if (!keyword) return accessPersonTargets;
  return accessPersonTargets.filter(row => `${row[0]} ${row[1]} ${row[2]} ${row[3]}`.toLowerCase().includes(keyword));
}

function accessPersonAuthorizeSelectedRows() {
  return accessPersonTargets.filter(row => accessPersonPermissionAuthState.personCodes.has(row[1]));
}

function accessPersonAuthorizeSinglePersonHtml() {
  const person = accessPersonTargets.find(row => accessPersonPermissionAuthState.personCodes.has(row[1]));
  if (!person) return `<div class="access-device-empty-table">未找到人员信息</div>`;
  return `<div class="access-person-auth-single">
    <div><label>姓名</label><b>${person[0]}</b></div>
    <div><label>人员编号</label><b>${person[1]}</b></div>
    <div><label>所属企业</label><b>${person[2]}</b></div>
    <div><label>所属部门</label><b>${person[3]}</b></div>
    <div><label>员工类型</label><b>${person[4]}</b></div>
    <div><label>人员状态</label><b>${person[5]}</b></div>
  </div>`;
}

function accessPersonAuthorizePersonTableHtml() {
  const rows = accessPersonAuthorizeFilteredPersons();
  const allChecked = rows.length > 0 && rows.every(row => accessPersonPermissionAuthState.personCodes.has(row[1]));
  return `<table class="access-auth-target-table access-auth-person-table">
    <thead><tr><th><input type="checkbox" data-access-person-auth-check-all aria-label="全选当前人员" ${allChecked ? "checked" : ""}></th><th>姓名</th><th>人员编号</th><th>所属企业 / 部门</th><th>员工类型</th><th>人员状态</th></tr></thead>
    <tbody>${rows.length ? rows.map(row => `<tr>
      <td><input type="checkbox" data-access-person-auth-target="${row[1]}" ${accessPersonPermissionAuthState.personCodes.has(row[1]) ? "checked" : ""}></td>
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td><div class="two-line-cell"><b>${row[2]}</b><span>${row[3]}</span></div></td>
      <td>${row[4]}</td>
      <td>${tag(row[5])}</td>
    </tr>`).join("") : `<tr><td colspan="6"><div class="access-device-empty-table">暂无符合条件的人员</div></td></tr>`}</tbody>
  </table>`;
}

function accessPersonAuthorizeModalHtml() {
  const selectedPeople = accessPersonAuthorizeSelectedRows();
  const selectedGroups = [...accessPersonPermissionAuthState.groupNames];
  const isSingle = accessPersonPermissionAuthState.mode === "single";
  const groupOptions = accessPermissionGroups.filter(group => group.status === "启用").map(group => {
    const checked = accessPersonPermissionAuthState.groupNames.has(group.name);
    return `<label class="access-dept-select-option ${checked ? "selected" : ""}">
      <input type="checkbox" data-access-person-group-check value="${group.name}" ${checked ? "checked" : ""}>
      <span><b>${group.name}</b><em>${group.timePeriod} / ${group.deviceCount} 台设备 / ${group.status}</em></span>
    </label>`;
  }).join("");
  return `<div class="access-person-auth-form">
    <section class="access-auth-section">
      <div class="form-grid">
        <div class="form-field full">
          <label class="required">选择权限组</label>
          <div class="access-dept-multiselect" data-access-person-group-multiselect>
            <button type="button" class="access-dept-select-trigger" data-access-person-group-toggle>
              <span data-access-person-group-summary>${selectedGroups.length ? `已选择 ${selectedGroups.length} 个权限组` : "请选择权限组"}</span>
              <b>⌄</b>
            </button>
            <div class="access-dept-select-chips" data-access-person-group-chips>
              ${selectedGroups.length ? selectedGroups.map(name => `<span>${name}</span>`).join("") : `<span class="muted">暂未选择权限组</span>`}
            </div>
            <div class="access-dept-select-panel">${groupOptions}</div>
          </div>
        </div>
        <div class="form-field full access-auth-period-field">
          <label class="required">有效期</label>
          <div class="access-auth-period-row">
            <div class="date-range-control access-auth-date-range">
              <input class="control" value="2026-07-15" placeholder="开始日期" ${accessPersonPermissionAuthState.longTerm ? "disabled" : ""}>
              <span>至</span>
              <input class="control" value="2026-12-31" placeholder="结束日期" ${accessPersonPermissionAuthState.longTerm ? "disabled" : ""}>
            </div>
            <label class="access-auth-long-term"><input type="checkbox" data-access-person-long-term ${accessPersonPermissionAuthState.longTerm ? "checked" : ""}>长期</label>
          </div>
        </div>
      </div>
    </section>
    <section class="access-auth-section">
      <div class="access-auth-section-head">
        <div><h3>${isSingle ? "人员信息" : "批量选择人员"}</h3><span>${isSingle ? "当前授权人员" : `已选人员：${selectedPeople.length}`}</span></div>
      </div>
      ${isSingle ? accessPersonAuthorizeSinglePersonHtml() : `
      <div class="access-auth-filter">
        <div class="field"><label>姓名/编号</label><input class="control" value="${accessPersonPermissionAuthState.personKeyword}" data-access-person-auth-keyword placeholder="请输入姓名 / 人员编号"></div>
        <div class="filter-actions"><button type="button" class="btn action-access-person-auth-query">查询</button><button type="button" class="btn action-access-person-auth-reset">重置</button></div>
      </div>
      <div class="access-auth-selected">
        ${selectedPeople.length ? selectedPeople.map(row => `<span>${row[0]} / ${row[1]}</span>`).join("") : `<span class="muted">暂未选择人员</span>`}
      </div>
      <div class="table-wrap access-auth-table-wrap">${accessPersonAuthorizePersonTableHtml()}</div>
      `}
    </section>
  </div>`;
}

function rerenderAccessPersonAuthorizeModal() {
  const modal = document.getElementById("modal");
  if (!modal || modal.dataset.action !== "按人员授权") return;
  document.getElementById("modalBody").innerHTML = accessPersonAuthorizeModalHtml();
}

function openAccessPersonAuthorizeModal(personCode = "") {
  accessPersonPermissionAuthState = {
    groupNames: new Set(),
    personCodes: new Set(personCode ? [personCode] : []),
    personKeyword: "",
    mode: personCode ? "single" : "batch",
    longTerm: false
  };
  const modal = document.getElementById("modal");
  modal.className = "modal access-person-auth-modal";
  modal.dataset.action = "按人员授权";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = personCode ? "个人授权" : "按人员授权";
  document.getElementById("modalBody").innerHTML = accessPersonAuthorizeModalHtml();
  document.getElementById("modalConfirm").textContent = "确认授权";
  document.getElementById("modalOverlay").classList.add("show");
}

function openAccessDepartmentGroupModal() {
  const department = selectedAccessDepartment();
  if (!department) {
    toast("请先选择部门，再新增权限组");
    return;
  }
  const modal = document.getElementById("modal");
  modal.className = "modal access-dept-group-modal";
  modal.dataset.action = "部门新增权限组";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "新增权限组";
  const selectedNames = new Set((accessDepartmentAuthRows[department.key] || []).map(row => row[0]));
  const selectedLabels = accessPermissionGroups.filter(group => selectedNames.has(group.name)).map(group => group.name);
  const options = accessPermissionGroups.map(group => {
    const checked = selectedNames.has(group.name);
    return `<label class="access-dept-select-option ${checked ? "selected" : ""}">
      <input type="checkbox" data-access-dept-group-check value="${group.name}" ${checked ? "checked" : ""}>
      <span><b>${group.name}</b><em>${group.timePeriod} / ${group.deviceCount} 台设备 / ${group.status}</em></span>
    </label>`;
  }).join("");
  document.getElementById("modalBody").innerHTML = `<div class="access-dept-group-form">
    <div class="alert warning">权限组保存后作用于当前部门在职人员，人员变动时按部门授权关系同步权限。</div>
    <div class="access-dept-modal-summary">
      <div><label>目标部门</label><b>${department.label}</b></div>
      <div><label>所属企业</label><b>${department.enterprise}</b></div>
      <div><label>在职人数</label><b>${department.peopleCount} 人</b></div>
    </div>
    <div class="form-field full">
      <label class="required">选择权限组</label>
      <div class="access-dept-multiselect" data-access-dept-multiselect>
        <button type="button" class="access-dept-select-trigger" data-access-dept-select-toggle>
          <span data-access-dept-select-summary>${selectedLabels.length ? `已选择 ${selectedLabels.length} 个权限组` : "请选择权限组"}</span>
          <b>⌄</b>
        </button>
        <div class="access-dept-select-chips" data-access-dept-selected-chips>
          ${selectedLabels.length ? selectedLabels.map(name => `<span>${name}</span>`).join("") : `<span class="muted">暂未选择权限组</span>`}
        </div>
        <div class="access-dept-select-panel">${options}</div>
      </div>
    </div>
  </div>`;
  document.getElementById("modalConfirm").textContent = "确认";
  document.getElementById("modalOverlay").classList.add("show");
}

function openAccessPermissionIssueTipModal() {
  stopAccessIssueProgress();
  const modal = document.getElementById("modal");
  modal.className = "modal access-issue-tip-modal";
  modal.dataset.action = "权限下发提示";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
  document.getElementById("modalTitle").textContent = "权限下发提示";
  document.getElementById("modalBody").innerHTML = `<div class="access-issue-tip">
    <div class="access-issue-progress-row">
      <label>权限下发进度：</label>
      <div class="access-issue-progress"><span data-access-issue-progress-bar style="width:30%"><b data-access-issue-progress-text>30%</b></span></div>
    </div>
    <div class="access-issue-notice" data-access-issue-notice>
      <div class="access-issue-notice-icon">i</div>
      <div>
        <p data-access-issue-message>权限正在下发，完成后您可在“权限下发管理”页面查询命令执行结果</p>
        <button type="button" class="table-link action-access-issue-jump">跳转</button>
      </div>
    </div>
  </div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
  startAccessIssueProgress();
}

function stopAccessIssueProgress() {
  if (accessIssueProgressTimer) {
    clearInterval(accessIssueProgressTimer);
    accessIssueProgressTimer = null;
  }
}

function updateAccessIssueProgress(progress) {
  const bar = document.querySelector("[data-access-issue-progress-bar]");
  const text = document.querySelector("[data-access-issue-progress-text]");
  const message = document.querySelector("[data-access-issue-message]");
  const notice = document.querySelector("[data-access-issue-notice]");
  if (!bar || !text) return;
  bar.style.width = `${progress}%`;
  text.textContent = `${progress}%`;
  if (progress >= 100) {
    notice?.classList.add("done");
    if (message) message.textContent = "权限下发已完成，您可在“权限下发管理”页面查询命令执行结果";
  }
}

function startAccessIssueProgress() {
  let progress = 30;
  updateAccessIssueProgress(progress);
  accessIssueProgressTimer = setInterval(() => {
    progress = Math.min(100, progress + (progress < 70 ? 10 : 5));
    updateAccessIssueProgress(progress);
    if (progress >= 100) stopAccessIssueProgress();
  }, 500);
}

function syncAccessDepartmentGroupSelect() {
  const wrapper = document.querySelector("[data-access-dept-multiselect]");
  if (!wrapper) return;
  const checked = [...wrapper.querySelectorAll("[data-access-dept-group-check]:checked")].map(item => item.value);
  const summary = wrapper.querySelector("[data-access-dept-select-summary]");
  const chips = wrapper.querySelector("[data-access-dept-selected-chips]");
  if (summary) summary.textContent = checked.length ? `已选择 ${checked.length} 个权限组` : "请选择权限组";
  if (chips) chips.innerHTML = checked.length ? checked.map(name => `<span>${name}</span>`).join("") : `<span class="muted">暂未选择权限组</span>`;
  wrapper.querySelectorAll(".access-dept-select-option").forEach(option => {
    const input = option.querySelector("[data-access-dept-group-check]");
    option.classList.toggle("selected", !!input?.checked);
  });
}

function openAccessPermissionGroupModal(editMode = false, groupName = "主楼门禁组") {
  const group = editMode ? accessPermissionGroupByName(groupName) : { name: "", timePeriod: "工作日通行", status: "启用", remark: "" };
  const modal = document.getElementById("modal");
  modal.className = "modal access-group-modal";
  modal.dataset.action = editMode ? "编辑权限组" : "新增权限组";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = editMode ? "编辑权限组" : "新增权限组";
  document.getElementById("modalBody").innerHTML = `<div class="access-group-form">
    <div class="form-grid">
      <div class="form-field">
        <label class="required">权限组名称</label>
        <input class="control" value="${group.name}" placeholder="请输入权限组名称">
      </div>
      <div class="form-field">
        <label class="required">通行时间段</label>
        <select class="control">
          ${["工作日通行","全天通行","节假日值守","临时施工通行"].map(item=>`<option ${item===group.timePeriod?"selected":""}>${item}</option>`).join("")}
        </select>
      </div>
      <div class="form-field full">
        <label>状态</label>
        <label class="switch-control access-group-switch">
          <input type="checkbox" ${group.status !== "停用" ? "checked" : ""}>
          <span></span>
          <b>${group.status !== "停用" ? "启用" : "停用"}</b>
        </label>
      </div>
      <div class="form-field full">
        <label>备注</label>
        <textarea class="control" placeholder="请输入备注">${group.remark || ""}</textarea>
      </div>
    </div>
  </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function accessGroupSelectedDeviceCodes(group) {
  return new Set(group.devices.map(item => item[1]));
}

function accessGroupAddSelectedDevices() {
  const group = accessPermissionGroupByName(accessDevicePickerState.groupName);
  const existingCodes = accessGroupSelectedDeviceCodes(group);
  const selectedDevices = accessControlDevices.filter(device => accessDevicePickerState.selectedCodes.has(device[1]) && !existingCodes.has(device[1]));
  selectedDevices.forEach(device => {
    group.devices.push([device[0], device[1], device[3], device[2], "2026-07-15 10:00"]);
  });
  group.deviceCount = Number(group.deviceCount || 0) + selectedDevices.length;
  return selectedDevices.length;
}

function accessDeviceFilteredDevices() {
  const keyword = accessDevicePickerState.keyword.trim().toLowerCase();
  if (!keyword) return accessControlDevices;
  return accessControlDevices.filter(device => `${device[0]} ${device[1]}`.toLowerCase().includes(keyword));
}

function accessDevicePaginationHtml(total, totalPages) {
  const current = accessDevicePickerState.currentPage;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return `<div class="access-device-pagination">
    <span>共 ${total} 项数据</span>
    <select class="control" disabled><option>${accessDevicePickerState.pageSize}条/页</option></select>
    <button class="page-btn" data-access-device-page="prev" ${current === 1 ? "disabled" : ""}>‹</button>
    ${pages.map(page => `<button class="page-btn ${page === current ? "active" : ""}" data-access-device-page="${page}">${page}</button>`).join("")}
    <button class="page-btn" data-access-device-page="next" ${current === totalPages ? "disabled" : ""}>›</button>
    <span>前往</span><input class="control" value="${current}" data-access-device-jump><span>页</span>
  </div>`;
}

function accessGroupDeviceDrawerHtml(group) {
  const selectedCodes = accessDevicePickerState.selectedCodes;
  const relatedCodes = accessGroupSelectedDeviceCodes(group);
  const selectedDevices = accessControlDevices.filter(device => selectedCodes.has(device[1]));
  const filteredDevices = accessDeviceFilteredDevices();
  const totalPages = Math.max(1, Math.ceil(filteredDevices.length / accessDevicePickerState.pageSize));
  if (accessDevicePickerState.currentPage > totalPages) accessDevicePickerState.currentPage = totalPages;
  const start = (accessDevicePickerState.currentPage - 1) * accessDevicePickerState.pageSize;
  const pageDevices = filteredDevices.slice(start, start + accessDevicePickerState.pageSize);
  const selectablePageDevices = pageDevices.filter(device => !relatedCodes.has(device[1]));
  const pageChecked = selectablePageDevices.length > 0 && selectablePageDevices.every(device => selectedCodes.has(device[1]));
  return `<div class="access-device-drawer">
    <div class="access-device-selected">
      <div class="access-device-selected-head">
        <b>已选设备 <span>(${selectedDevices.length})</span></b>
        <small>本次仅选择新增关联设备，已关联设备不可重复选择</small>
      </div>
      <div class="access-device-chip-list">
        ${selectedDevices.length ? selectedDevices.map(device => `<span class="access-device-chip"><span class="access-device-chip-text"><b>${device[0]}</b><small>${device[1]}</small></span><button type="button" data-access-device-remove="${device[1]}" aria-label="移除${device[0]}">×</button></span>`).join("") : `<span class="access-device-empty">暂未选择设备</span>`}
      </div>
    </div>
    <div class="access-device-main">
      <div class="access-device-toolbar">
        <div class="access-device-toolbar-left">
          <span class="tag primary">设备类型：门禁类设备</span>
          <span class="muted">默认展示全部门禁类设备</span>
        </div>
        <div class="access-device-search">
          <input class="control" value="${accessDevicePickerState.keyword}" data-access-device-keyword placeholder="设备名称 / 设备编码">
          <button class="btn primary action-access-device-query">查询</button>
          <button class="btn action-access-device-reset">重置</button>
        </div>
      </div>
      <div class="table-wrap access-device-table-wrap">
        <table class="access-device-picker-table">
          <thead><tr><th><input type="checkbox" data-access-device-check-page aria-label="全选当前页设备" ${pageChecked ? "checked" : ""} ${selectablePageDevices.length ? "" : "disabled"}></th><th>设备名称</th><th>设备编码</th><th>在线状态</th><th>设备位置</th></tr></thead>
          <tbody>${pageDevices.length ? pageDevices.map(device => {
            const related = relatedCodes.has(device[1]);
            return `<tr class="${related ? "access-device-related-row" : ""}">
            <td><input type="checkbox" data-access-device-check="${device[1]}" ${selectedCodes.has(device[1]) ? "checked" : ""} ${related ? "disabled" : ""}></td>
            <td>${device[0]}${related ? `<span class="tag default access-device-related-tag">已关联</span>` : ""}</td>
            <td>${device[1]}</td>
            <td>${tag(device[2])}</td>
            <td>${device[3]}</td>
          </tr>`;
          }).join("") : `<tr><td colspan="5"><div class="access-device-empty-table">暂无符合条件的门禁设备</div></td></tr>`}</tbody>
        </table>
      </div>
      ${accessDevicePaginationHtml(filteredDevices.length, totalPages)}
    </div>
  </div>`;
}

function openAccessGroupDevicesDrawer(groupName, options = {}) {
  const group = accessPermissionGroupByName(groupName);
  const layer = options.layer || "main";
  accessDevicePickerState = {
    groupName: group.name,
    selectedCodes: new Set(),
    currentPage: 1,
    pageSize: 6,
    keyword: "",
    layer
  };
  if (layer === "sub") {
    const subDrawer = document.querySelector("#subDrawerOverlay .subdrawer");
    subDrawer.classList.add("access-device-relation-drawer", "wide");
    document.querySelector("#subDrawerOverlay .drawer-head .eyebrow").textContent = "SECURITY";
    document.querySelector("#subDrawerOverlay .drawer-head h2").textContent = `${group.name} / 新增关联设备`;
    document.getElementById("subDrawerBody").innerHTML = accessGroupDeviceDrawerHtml(group);
    document.querySelector("#subDrawerOverlay .drawer-foot").innerHTML = `<button class="btn" data-close="subDrawer">取消</button><button class="btn primary action-access-device-save">确定</button>`;
    document.getElementById("subDrawerOverlay").classList.add("show");
    return;
  }
  const drawer = document.getElementById("drawer");
  drawer.classList.add("property-drawer", "access-device-relation-drawer");
  document.querySelector("#drawer .drawer-head").classList.add("property-drawer-head");
  document.querySelector("#drawer .drawer-body").classList.add("property-drawer-body");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "SECURITY";
  document.getElementById("drawerTitle").textContent = `${group.name} / 新增关联设备`;
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = accessGroupDeviceDrawerHtml(group);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary action-access-device-save">确定</button>`;
  drawer.classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function rerenderAccessDeviceDrawer() {
  const body = accessDevicePickerState.layer === "sub" ? document.getElementById("subDrawerBody") : document.getElementById("drawerBody");
  if (!body) return;
  if (accessDevicePickerState.layer !== "sub" && !document.getElementById("drawer")?.classList.contains("access-device-relation-drawer")) return;
  if (accessDevicePickerState.layer === "sub" && !document.querySelector("#subDrawerOverlay .subdrawer")?.classList.contains("access-device-relation-drawer")) return;
  body.innerHTML = accessGroupDeviceDrawerHtml(accessPermissionGroupByName(accessDevicePickerState.groupName));
}

function accessAuthorizeSelectedRows() {
  if (accessAuthorizeState.mode === "department") {
    return accessDepartmentTargets.filter(row => accessAuthorizeState.departments.has(row[0]));
  }
  return accessPersonTargets.filter(row => accessAuthorizeState.persons.has(row[1]));
}

function accessAuthorizeFilteredDepartments() {
  const keyword = accessAuthorizeState.departmentKeyword.trim().toLowerCase();
  if (!keyword) return accessDepartmentTargets;
  return accessDepartmentTargets.filter(row => row[0].toLowerCase().includes(keyword));
}

function accessAuthorizeFilteredPersons() {
  const keyword = accessAuthorizeState.personKeyword.trim().toLowerCase();
  if (!keyword) return accessPersonTargets;
  return accessPersonTargets.filter(row => `${row[0]} ${row[1]}`.toLowerCase().includes(keyword));
}

function accessAuthorizeFilterHtml() {
  if (accessAuthorizeState.mode === "department") {
    return `<div class="access-auth-filter">
      <div class="field"><label>部门名称</label><input class="control" value="${accessAuthorizeState.departmentKeyword}" data-access-auth-department-keyword placeholder="请输入部门名称"></div>
      <div class="filter-actions"><button class="btn action-access-auth-query">查询</button><button class="btn action-access-auth-reset">重置</button></div>
    </div>`;
  }
  return `<div class="access-auth-filter">
    <div class="field"><label>姓名/编号</label><input class="control" value="${accessAuthorizeState.personKeyword}" data-access-auth-person-keyword placeholder="请输入姓名 / 人员编号"></div>
    <div class="filter-actions"><button class="btn action-access-auth-query">查询</button><button class="btn action-access-auth-reset">重置</button></div>
  </div>`;
}

function accessAuthorizeTargetTableHtml() {
  if (accessAuthorizeState.mode === "department") {
    const rows = accessAuthorizeFilteredDepartments();
    const allChecked = rows.length > 0 && rows.every(row => accessAuthorizeState.departments.has(row[0]));
    return `<table class="access-auth-target-table access-auth-department-table">
      <thead><tr><th><input type="checkbox" data-access-auth-check-all aria-label="全选部门" ${allChecked ? "checked" : ""}></th><th>部门名称</th><th>所属企业</th><th>在职人数</th><th>说明</th></tr></thead>
      <tbody>${rows.length ? rows.map(row => `<tr>
        <td><input type="checkbox" data-access-auth-target="${row[0]}" ${accessAuthorizeState.departments.has(row[0]) ? "checked" : ""}></td>
        <td>${row[0]}</td><td>${row[1]}</td><td>${row[2]} 人</td><td>${row[3]}</td>
      </tr>`).join("") : `<tr><td colspan="5"><div class="access-device-empty-table">暂无符合条件的部门</div></td></tr>`}</tbody>
    </table>`;
  }
  const rows = accessAuthorizeFilteredPersons();
  const allChecked = rows.length > 0 && rows.every(row => accessAuthorizeState.persons.has(row[1]));
  return `<table class="access-auth-target-table access-auth-person-table">
    <thead><tr><th><input type="checkbox" data-access-auth-check-all aria-label="全选人员" ${allChecked ? "checked" : ""}></th><th>姓名</th><th>人员编号</th><th>所属企业 / 部门</th><th>员工类型</th><th>人员状态</th></tr></thead>
    <tbody>${rows.length ? rows.map(row => `<tr>
      <td><input type="checkbox" data-access-auth-target="${row[1]}" ${accessAuthorizeState.persons.has(row[1]) ? "checked" : ""}></td>
      <td>${row[0]}</td><td>${row[1]}</td><td><div class="two-line-cell"><b>${row[2]}</b><span>${row[3]}</span></div></td><td>${row[4]}</td><td>${tag(row[5])}</td>
    </tr>`).join("") : `<tr><td colspan="6"><div class="access-device-empty-table">暂无符合条件的人员</div></td></tr>`}</tbody>
  </table>`;
}

function accessAuthorizeDrawerHtml(group) {
  const selectedRows = accessAuthorizeSelectedRows();
  const selectedLabel = accessAuthorizeState.mode === "department" ? "已选部门" : "已选人员";
  return `<div class="access-auth-drawer">
    <section class="access-auth-summary">
      <div><label>目标权限组</label><b>${group.name}</b></div>
      <div><label>关联设备</label><b>${group.deviceCount} 台</b></div>
      <div><label>通行时间段</label><b>${group.timePeriod}</b></div>
    </section>
    <section class="access-auth-section">
      <div class="access-auth-section-head access-auth-main-head">
        <div>
          <h3>${accessAuthorizeState.mode === "department" ? "选择部门" : "选择人员"}</h3>
          <span>${selectedLabel}：${selectedRows.length}</span>
        </div>
        <div class="access-auth-mode access-auth-mode-inline">
          ${[["department","按部门授权"],["person","按人员授权"]].map(item => `<button type="button" class="${accessAuthorizeState.mode === item[0] ? "active" : ""}" data-access-auth-mode="${item[0]}"><b>${item[1]}</b></button>`).join("")}
        </div>
      </div>
      ${accessAuthorizeFilterHtml()}
      <div class="access-auth-selected">
        ${selectedRows.length ? selectedRows.map(row => `<span>${accessAuthorizeState.mode === "department" ? row[0] : `${row[0]} / ${row[1]}`}</span>`).join("") : `<span class="muted">暂未选择${accessAuthorizeState.mode === "department" ? "部门" : "人员"}</span>`}
      </div>
      <div class="table-wrap access-auth-table-wrap">${accessAuthorizeTargetTableHtml()}</div>
    </section>
  </div>`;
}

function rerenderAccessAuthorizeDrawer() {
  const body = document.getElementById("drawerBody");
  if (!body || !document.getElementById("drawer")?.classList.contains("access-authorize-drawer")) return;
  body.innerHTML = accessAuthorizeDrawerHtml(accessPermissionGroupByName(accessAuthorizeState.groupName));
}

function openAccessGroupAuthorizeDrawer(groupName) {
  const group = accessPermissionGroupByName(groupName);
  accessAuthorizeState = {
    groupName: group.name,
    mode: "department",
    departments: new Set(),
    persons: new Set(),
    departmentKeyword: "",
    personKeyword: ""
  };
  const drawer = document.getElementById("drawer");
  drawer.classList.add("property-drawer", "access-authorize-drawer");
  document.querySelector("#drawer .drawer-head").classList.add("property-drawer-head");
  document.querySelector("#drawer .drawer-body").classList.add("property-drawer-body");
  document.querySelector("#drawer .drawer-head .eyebrow").textContent = "SECURITY";
  document.getElementById("drawerTitle").textContent = `${group.name} / 授权`;
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = accessAuthorizeDrawerHtml(group);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary action-access-authorize-save">确定</button>`;
  drawer.classList.add("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function openPersonFormDrawer(editMode=false) {
  const schema = formSchemas["person:人员档案"];
  document.getElementById("drawerTitle").textContent = editMode ? "编辑人员" : "新增人员";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = `<div class="person-form-drawer">${renderSchemaForm(schema, editMode)}</div>`;
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">取消</button><button class="btn primary action-person-save">保存</button>`;
  document.getElementById("drawer").classList.remove("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function findPersonDetail(name, code) {
  const archiveRow = tableConfigs.person.rows.find(row => row[0] === name && row[1] === code);
  if (archiveRow) {
    const [gender, phone] = String(archiveRow[2]).split("|");
    const [department, position] = String(archiveRow[6]).split("|");
    return {
      name: archiveRow[0], code: archiveRow[1], gender, phone,
      employeeType: archiveRow[3], status: archiveRow[4], enterprise: archiveRow[5],
      department, position, certificateType: "身份证", certificateNo: "3702********1836",
      email: `${archiveRow[1].toLowerCase()}@weilengpark.com`, face: archiveRow[0].slice(0, 1)
    };
  }
  const resigned = getTabConfig("person", "已离职人员").rows.find(row => row[0] === name && row[1] === code);
  if (resigned) {
    const [gender, phone] = String(resigned[2]).split("|");
    const [department, position] = String(resigned[5]).split("|");
    return {
      name: resigned[0], code: resigned[1], gender, phone,
      employeeType: resigned[3], status: "已离职", enterprise: resigned[4],
      department, position, certificateType: "身份证", certificateNo: "3702********1836",
      email: `${resigned[1].toLowerCase()}@weilengpark.com`, face: resigned[0].slice(0, 1),
      resignedHandler: resigned[6], resignedTime: resigned[7], resignedReason: resigned[8]
    };
  }
  return null;
}

function personDetailInfoHtml(person) {
  const baseFields = [
    ["姓名", person.name], ["人员编号", person.code], ["性别", person.gender], ["联系方式", person.phone],
    ["员工类型", person.employeeType], ["人员状态", person.status], ["所属企业", person.enterprise],
    ["所属部门", person.department], ["岗位", person.position], ["证件类型", person.certificateType],
    ["证件号码", person.certificateNo], ["邮箱", person.email]
  ];
  const resignedFields = person.status === "已离职" ? [
    ["离职办理人", person.resignedHandler], ["离职时间", person.resignedTime], ["离职原因", person.resignedReason]
  ] : [];
  return `<div class="person-detail-drawer">
    <section class="person-profile-head">
      <div>
        <span class="eyebrow">PERSON PROFILE</span>
        <h3>${person.name}-${person.code}</h3>
        <p>${person.enterprise} / ${person.department} / ${person.position}</p>
      </div>
      ${tag(person.status)}
    </section>
    <section class="person-profile-band">
      <div class="person-face-photo"><span>${person.face}</span></div>
      <div class="person-profile-summary">
        <div><label>联系方式</label><b>${person.phone}</b></div>
        <div><label>员工类型</label><b>${person.employeeType}</b></div>
        <div><label>所属企业</label><b>${person.enterprise}</b></div>
        <div><label>部门/岗位</label><b>${person.department} / ${person.position}</b></div>
      </div>
    </section>
    <section class="person-detail-section">
      <div class="person-detail-section-title"><b>人员基本信息</b><span>人脸照片用于门禁识别、通行记录核验和移动端采集结果回写。</span></div>
      <div class="person-detail-grid">
        ${baseFields.map(([label,value])=>`<div><label>${label}</label><span>${value || "-"}</span></div>`).join("")}
        ${resignedFields.map(([label,value])=>`<div><label>${label}</label><span>${value || "-"}</span></div>`).join("")}
      </div>
    </section>
  </div>`;
}

function openPersonDetailDrawer(name, code) {
  const person = findPersonDetail(name, code);
  if (!person) {
    toast("未找到人员详情");
    return;
  }
  resetMainDrawerChrome();
  document.getElementById("drawerTitle").textContent = "人员信息详情";
  document.getElementById("drawerTabs").innerHTML = "";
  document.getElementById("drawerBody").innerHTML = personDetailInfoHtml(person);
  document.getElementById("drawerFoot").innerHTML = `<button class="btn" data-close="drawer">关闭</button>`;
  document.getElementById("drawer").classList.remove("wide");
  document.getElementById("drawerOverlay").classList.add("show");
}

function personBlacklistInfoHtml(person) {
  if (!person) {
    return `<div class="blacklist-person-empty">选择人员后自动带出人脸照片、人员信息和关联车辆。</div>`;
  }
  const vehicles = person.vehicles.length ? person.vehicles : ["无关联车辆"];
  const vehicleHtml = vehicles.map(vehicle => `<span class="${vehicle==="无关联车辆"?"muted":""}">${vehicle}</span>`).join("");
  return `<div class="blacklist-person-card">
    <div class="blacklist-face">${person.face}</div>
    <div class="blacklist-person-fields">
      <div><label>姓名</label><input class="control" value="${person.name}" readonly></div>
      <div><label>人员编号</label><input class="control" value="${person.code}" readonly></div>
      <div><label>性别</label><input class="control" value="${person.gender}" readonly></div>
      <div><label>联系方式</label><input class="control" value="${person.phone}" readonly></div>
      <div><label>所属企业</label><input class="control" value="${person.enterprise}" readonly></div>
      <div><label>所属部门</label><input class="control" value="${person.department}" readonly></div>
    </div>
    <div class="blacklist-vehicle-panel">
      <b>关联车辆</b>
      <div class="blacklist-vehicle-list">${vehicleHtml}</div>
      <small>${person.vehicles.length ? "加入黑名单后将同步限制关联车辆通行，保存前请确认处置范围。" : "该人员暂无关联车辆，不产生车辆同步限制。"}</small>
    </div>
  </div>`;
}

function toDatetimeLocalValue(value) {
  return String(value || "").trim().replace(" ", "T");
}

function parseBlacklistTimeRange(rangeText) {
  const [start = "", end = ""] = String(rangeText || "").split(" 至 ");
  return { start: toDatetimeLocalValue(start), end: toDatetimeLocalValue(end) };
}

function personBlacklistFormHtml(options = {}) {
  const selectedCode = options.selectedCode || "";
  const selected = personBlacklistByCode(selectedCode);
  const isEdit = options.mode === "edit";
  const timeRange = parseBlacklistTimeRange(options.timeRange);
  const startValue = timeRange.start || "2026-06-10T00:00";
  const endValue = timeRange.end || "2026-12-31T23:59";
  const reason = options.reason || "";
  return `<div class="person-blacklist-form">
    ${isEdit ? `<div class="alert warning">编辑黑名单仅允许调整生效时间、拉黑原因和关联车辆同步限制，不允许变更拉黑人员。</div>` : ""}
    <section class="person-blacklist-section">
      <h3>拉黑信息</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">${isEdit ? "拉黑人员" : "选择人员"}</label>
          <select class="control" data-person-blacklist-select ${isEdit ? "disabled" : ""}>
            <option value="">请选择人员</option>
            ${blacklistPeople.map(item=>`<option value="${item.code}" ${item.code===selectedCode?"selected":""}>${item.name}（${item.code}）</option>`).join("")}
          </select>
          <small class="form-help">${isEdit ? "黑名单记录创建后不可修改拉黑人员。" : "选择人员后自动带出人脸照片、基础信息和关联车辆。"}</small>
        </div>
        <div class="form-field">
          <label class="required">生效时间</label>
          <div class="date-range-control">
            <input class="control" type="datetime-local" value="${startValue}">
            <span>至</span>
            <input class="control" type="datetime-local" value="${endValue}">
          </div>
        </div>
        <div class="form-field full" id="personBlacklistInfo">${personBlacklistInfoHtml(selected)}</div>
        <div class="form-field full">
          <label class="required">拉黑原因</label>
          <textarea class="control" placeholder="请输入拉黑原因，需说明限制通行的具体依据">${reason}</textarea>
        </div>
        <div class="form-field full">
          <label class="switch-control">
            <input type="checkbox" checked>
            <span></span>
            <b>同步限制关联车辆通行</b>
          </label>
          <small class="form-help">仅对当前人员已绑定车辆生效；无关联车辆时不生成车辆限制记录。</small>
        </div>
      </div>
    </section>
  </div>`;
}

function updatePersonBlacklistInfo(code) {
  const target = document.getElementById("personBlacklistInfo");
  if (target) target.innerHTML = personBlacklistInfoHtml(personBlacklistByCode(code));
}

function openPersonBlacklistModal(options = {}) {
  const isEdit = options.mode === "edit";
  const modal = document.getElementById("modal");
  modal.className = "modal person-blacklist-modal";
  modal.dataset.action = isEdit ? "编辑人员黑名单" : "新增人员黑名单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = isEdit ? "编辑黑名单" : "新增黑名单";
  document.getElementById("modalBody").innerHTML = personBlacklistFormHtml(options);
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openPersonImportModal() {
  document.getElementById("modal").className = "modal person-import-modal";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "批量导入人员";
  document.getElementById("modalBody").innerHTML = `
    <div class="person-import">
      <div class="alert warning">请先下载标准模板，上传文件完成校验后再执行导入。</div>
      <section class="person-import-step">
        <div><b>1. 下载模板</b><span>模板字段需与人员档案字段保持一致。</span></div>
        <button class="btn action-template-download">下载模版</button>
      </section>
      <section class="person-import-step">
        <div><b>2. 上传并校验</b><span>支持 .xlsx 文件，系统校验人员编号、必填项和证件号码格式。</span></div>
        <div class="upload-box">＋ 上传检验文件<small class="form-help">上传后展示校验通过、失败和待修正数量</small></div>
      </section>
      <section class="person-import-result">
        <b>校验结果</b>
        <div><span>待导入 128 条</span><span>校验通过 126 条</span><span class="danger-text">失败 2 条</span></div>
        <small>失败明细需下载修正后重新上传；仅校验通过的数据允许导入。</small>
      </section>
    </div>`;
  document.getElementById("modalConfirm").textContent = "上传检验后导入";
  document.getElementById("modalOverlay").classList.add("show");
}

function mobileFacePerson() {
  return tableConfigs.person.rows.find(row => row[1] === mobileFaceState.personCode) || tableConfigs.person.rows[0];
}

function mobileFaceMiniProgramHtml(person) {
  const step = mobileFaceState.step;
  const agreed = mobileFaceState.agreed ? "checked" : "";
  const canStart = mobileFaceState.agreed ? "" : "disabled";
  if (step === "capturing") {
    return `<section class="face-phone mini-program">
      <div class="face-phone-status"><span>10:30</span><span>5G</span><span>100%</span></div>
      <div class="face-phone-nav"><span>‹</span><b>人脸识别</b><em>小程序</em></div>
      <h3>请正对屏幕<br>保持光线充足</h3>
      <div class="face-scan-frame scanning">
        <div class="scan-corner corner-a"></div><div class="scan-corner corner-b"></div>
        <div class="scan-corner corner-c"></div><div class="scan-corner corner-d"></div>
        <div class="face-scan-circle"><span></span></div>
        <i></i>
      </div>
      <button class="action-face-capture-done">完成采集</button>
    </section>`;
  }
  if (step === "success" || step === "synced") {
    return `<section class="face-phone mini-program">
      <div class="face-phone-status"><span>10:30</span><span>5G</span><span>100%</span></div>
      <div class="face-phone-nav"><span>‹</span><b>人脸识别</b><em>小程序</em></div>
      <h3>园区人脸<br>采集成功</h3>
      <div class="face-success-ring">
        <div class="face-avatar"><strong>${person[0].slice(0,1)}</strong><small>${person[0]}</small></div>
      </div>
      <button class="action-face-retake">更新人脸</button>
    </section>`;
  }
  return `<section class="face-phone mini-program">
    <div class="face-phone-status"><span>10:30</span><span>5G</span><span>100%</span></div>
    <div class="face-phone-nav"><span>‹</span><b>人脸识别</b><em>小程序</em></div>
    <h3>开启园区<br>AI 刷脸通行</h3>
    <div class="face-scan-frame">
      <div class="scan-corner corner-a"></div><div class="scan-corner corner-b"></div>
      <div class="scan-corner corner-c"></div><div class="scan-corner corner-d"></div>
      <div class="face-scan-circle"><span></span></div>
    </div>
    <button class="action-face-start" ${canStart}>开始人脸识别</button>
    <label><input type="checkbox" class="action-face-agree" ${agreed}> 我已阅读并同意《用户协议》</label>
  </section>`;
}

function renderMobileFaceCollectBody() {
  const person = mobileFacePerson();
  document.getElementById("modalBody").innerHTML = `<div class="mobile-face-collect"><div class="mobile-face-stage">${mobileFaceMiniProgramHtml(person)}</div></div>`;
}

function openVisitorMobilePreviewModal() {
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  modal.className = "modal visitor-mobile-preview-modal";
  modal.dataset.action = "访客移动端模拟";
  document.getElementById("modalTitle").textContent = "访客管理移动端模拟";
  document.getElementById("modalBody").innerHTML = `<iframe class="visitor-mobile-preview-frame" src="visitor-mobile.html" title="访客管理移动端模拟"></iframe>`;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
  document.getElementById("modalConfirm").textContent = "关闭";
  overlay.classList.add("show");
}

function openMobileFaceCollectModal() {
  mobileFaceState = { step: "draft", personCode: mobileFaceState.personCode || "P20260018", agreed: true };
  const modal = document.getElementById("modal");
  modal.className = "modal mobile-face-modal";
  modal.dataset.action = "移动端采集人脸";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
  document.getElementById("modalTitle").textContent = "移动端采集人脸";
  renderMobileFaceCollectBody();
  document.getElementById("modalConfirm").textContent = "关闭";
  document.getElementById("modalOverlay").classList.add("show");
}

function accessTimePeriodFormHtml(editMode = false) {
  const nameValue = editMode ? "工作日通行" : "";
  const remarkValue = editMode ? "办公区工作日通行" : "";
  const weekdayOptions = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const repeatValue = editMode ? "法定工作日" : "自定义";
  const customCycleVisible = repeatValue === "自定义";
  return `
    <div class="access-time-period-form">
      <section class="access-time-section">
        <h3>基础信息</h3>
        <div class="form-grid">
          <div class="form-field">
            <label class="required">名称</label>
            <input class="control" value="${nameValue}" placeholder="请输入时间段名称">
          </div>
          <div class="form-field">
            <label class="required">重复周期</label>
            <select class="control" data-access-repeat-cycle>
              ${["执行一次","每天","法定工作日","法定节假日","自定义"].map(option=>`<option ${option === repeatValue ? "selected" : ""}>${option}</option>`).join("")}
            </select>
          </div>
          <div class="form-field full access-custom-cycle-field" ${customCycleVisible ? "" : "hidden"}>
            <label class="required">自定义周期</label>
            <div class="access-weekday-options">
              ${weekdayOptions.map((day,index)=>`<label><input type="checkbox" ${index < 5 ? "checked" : ""}> ${day}</label>`).join("")}
            </div>
          </div>
        </div>
      </section>
      <section class="access-time-section">
        <div class="access-time-section-head">
          <h3>时间段配置</h3>
          <button class="btn access-time-add-row" type="button">新增时间段</button>
        </div>
        <div class="access-time-rows">
          <div class="access-time-row access-time-row-fixed">
            <span>1</span>
            <div><label class="required">开始时间</label><input class="control" type="time" value="${editMode ? "08:00" : "09:00"}"></div>
            <div><label class="required">结束时间</label><input class="control" type="time" value="${editMode ? "18:00" : "18:00"}"></div>
          </div>
        </div>
        <small class="form-help">支持配置多个通行时间段；同一时间段内开始时间必须早于结束时间，多个时间段不可重叠。</small>
      </section>
      <section class="access-time-section">
        <h3>备注</h3>
        <textarea class="control" placeholder="请输入备注">${remarkValue}</textarea>
      </section>
    </div>`;
}

function syncAccessCustomCycleField() {
  const repeatCycle = document.querySelector("[data-access-repeat-cycle]");
  const customCycle = document.querySelector(".access-custom-cycle-field");
  if (repeatCycle && customCycle) customCycle.hidden = repeatCycle.value !== "自定义";
}

function openAccessTimePeriodModal(editMode = false) {
  const modal = document.getElementById("modal");
  modal.className = "modal access-time-period-modal";
  modal.dataset.action = editMode ? "编辑通行时间段" : "新增通行时间段";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = editMode ? "编辑时间段" : "新增时间段";
  document.getElementById("modalBody").innerHTML = accessTimePeriodFormHtml(editMode);
  syncAccessCustomCycleField();
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function renderScheduleAdjustFields(type = "请假顶班") {
  const adjustTypeOptions = ["请假顶班", "人员调班", "队长请假"].map(option => `<option ${option === type ? "selected" : ""}>${option}</option>`).join("");
  const securityOptions = ["张振新", "李浩", "闫卓宇", "王涛", "陈航", "孙凯"].map(name => `<option>${name}</option>`).join("");
  const month = String(scheduleCalendarState.month).padStart(2, "0");
  const defaultDate = `${scheduleCalendarState.year}-${month}-21`;
  if (type === "队长请假") {
    return `<div class="form-grid schedule-adjust-grid">
      <div class="form-field"><label class="required">调整日期</label><input class="control" type="date" value="${defaultDate}"></div>
      <div class="form-field"><label class="required">调整类型</label><select class="control" data-schedule-adjust-type>${adjustTypeOptions}</select></div>
      <div class="form-field"><label class="required">队长</label><select class="control"><option selected>钱队</option></select></div>
      <div class="form-field full"><label class="required">备注</label><textarea class="control" placeholder="请输入队长请假原因">队长请假，当日不安排顶替。</textarea></div>
    </div>`;
  }
  if (type === "人员调班") {
    return `<div class="form-grid schedule-adjust-grid">
      <div class="form-field"><label class="required">调整日期</label><input class="control" type="date" value="${defaultDate}"></div>
      <div class="form-field"><label class="required">调整类型</label><select class="control" data-schedule-adjust-type>${adjustTypeOptions}</select></div>
      <div class="form-field"><label class="required">调班人员</label><select class="control">${securityOptions}</select></div>
      <div class="form-field"><label class="required">互换日期</label><input class="control" type="date" value="${scheduleCalendarState.year}-${month}-24"></div>
      <div class="form-field"><label class="required">互换人员</label><select class="control">${securityOptions}</select></div>
      <div class="form-field full"><label class="required">备注</label><textarea class="control" placeholder="请输入调班原因">双方调班，保存后按最终排班记录考勤。</textarea></div>
    </div>`;
  }
  return `<div class="form-grid schedule-adjust-grid">
    <div class="form-field"><label class="required">调整日期</label><input class="control" type="date" value="${defaultDate}"></div>
    <div class="form-field"><label class="required">调整类型</label><select class="control" data-schedule-adjust-type>${adjustTypeOptions}</select></div>
    <div class="form-field"><label class="required">请假人员</label><select class="control">${securityOptions}</select></div>
    <div class="form-field"><label class="required">顶班人员</label><select class="control">${securityOptions}</select></div>
    <div class="form-field full"><label class="required">备注</label><textarea class="control" placeholder="请输入请假和顶班原因">请假顶班为一次性调整，不影响原轮转节奏。</textarea></div>
  </div>`;
}

function renderScheduleAssignFields(dateValue = "") {
  const month = String(scheduleCalendarState.month).padStart(2, "0");
  const defaultDate = dateValue || `${scheduleCalendarState.year}-${month}-01`;
  const securityOptions = ["张振新", "李浩", "闫卓宇", "王涛", "陈航", "孙凯"].map(name => `<option>${name}</option>`).join("");
  return `<div class="form-grid schedule-adjust-grid">
    <div class="form-field"><label class="required">排班日期</label><input class="control" type="date" value="${defaultDate}"></div>
    <div class="form-field"><label class="required">安保人员1</label><select class="control">${securityOptions}</select></div>
    <div class="form-field"><label class="required">安保人员2</label><select class="control">${securityOptions}</select></div>
    <div class="form-field"><label class="required">队长</label><select class="control"><option selected>钱队</option></select></div>
    <div class="form-field full"><label>备注</label><textarea class="control" placeholder="请输入排班说明">为未排班日期设置当日值班人员。</textarea></div>
  </div>`;
}

function openScheduleAdjustModal(defaultType = "请假顶班") {
  const modal = document.getElementById("modal");
  const type = defaultType === "队长请假" ? "队长请假" : "请假顶班";
  modal.className = "modal schedule-adjust-modal";
  modal.dataset.action = "排班调整";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "排班调整";
  document.getElementById("modalBody").innerHTML = `<div class="alert warning">ⓘ 保存后直接体现在排班日历；调整明细在“修改记录”中留痕。</div>${renderScheduleAdjustFields(type)}`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openScheduleAssignModal(dateValue = "") {
  const modal = document.getElementById("modal");
  modal.className = "modal schedule-adjust-modal";
  modal.dataset.action = "设置排班";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "设置排班";
  document.getElementById("modalBody").innerHTML = `<div class="alert warning">ⓘ 当前日期尚未排班，保存后生成该日排班；如需调整已排日期，请点击具体人员。</div>${renderScheduleAssignFields(dateValue)}`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openModal(title,type="form") {
  if (currentModule === "schedule" && title === "设置排班") {
    openScheduleAssignModal();
    return;
  }
  if (currentModule === "alarm" && (currentTab.alarm || "告警配置") === "巡检工单" && title === "派单") {
    openAlarmInspectionWorkorderDispatchModal();
    return;
  }
  if (currentModule === "alarm" && (currentTab.alarm || "告警配置") === "安防工单" && (title === "派单" || title === "换人")) {
    openSecurityWorkorderDispatchModal(title);
    return;
  }
  if (currentModule === "schedule" && (title === "排班调整" || title === "队长请假")) {
    openScheduleAdjustModal(title);
    return;
  }
  if (currentModule === "patrol" && (currentTab.patrol || "视频巡检路线") === "巡检计划" && /新增计划|编辑|修改/.test(title)) {
    openPatrolPlanModal(/^编辑|修改/.test(title));
    return;
  }
  if (currentModule === "inspection" && (currentTab.inspection || "巡检点") === "巡检计划" && /新增计划|编辑|修改/.test(title)) {
    openInspectionPlanDrawer(/^编辑|修改/.test(title));
    return;
  }
  if (currentModule === "inspection" && (currentTab.inspection || "巡检点") === "巡检任务" && type === "form" && /临时任务|巡检任务/.test(title)) {
    openInspectionTaskModal(/^编辑|修改/.test(title));
    return;
  }
  if (currentModule === "person" && (currentTab.person || "人员档案") === "人员黑名单" && title.includes("新增黑名单")) {
    openPersonBlacklistModal();
    return;
  }
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = title;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent=title;
  const danger=/删除|离职|关闭|停用|作废|驳回|误报|恢复默认|解除拉黑/.test(title);
  const business=/告警|工单|审批|处置|发卡|绑定|发布|放行|核验|调整|请假/.test(title);
  if (type === "form" && /巡检点/.test(title) && !danger) {
    modal.classList.add("inspection-point-modal");
  }
  if (title === "审批通过") {
    document.getElementById("modalBody").innerHTML = `<div class="alert warning"><b>业务操作确认</b><br>${modalTip(title)}</div>`;
  } else if (title === "审批拒绝" || title === "审批驳回") {
    document.getElementById("modalBody").innerHTML = `<div class="alert danger"><b>请确认高风险操作</b><br>${modalTip(title)}</div><div class="field"><label>拒绝原因（必填）</label><textarea class="control" placeholder="请输入拒绝原因"></textarea></div>`;
  } else if (title === "无权限车辆放行" || title === "特殊车辆出场核验") {
    modal.className = "modal vehicle-release-modal";
    modal.dataset.action = "无权限车辆放行";
    document.getElementById("modalTitle").textContent = title === "特殊车辆出场核验" ? "特殊车辆出场核验" : title;
    document.getElementById("modalBody").innerHTML = `<div class="vehicle-release-form">
      <div class="vehicle-release-readonly">
        <div><label>车牌号</label><b>鲁B·L8899</b></div>
        <div><label>出入口</label><b>南出口</b></div>
        <div><label>通过时间</label><b>2026-06-16 10:46:22</b></div>
        <div><label>权限状态</label><b>特殊车辆出场待核验</b></div>
      </div>
      <div class="form-grid">
        <div class="form-field"><label class="required">车辆类型</label><select class="control" data-release-type><option selected>特殊车辆</option><option>临时车辆</option></select></div>
        <div class="form-field"><label class="required">出场原因</label><select class="control" data-release-reason><option>货物配送完成</option><option>退货出场</option><option>临时转运</option><option>其他</option></select></div>
        <div class="form-field"><label class="required">现场照片</label><div class="vehicle-photo-capture" data-special-release-photos><div class="vehicle-photo-actions"><label class="vehicle-photo-source"><input type="file" accept="image/*" capture="environment" multiple data-release-photo-input="camera"><span>打开摄像头</span><b>拍摄现场照片</b></label><label class="vehicle-photo-source"><input type="file" accept="image/*" multiple data-release-photo-input="album"><span>打开相册上传</span><b>可选择多张照片</b></label></div><div class="vehicle-photo-list" data-release-photo-list></div></div><small class="form-help">特殊车辆出场必须留存现场照片；摄像头和相册上传均支持累计多张。</small></div>
        <div class="form-field full"><label class="required">放行备注</label><textarea class="control" data-release-remark placeholder="请输入核验依据和放行原因">现场核验无异常，登记后放行</textarea></div>
      </div>
    </div>`;
    document.getElementById("modalConfirm").textContent = "确认放行";
  } else if (currentModule === "patrol" && (currentTab.patrol || "视频巡检路线") === "视频巡检" && title === "提报异常") {
    modal.className = "modal patrol-abnormal-modal";
    document.getElementById("modalTitle").textContent = "异常提报";
    document.getElementById("modalBody").innerHTML = `<div class="patrol-abnormal-form">
      <div class="patrol-abnormal-row">
        <label>实时截图</label>
        <div class="patrol-shot-list">
          <div class="patrol-shot-thumb"><button type="button">×</button><span>围墙监控-03</span></div>
          <button class="patrol-shot-capture" type="button"><span>▣</span><b>点击抓拍</b></button>
        </div>
      </div>
      <div class="patrol-abnormal-row">
        <label class="required">异常描述</label>
        <textarea class="control" placeholder="请输入异常描述">发现围墙北侧有人员长时间徘徊，请复核现场情况。</textarea>
      </div>
    </div>`;
    document.getElementById("modalConfirm").textContent = "提交";
  } else if (currentModule === "patrol" && (currentTab.patrol || "视频巡检路线") === "视频巡检" && title === "完成点位") {
    modal.className = "modal patrol-point-complete-modal";
    document.getElementById("modalTitle").textContent = "标记完成";
    document.getElementById("modalBody").innerHTML = `<div class="confirm-message">确认将当前点位标记完成吗？</div>`;
    document.getElementById("modalConfirm").textContent = "确定";
  } else if (currentModule === "patrol" && (currentTab.patrol || "视频巡检路线") === "视频巡检" && (title === "完成巡检任务" || title === "完成巡更任务")) {
    modal.className = "modal patrol-complete-modal";
    document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
    document.getElementById("modalTitle").textContent = "巡检结果确认";
    document.getElementById("modalBody").innerHTML = `<div class="patrol-complete-confirm">
      <div class="patrol-complete-icon">✓</div>
      <h3>巡检任务已完成</h3>
      <div class="patrol-complete-table">
        <div><label>任务名称</label><b>7月巡检计划-周巡检3.4_20260626</b></div>
        <div><label>巡检人</label><b>闫卓宇</b></div>
        <div><label>异常发现</label><b class="danger-inline">1 个</b></div>
        <div><label>开始时间</label><b>2026-06-26 15:24:00</b></div>
        <div><label>结束时间</label><b>2026-07-17 15:24:00</b></div>
      </div>
    </div>`;
    document.getElementById("modalConfirm").textContent = "确定";
  } else {
    document.getElementById("modalBody").innerHTML = type==="confirm" || danger ? `<div class="alert ${danger?"danger":"warning"}"><b>${danger?"请确认高风险操作":"业务操作确认"}</b><br>${modalTip(title)}</div><div class="field"><label>操作说明 ${danger?"（必填）":""}</label><textarea class="control" placeholder="请输入本次操作说明"></textarea></div>`
    : renderSchemaForm(resolveFormSchema(title),/^编辑|修改/.test(title));
    document.getElementById("modalConfirm").textContent = business ? "确认提交" : danger ? "确认操作" : "保存";
  }
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleBatchAuthModal() {
  const modal = document.getElementById("modal");
  const selectedPlates = vehicleManagementRows.filter(row => selectedVehicleIds.has(row.plate)).map(row => row.plate);
  modal.className = "modal vehicle-auth-modal";
  modal.dataset.action = "车辆批量授权";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "车辆批量授权";
  document.getElementById("modalBody").innerHTML = `<div class="vehicle-auth-form">
    <section class="vehicle-auth-selected-top">
      <div class="vehicle-auth-selected-head">已选车辆 <em>(${selectedPlates.length})</em></div>
      <div class="vehicle-auth-selected-body">
        ${selectedPlates.length ? selectedPlates.map(plate => `<span>${plate}</span>`).join("") : `<p>暂未选择车辆</p>`}
      </div>
    </section>
    <section class="vehicle-auth-section">
      <div class="vehicle-auth-validity">
        <label class="required">有效期</label>
        <div class="vehicle-auth-date-range">
          <input class="control" value="2026-07-15" placeholder="开始日期">
          <span>至</span>
          <input class="control" value="2026-12-31" placeholder="结束日期">
          <label class="vehicle-auth-long-term"><input type="checkbox"> 长期</label>
        </div>
      </div>
    </section>
    <section class="vehicle-auth-section">
      <h3>选择授权范围</h3>
      <div class="vehicle-auth-range-table">
        <table>
          <thead><tr><th>授权车场</th><th>授权出入口</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td><select class="control"><option>南侧广场车场</option><option>冷链物流车场</option><option>东门临时车场</option></select></td><td><select class="control"><option>南入口、南出口</option><option>南入口</option><option>南出口</option><option>全部出入口</option></select></td><td><button class="btn text danger action-vehicle-auth-range-delete" type="button">删除</button></td></tr>
            <tr><td><select class="control"><option>冷链物流车场</option><option>南侧广场车场</option><option>东门临时车场</option></select></td><td><select class="control"><option>货运入口、货运出口</option><option>货运入口</option><option>货运出口</option><option>全部出入口</option></select></td><td><button class="btn text danger action-vehicle-auth-range-delete" type="button">删除</button></td></tr>
          </tbody>
        </table>
        <button class="btn vehicle-auth-add-range" type="button">继续添加</button>
      </div>
    </section>
    <div class="alert">批量授权将覆盖所选车辆的授权有效期和授权范围，保存后需下发至边缘端。</div>
  </div>`;
  document.getElementById("modalConfirm").textContent = "确认授权";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleBlacklistModal(options = {}) {
  const editRow = options.plate ? vehicleBlacklistRowByPlate(options.plate) : null;
  const isEdit = Boolean(editRow);
  const isLongTerm = editRow?.endTime === "长期";
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-blacklist-modal";
  modal.dataset.action = isEdit ? "编辑车辆黑名单" : "新增车辆黑名单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = isEdit ? "编辑黑名单" : "新增黑名单";
  document.getElementById("modalBody").innerHTML = `<div class="vehicle-blacklist-form">
    <div class="alert ${isEdit ? "warning" : ""}">${isEdit ? "编辑黑名单可修改车主信息、有效期和禁行原因；保存后按新的有效期参与通行判断。" : "新增黑名单保存后按有效期生效；同一园区下同一车牌不能同时存在两条有效期重叠的黑名单记录。"}</div>
    <section class="vehicle-blacklist-section">
      <h3>车辆禁行策略</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">车牌号</label>
          <input class="control" data-vehicle-blacklist-plate value="${editRow?.plate || ""}" placeholder="请输入车牌号，如 鲁B·C1108" ${isEdit ? "readonly" : ""}>
          <small class="form-help">${isEdit ? "车牌号作为策略对象，编辑时不可变更。" : "保存前需校验同一园区是否存在有效期重叠的黑名单记录。"}</small>
        </div>
        <div class="form-field">
          <label>车主姓名</label>
          <input class="control" data-vehicle-blacklist-owner value="${editRow?.ownerName || ""}" placeholder="请输入车主姓名">
        </div>
        <div class="form-field">
          <label>联系方式</label>
          <input class="control" data-vehicle-blacklist-phone value="${editRow?.ownerPhone || ""}" placeholder="请输入联系方式">
        </div>
        <div class="form-field full vehicle-blacklist-validity-field">
          <label class="required">有效期</label>
          <div class="vehicle-auth-date-range">
            <input class="control" data-vehicle-blacklist-start type="date" value="${vehicleBlacklistDateOnly(editRow?.startTime || "2026-07-16")}">
            <span>至</span>
            <input class="control" data-vehicle-blacklist-end type="date" value="${isLongTerm ? "" : vehicleBlacklistDateOnly(editRow?.endTime || "2026-12-31")}" ${isLongTerm ? "disabled" : ""}>
            <label class="vehicle-auth-long-term"><input type="checkbox" data-vehicle-blacklist-long-term ${isLongTerm ? "checked" : ""}> 长期</label>
          </div>
          <small class="form-help">有效期口径与车辆授权有效期一致；当前时间位于有效期内时，黑名单规则参与通行判断。</small>
        </div>
        <div class="form-field full">
          <label class="required">禁行原因</label>
          <textarea class="control" data-vehicle-blacklist-reason placeholder="请输入禁行原因，需说明限制通行的具体依据">${editRow?.reason || ""}</textarea>
          <small class="form-help">禁行原因用于岗亭值守、通行记录详情和安全审计展示，最多 500 字。</small>
        </div>
      </div>
    </section>
  </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleBlacklistDeleteModal(plate) {
  const row = vehicleBlacklistRowByPlate(plate);
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除车辆黑名单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除黑名单";
  document.getElementById("modalBody").innerHTML = `<div class="alert danger"><b>确认删除该黑名单策略？</b><br>车牌号：${row.plate}<br>删除后该策略不再影响通行判断，历史拦截记录保留。</div><div class="field"><label>删除原因（必填）</label><textarea class="control" placeholder="请输入删除原因"></textarea></div>`;
  document.getElementById("modalConfirm").textContent = "确认删除";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleWhitelistModal(options = {}) {
  const editRow = options.plate ? vehicleWhitelistRowByPlate(options.plate) : null;
  const isEdit = Boolean(editRow);
  const isLongTerm = editRow?.endTime === "长期";
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-whitelist-modal";
  modal.dataset.action = isEdit ? "编辑车辆白名单" : "新增车辆白名单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = isEdit ? "编辑白名单" : "新增白名单";
  document.getElementById("modalBody").innerHTML = `<div class="vehicle-whitelist-form">
    <div class="alert ${isEdit ? "warning" : ""}">${isEdit ? "编辑白名单可修改车主信息、有效期和放行原因；保存后系统按新的有效期自动判断状态。" : "新增白名单保存后按有效期自动判断状态；同一园区下同一车牌不能同时存在两条有效期重叠的白名单记录。"}</div>
    <section class="vehicle-whitelist-section">
      <h3>车辆放行策略</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">车牌号</label>
          <input class="control" data-vehicle-whitelist-plate value="${editRow?.plate || ""}" placeholder="请输入车牌号，如 鲁B·F918D" ${isEdit ? "readonly" : ""}>
          <small class="form-help">${isEdit ? "车牌号作为策略对象，编辑时不可变更。" : "保存前需校验同一园区是否存在有效期重叠的白名单记录。"}</small>
        </div>
        <div class="form-field">
          <label>车主姓名</label>
          <input class="control" data-vehicle-whitelist-owner value="${editRow?.ownerName || ""}" placeholder="请输入车主姓名">
        </div>
        <div class="form-field">
          <label>联系方式</label>
          <input class="control" data-vehicle-whitelist-phone value="${editRow?.ownerPhone || ""}" placeholder="请输入联系方式">
        </div>
        <div class="form-field full vehicle-whitelist-validity-field">
          <label class="required">有效期</label>
          <div class="vehicle-auth-date-range">
            <input class="control" data-vehicle-whitelist-start type="date" value="${vehicleBlacklistDateOnly(editRow?.startTime || "2026-07-16")}">
            <span>至</span>
            <input class="control" data-vehicle-whitelist-end type="date" value="${isLongTerm ? "" : vehicleBlacklistDateOnly(editRow?.endTime || "2026-12-31")}" ${isLongTerm ? "disabled" : ""}>
            <label class="vehicle-auth-long-term"><input type="checkbox" data-vehicle-whitelist-long-term ${isLongTerm ? "checked" : ""}> 长期</label>
          </div>
          <small class="form-help">有效期口径与车辆授权有效期一致；当前时间位于有效期内时，白名单规则参与通行判断。</small>
        </div>
        <div class="form-field full">
          <label class="required">放行原因</label>
          <textarea class="control" data-vehicle-whitelist-reason placeholder="请输入放行原因，需说明允许通行的业务依据">${editRow?.reason || ""}</textarea>
          <small class="form-help">放行原因用于岗亭值守、通行记录详情和安全审计展示，最多 500 字。</small>
        </div>
      </div>
    </section>
  </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleWhitelistDeleteModal(plate) {
  const row = vehicleWhitelistRowByPlate(plate);
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除车辆白名单";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除白名单";
  document.getElementById("modalBody").innerHTML = `<div class="alert danger"><b>确认删除该白名单策略？</b><br>车牌号：${row.plate}<br>删除后该策略不再参与自动放行判断，历史通行记录保留。</div><div class="field"><label>删除原因（必填）</label><textarea class="control" placeholder="请输入删除原因"></textarea></div>`;
  document.getElementById("modalConfirm").textContent = "确认删除";
  document.getElementById("modalOverlay").classList.add("show");
}

function openSpecialVehicleModal(options = {}) {
  const editRow = options.plate ? specialVehicleRowByPlate(options.plate) : null;
  const isEdit = Boolean(editRow);
  const modal = document.getElementById("modal");
  modal.className = "modal special-vehicle-modal";
  modal.dataset.action = isEdit ? "编辑特殊车辆" : "新增特殊车辆";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = isEdit ? "编辑特殊车辆" : "新增特殊车辆";
  document.getElementById("modalBody").innerHTML = `<div class="special-vehicle-form">
    <div class="alert warning">${isEdit ? "编辑特殊车辆仅调整登记资料和有效期；出场仍需门卫移动端拍照登记后手动放行。" : "新增后按有效期参与入场自动放行判断；出场不自动抬杆，必须由门卫移动端完成拍照和登记。"}</div>
    <section class="special-vehicle-section">
      <h3>车辆登记信息</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">车牌号</label>
          <input class="control" data-special-vehicle-plate value="${editRow?.plate || ""}" placeholder="请输入车牌号，如 鲁B·L8899" ${isEdit ? "readonly" : ""}>
          <small class="form-help">${isEdit ? "车牌号作为特殊车辆唯一标识，编辑时不可变更。" : "同一园区下车牌号不可重复；无牌临时物流车应由岗亭值守生成临时标识。"}</small>
        </div>
        <div class="form-field">
          <label class="required">所属单位</label>
          <input class="control" data-special-vehicle-unit value="${editRow?.unit || ""}" placeholder="请输入所属单位">
        </div>
        <div class="form-field">
          <label class="required">负责人</label>
          <input class="control" data-special-vehicle-owner value="${editRow?.ownerName || ""}" placeholder="请输入负责人">
        </div>
        <div class="form-field">
          <label class="required">联系方式</label>
          <input class="control" data-special-vehicle-phone value="${editRow?.ownerPhone || ""}" placeholder="请输入联系方式">
        </div>
        <div class="form-field full special-vehicle-validity-field">
          <label class="required">有效期</label>
          <div class="vehicle-auth-date-range">
            <input class="control" data-special-vehicle-start type="date" value="${editRow?.startDate || "2026-07-16"}">
            <span>至</span>
            <input class="control" data-special-vehicle-end type="date" value="${editRow?.endDate || "2026-12-31"}">
          </div>
          <small class="form-help">当前日期在有效期内时，特殊车辆入场自动放行；未到期或已过期时不参与自动放行。</small>
        </div>
        <div class="form-field full">
          <label>备注</label>
          <textarea class="control" data-special-vehicle-remark placeholder="请输入车辆用途、承运货物或核验说明">${editRow?.remark || ""}</textarea>
        </div>
      </div>
    </section>
  </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openSpecialVehicleToggleModal(plate, nextStatus) {
  const row = specialVehicleRowByPlate(plate);
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = `${nextStatus}特殊车辆`;
  modal.dataset.specialPlate = row.plate;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = `${nextStatus}特殊车辆`;
  document.getElementById("modalBody").innerHTML = `<div class="alert ${nextStatus === "停用" ? "danger" : "warning"}"><b>确认${nextStatus}该特殊车辆？</b><br>车牌号：${row.plate}<br>${nextStatus === "停用" ? "停用后该车不再享有入场自动放行权限；历史通行记录保留。" : "启用后在有效期内入场自动放行，出场仍需门卫移动端核验。"}</div><div class="field"><label>操作说明</label><textarea class="control" placeholder="请输入本次操作说明"></textarea></div>`;
  document.getElementById("modalConfirm").textContent = `确认${nextStatus}`;
  document.getElementById("modalOverlay").classList.add("show");
}

function openSpecialVehicleDeleteModal(plate) {
  const row = specialVehicleRowByPlate(plate);
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除特殊车辆";
  modal.dataset.specialPlate = row.plate;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除特殊车辆";
  document.getElementById("modalBody").innerHTML = `<div class="alert danger"><b>确认删除该特殊车辆登记？</b><br>车牌号：${row.plate}<br>删除后该车不再作为特殊车辆处理，历史入场自动放行和出场核验记录保留。</div><div class="field"><label>删除原因（必填）</label><textarea class="control" placeholder="请输入删除原因"></textarea></div>`;
  document.getElementById("modalConfirm").textContent = "确认删除";
  document.getElementById("modalOverlay").classList.add("show");
}

function vehicleBindablePeople() {
  const source = new Map();
  accessPersonTargets.forEach(([name, code, enterprise, department, type, status]) => {
    if (status === "在职") source.set(code, { name, code, enterprise, department, type, phone: "" });
  });
  vehicleManagementRows.forEach(row => {
    if (!source.has(row.personCode)) {
      source.set(row.personCode, {
        name: row.personName,
        code: row.personCode,
        enterprise: row.enterprise || "",
        department: row.department || "",
        type: "",
        phone: row.phone || ""
      });
    } else {
      source.get(row.personCode).phone = row.phone || source.get(row.personCode).phone;
    }
  });
  cardRows.forEach(row => {
    if (source.has(row.personCode) && row.phone) source.get(row.personCode).phone = row.phone;
  });
  Object.values(cardPeople).forEach(person => {
    if (source.has(person.code) && person.phone) source.get(person.code).phone = person.phone;
  });
  return [...source.values()];
}

function vehiclePersonByCode(code) {
  return vehicleBindablePeople().find(item => item.code === code) || null;
}

function vehicleManagementRowByPlate(plate) {
  return vehicleManagementRows.find(row => row.plate === plate) || vehicleManagementRows[0];
}

function vehiclePersonOptions(selectedCode = "") {
  return `<option value="">请选择绑定人员</option>${vehicleBindablePeople().map(item => `<option value="${item.code}" ${item.code === selectedCode ? "selected" : ""}>${item.name} / ${item.code}</option>`).join("")}`;
}

function updateVehiclePersonFields(code) {
  const person = vehiclePersonByCode(code) || { phone: "", enterprise: "", department: "" };
  const map = {
    "[data-vehicle-person-phone]": person.phone,
    "[data-vehicle-person-enterprise]": person.enterprise,
    "[data-vehicle-person-department]": person.department
  };
  Object.entries(map).forEach(([selector, value]) => {
    const input = document.querySelector(selector);
    if (input) input.value = value || "";
  });
}

function openVehicleCreateModal(options = {}) {
  const editRow = options.plate ? vehicleManagementRowByPlate(options.plate) : null;
  const isEdit = Boolean(editRow);
  const defaultPerson = vehiclePersonByCode(editRow?.personCode || "P20260042") || vehicleBindablePeople()[0] || {};
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-create-modal";
  modal.dataset.action = isEdit ? "修改车辆" : "新增车辆";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = isEdit ? "修改车辆" : "新增车辆";
  document.getElementById("modalBody").innerHTML = `<div class="vehicle-create-form">
    <div class="alert">${isEdit ? "修改车辆仅调整车辆档案和绑定人员信息，不变更既有通行授权。" : "新增车辆仅建立车辆与人员的绑定关系，不生成车辆通行授权；保存后授权状态默认为“未配置”。"}</div>
    <section class="vehicle-create-section">
      <h3>车辆信息</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">车牌号</label>
          <input class="control" data-vehicle-plate value="${editRow?.plate || ""}" placeholder="请输入车牌号，如 鲁B·A726Q" ${isEdit ? "readonly" : ""}>
          <small class="form-help">${isEdit ? "车牌号作为车辆唯一标识，修改时不允许变更。" : "同一园区内车牌号唯一；已绑定车辆再次新增时应阻断。"}</small>
        </div>
        <div class="form-field">
          <label>车辆品牌</label>
          <input class="control" value="${editRow?.brand || ""}" placeholder="请输入车辆品牌">
        </div>
        <div class="form-field">
          <label>车辆颜色</label>
          <input class="control" value="${editRow?.color || ""}" placeholder="请输入车辆颜色">
        </div>
      </div>
    </section>
    <section class="vehicle-create-section">
      <h3>绑定人员</h3>
      <div class="form-grid">
        <div class="form-field full">
          <label class="required">绑定人员</label>
          <select class="control" data-vehicle-person-select>${vehiclePersonOptions(defaultPerson.code || "")}</select>
          <small class="form-help">同一车牌只允许绑定一名人员；同一人员可绑定多辆车。</small>
        </div>
        <div class="form-field"><label>联系方式</label><input class="control" data-vehicle-person-phone value="${defaultPerson.phone || ""}" readonly></div>
        <div class="form-field"><label>所属企业</label><input class="control" data-vehicle-person-enterprise value="${defaultPerson.enterprise || ""}" readonly></div>
        <div class="form-field"><label>所属部门</label><input class="control" data-vehicle-person-department value="${defaultPerson.department || ""}" readonly></div>
      </div>
    </section>
  </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleAuthModal(plate) {
  const row = vehicleManagementRowByPlate(plate);
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-auth-modal";
  modal.dataset.action = "车辆授权";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "车辆授权";
  document.getElementById("modalBody").innerHTML = `<div class="vehicle-auth-form">
    <section class="vehicle-auth-selected-top">
      <div class="vehicle-auth-selected-head">授权车辆 <em>(1)</em></div>
      <div class="vehicle-auth-selected-body"><span>${row.plate}</span><span>${row.personName || "-"} / ${row.personCode || "-"}</span></div>
    </section>
    <section class="vehicle-auth-section">
      <div class="vehicle-auth-validity">
        <label class="required">有效期</label>
        <div class="vehicle-auth-date-range">
          <input class="control" value="${row.startTime && row.startTime !== "-" ? row.startTime : "2026-07-15"}" placeholder="开始日期">
          <span>至</span>
          <input class="control" value="${row.endTime && row.endTime !== "-" && row.endTime !== "长期" ? row.endTime : "2026-12-31"}" placeholder="结束日期">
          <label class="vehicle-auth-long-term"><input type="checkbox" ${row.endTime === "长期" ? "checked" : ""}> 长期</label>
        </div>
      </div>
    </section>
    <section class="vehicle-auth-section">
      <h3>选择授权范围</h3>
      <div class="vehicle-auth-range-table">
        <table>
          <thead><tr><th>授权车场</th><th>授权出入口</th><th>操作</th></tr></thead>
          <tbody>
            <tr><td><select class="control"><option>南侧广场车场</option><option>冷链物流车场</option><option>东门临时车场</option></select></td><td><select class="control"><option>南入口、南出口</option><option>南入口</option><option>南出口</option><option>全部出入口</option></select></td><td><button class="btn text danger action-vehicle-auth-range-delete" type="button">删除</button></td></tr>
          </tbody>
        </table>
        <button class="btn vehicle-auth-add-range" type="button">继续添加</button>
      </div>
    </section>
    <div class="alert">授权保存后需下发至边缘端，道闸设备完成同步后权限正式生效。</div>
  </div>`;
  document.getElementById("modalConfirm").textContent = "确认授权";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleDeleteModal(plate) {
  const row = vehicleManagementRowByPlate(plate);
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除车辆绑定";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除车辆";
  document.getElementById("modalBody").innerHTML = `<div class="alert danger"><b>确认删除该车辆绑定？</b><br>车牌号：${row.plate}<br>绑定人员：${row.personName || "-"} / ${row.personCode || "-"}</div>`;
  document.getElementById("modalConfirm").textContent = "确认";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleImportModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-import-modal";
  modal.dataset.action = "车辆批量导入";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "车辆批量导入";
  document.getElementById("modalBody").innerHTML = `<div class="person-import vehicle-import-flow">
    <div class="alert warning">请先下载标准模板，上传文件完成校验后再执行导入；校验失败数据不会写入车辆管理列表。</div>
    <section class="person-import-step">
      <div><b>1. 下载模板</b><span>模板字段：车牌号、人员编号、人员姓名、联系方式、所属企业、所属部门、车辆品牌、车辆颜色。</span></div>
      <button class="btn action-template-download">下载模板</button>
    </section>
    <section class="person-import-step">
      <div><b>2. 上传并校验</b><span>支持 .xlsx 文件，系统先校验车牌格式、人员匹配和一车一人规则。</span></div>
      <button class="btn batch-upload-box" type="button">上传车辆导入文件</button>
    </section>
    <div class="batch-document-panel">
      <div class="batch-document-head"><h3>导入校验规则</h3><span>导入前先校验人员编号与姓名，重复车辆按一车一人规则阻断</span></div>
      <div class="table-wrap batch-document-table">
        <table><thead><tr><th>序号</th><th>校验项</th><th>处理规则</th><th>结果</th></tr></thead><tbody>
          <tr><td>1</td><td>车牌号格式</td><td>自动去除空格、点号、中横线后校验车牌格式</td><td>${tag("成功")}</td></tr>
          <tr><td>2</td><td>人员数据</td><td>按人员编号优先匹配，姓名辅助校验</td><td>${tag("成功")}</td></tr>
          <tr><td>3</td><td>重复车辆</td><td>同一车牌已存在绑定关系时阻断导入，不允许生成多人绑定</td><td>${tag("待确认")}</td></tr>
        </tbody></table>
      </div>
    </div>
    <section class="person-import-result">
      <b>校验结果</b>
      <div><span>待导入 36 条</span><span>校验通过 34 条</span><span class="danger-text">失败 2 条</span></div>
      <small>失败行需下载明细并修正后重新上传；点击底部按钮时仅导入校验通过的数据。</small>
    </section>
  </div>`;
  document.getElementById("modalConfirm").textContent = "上传校验后导入";
  document.getElementById("modalOverlay").classList.add("show");
}

function openResignedPersonDeleteModal(personName, personCode) {
  pendingResignedPerson = `${personName}-${personCode}`;
  const modal = document.getElementById("modal");
  modal.className = "modal";
  modal.dataset.action = "删除离职人员档案";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "删除人员档案";
  document.getElementById("modalBody").innerHTML = `<div class="alert danger"><b>请确认高风险操作</b><br>是否删除 <span class="danger-inline">${pendingResignedPerson}</span> 的人员档案？删除后该离职档案将不再展示在已离职人员列表中。</div>`;
  document.getElementById("modalConfirm").textContent = "确认删除";
  document.getElementById("modalOverlay").classList.add("show");
}

function openAccessPhotoPreview(photoLabel, photoTitle = "") {
  const modal = document.getElementById("modal");
  modal.className = "modal access-photo-modal";
  modal.dataset.action = "通行照片预览";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
  document.getElementById("modalTitle").textContent = "通行照片";
  const isImage = /\.(png|jpe?g|webp|gif)$/i.test(photoLabel);
  document.getElementById("modalBody").innerHTML = `<div class="access-photo-preview">${isImage ? `<img class="access-photo-preview-img" src="${photoLabel}" alt="${photoTitle || "通行照片"}">` : `<div class="access-photo-preview-image"><span>${photoLabel}</span></div>`}</div>`;
  document.getElementById("modalConfirm").textContent = "关闭";
  document.getElementById("modalOverlay").classList.add("show");
}

function cardPersonOptions(selectedCode = "") {
  return `<option value="">请选择未发卡人员</option>${Object.values(cardPeople).map(item=>`<option value="${item.code}" ${item.code===selectedCode?"selected":""}>${item.name} / ${item.code}</option>`).join("")}`;
}

function openCardIssueModal(cardNo = "") {
  const firstPerson = cardPeople.P20260042;
  const modal = document.getElementById("modal");
  modal.className = "modal card-issue-modal";
  modal.dataset.action = "发卡";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "发卡";
  document.getElementById("modalBody").innerHTML = `
    <div class="alert warning">卡片开卡成功后，人与卡绑定，卡片状态为正常；后续可挂失、注销、作废。</div>
    <div class="card-issue-form">
      <div class="form-field full card-no-line">
        <label class="required">物理卡号</label>
        <div class="inline-control"><input class="control" value="${cardNo}" placeholder="请输入物理卡号或点击读卡"><button class="btn action-card-read">读卡</button></div>
        <small class="form-help">对接读卡器后可自动读卡并填充物理卡号；未对接时支持手动输入。</small>
      </div>
      <div class="form-field full">
        <label class="required">人员姓名</label>
        <select class="control" data-card-person-select>${cardPersonOptions(firstPerson.code)}</select>
        <small class="form-help">选择姓名后，人员编号、联系方式、员工类型和所属企业/部门自动带出，不允许修改。</small>
      </div>
      <div class="form-field"><label class="required">人员编号</label><input class="control" data-card-person-code value="${firstPerson.code}" readonly></div>
      <div class="form-field"><label class="required">联系方式</label><input class="control" data-card-person-phone value="${firstPerson.phone}" readonly></div>
      <div class="form-field"><label class="required">员工类型</label><input class="control" data-card-person-type value="${firstPerson.type}" readonly></div>
      <div class="form-field"><label class="required">所属企业/部门</label><input class="control" data-card-person-org value="${firstPerson.enterprise} / ${firstPerson.department}" readonly></div>
    </div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function updateCardPersonFields(code) {
  const person = cardPeople[code] || { code: "", phone: "", type: "", enterprise: "", department: "" };
  const map = {
    "[data-card-person-code]": person.code,
    "[data-card-person-phone]": person.phone,
    "[data-card-person-type]": person.type,
    "[data-card-person-org]": person.enterprise && person.department ? `${person.enterprise} / ${person.department}` : ""
  };
  Object.entries(map).forEach(([selector, value]) => {
    const input = document.querySelector(selector);
    if (input) input.value = value;
  });
}

function cardConfirmMessage(action, count) {
  if (action === "挂失") return `确定要挂失已选中的${count}张卡片？<br>卡片挂失后将限制该卡片继续通行，请确认。`;
  if (action === "解挂") return `确定要解挂已选中的${count}张卡片？<br>卡片解挂后将恢复该卡片通行能力，请确认。`;
  if (action === "注销") return `确定要注销已选中的${count}张卡片？<br>卡片注销后会解除人员绑定关系，卡片相关权限受限，请确认。`;
  if (action === "作废") return `确定要作废已选中的${count}张卡片？<br>卡片作废后会解除人员绑定关系，卡片相关权限受限，不允许再次发卡，请确认。`;
  if (action === "删除") return `确定要删除该未绑定卡片？<br>仅无绑定人员的卡片允许删除，删除后不再展示。`;
  return `确定执行${action}操作吗？`;
}

function openCardConfirm(action, count = 1) {
  pendingCardOperation = action;
  const modal = document.getElementById("modal");
  modal.className = "modal card-confirm-modal";
  modal.dataset.action = `卡片${action}`;
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "提示";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-warning"><span>!</span><p>${cardConfirmMessage(action, count)}</p></div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function openCardRulesModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal card-rules-modal";
  modal.dataset.action = "卡片规则说明";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "none";
  document.getElementById("modalTitle").textContent = "卡片状态规则";
  document.getElementById("modalBody").innerHTML = `
    <ol class="card-rules-list">
      <li><b>开卡：</b>开卡成功后，人、卡建立关联，卡片状态变为“正常”。</li>
      <li><b>挂失：</b>卡片状态变为“挂失”，人、卡关联关系保持不变，实体卡相关权限暂停使用，支持解挂、注销或作废。</li>
      <li><b>解挂：</b>卡片状态恢复为“正常”，实体卡相关权限恢复使用。</li>
      <li><b>注销：</b>人、卡解除关联，卡片状态变为“注销”，实体卡相关权限失效；注销后的卡片可重新发卡，重新发卡后状态变为“正常”。</li>
      <li><b>作废：</b>人、卡解除关联，卡片状态变为“作废”，卡片永久停用，不支持再次发卡。</li>
    </ol>`;
  document.getElementById("modalConfirm").textContent = "我知道了";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleRecordNoteModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal card-rules-modal";
  modal.dataset.action = "车辆通行记录备注";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "通行记录页面备注";
  document.getElementById("modalBody").innerHTML = `
    <ol class="card-rules-list">
      <li><b>全量记录：</b>本页面展示全部车辆过车记录，包含已开闸和“未开闸”的记录；需设备方提供全量通行记录接口，不能只提供成功开闸记录。</li>
      <li><b>抓拍图：</b>抓拍图为车辆过车全景图，点击后可查看大图；是否展示取决于实际接口是否返回抓拍图片地址，若设备接口不提供，则隐藏该字段。</li>
      <li><b>车牌照片：</b>车牌照片用于展示识别到的车牌区域；实际对接时需确认接口是否可提供，若设备接口不提供，则隐藏该字段。</li>
      <li><b>人工抬杆原因：</b>人工抬杆的放行原因分为两类：1 普通临时车辆；2 特殊车辆拍照登记后手动放行。</li>
      <li><b>只读规则：</b>通行记录由设备和岗亭值守流程生成，页面仅支持查询和导出，不支持人工新增、编辑或删除。</li>
    </ol>`;
  document.getElementById("modalConfirm").textContent = "我知道了";
  document.getElementById("modalOverlay").classList.add("show");
}

function openPatrolTaskStatusRulesModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal patrol-task-rules-modal";
  modal.dataset.action = "巡更任务状态说明";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "巡更任务状态说明";
  document.getElementById("modalBody").innerHTML = `
    <div class="patrol-status-rules">
      <div class="patrol-status-board">
        <div class="axis-line"></div>
        <div class="axis-point start"><b>预计开始点</b></div>
        <div class="axis-point end"><b>预计结束点</b></div>
        <div class="phase phase-before"><b>任务开始前</b><span>此时无法开始巡检</span></div>
        <div class="phase phase-during"><b>任务巡检中</b><span>此时可以开始巡检</span></div>
        <div class="phase phase-after"><b>任务结束后</b><span>此时无法开始巡检</span></div>
        <div class="rule-row before">
          <div class="rule-label">任务在预计开始点前时：</div>
          <div class="status-pill neutral">未开始</div>
        </div>
        <div class="rule-row during">
          <div class="rule-label">任务在此时间段内开始巡检后：</div>
          <div class="status-pill primary">进行中</div>
        </div>
        <div class="rule-row finish">
          <div class="rule-label">任务在此时间段内完成巡检时：</div>
          <div class="status-pill success">已完成</div>
        </div>
        <div class="rule-row timeout">
          <div class="rule-label">任务在此时间段内开始，没在此时间段内完成或超时，24小时内完成：</div>
          <div class="status-pill warning">超时完成</div>
        </div>
        <div class="rule-row miss-during">
          <div class="rule-label">任务在此时间段内开始，在24小时内没有完成时：</div>
          <div class="status-pill danger">漏检</div>
        </div>
        <div class="rule-row miss-after">
          <div class="rule-label">任务超过预计结束时间点还未开始时：</div>
          <div class="status-pill danger">漏检</div>
        </div>
      </div>
    </div>`;
  document.getElementById("modalConfirm").textContent = "我知道了";
  document.getElementById("modalOverlay").classList.add("show");
}

function openVehicleMobileReleaseModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal vehicle-mobile-release-modal";
  modal.dataset.action = "无权限车辆放行";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "门卫移动端模拟";
  document.getElementById("modalBody").innerHTML = `
    <div class="vehicle-mobile-release">
      <div class="vehicle-phone-shell">
        <div class="vehicle-phone-status"><span>10:46</span><span>4G 100%</span></div>
        <div class="vehicle-phone-nav"><b>车辆拦截核验</b><span>门卫端</span></div>
        <div class="vehicle-intercept-card">
          <label>收到拦截记录</label>
          <strong data-mobile-release-plate>鲁B·L8899</strong>
          <p><span data-mobile-release-entrance>南出口</span> · <span data-mobile-release-direction>出场</span> · <span data-mobile-release-status>特殊车辆出场待核验</span></p>
        </div>
        <div class="vehicle-mobile-form">
          <label>车辆类型</label>
          <select class="control" data-release-type>
            <option selected>特殊车辆</option>
            <option>临时车辆</option>
          </select>
          <label data-special-release-label>现场照片</label>
          <div class="vehicle-photo-capture" data-special-release-photos>
            <div class="vehicle-photo-actions">
              <label class="vehicle-photo-source">
                <input type="file" accept="image/*" capture="environment" multiple data-release-photo-input="camera">
                <span>打开摄像头</span>
                <b>拍摄现场照片</b>
              </label>
              <label class="vehicle-photo-source">
                <input type="file" accept="image/*" multiple data-release-photo-input="album">
                <span>打开相册上传</span>
                <b>可选择多张照片</b>
              </label>
            </div>
            <div class="vehicle-photo-list" data-release-photo-list></div>
          </div>
          <label data-special-release-remark-label>放行备注</label>
          <textarea class="control" data-release-remark placeholder="请输入核验依据和放行原因">现场核验无异常，登记后放行</textarea>
          <small data-temp-release-help>临时车辆选择类型后可直接放行，系统仅同步至车辆通行记录。</small>
        </div>
      </div>
      <div class="vehicle-mobile-rule">
        <b>同步规则</b>
        <p>临时车辆：确认放行后仅进入车辆通行记录。</p>
        <p>特殊车辆：必须通过摄像头或相册上传至少 1 张现场照片，并填写放行备注，确认后同步进入车辆通行记录和特殊车辆通行记录。</p>
      </div>
    </div>`;
  document.getElementById("modalConfirm").textContent = "确认放行";
  syncVehicleReleaseTypeView();
  document.getElementById("modalOverlay").classList.add("show");
}

function syncVehicleReleaseTypeView() {
  const vehicleType = document.querySelector("[data-release-type]")?.value || "特殊车辆";
  const isSpecial = vehicleType === "特殊车辆";
  const plate = isSpecial ? "鲁B·L8899" : "鲁B·T6632";
  const entrance = isSpecial ? "南出口" : "南入口";
  const direction = isSpecial ? "出场" : "入场";
  const status = isSpecial ? "特殊车辆出场待核验" : "临时车辆无权限拦截";
  const defaultRemark = isSpecial ? "现场核验无异常，登记后放行" : "";
  const plateNode = document.querySelector("[data-mobile-release-plate]");
  const entranceNode = document.querySelector("[data-mobile-release-entrance]");
  const directionNode = document.querySelector("[data-mobile-release-direction]");
  const statusNode = document.querySelector("[data-mobile-release-status]");
  const photoArea = document.querySelector("[data-special-release-photos]");
  const photoLabel = document.querySelector("[data-special-release-label]");
  const remarkLabel = document.querySelector("[data-special-release-remark-label]");
  const help = document.querySelector("[data-temp-release-help]");
  const remark = document.querySelector("[data-release-remark]");
  if (plateNode) plateNode.textContent = plate;
  if (entranceNode) entranceNode.textContent = entrance;
  if (directionNode) directionNode.textContent = direction;
  if (statusNode) statusNode.textContent = status;
  if (photoArea) photoArea.style.display = isSpecial ? "grid" : "none";
  if (photoLabel) photoLabel.style.display = isSpecial ? "" : "none";
  if (remarkLabel) remarkLabel.textContent = isSpecial ? "放行备注（必填）" : "放行备注";
  if (help) help.style.display = isSpecial ? "none" : "block";
  if (remark && isSpecial && !remark.value.trim()) remark.value = defaultRemark;
  if (remark && !isSpecial && remark.value.trim() === "现场核验无异常，登记后放行") remark.value = "";
}

function vehicleReleaseNow() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function vehicleReleaseDraftFromForm() {
  const vehicleType = document.querySelector("[data-release-type]")?.value || "临时车辆";
  const isSpecial = vehicleType === "特殊车辆";
  const remark = document.querySelector("[data-release-remark]")?.value.trim() || "";
  const photoCount = document.querySelectorAll("[data-release-photo-item]").length;
  const now = vehicleReleaseNow();
  return {
    vehicleType,
    plate: isSpecial ? "鲁B·L8899" : "鲁B·T6632",
    entrance: isSpecial ? "南出口" : "南入口",
    direction: isSpecial ? "出场" : "入场",
    passTime: now,
    releaseTime: now,
    ownerName: isSpecial ? "赵强" : "陈一鸣",
    ownerPhone: isSpecial ? "138 5321 6677" : "186 5323 6020",
    unit: isSpecial ? "青岛冷链物流有限公司" : "-",
    rawRemark: remark,
    remark: remark || "门卫核验后临时放行",
    photoCount
  };
}

function addVehicleReleasePhotosFromInput(input) {
  if (!input) return;
  const capture = input.closest("[data-special-release-photos]");
  const list = capture?.querySelector("[data-release-photo-list]");
  if (!list) return;
  const source = input.dataset.releasePhotoInput === "album" ? "相册上传" : "摄像头拍摄";
  const files = Array.from(input.files || []);
  const addCount = files.length;
  if (!addCount) return;
  for (let i = 0; i < addCount; i += 1) {
    const index = list.querySelectorAll("[data-release-photo-item]").length + 1;
    const fileName = files[i].name || `现场照片${index}.jpg`;
    const shotTime = vehicleReleaseNow().split(" ")[1];
    list.insertAdjacentHTML("beforeend", `<div class="vehicle-photo-item" data-release-photo-item><span>现场照片 ${index}</span><b>${source} · ${shotTime}</b><em>${fileName}</em></div>`);
  }
  input.value = "";
  toast(`已添加 ${addCount} 张现场照片`);
}

function appendVehicleReleaseRecords(release) {
  const reason = release.vehicleType === "特殊车辆" ? `特殊车辆移动端核验放行（${release.photoCount}张照片）：${release.remark}` : release.remark;
  vehicleAccessRecordRows.unshift([
    release.plate,
    "抓拍|鲁B",
    release.passTime,
    release.entrance,
    release.direction,
    "人工抬杆",
    reason,
    `${release.ownerName}|${release.ownerPhone}`
  ]);
  if (release.vehicleType === "特殊车辆") {
    specialVehicleAccessRecordRows.unshift([
      release.plate,
      release.unit,
      `${release.ownerName}|${release.ownerPhone.replace(/\s/g, "")}`,
      release.passTime,
      release.entrance,
      release.direction,
      `人工抬杆|${release.remark}`,
      `王涛|${release.releaseTime}`
    ]);
  }
}

function openCardSelectionRequired() {
  const modal = document.getElementById("modal");
  modal.className = "modal card-confirm-modal";
  modal.dataset.action = "卡片未选择";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "提示";
  document.getElementById("modalBody").innerHTML = `<div class="confirm-warning"><span>!</span><p>请先选中您要挂失的卡片！</p></div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
}

function openCardImportModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal person-import-modal";
  modal.dataset.action = "卡片批量导入";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "批量导入卡片";
  document.getElementById("modalBody").innerHTML = `
    <div class="person-import">
      <div class="alert warning">批量导入用于建立物理卡号清单或批量发卡，导入前需校验物理卡号唯一、人员未发卡。</div>
      <section class="person-import-step"><div><b>1. 下载模板</b><span>模板字段：物理卡号、姓名、人员编号、联系方式。</span></div><button class="btn action-template-download">下载模板</button></section>
      <section class="person-import-step"><div><b>2. 上传并校验</b><span>支持 .xlsx 文件，失败行需修正后重新上传。</span></div><div class="upload-box">＋ 上传卡片文件<small class="form-help">系统校验后展示成功、失败和重复卡号数量</small></div></section>
      <section class="person-import-result"><b>校验结果</b><div><span>待导入 80 条</span><span>校验通过 78 条</span><span class="danger-text">失败 2 条</span></div><small>仅校验通过的数据允许导入，并写入卡片操作日志。</small></section>
    </div>`;
  document.getElementById("modalConfirm").textContent = "上传检验后导入";
  document.getElementById("modalOverlay").classList.add("show");
}

function openInspectionPointImportModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal person-import-modal";
  modal.dataset.action = "巡检点批量导入";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "Excel批量导入巡检点";
  document.getElementById("modalBody").innerHTML = `
    <div class="person-import">
      <div class="alert warning">导入字段需包含巡检点名称、区域、标签、所属园区、备注；同一园区下巡检点名称重复时不允许导入。</div>
      <section class="person-import-step"><div><b>1. 下载模板</b><span>模板字段与当前巡检点列表保持一致。</span></div><button class="btn action-template-download">下载模板</button></section>
      <section class="person-import-step"><div><b>2. 上传并校验</b><span>支持 .xlsx 文件，校验区域和标签是否已维护。</span></div><div class="upload-box">＋ 上传巡检点文件<small class="form-help">校验通过后才允许导入，失败行需修正后重新上传</small></div></section>
      <section class="person-import-result"><b>校验结果</b><div><span>待导入 43 条</span><span>校验通过 41 条</span><span class="danger-text">失败 2 条</span></div><small>导入成功后写入巡检点基础资料，不影响已生成的巡检任务快照。</small></section>
    </div>`;
  document.getElementById("modalConfirm").textContent = "上传检验后导入";
  document.getElementById("modalOverlay").classList.add("show");
}

function openInspectionAreaBatchModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal inspection-area-batch-modal";
  modal.dataset.action = "批量新增区域";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "批量新增区域";
  document.getElementById("modalBody").innerHTML = `
    <div class="inspection-area-modal-form">
      <div class="alert warning">仅支持园区内巡检，不做跨园区巡检；每一项之间用回车换行分割。</div>
      <section class="form-section">
        <div class="form-grid">
          <div class="form-field">
            <label class="required">所属园区</label>
            <select class="control"><option>请选择所属园区</option><option>海尔西园区</option><option>微冷园区</option></select>
          </div>
          <div class="form-field full">
            <label class="required">区域名称</label>
            <div class="inspection-area-lines-input">
              <div class="inspection-area-line-nos"><div data-area-line-nos-list>${inspectionAreaLineNumbersHtml(6)}</div></div>
              <textarea class="control inspection-area-lines-control" data-area-lines-control spellcheck="false">黑龙江路沿线
海尔路沿线
水清沟社区
海尔西园区</textarea>
            </div>
            <small class="form-help">每行一个区域名称。</small>
          </div>
        </div>
      </section>
    </div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
  syncInspectionAreaLineNumbers(document.querySelector("[data-area-lines-control]"));
}

function openInspectionTagBatchModal() {
  const modal = document.getElementById("modal");
  modal.className = "modal inspection-tag-batch-modal";
  modal.dataset.action = "批量新增标签";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "批量新增标签";
  document.getElementById("modalBody").innerHTML = `
    <div class="inspection-area-modal-form">
      <div class="alert warning">仅支持园区内巡检标签，不做跨园区巡检；每一项之间用回车换行分割。</div>
      <section class="form-section">
        <div class="form-grid">
          <div class="form-field">
            <label class="required">所属园区</label>
            <select class="control"><option>请选择所属园区</option><option>海尔西园区</option><option>微冷园区</option></select>
          </div>
          <div class="form-field full">
            <label class="required">标签名称</label>
            <div class="inspection-area-lines-input">
              <div class="inspection-area-line-nos"><div data-area-line-nos-list>${inspectionAreaLineNumbersHtml(6)}</div></div>
              <textarea class="control inspection-area-lines-control" data-area-lines-control spellcheck="false">消防巡检
安全巡检
设施巡检
保洁巡检</textarea>
            </div>
            <small class="form-help">每行一个标签名称。</small>
          </div>
        </div>
      </section>
    </div>`;
  document.getElementById("modalConfirm").textContent = "确定";
  document.getElementById("modalOverlay").classList.add("show");
  syncInspectionAreaLineNumbers(document.querySelector("[data-area-lines-control]"));
}

function inspectionAreaLineNumbersHtml(count) {
  return Array.from({ length: count }, (_, index) => `<span>${index + 1}</span>`).join("");
}

function syncInspectionAreaLineNumbers(textarea) {
  if (!textarea) return;
  const wrapper = textarea.closest(".inspection-area-lines-input");
  const lineNos = wrapper?.querySelector("[data-area-line-nos-list]");
  if (!lineNos) return;
  const lineCount = Math.max(6, textarea.value.split(/\n/).length);
  lineNos.innerHTML = inspectionAreaLineNumbersHtml(lineCount);
  lineNos.style.transform = `translateY(-${textarea.scrollTop}px)`;
}

function openInspectionAreaEditModal(areaName = "1#东", parkName = "微冷园区") {
  const modal = document.getElementById("modal");
  modal.className = "modal inspection-area-edit-modal";
  modal.dataset.action = "编辑区域";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "编辑区域";
  document.getElementById("modalBody").innerHTML = `
    <div class="inspection-area-modal-form">
      <div class="alert warning">仅未关联巡检点的区域允许编辑。保存后仅影响后续巡检点归类，不修改历史任务快照。</div>
      <section class="form-section">
        <div class="form-grid">
          <div class="form-field">
            <label class="required">所属园区</label>
            <select class="control"><option selected>${parkName}</option><option>海尔西园区</option><option>微冷园区</option></select>
          </div>
          <div class="form-field">
            <label class="required">区域名称</label>
            <input class="control" value="${areaName}" placeholder="请输入区域名称">
          </div>
        </div>
      </section>
    </div>`;
  document.getElementById("modalConfirm").textContent = "保存";
  document.getElementById("modalOverlay").classList.add("show");
}

function openSecurityDeviceLocationModal(row = []) {
  const modal = document.getElementById("modal");
  modal.className = "modal remote-location-bind-modal";
  modal.dataset.action = "设备绑定位置";
  document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
  document.getElementById("modalTitle").textContent = "位置绑定";
  document.getElementById("modalConfirm").textContent = "确定";
  const deviceName = row[0] || "—";
  const deviceCode = row[1] || "—";
  const location = row[4] || "请选择";
  document.getElementById("modalBody").innerHTML = `<div class="remote-location-form">
    <div class="remote-location-row">
      <label>设备名称</label>
      <input class="control" value="${escapeAttr(deviceName)}" disabled>
    </div>
    <div class="remote-location-row">
      <label>设备编码</label>
      <input class="control" value="${escapeAttr(deviceCode)}" disabled>
    </div>
    <div class="remote-location-row">
      <label class="required">绑定位置</label>
      <div class="remote-cascader">
        <button class="remote-cascader-control" type="button"><span>${escapeAttr(location)}</span><i>⌄</i></button>
        <div class="remote-cascader-panel">
          <div class="remote-cascader-col">
            <button class="selected"><i></i><span>微冷园区</span><b>›</b></button>
            <button><i></i><span>三里园区</span><b>›</b></button>
          </div>
          <div class="remote-cascader-col">
            <button class="selected"><i></i><span>A栋</span><b>›</b></button>
            <button><i></i><span>停车场</span><b>›</b></button>
            <button><i></i><span>园区外围</span><b>›</b></button>
            <button><i></i><span>南门</span><b>›</b></button>
          </div>
          <div class="remote-cascader-col">
            <button class="selected"><i></i><span>1F</span><b>›</b></button>
            <button><i></i><span>2F</span><b>›</b></button>
            <button><i></i><span>B1</span><b>›</b></button>
            <button><i></i><span>室外</span><b>›</b></button>
          </div>
          <div class="remote-cascader-col">
            <button><i></i><span>大厅</span><b>›</b></button>
            <button class="selected"><i></i><span>东北门</span><b>›</b></button>
            <button><i></i><span>仓储区</span><b>›</b></button>
            <button><i></i><span>B区</span><b>›</b></button>
          </div>
        </div>
      </div>
    </div>
    <div class="remote-location-row remote-location-detail-row">
      <label>详细位置</label>
      <input class="control" placeholder="请输入详细位置，例如：门岗右侧立杆 / 闸机旁">
    </div>
  </div>`;
  document.getElementById("modalOverlay").classList.add("show");
}

function modalTip(title) {
  const tips={
    "确认告警":"确认后告警状态将从“待确认”变更为“已确认”，并记录确认人和确认时间。",
    "误报关闭":"误报关闭后告警进入终态，不可再确认或生成工单。",
    "生成工单":"同一告警仅允许生成 1 张工单。创建成功后回写工单编号，告警进入终态。",
    "核实为误报":"标记为误报后不可撤销，也不可再转入处置流程。",
    "处置告警":"首次处置后状态变更为“处理中”；完成处置后将进入“已完成”终态。",
    "指派工单":"选择处置人后，工单状态将从“待派单”变更为“待接单”。",
    "派单":"巡检工单必须派单处理；选择处理人后，工单状态将从“待派单”变更为“待接单”。",
    "审批通过":"审批通过后预约状态更新为已通过，系统生成动态二维码、人脸权限和预约车牌权限，并发起门禁及道闸权限下发。",
    "审批拒绝":"拒绝原因必填；拒绝后预约状态更新为已拒绝，本次流程结束，访客只能重新发起新预约。",
    "审批驳回":"拒绝原因必填；拒绝后预约状态更新为已拒绝，本次流程结束，访客只能重新发起新预约。",
    "终止权限":"终止需填写原因并二次确认；确认后预约状态更新为已失效，权限同步状态更新为已终止。",
    "重新同步权限":"仅重新下发失败的权限项，不重复下发已成功项，并记录重试日志。",
    "保存访客规则配置":"保存后仅影响新提交或尚未生成权限的预约，已下发权限不自动变化。",
    "无权限车辆放行":"确认后系统记录门卫、备注和现场照片，并执行人工抬杆；黑名单车辆不可通过该流程放行。",
    "出场核验":"确认后生成特殊车辆出场核验记录，出场放行方式记录为人工抬杆。",
    "排班调整":"调整保存后即时生效，并写入排班修改记录。",
    "队长请假":"队长请假不安排顶替，不影响 6 人轮转岗的 2 人在岗规则。",
    "人员离职":"确认离职后，该人员将从人员档案列表移出，进入“已离职人员”页面；离职人员不可再参与门禁授权、排班和车辆绑定。",
    "删除时间段":"确认删除该通行时间段吗？若已被权限组关联，应先解除关联或由后台阻断删除，并记录操作日志。",
    "删除权限组":"确认删除该权限组吗？若已关联设备或人员，后台应先校验并阻断删除，避免未回收权限产生交付风险。",
    "删除车场":"删除前需校验出入口、车位、监控绑定和历史通行记录；存在关联数据时不允许删除，仅允许禁用。",
    "删除出入口":"出入口已关联通行记录时不允许删除，仅允许禁用；删除或禁用后入口/出口统计同步更新。",
    "解绑监控":"解绑后车场详情头部和车场列表的绑定监控数同步更新，历史视频记录不删除。",
    "解绑车辆":"解绑后该人车绑定关系下的车辆通行授权配置失效，需重新绑定后重新配置。",
    "下发至边缘端":"确认后将车辆授权策略同步到边缘端控制器，并生成道闸下发记录。",
    "重新下发":"仅重试失败的道闸下发任务，成功后更新完成时间和下发状态。",
    "移除部门权限组":"确认从当前部门移除该权限组吗？移除后该部门在职人员将失去该权限组对应门禁权限，并触发权限下发。",
    "解除拉黑":"确认后该人员黑名单策略立即失效，黑名单状态归为“已失效”；人员通行限制解除，历史拦截、告警和操作记录继续保留。若已同步限制关联车辆，是否同步解除车辆限制需按客户确认规则处理。"
  };
  return tips[title]||`执行“${title}”后将产生状态变更并记录操作日志，请确认是否继续。`;
}

function bindGlobal() {
  document.addEventListener("click",e=>{
    const menu=e.target.closest("[data-module]");
    if(menu){ renderPage(menu.dataset.module); return; }
    const tab=e.target.closest("[data-tab]");
    if(tab){ currentTab[currentModule]=tab.dataset.tab; renderPage(currentModule); return; }
    const remoteCascaderControl=e.target.closest(".remote-cascader-control");
    if(remoteCascaderControl){
      remoteCascaderControl.closest(".remote-cascader")?.classList.toggle("open");
      return;
    }
    const remoteCascaderOption=e.target.closest(".remote-cascader-col button");
    if(remoteCascaderOption){
      const cascader=remoteCascaderOption.closest(".remote-cascader");
      remoteCascaderOption.parentElement.querySelectorAll("button").forEach(item=>item.classList.remove("selected"));
      remoteCascaderOption.classList.add("selected");
      const selected=[...cascader.querySelectorAll(".remote-cascader-col button.selected span")].map(item=>item.textContent.trim()).filter(Boolean);
      const label=cascader.querySelector(".remote-cascader-control span");
      if(label) label.textContent=selected.join(" / ");
      return;
    }
    const close=e.target.closest("[data-close]");
    if(close){
      if(close.dataset.close === "modal") {
        stopAccessIssueProgress();
        const modal = document.getElementById("modal");
        modal.dataset.action = "";
        modal.className = "modal";
        document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      }
      document.getElementById(close.dataset.close+"Overlay").classList.remove("show");
      if(close.dataset.close === "drawer") resetMainDrawerChrome();
      if(close.dataset.close === "subDrawer") resetSubDrawerChrome();
      return;
    }
    const perimeterTaskEdit = e.target.closest(".action-perimeter-task-edit");
    if(perimeterTaskEdit){
      openPerimeterTaskDrawer(true, perimeterTaskEdit.dataset.taskId || currentPerimeterTaskId);
      return;
    }
    const perimeterTaskView = e.target.closest(".action-perimeter-task-view");
    if(perimeterTaskView){
      openPerimeterTaskDrawer(false, perimeterTaskView.dataset.taskId || currentPerimeterTaskId, true);
      return;
    }
    const perimeterTaskOp = e.target.closest(".action-perimeter-task-op");
    if(perimeterTaskOp){
      openPerimeterTaskOperationModal(perimeterTaskOp.dataset.act || perimeterTaskOp.textContent.trim(), perimeterTaskOp.dataset.taskId || currentPerimeterTaskId);
      return;
    }
    const perimeterAlarmDetail = e.target.closest(".action-perimeter-alarm-detail");
    if(perimeterAlarmDetail){
      openPerimeterAlarmDrawer(perimeterAlarmDetail.dataset.alarmId || currentPerimeterAlarmId);
      return;
    }
    const perimeterAlarmOp = e.target.closest(".action-perimeter-alarm-op");
    if(perimeterAlarmOp){
      openPerimeterOperationModal(perimeterAlarmOp.dataset.act || perimeterAlarmOp.textContent.trim(), perimeterAlarmOp.dataset.alarmId || currentPerimeterAlarmId);
      return;
    }
    const securityAlarmOp = e.target.closest(".action-security-alarm-op");
    if(securityAlarmOp){
      openSecurityAlarmOperationModal(securityAlarmOp.dataset.act || securityAlarmOp.textContent.trim(), securityAlarmOp.dataset.alarmId);
      return;
    }
    const detailAlarmWorkorderLink = e.target.closest(".action-alarm-workorder-link");
    if(detailAlarmWorkorderLink){
      currentTab.alarm = "安防工单";
      renderPage("alarm");
      document.getElementById("drawerOverlay").classList.remove("show");
      toast(`已打开安防工单：${detailAlarmWorkorderLink.dataset.workorderNo}`);
      return;
    }
    const perimeterImagePreview = e.target.closest(".action-perimeter-image-preview");
    if(perimeterImagePreview){
      const alarm = perimeterAlarmById(perimeterImagePreview.dataset.alarmId || currentPerimeterAlarmId);
      const modal = document.getElementById("modal");
      modal.className = "modal perimeter-image-modal";
      modal.dataset.action = "周界抓拍预览";
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      document.getElementById("modalTitle").textContent = "抓拍图片预览";
      document.getElementById("modalBody").innerHTML = `<div class="snapshot-image large"><span class="snapshot-target"></span><span class="snapshot-rule ${alarm.type === "区域入侵" ? "region" : ""}"></span><span class="snapshot-path"></span><em>${alarm.id} / ${alarm.type}</em></div>`;
      document.getElementById("modalConfirm").textContent = "关闭";
      document.getElementById("modalOverlay").classList.add("show");
      return;
    }
    const perimeterDraw = e.target.closest(".action-perimeter-draw");
    if(perimeterDraw){
      const draw = perimeterDraw.dataset.draw || "";
      if(draw === "清空") {
        document.querySelectorAll(".perimeter-task-drawer .zone,.perimeter-task-drawer .warning-line,.perimeter-task-drawer .motion-path").forEach(item => item.style.display = "none");
        toast("已清空当前画布规则");
      } else if(draw === "撤销") {
        toast("已撤销上一步绘制操作，最多支持撤销20步");
      } else {
        toast(`已进入绘制${draw}模式：单击添加点位，双击完成绘制`);
      }
      return;
    }
    const perimeterCamera = e.target.closest(".action-perimeter-camera");
    if(perimeterCamera){
      if(perimeterCamera.classList.contains("disabled")) {
        toast("该摄像头不可选择，请确认在线状态和周界任务占用情况");
        return;
      }
      document.querySelectorAll(".action-perimeter-camera").forEach(item => item.classList.remove("active"));
      perimeterCamera.classList.add("active");
      toast(`已加载摄像头实时视频：${perimeterCamera.dataset.code}`);
      return;
    }
    const perimeterRuleDelete = e.target.closest(".action-perimeter-rule-delete");
    if(perimeterRuleDelete){
      perimeterRuleDelete.closest(".rule-summary-row")?.remove();
      toast("检测规则已从当前配置中移除，保存后生效");
      return;
    }
    const perimeterRuleSelect = e.target.closest(".action-perimeter-rule-select");
    if(perimeterRuleSelect){
      document.querySelectorAll(".rule-summary-row").forEach(item => item.classList.remove("active"));
      perimeterRuleSelect.closest(".rule-summary-row")?.classList.add("active");
      const editor = document.querySelector(".perimeter-rule-editor");
      if(editor) {
        editor.innerHTML = perimeterRuleEditorHtml({
          index: perimeterRuleSelect.dataset.index,
          type: perimeterRuleSelect.dataset.type,
          name: perimeterRuleSelect.dataset.name,
          direction: perimeterRuleSelect.dataset.direction,
          level: perimeterRuleSelect.dataset.level,
          dedup: perimeterRuleSelect.dataset.dedup,
          targetRatio: perimeterRuleSelect.dataset.targetRatio
        }, editor.dataset.readonly === "1");
      }
      return;
    }
    const perimeterRuleLevel = e.target.closest(".action-perimeter-rule-level");
    if(perimeterRuleLevel){
      syncActivePerimeterRuleLevel(perimeterRuleLevel.value);
      return;
    }
    if(e.target.closest(".action-perimeter-unsaved-close")){
      const modal = document.getElementById("modal");
      modal.className = "modal perimeter-operation-modal";
      modal.dataset.action = "周界未保存离开";
      document.getElementById("modalTitle").textContent = "未保存配置";
      document.getElementById("modalBody").innerHTML = `<div class="confirm-message">您有未保存的配置，是否保存当前草稿？</div>`;
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      document.getElementById("modalConfirm").textContent = "保存并离开";
      document.getElementById("modalOverlay").classList.add("show");
      return;
    }
    if(e.target.closest(".action-perimeter-save-draft")){
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("周界任务已保存为草稿");
      return;
    }
    if(e.target.closest(".action-perimeter-save-enable")){
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("校验通过，周界任务已保存并启用");
      return;
    }
    if(e.target.closest(".action-perimeter-export")){
      toast("已按当前筛选条件导出周界告警");
      return;
    }
    const accessPhoto=e.target.closest("[data-access-photo]");
    if(accessPhoto){ openAccessPhotoPreview(accessPhoto.dataset.accessPhoto, accessPhoto.dataset.accessPhotoTitle || ""); return; }
    const accessDeptNode = e.target.closest("[data-access-dept-key]");
    if(accessDeptNode){
      accessDepartmentAuthState.selectedDepartmentKey = accessDeptNode.dataset.accessDeptKey;
      renderPage("access");
      return;
    }
    const videoGroup = e.target.closest("[data-video-group]");
    if(videoGroup){
      const key = videoGroup.dataset.videoGroup;
      if(videoState.collapsedGroups.has(key)) videoState.collapsedGroups.delete(key);
      else videoState.collapsedGroups.add(key);
      renderPage("video");
      return;
    }
    if(e.target.closest("[data-video-tree-expand]")){
      videoState.collapsedGroups.clear();
      renderPage("video");
      return;
    }
    if(e.target.closest("[data-video-tree-collapse]")){
      videoDeviceGroups().forEach(group => videoState.collapsedGroups.add(group.key));
      renderPage("video");
      return;
    }
    const videoScreen = e.target.closest("[data-video-screen]");
    if(videoScreen){
      videoState.realtimeScreenMode = Number(videoScreen.dataset.videoScreen) || 1;
      videoState.realtimePlaying = videoDeviceByCode(videoState.realtimeDeviceCode).status === "在线";
      videoState.realtimePtzVisible = false;
      renderPage("video");
      return;
    }
    if(e.target.closest("[data-ptz-close]")){
      videoState.realtimePtzVisible = false;
      renderPage("video");
      return;
    }
    const videoTile = e.target.closest("[data-video-tile]");
    if(videoTile){
      const device = videoDeviceByCode(videoTile.dataset.videoTile);
      const blocked = videoBlockedMessage(device, "realtime");
      if(blocked){ toast(blocked); return; }
      clearTimeout(videoTileClickTimer);
      videoTileClickTimer = setTimeout(()=>{
        videoState.realtimeDeviceCode = device.code;
        videoState.realtimePlaying = true;
        renderPage("video");
      }, 180);
      return;
    }
    const ptzButton = e.target.closest("[data-ptz]");
    if(ptzButton){
      const device = videoDeviceByCode(videoState.realtimeDeviceCode);
      const blocked = videoBlockedMessage(device, "realtime");
      if(blocked || !videoState.realtimePlaying){ toast(blocked || "实时视频未播放，无法控制云台"); return; }
      toast(`云台指令已下发：${device.name} / ${ptzButton.dataset.ptz}`);
      return;
    }
    const videoDeviceNode = e.target.closest("[data-video-device]");
    if(videoDeviceNode){
      const mode = videoDeviceNode.dataset.videoMode || "realtime";
      const device = videoDeviceByCode(videoDeviceNode.dataset.videoDevice);
      const blocked = videoBlockedMessage(device, mode);
      if(blocked){ toast(blocked); return; }
      if(mode === "playback") {
        videoState.playbackDeviceCode = device.code;
        videoState.playbackStatus = "已停止";
        videoState.playbackProgress = 0;
      } else {
        videoState.realtimeDeviceCode = device.code;
        videoState.realtimePlaying = true;
      }
      renderPage("video");
      return;
    }
    const videoGo = e.target.closest(".action-video-go");
    if(videoGo){
      const device = videoDeviceByCode(videoGo.dataset.deviceCode);
      const tabName = videoGo.dataset.videoTab || "实时视频";
      currentTab.video = tabName;
      if(tabName === "录像回放") {
        videoState.playbackDeviceCode = device.code;
        videoState.playbackStatus = "已停止";
        videoState.playbackProgress = 0;
      } else {
        videoState.realtimeDeviceCode = device.code;
        videoState.realtimePlaying = true;
      }
      renderPage("video");
      return;
    }
    if(e.target.closest(".action-video-stop")){
      videoState.realtimePlaying = false;
      renderPage("video");
      toast("实时视频播放已停止");
      return;
    }
    if(e.target.closest(".action-video-fullscreen")){
      toast("已进入播放器全屏预览");
      return;
    }
    if(e.target.closest(".action-playback-start")){
      const device = videoDeviceByCode(videoState.playbackDeviceCode);
      const blocked = videoBlockedMessage(device, "playback");
      if(blocked){ toast(blocked); return; }
      const error = validatePlaybackRange();
      if(error){ toast(error); return; }
      videoState.playbackStatus = "播放中";
      videoState.playbackProgress = Math.max(videoState.playbackProgress, 1);
      renderPage("video");
      toast("录像回放已开始");
      return;
    }
    if(e.target.closest(".action-playback-stop")){
      videoState.playbackStatus = "已停止";
      renderPage("video");
      toast("录像回放已停止");
      return;
    }
    if(e.target.closest(".action-playback-toggle")){
      const error = validatePlaybackRange();
      if(error){ toast(error); return; }
      videoState.playbackStatus = videoState.playbackStatus === "播放中" ? "已暂停" : "播放中";
      renderPage("video");
      return;
    }
    if(e.target.closest(".action-access-dept-auth-query")){
      const keywordInput = document.querySelector("[data-access-dept-group-keyword]");
      const statusSelect = document.querySelector("[data-access-dept-group-status]");
      accessDepartmentAuthState.groupKeyword = keywordInput ? keywordInput.value.trim() : "";
      accessDepartmentAuthState.groupStatus = statusSelect ? statusSelect.value : "";
      renderPage("access");
      return;
    }
    if(e.target.closest(".action-access-dept-auth-reset")){
      accessDepartmentAuthState.groupKeyword = "";
      accessDepartmentAuthState.groupStatus = "";
      renderPage("access");
      return;
    }
    if(e.target.closest(".action-access-dept-group-add")){
      openAccessDepartmentGroupModal();
      return;
    }
    if(e.target.closest(".action-access-issue-jump")){
      stopAccessIssueProgress();
      document.getElementById("modalOverlay").classList.remove("show");
      const modal = document.getElementById("modal");
      modal.dataset.action = "";
      modal.className = "modal";
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      currentTab.access = "权限下发管理";
      renderPage("access");
      return;
    }
    if(e.target.closest("[data-access-dept-select-toggle]")){
      e.target.closest("[data-access-dept-multiselect]")?.classList.toggle("open");
      return;
    }
    if(e.target.closest("[data-access-person-group-toggle]")){
      e.target.closest("[data-access-person-group-multiselect]")?.classList.toggle("open");
      return;
    }
    if(e.target.closest(".action-access-person-authorize")){
      openAccessPersonAuthorizeModal();
      return;
    }
    const accessPersonSingleAuthorize = e.target.closest(".action-access-person-single-authorize");
    if(accessPersonSingleAuthorize){
      openAccessPersonAuthorizeModal(accessPersonSingleAuthorize.dataset.personCode || "");
      return;
    }
    if(e.target.closest(".action-access-person-auth-query")){
      const keywordInput = document.querySelector("[data-access-person-auth-keyword]");
      accessPersonPermissionAuthState.personKeyword = keywordInput ? keywordInput.value.trim() : "";
      rerenderAccessPersonAuthorizeModal();
      return;
    }
    if(e.target.closest(".action-access-person-auth-reset")){
      accessPersonPermissionAuthState.personKeyword = "";
      rerenderAccessPersonAuthorizeModal();
      return;
    }
    const accessPersonPermissionDetail = e.target.closest(".action-access-person-permission-detail");
    if(accessPersonPermissionDetail){
      openAccessPersonPermissionDrawer(accessPersonPermissionDetail.dataset.personCode || currentAccessPersonPermissionCode);
      return;
    }
    const accessIssueDetail = e.target.closest(".action-access-issue-detail");
    if(accessIssueDetail){
      openAccessIssueDetailDrawer(accessIssueDetail.dataset.personCode || currentAccessPersonPermissionCode);
      return;
    }
    const accessPersonPermissionRemove = e.target.closest(".action-access-person-permission-remove");
    if(accessPersonPermissionRemove){
      const personCode = accessPersonPermissionRemove.dataset.personCode || currentAccessPersonPermissionCode;
      const groupName = accessPersonPermissionRemove.dataset.groupName || "该权限组";
      if(!confirm(`确认移除该人员的“${groupName}”权限组吗？移除后将触发权限下发，未下发成功前设备端权限可能暂未同步。`)) return;
      if(removeAccessPersonPermissionGroup(personCode, groupName)){
        renderPage("access");
        openAccessPersonPermissionDrawer(personCode);
        toast("已移除按人员授权权限组，权限下发任务已触发");
      }
      return;
    }
    const accessPersonReissue = e.target.closest(".action-access-person-reissue");
    if(accessPersonReissue){
      openAccessPermissionIssueTipModal();
      return;
    }
    if(e.target.closest(".action-access-batch-reissue")){
      openAccessPermissionIssueTipModal();
      return;
    }
    const copyAppointmentId = e.target.closest(".action-copy-appointment-id");
    if(copyAppointmentId){
      const value = copyAppointmentId.dataset.appointmentId || "";
      navigator.clipboard?.writeText(value).catch(()=>{});
      toast(`系统内部预约ID已复制：${value}`);
      return;
    }
    const visitorVehicleToggle = e.target.closest(".visitor-vehicle-toggle");
    if(visitorVehicleToggle){
      visitorConfigState.allowVehicle = visitorVehicleToggle.checked;
      renderPage("visitor");
      toast(visitorConfigState.allowVehicle ? "已允许访客预约车辆，可配置车辆数量和车行设备" : "已关闭访客预约车辆，车辆数量和车行设备配置已停用");
      return;
    }
    const visitorDevicePicker = e.target.closest(".action-visitor-device-picker");
    if(visitorDevicePicker){
      openVisitorDevicePickerModal(visitorDevicePicker.dataset.visitorDeviceScope || "person");
      return;
    }
    if(e.target.closest(".action-visitor-reason-add")){
      openVisitorReasonModal();
      return;
    }
    const visitorReasonRemove = e.target.closest(".action-visitor-reason-remove");
    if(visitorReasonRemove){
      removeVisitorReason(visitorReasonRemove.dataset.visitorReason || "");
      return;
    }
    if(e.target.closest(".action-visitor-config-save")){
      openVisitorConfigSaveModal();
      return;
    }
    const vehicleParkDetail = e.target.closest(".action-vehicle-park-detail");
    if(vehicleParkDetail){
      openVehicleParkDrawer(vehicleParkDetail.dataset.vehicleParkName || vehicleParkingLots[0].name, vehicleParkDetail.dataset.vehicleParkTab || "出入口");
      return;
    }
    const vehicleParkTab = e.target.closest("[data-vehicle-park-tab]");
    if(vehicleParkTab){
      rerenderVehicleParkDrawer(vehicleParkTab.dataset.vehicleParkTab || "出入口");
      return;
    }
    if(e.target.closest(".action-vehicle-gateway-add")){
      openVehicleGatewayModal();
      return;
    }
    if(e.target.closest(".action-vehicle-gateway-row-add")){
      const tbody = document.querySelector(".vehicle-gateway-modal-table tbody");
      if(tbody) tbody.insertAdjacentHTML("beforeend", vehicleGatewayModalRow(tbody.children.length, "入口", ""));
      return;
    }
    const vehicleGatewayRowRemove = e.target.closest(".action-vehicle-gateway-row-remove");
    if(vehicleGatewayRowRemove){
      const rows = document.querySelectorAll(".vehicle-gateway-modal-table tbody tr");
      if(rows.length <= 1){ toast("至少保留一个出入口"); return; }
      vehicleGatewayRowRemove.closest("tr").remove();
      document.querySelectorAll(".vehicle-gateway-modal-table tbody tr").forEach((row,index)=>{ row.children[0].textContent = index + 1; });
      return;
    }
    if(e.target.closest(".action-vehicle-gateway-edit")){
      openModal("编辑出入口");
      return;
    }
    if(e.target.closest(".action-vehicle-gateway-remove")){
      const x = e.target.closest(".action-vehicle-gateway-remove");
      openVehicleGatewayDeleteModal(x.dataset.gatewayName || "该出入口");
      return;
    }
    if(e.target.closest(".action-vehicle-monitor-bind")){
      const x = e.target.closest(".action-vehicle-monitor-bind");
      if(x.dataset.vehicleParkName){
        openVehicleParkDrawer(x.dataset.vehicleParkName, "监控");
      } else {
        openVehicleMonitorBindModal(vehicleParkDetailState.name);
      }
      return;
    }
    const monitorBindTab = e.target.closest("[data-monitor-bind-tab]");
    if(monitorBindTab){
      vehicleMonitorBindState.tab = monitorBindTab.dataset.monitorBindTab;
      rerenderVehicleMonitorBindModal();
      return;
    }
    if(e.target.closest(".action-vehicle-monitor-unbind")){
      openVehicleMonitorDeleteModal();
      return;
    }
    if(e.target.closest(".action-vehicle-blacklist-add")){
      openVehicleBlacklistModal();
      return;
    }
    const vehicleBlacklistEdit = e.target.closest(".action-vehicle-blacklist-edit");
    if(vehicleBlacklistEdit){
      openVehicleBlacklistModal({ plate: vehicleBlacklistEdit.dataset.blacklistPlate });
      return;
    }
    const vehicleBlacklistDelete = e.target.closest(".action-vehicle-blacklist-delete");
    if(vehicleBlacklistDelete){
      openVehicleBlacklistDeleteModal(vehicleBlacklistDelete.dataset.blacklistPlate);
      return;
    }
    if(e.target.closest(".action-vehicle-blacklist-export")){
      toast("已按当前筛选条件导出车辆黑名单数据");
      return;
    }
    if(e.target.closest(".action-vehicle-whitelist-add")){
      openVehicleWhitelistModal();
      return;
    }
    const vehicleWhitelistEdit = e.target.closest(".action-vehicle-whitelist-edit");
    if(vehicleWhitelistEdit){
      openVehicleWhitelistModal({ plate: vehicleWhitelistEdit.dataset.whitelistPlate });
      return;
    }
    const vehicleWhitelistDelete = e.target.closest(".action-vehicle-whitelist-delete");
    if(vehicleWhitelistDelete){
      openVehicleWhitelistDeleteModal(vehicleWhitelistDelete.dataset.whitelistPlate);
      return;
    }
    if(e.target.closest(".action-vehicle-whitelist-export")){
      toast("已按当前筛选条件导出车辆白名单数据");
      return;
    }
    if(e.target.closest(".action-vehicle-import")){
      openVehicleImportModal();
      return;
    }
    if(e.target.closest(".action-vehicle-export")){
      toast("已按当前筛选条件导出车辆管理数据");
      return;
    }
    if(e.target.closest(".action-vehicle-batch-auth")){
      if(selectedVehicleIds.size === 0){ toast("请先选择需要批量授权的车辆"); return; }
      openVehicleBatchAuthModal();
      return;
    }
    const vehicleEdit = e.target.closest(".action-vehicle-edit");
    if(vehicleEdit){
      openVehicleCreateModal({ plate: vehicleEdit.dataset.vehiclePlate });
      return;
    }
    const vehicleAuthRangeDelete = e.target.closest(".action-vehicle-auth-range-delete");
    if(vehicleAuthRangeDelete){
      vehicleAuthRangeDelete.closest("tr")?.remove();
      return;
    }
    if(e.target.closest(".vehicle-auth-add-range")){
      const tbody = document.querySelector(".vehicle-auth-range-table tbody");
      if(tbody) tbody.insertAdjacentHTML("beforeend", `<tr><td><select class="control"><option>南侧广场车场</option><option>冷链物流车场</option><option>东门临时车场</option></select></td><td><select class="control"><option>南入口、南出口</option><option>南入口</option><option>南出口</option><option>全部出入口</option></select></td><td><button class="btn text danger action-vehicle-auth-range-delete" type="button">删除</button></td></tr>`);
      return;
    }
    const vehicleAuth = e.target.closest(".action-vehicle-auth");
    if(vehicleAuth){
      openVehicleAuthModal(vehicleAuth.dataset.vehiclePlate);
      return;
    }
    const vehicleDelete = e.target.closest(".action-vehicle-delete");
    if(vehicleDelete){
      openVehicleDeleteModal(vehicleDelete.dataset.vehiclePlate);
      return;
    }
    if(e.target.closest(".action-detail")){
      const detailButton = e.target.closest(".action-detail");
      if(currentModule==="person"&&(currentTab.person||"人员档案")==="人员轨迹"){
        openPersonnelTrackDetail(detailButton.dataset.personCode);
      } else if(currentModule==="access"&&(currentTab.access||"通行时间段")==="门禁权限组"){
        openAccessPermissionGroupDrawer(detailButton.dataset.accessGroupName || "主楼门禁组");
      } else if(currentModule==="alarm"&&(currentTab.alarm||"告警配置")==="告警事件"){
        openSecurityAlarmDrawer(detailButton.textContent.trim());
      } else {
        if(currentModule==="visitor"&&(currentTab.visitor||"访客管理")==="访客管理"){
          const row = decodeRowDataset(detailButton.dataset.visitorRow);
          currentVisitorDetail = row ? visitorDetailFromRow(row) : null;
        }
        if(currentModule==="visitor"&&(currentTab.visitor||"访客管理")==="安防审批"){
          const row = decodeRowDataset(detailButton.dataset.visitorApprovalRow);
          currentVisitorSecurityApprovalDetail = row ? visitorSecurityApprovalDetailFromRow(row) : null;
        }
        if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="特殊车辆通行记录"){
          currentSpecialVehicleRecordDetailRow = decodeRowDataset(detailButton.dataset.specialVehicleRecordRow) || null;
        }
        if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="巡检任务"){
          const taskIndex = Number(detailButton.dataset.inspectionTaskIndex);
          currentInspectionTaskDetail = Number.isInteger(taskIndex) ? inspectionTaskRows[taskIndex] : inspectionTaskRows[0];
        }
        if(currentModule==="alarm"&&(currentTab.alarm||"告警配置")==="巡检工单"){
          const row = decodeRowDataset(detailButton.dataset.alarmWorkorderRow);
          currentAlarmInspectionWorkorderDetail = row ? alarmInspectionWorkorderDetailFromRow(row) : alarmInspectionWorkorderDetailFromRow(getTabConfig("alarm", "巡检工单").rows[0]);
        }
        if(currentModule==="alarm"&&(currentTab.alarm||"告警配置")==="安防工单"){
          const row = decodeRowDataset(detailButton.dataset.securityWorkorderRow);
          currentSecurityWorkorderDetail = securityWorkorderDetailFromRow(row || securityWorkorderRows()[0]);
        }
        if(currentModule==="video"&&(currentTab.video||"监控设备")==="监控设备"){
          currentVideoDeviceDetailCode = detailButton.dataset.deviceCode || currentVideoDeviceDetailCode;
        }
        renderDrawer(currentModule);
      }
      return;
    }
    const accessGroupDetailTab = e.target.closest("[data-access-group-detail-tab]");
    if(accessGroupDetailTab){
      rerenderAccessPermissionGroupDetailDrawer(accessGroupDetailTab.dataset.accessGroupDetailTab);
      return;
    }
    if(e.target.closest(".action-company-personnel")){ openCompanyPersonnelDrawer(e.target.closest(".action-company-personnel")); return; }
    const patrolRoutePoints = e.target.closest(".action-patrol-route-points");
    if(patrolRoutePoints){ openPatrolRoutePointsDrawer(patrolRoutePoints.dataset.routeName || "园区主干道视频路线"); return; }
    const patrolPlanDetail = e.target.closest(".action-patrol-plan-detail");
    if(patrolPlanDetail){ openPatrolPlanDetailDrawer(patrolPlanRowFromDataset(patrolPlanDetail.dataset.patrolPlanRow)); return; }
    const inspectionPlanDetail = e.target.closest(".action-inspection-plan-detail");
    if(inspectionPlanDetail){ openInspectionPlanDetailDrawer(inspectionPlanRowFromDataset(inspectionPlanDetail.dataset.inspectionPlanRow)); return; }
    if(e.target.closest(".action-patrol-point-add")){ openPatrolPointDeviceDrawer(); return; }
    const pointDetail = e.target.closest(".action-point-detail");
    if(pointDetail){
      openInspectionPointDetail({
        name: pointDetail.dataset.pointName,
        result: pointDetail.dataset.pointResult,
        inspector: pointDetail.dataset.pointInspector,
        time: pointDetail.dataset.pointTime
      });
      return;
    }
    if(e.target.closest("[data-action='绑定新房间']")){ openRoomPickerModal(); return; }
    const unbindRoom=e.target.closest("[data-action='解绑房间']");
    if(unbindRoom){ openRoomUnbindConfirm(unbindRoom.dataset.roomName || "当前房间"); return; }
    const removeRoom=e.target.closest("[data-remove-room]");
    if(removeRoom){ selectedCompanyRoomIds.delete(removeRoom.dataset.removeRoom); const checkbox=document.querySelector(`[data-room-check="${removeRoom.dataset.removeRoom}"]`); if(checkbox) checkbox.checked=false; renderSelectedRoomArea(); return; }
    const roomCheck=e.target.closest("[data-room-check]");
    if(roomCheck){ if(roomCheck.checked) selectedCompanyRoomIds.add(roomCheck.dataset.roomCheck); else selectedCompanyRoomIds.delete(roomCheck.dataset.roomCheck); renderSelectedRoomArea(); return; }
    const cardCheck=e.target.closest("[data-card-check]");
    if(cardCheck){ if(cardCheck.checked) selectedCardIds.add(cardCheck.dataset.cardCheck); else selectedCardIds.delete(cardCheck.dataset.cardCheck); renderPage("person"); return; }
    const vehicleCheck=e.target.closest("[data-vehicle-check]");
    if(vehicleCheck){ if(vehicleCheck.checked) selectedVehicleIds.add(vehicleCheck.dataset.vehicleCheck); else selectedVehicleIds.delete(vehicleCheck.dataset.vehicleCheck); renderPage("vehicle"); return; }
    if(e.target.closest(".action-card-rules")){ openCardRulesModal(); return; }
    if(e.target.closest(".action-patrol-task-status-rules")){ openPatrolTaskStatusRulesModal(); return; }
    if(e.target.closest(".action-vehicle-record-note")){ openVehicleRecordNoteModal(); return; }
    if(e.target.closest(".action-vehicle-mobile-release")){ openVehicleMobileReleaseModal(); return; }
    const cardIssue=e.target.closest(".action-card-issue");
    if(cardIssue){ openCardIssueModal(cardIssue.dataset.cardNo || ""); return; }
    if(e.target.closest(".action-card-read")){ const input=document.querySelector(".card-no-line input"); if(input) input.value = "800088"; toast("读卡成功，物理卡号已自动填充"); return; }
    if(e.target.closest(".action-card-import")){ openCardImportModal(); return; }
    if(e.target.closest(".action-card-export")){ toast("已按当前筛选条件导出卡片数据"); return; }
    if(e.target.closest(".action-visitor-mobile")){ openVisitorMobilePreviewModal(); return; }
    if(e.target.closest(".action-visitor-export")){ toast("已按当前筛选条件导出访客管理数据"); return; }
    const cardBatch=e.target.closest(".action-card-batch");
    if(cardBatch){ if(selectedCardIds.size===0) openCardSelectionRequired(); else openCardConfirm(cardBatch.dataset.cardAct, selectedCardIds.size); return; }
    const cardConfirm=e.target.closest(".action-card-confirm");
    if(cardConfirm){ openCardConfirm(cardConfirm.dataset.cardAct, 1); return; }
    if(e.target.closest(".access-time-add-row")){
      const rows = document.querySelector(".access-time-rows");
      if(rows){
        const index = rows.querySelectorAll(".access-time-row").length + 1;
        rows.insertAdjacentHTML("beforeend", `<div class="access-time-row"><span>${index}</span><div><label class="required">开始时间</label><input class="control" type="time"></div><div><label class="required">结束时间</label><input class="control" type="time"></div><button class="btn text danger access-time-delete-row" type="button">删除</button></div>`);
      }
      return;
    }
    const accessTimeDelete=e.target.closest(".access-time-delete-row");
    if(accessTimeDelete){
      const rows = document.querySelectorAll(".access-time-row");
      if(rows.length <= 1){ toast("至少保留一个时间段"); return; }
      accessTimeDelete.closest(".access-time-row").remove();
      document.querySelectorAll(".access-time-row > span").forEach((item,index)=>{ item.textContent = index + 1; });
      return;
    }
    if(e.target.closest(".action-patrol-plan-save")){
      const count = patrolPlanFrequencyState.counts[patrolPlanFrequency] || 1;
      if(patrolPlanFrequency === "每周" && patrolPlanFrequencyState.weekdays.length !== count){
        toast(`每周巡检次数为 ${count} 次，请选择 ${count} 个星期`);
        return;
      }
      if(patrolPlanFrequency === "每月" && patrolPlanFrequencyState.monthDays.length !== count){
        toast(`每月巡检次数为 ${count} 次，请选择 ${count} 个日期`);
        return;
      }
      if(patrolPlanFrequency === "每季度" && patrolPlanFrequencyState.quarterAnchors.length !== count){
        toast(`每季度巡检次数为 ${count} 次，请选择 ${count} 个季度日期`);
        return;
      }
      if(patrolPlanFrequency === "自定义" && patrolPlanFrequencyState.customDates.length < 1){
        toast("自定义巡检至少需要选择 1 个日期");
        return;
      }
      if(!validatePatrolTimeRows(true)){
        toast("请完善巡检任务生成时间");
        return;
      }
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("巡更计划已保存，后续任务将按配置生成");
      return;
    }
    if(e.target.closest(".action-inspection-plan-save")){
      const count = patrolPlanFrequencyState.counts[patrolPlanFrequency] || 1;
      if(patrolPlanFrequency === "每周" && patrolPlanFrequencyState.weekdays.length !== count){
        toast(`每周巡检次数为 ${count} 次，请选择 ${count} 个星期`);
        return;
      }
      if(patrolPlanFrequency === "每月" && patrolPlanFrequencyState.monthDays.length !== count){
        toast(`每月巡检次数为 ${count} 次，请选择 ${count} 个日期`);
        return;
      }
      if(!validatePatrolTimeRows(true)){
        toast("请完善巡检任务生成时间");
        return;
      }
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("巡检计划已保存，后续任务将按配置生成");
      return;
    }
    const patrolWeekday = e.target.closest(".patrol-weekdays button");
    if(patrolWeekday){
      const day = patrolWeekday.dataset.patrolWeekday;
      const selected = patrolPlanFrequencyState.weekdays;
      if(selected.includes(day)) patrolPlanFrequencyState.weekdays = selected.filter(item => item !== day);
      else if(selected.length < patrolPlanFrequencyState.counts["每周"]) patrolPlanFrequencyState.weekdays = [...selected, day];
      else { toast(`每周巡检次数为 ${patrolPlanFrequencyState.counts["每周"]} 次，不能选择更多星期`); return; }
      rerenderPatrolFrequencyPanel();
      return;
    }
    const patrolMonthDay = e.target.closest(".patrol-month-days button");
    if(patrolMonthDay){
      const day = Number(patrolMonthDay.dataset.patrolMonthDay);
      const selected = patrolPlanFrequencyState.monthDays;
      if(selected.includes(day)) patrolPlanFrequencyState.monthDays = selected.filter(item => item !== day);
      else if(selected.length < patrolPlanFrequencyState.counts["每月"]) patrolPlanFrequencyState.monthDays = [...selected, day].sort((a,b)=>a-b);
      else { toast(`每月巡检次数为 ${patrolPlanFrequencyState.counts["每月"]} 次，不能选择更多日期`); return; }
      rerenderPatrolFrequencyPanel();
      return;
    }
    const patrolCustomDateAdd = e.target.closest(".action-patrol-custom-date-add");
    if(patrolCustomDateAdd){
      const dateOptions = ["01-01", "04-01", "07-01", "10-01"];
      const nextDate = dateOptions.find(date => !patrolPlanFrequencyState.customDates.includes(date)) || "01-01";
      patrolPlanFrequencyState.customDates = [...patrolPlanFrequencyState.customDates, nextDate];
      rerenderPatrolFrequencyPanel();
      return;
    }
    const patrolCustomDateDelete = e.target.closest("[data-patrol-custom-date-delete]");
    if(patrolCustomDateDelete){
      if(patrolPlanFrequencyState.customDates.length <= 1){
        toast("自定义巡检至少保留 1 个日期");
        return;
      }
      const index = Number(patrolCustomDateDelete.dataset.patrolCustomDateDelete);
      patrolPlanFrequencyState.customDates = patrolPlanFrequencyState.customDates.filter((_, itemIndex) => itemIndex !== index);
      rerenderPatrolFrequencyPanel();
      return;
    }
    if(e.target.closest(".action-add")){
      const x=e.target.closest(".action-add");
      const companyTab=currentTab.company||"企业信息";
      if(currentModule==="device"&&(currentTab.device||"设备管理")==="设备管理"){ toast("新增操作已保留，暂不展示交互"); return; }
      if(currentModule==="person"&&(currentTab.person||"人员档案")==="人员档案") openPersonFormDrawer();
      else if(currentModule==="access"&&(currentTab.access||"通行时间段")==="通行时间段") openAccessTimePeriodModal();
      else if(currentModule==="access"&&(currentTab.access||"通行时间段")==="门禁权限组") openAccessPermissionGroupModal();
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="车辆管理") openVehicleCreateModal();
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="车辆黑名单") openVehicleBlacklistModal();
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="车辆白名单") openVehicleWhitelistModal();
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="特殊车辆管理") openSpecialVehicleModal();
      else if(currentModule==="company"&&companyTab==="企业信息"&&x.textContent.includes("关联房间")) openCompanyRoomsModal(x);
      else if(currentModule==="company"&&companyTab==="房间关联"&&x.textContent.includes("批量绑定")) openCompanyRoomBatchModal();
      else if(currentModule==="perimeter"&&(currentTab.perimeter||"周界设置")==="周界设置") openPerimeterTaskDrawer();
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="巡检路线") openInspectionRouteDrawer(false);
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="巡检任务") openInspectionTaskModal(false);
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="自定义标签") openInspectionTagBatchModal();
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="自定义区域") openInspectionAreaBatchModal();
      else openModal(x.textContent);
      return;
    }
    if(e.target.closest(".action-import")){
      if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="巡检点") openInspectionPointImportModal();
      else openPersonImportModal();
      return;
    }
    if(e.target.closest(".action-mobile-face")){ openMobileFaceCollectModal(); return; }
    if(e.target.closest(".action-face-send")){ mobileFaceState.step = "sent"; renderMobileFaceCollectBody(); toast("已生成小程序采集链接并发送通知"); return; }
    if(e.target.closest(".action-face-open")){ mobileFaceState.step = "opened"; renderMobileFaceCollectBody(); toast("已模拟人员打开小程序采集页"); return; }
    if(e.target.closest(".action-face-start")){ mobileFaceState.step = "capturing"; renderMobileFaceCollectBody(); return; }
    if(e.target.closest(".action-face-capture-done")){ mobileFaceState.step = "success"; renderMobileFaceCollectBody(); toast("小程序端人脸采集成功，待提交回写"); return; }
    if(e.target.closest(".action-face-retake")){ mobileFaceState.step = "opened"; renderMobileFaceCollectBody(); return; }
    if(e.target.closest(".action-face-sync")){ mobileFaceState.step = "synced"; renderMobileFaceCollectBody(); toast("人脸照片已回写人员档案"); return; }
    if(e.target.closest(".action-face-reset")){ mobileFaceState = { step: "draft", personCode: mobileFaceState.personCode, agreed: true }; renderMobileFaceCollectBody(); return; }
    if(e.target.closest(".action-template-download")){ toast("人员导入模版已下载"); return; }
    if(e.target.closest(".action-person-save")){ document.getElementById("drawerOverlay").classList.remove("show"); toast("人员信息已保存"); return; }
    const personDetail = e.target.closest(".action-person-detail");
    if(personDetail){ openPersonDetailDrawer(personDetail.dataset.personName, personDetail.dataset.personCode); return; }
    const resignedDelete=e.target.closest(".action-resigned-delete");
    if(resignedDelete){ openResignedPersonDeleteModal(resignedDelete.dataset.personName, resignedDelete.dataset.personCode); return; }
    const areaPoints=e.target.closest(".action-area-points");
    if(areaPoints){ toast(`${areaPoints.dataset.areaName} 已关联 ${areaPoints.textContent} 个巡检点`); return; }
    const inspectionRouteDetail=e.target.closest(".action-inspection-route-detail");
    if(inspectionRouteDetail){ openInspectionRouteDetailDrawer(decodeInspectionRouteRow(inspectionRouteDetail.dataset.inspectionRouteRow)); return; }
    const deviceBindLocation=e.target.closest(".action-device-bind-location");
    if(deviceBindLocation){
      openSecurityDeviceLocationModal(JSON.parse(decodeURIComponent(deviceBindLocation.dataset.deviceRow || "%5B%5D")));
      return;
    }
    if(e.target.closest(".action-device-edit")){
      toast("编辑操作已保留，暂不展示交互");
      return;
    }
    if(e.target.closest(".action-device-delete")){
      toast("删除操作已保留，暂不展示交互");
      return;
    }
    if(e.target.closest(".action-edit")){
      const x=e.target.closest(".action-edit");
      if(currentModule==="person"&&(currentTab.person||"人员档案")==="人员档案") openPersonFormDrawer(true);
      else if(currentModule==="person"&&(currentTab.person||"人员档案")==="人员黑名单") openPersonBlacklistModal({ mode:"edit", selectedCode:x.dataset.blacklistCode, reason:x.dataset.blacklistReason, timeRange:x.dataset.blacklistTime });
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="车辆黑名单") openVehicleBlacklistModal({ plate:x.dataset.blacklistPlate });
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="车辆白名单") openVehicleWhitelistModal({ plate:x.dataset.whitelistPlate });
      else if(currentModule==="vehicle"&&(currentTab.vehicle||"车场配置")==="特殊车辆管理") openSpecialVehicleModal({ plate:x.dataset.specialPlate });
      else if(currentModule==="alarm"&&(currentTab.alarm||"告警配置")==="告警配置") openAlarmConfigModal({ alarmType:x.dataset.alarmType, alarmLevel:x.dataset.alarmLevel, remark:x.dataset.alarmRemark });
      else if(currentModule==="access"&&(currentTab.access||"通行时间段")==="通行时间段") openAccessTimePeriodModal(true);
      else if(currentModule==="access"&&(currentTab.access||"通行时间段")==="门禁权限组") openAccessPermissionGroupModal(true, x.dataset.accessGroupName || "主楼门禁组");
      else if(currentModule==="perimeter"&&(currentTab.perimeter||"周界设置")==="周界设置") openPerimeterTaskDrawer(true);
      else if(currentModule==="patrol"&&(currentTab.patrol||"视频巡检路线")==="视频巡检路线") openModal("修改视频巡检路线");
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="巡检路线") openInspectionRouteDrawer(true, decodeInspectionRouteRow(x.dataset.inspectionRouteRow));
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="巡检任务") openInspectionTaskModal(true);
      else if(currentModule==="inspection"&&(currentTab.inspection||"巡检点")==="自定义区域") openInspectionAreaEditModal(x.dataset.areaName, x.dataset.areaPark);
      else openModal("编辑"+(currentTab[currentModule]||modules.find(x=>x.id===currentModule).tabs[0]));
      return;
    }
    const accessGroupDevices = e.target.closest(".action-access-group-devices");
    if(accessGroupDevices){
      const layer = document.getElementById("drawer")?.classList.contains("access-group-drawer") && accessGroupDevices.closest("#drawer") ? "sub" : "main";
      openAccessGroupDevicesDrawer(accessGroupDevices.dataset.accessGroupName || "主楼门禁组", { layer });
      return;
    }
    const accessGroupDeviceRemove = e.target.closest(".action-access-group-device-remove");
    if(accessGroupDeviceRemove){
      const deviceName = accessGroupDeviceRemove.dataset.accessGroupDeviceName || "该设备";
      if(!confirm(`确认将“${deviceName}”从当前门禁权限组移除吗？移除后该设备不再接收本权限组的人员权限下发。`)) return;
      if(removeAccessPermissionGroupDevice(accessGroupDeviceRemove.dataset.accessGroupDeviceCode)){
        rerenderAccessPermissionGroupDetailDrawer("关联设备");
        toast("已移除关联设备，权限下发范围已更新");
      }
      return;
    }
    const accessGroupAuth = e.target.closest(".action-access-group-auth");
    if(accessGroupAuth){ openAccessGroupAuthorizeDrawer(accessGroupAuth.dataset.accessGroupName || "主楼门禁组"); return; }
    if(e.target.closest(".action-access-group-detail-query")){
      const keywordInput = document.querySelector("[data-access-group-detail-keyword]");
      if(accessGroupDetailFilterState.activeTab === "关联设备") accessGroupDetailFilterState.deviceKeyword = keywordInput ? keywordInput.value.trim() : "";
      else accessGroupDetailFilterState.peopleKeyword = keywordInput ? keywordInput.value.trim() : "";
      rerenderAccessPermissionGroupDetailDrawer();
      return;
    }
    if(e.target.closest(".action-access-group-detail-reset")){
      if(accessGroupDetailFilterState.activeTab === "关联设备") accessGroupDetailFilterState.deviceKeyword = "";
      else accessGroupDetailFilterState.peopleKeyword = "";
      rerenderAccessPermissionGroupDetailDrawer();
      return;
    }
    const accessAuthMode = e.target.closest("[data-access-auth-mode]");
    if(accessAuthMode){
      accessAuthorizeState.mode = accessAuthMode.dataset.accessAuthMode;
      rerenderAccessAuthorizeDrawer();
      return;
    }
    if(e.target.closest(".action-access-auth-query")){
      const departmentInput = document.querySelector("[data-access-auth-department-keyword]");
      const personInput = document.querySelector("[data-access-auth-person-keyword]");
      if(accessAuthorizeState.mode === "department") accessAuthorizeState.departmentKeyword = departmentInput ? departmentInput.value.trim() : "";
      else accessAuthorizeState.personKeyword = personInput ? personInput.value.trim() : "";
      rerenderAccessAuthorizeDrawer();
      return;
    }
    if(e.target.closest(".action-access-auth-reset")){
      if(accessAuthorizeState.mode === "department") accessAuthorizeState.departmentKeyword = "";
      else accessAuthorizeState.personKeyword = "";
      rerenderAccessAuthorizeDrawer();
      return;
    }
    const accessDeviceRemove = e.target.closest("[data-access-device-remove]");
    if(accessDeviceRemove){
      accessDevicePickerState.selectedCodes.delete(accessDeviceRemove.dataset.accessDeviceRemove);
      rerenderAccessDeviceDrawer();
      return;
    }
    const accessDevicePage = e.target.closest("[data-access-device-page]");
    if(accessDevicePage){
      const totalPages = Math.max(1, Math.ceil(accessDeviceFilteredDevices().length / accessDevicePickerState.pageSize));
      const target = accessDevicePage.dataset.accessDevicePage;
      if(target === "prev") accessDevicePickerState.currentPage = Math.max(1, accessDevicePickerState.currentPage - 1);
      else if(target === "next") accessDevicePickerState.currentPage = Math.min(totalPages, accessDevicePickerState.currentPage + 1);
      else accessDevicePickerState.currentPage = Number(target) || 1;
      rerenderAccessDeviceDrawer();
      return;
    }
    if(e.target.closest(".action-access-device-query")){
      const keywordInput = document.querySelector("[data-access-device-keyword]");
      accessDevicePickerState.keyword = keywordInput ? keywordInput.value.trim() : "";
      accessDevicePickerState.currentPage = 1;
      rerenderAccessDeviceDrawer();
      return;
    }
    if(e.target.closest(".action-access-device-reset")){
      accessDevicePickerState.keyword = "";
      accessDevicePickerState.currentPage = 1;
      rerenderAccessDeviceDrawer();
      return;
    }
    if(e.target.closest(".action-access-device-save")){
      const addCount = accessGroupAddSelectedDevices();
      if(addCount === 0){ toast("请先选择需要新增关联的设备"); return; }
      if(accessDevicePickerState.layer === "sub"){
        document.getElementById("subDrawerOverlay").classList.remove("show");
        rerenderAccessPermissionGroupDetailDrawer("关联设备");
      } else {
        document.getElementById("drawerOverlay").classList.remove("show");
        resetMainDrawerChrome();
        if(currentModule === "access") renderPage("access");
      }
      toast(`已新增关联 ${addCount} 台设备，系统将生成权限下发任务`);
      return;
    }
    if(e.target.closest(".action-access-authorize-save")){
      const count = accessAuthorizeSelectedRows().length;
      if(count === 0){ toast(`请先选择${accessAuthorizeState.mode === "department" ? "部门" : "人员"}`); return; }
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("授权已保存，人员权限将下发至关联设备");
      return;
    }
    if(e.target.closest(".action-patrol-device-save")){
      document.getElementById("subDrawerOverlay").classList.remove("show");
      resetSubDrawerChrome();
      toast("已新增选中设备为路线点位");
      return;
    }
    const removeInspectionRoutePoint = e.target.closest(".inspection-route-point-remove");
    if(removeInspectionRoutePoint){
      updateInspectionRoutePointSelection(removeInspectionRoutePoint.dataset.removePoint, false);
      return;
    }
    const routePointCheckAll = e.target.closest("[data-route-point-check-all]");
    if(routePointCheckAll){
      setAllInspectionRoutePointSelection(routePointCheckAll.checked);
      return;
    }
    const routePointCheck = e.target.closest("[data-route-point-check]");
    if(routePointCheck){
      const row = routePointCheck.closest(".inspection-route-point-row");
      updateInspectionRoutePointSelection(row?.dataset.routePointName, routePointCheck.checked);
      return;
    }
    const routePointRow = e.target.closest(".inspection-route-point-row");
    if(routePointRow){
      updateInspectionRoutePointSelection(routePointRow.dataset.routePointName, !routePointRow.classList.contains("is-selected"));
      return;
    }
    if(e.target.closest(".action-inspection-route-save")){
      const requiredControls = [...document.querySelectorAll(".inspection-route-drawer [data-route-required]")];
      const missing = requiredControls.some(control => !String(control.value || "").trim());
      if(missing){ toast("请完善巡检路线、所属园区和预估时间"); return; }
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("巡检路线已保存");
      return;
    }
    const patrolSpace = e.target.closest("[data-patrol-space]");
    if(patrolSpace){
      patrolDevicePickerState.activeSpace = patrolSpace.dataset.patrolSpace;
      if(patrolSpace.dataset.hasChildren === "1"){
        if(patrolDevicePickerState.expandedSpaces.has(patrolSpace.dataset.patrolSpace)) patrolDevicePickerState.expandedSpaces.delete(patrolSpace.dataset.patrolSpace);
        else patrolDevicePickerState.expandedSpaces.add(patrolSpace.dataset.patrolSpace);
      }
      rerenderPatrolDeviceDrawer();
      return;
    }
    const patrolDeviceRemove = e.target.closest(".action-patrol-device-remove");
    if(patrolDeviceRemove){
      patrolDevicePickerState.selectedCodes.delete(patrolDeviceRemove.dataset.deviceCode);
      rerenderPatrolDeviceDrawer();
      return;
    }
    const patrolDeviceCheck = e.target.closest(".action-patrol-device-check");
    if(patrolDeviceCheck){
      if(patrolDeviceCheck.checked) patrolDevicePickerState.selectedCodes.add(patrolDeviceCheck.dataset.deviceCode);
      else patrolDevicePickerState.selectedCodes.delete(patrolDeviceCheck.dataset.deviceCode);
      rerenderPatrolDeviceDrawer();
      return;
    }
    const patrolDeviceCheckAll = e.target.closest(".action-patrol-device-check-all");
    if(patrolDeviceCheckAll){
      patrolDevicePickerFilteredRows().forEach(row => {
        if(patrolDeviceCheckAll.checked) patrolDevicePickerState.selectedCodes.add(row[1]);
        else patrolDevicePickerState.selectedCodes.delete(row[1]);
      });
      rerenderPatrolDeviceDrawer();
      return;
    }
    const patrolPointMove = e.target.closest(".action-patrol-point-move");
    if(patrolPointMove){
      toast(patrolPointMove.dataset.direction === "up" ? "点位已上移" : "点位已下移");
      return;
    }
    const patrolPlanDelete = e.target.closest(".action-patrol-plan-delete");
    if(patrolPlanDelete){
      openPatrolPlanDeleteModal(patrolPlanDelete.dataset.planName || "该巡检计划");
      return;
    }
    const scheduleMonthStep = e.target.closest("[data-schedule-month-step]");
    if(scheduleMonthStep){
      scheduleCalendarState.month += Number(scheduleMonthStep.dataset.scheduleMonthStep || 0);
      if(scheduleCalendarState.month < 1){ scheduleCalendarState.month = 12; scheduleCalendarState.year -= 1; }
      if(scheduleCalendarState.month > 12){ scheduleCalendarState.month = 1; scheduleCalendarState.year += 1; }
      renderPage("schedule");
      return;
    }
    if(e.target.closest("[data-schedule-month-today]")){
      scheduleCalendarState = { year: 2026, month: 7 };
      renderPage("schedule");
      return;
    }
    if(e.target.closest(".action-confirm")){ const x=e.target.closest(".action-confirm");openModal(x.dataset.act||x.textContent,"confirm");return; }
    if(e.target.closest(".action-special-vehicle-add")){ openSpecialVehicleModal(); return; }
    const specialEdit=e.target.closest(".action-special-vehicle-edit");
    if(specialEdit){ openSpecialVehicleModal({ plate:specialEdit.dataset.specialPlate }); return; }
    const specialDelete=e.target.closest(".action-special-vehicle-delete");
    if(specialDelete){ openSpecialVehicleDeleteModal(specialDelete.dataset.specialPlate); return; }
    if(e.target.closest(".action-special-vehicle-export")){ toast("已按当前筛选条件导出特殊车辆数据"); return; }
    if(e.target.closest(".action-schedule-adjust")){
      const x=e.target.closest(".action-schedule-adjust");
      if(x.dataset.act === "设置排班") openScheduleAssignModal(x.dataset.scheduleDate || "");
      else openModal(x.dataset.act || "排班调整");
      return;
    }
    if(e.target.closest(".action-business")){
      const x=e.target.closest(".action-business");
      if(currentModule==="alarm"&&(currentTab.alarm||"告警配置")==="告警事件"){
        const alarmId = x.closest("tr")?.querySelector(".action-detail")?.textContent.trim();
        openSecurityAlarmOperationModal(x.dataset.act||x.textContent.trim(), alarmId);
        return;
      }
      openModal(x.dataset.act||x.textContent,"confirm");
      return;
    }
    if(e.target.closest(".action-track-query")){ openPersonnelTrackQueryDrawer(); return; }
    if(e.target.closest(".action-inspection-point-query")){
      inspectionPointFilterState.name = document.querySelector("[data-point-filter='name']")?.value || "";
      inspectionPointFilterState.area = document.querySelector("[data-point-filter='area']")?.value || "全部";
      inspectionPointFilterState.tag = document.querySelector("[data-point-filter='tag']")?.value || "全部";
      inspectionPointFilterState.park = document.querySelector("[data-point-filter='park']")?.value || "全部";
      renderPage("inspection");
      toast("查询完成，已按当前条件刷新数据");
      return;
    }
    if(e.target.closest(".action-inspection-point-reset")){
      inspectionPointFilterState = { name: "", area: "全部", tag: "全部", park: "全部" };
      renderPage("inspection");
      toast("筛选条件已重置");
      return;
    }
    if(e.target.closest(".action-inspection-tag-query")){
      inspectionTagFilterState.name = document.querySelector("[data-tag-filter='name']")?.value || "";
      inspectionTagFilterState.park = document.querySelector("[data-tag-filter='park']")?.value || "全部";
      renderPage("inspection");
      toast("查询完成，已按当前条件刷新数据");
      return;
    }
    if(e.target.closest(".action-inspection-tag-reset")){
      inspectionTagFilterState = { name: "", park: "全部" };
      renderPage("inspection");
      toast("筛选条件已重置");
      return;
    }
    if(e.target.closest(".action-inspection-area-query")){
      inspectionAreaFilterState.name = document.querySelector("[data-area-filter='name']")?.value || "";
      inspectionAreaFilterState.park = document.querySelector("[data-area-filter='park']")?.value || "全部";
      renderPage("inspection");
      toast("查询完成，已按当前条件刷新数据");
      return;
    }
    if(e.target.closest(".action-inspection-area-reset")){
      inspectionAreaFilterState = { name: "", park: "全部" };
      renderPage("inspection");
      toast("筛选条件已重置");
      return;
    }
    if(e.target.closest(".action-query")){ toast("查询完成，已按当前条件刷新数据"); return; }
    if(e.target.closest(".action-reset")){ document.querySelectorAll(".filter-card input, .access-issue-detail-filter input").forEach(x=>x.value="");document.querySelectorAll(".filter-card select, .access-issue-detail-filter select").forEach(x=>x.selectedIndex=0);toast("筛选条件已重置");return; }
    const inspectionTaskBatch = e.target.closest(".action-inspection-task-batch");
    if(inspectionTaskBatch){ openInspectionTaskBatchModal(inspectionTaskBatch.dataset.act || inspectionTaskBatch.textContent.trim()); return; }
    if(e.target.closest(".action-batch")){ openModal("批量操作","confirm");return; }
    const patrolPlanTab = e.target.closest("[data-patrol-plan-tab]");
    if(patrolPlanTab && currentPatrolPlanDetail){
      document.getElementById("drawerBody").innerHTML = renderPatrolPlanDetailHtml(currentPatrolPlanDetail, patrolPlanTab.dataset.patrolPlanTab);
      return;
    }
    const alarmWorkorderDetailTab = e.target.closest("[data-alarm-workorder-detail-tab]");
    if(alarmWorkorderDetailTab){
      document.getElementById("drawerBody").innerHTML = renderAlarmInspectionWorkorderDetail(alarmWorkorderDetailTab.dataset.alarmWorkorderDetailTab);
      return;
    }
    const securityWorkorderDetailTab = e.target.closest("[data-security-workorder-detail-tab]");
    if(securityWorkorderDetailTab){
      document.getElementById("drawerBody").innerHTML = renderSecurityWorkorderDetail(securityWorkorderDetailTab.dataset.securityWorkorderDetailTab);
      return;
    }
    const dt=e.target.closest("[data-drawer-tab]");
    if(dt){ document.querySelectorAll("[data-drawer-tab]").forEach(x=>x.classList.toggle("active",x===dt));document.getElementById("drawerBody").innerHTML=drawerContent(currentModule,dt.dataset.drawerTab); }
  });
  document.addEventListener("dblclick",e=>{
    const videoTile = e.target.closest("[data-video-tile]");
    if(videoTile){
      clearTimeout(videoTileClickTimer);
      const device = videoDeviceByCode(videoTile.dataset.videoTile);
      const blocked = videoBlockedMessage(device, "realtime");
      if(blocked){ toast(blocked); return; }
      videoState.realtimeDeviceCode = device.code;
      videoState.realtimePlaying = true;
      videoState.realtimePtzVisible = true;
      renderPage("video");
      toast(`已打开云台控制：${device.name}`);
      return;
    }
  });
  document.addEventListener("input",e=>{
    const areaLinesControl = e.target.closest("[data-area-lines-control]");
    if(areaLinesControl){
      syncInspectionAreaLineNumbers(areaLinesControl);
      return;
    }
    const videoTreeSearch = e.target.closest("[data-video-tree-search]");
    if(videoTreeSearch){
      videoState.treeKeyword = videoTreeSearch.value.trim();
      renderPage("video");
      setTimeout(()=>{
        const nextInput = document.querySelector("[data-video-tree-search]");
        if(nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(nextInput.value.length, nextInput.value.length);
        }
      }, 0);
      return;
    }
    const playbackProgress = e.target.closest("[data-playback-progress]");
    if(playbackProgress){
      videoState.playbackProgress = Number(playbackProgress.value) || 0;
      const progressText = playbackProgress.nextElementSibling;
      if(progressText) progressText.textContent = `${videoState.playbackProgress}% / 120:00`;
      return;
    }
    const patrolFrequencyCount = e.target.closest("[data-patrol-frequency-count]");
    if(patrolFrequencyCount){
      updatePatrolFrequencyCount(patrolFrequencyCount);
      return;
    }
    const patrolQuarterMonth = e.target.closest("[data-patrol-quarter-month]");
    if(patrolQuarterMonth){
      const index = Number(patrolQuarterMonth.dataset.patrolQuarterMonth);
      if(patrolPlanFrequencyState.quarterAnchors[index]) patrolPlanFrequencyState.quarterAnchors[index].month = patrolQuarterMonth.value;
      return;
    }
    const patrolQuarterDay = e.target.closest("[data-patrol-quarter-day]");
    if(patrolQuarterDay){
      const index = Number(patrolQuarterDay.dataset.patrolQuarterDay);
      if(patrolPlanFrequencyState.quarterAnchors[index]) patrolPlanFrequencyState.quarterAnchors[index].day = patrolQuarterDay.value;
      return;
    }
    const patrolCustomDate = e.target.closest("[data-patrol-custom-date]");
    if(patrolCustomDate){
      const index = Number(patrolCustomDate.dataset.patrolCustomDate);
      patrolPlanFrequencyState.customDates[index] = patrolCustomDate.value;
      return;
    }
    if(e.target.closest("[data-patrol-start-time], [data-patrol-end-time]")){
      validatePatrolTimeRows(false);
      return;
    }
  });
  document.addEventListener("scroll",e=>{
    const areaLinesControl = e.target.closest("[data-area-lines-control]");
    if(areaLinesControl) syncInspectionAreaLineNumbers(areaLinesControl);
  }, true);
  document.addEventListener("change",e=>{
    const perimeterRuleLevel = e.target.closest(".action-perimeter-rule-level");
    if(perimeterRuleLevel){
      syncActivePerimeterRuleLevel(perimeterRuleLevel.value);
      return;
    }
    const playbackSpeed = e.target.closest("[data-playback-speed]");
    if(playbackSpeed){
      videoState.playbackSpeed = playbackSpeed.value;
      toast(`已切换至 ${videoState.playbackSpeed} 倍速`);
      renderPage("video");
      return;
    }
    if(e.target.closest("[data-playback-start], [data-playback-end]")){
      syncPlaybackInputs();
      return;
    }
    const blacklistSelect = e.target.closest("[data-person-blacklist-select]");
    if(blacklistSelect){ updatePersonBlacklistInfo(blacklistSelect.value); return; }
    const inspectionTaskCheckAll = e.target.closest("[data-inspection-task-check-all]");
    if(inspectionTaskCheckAll){
      document.querySelectorAll("[data-inspection-task-check]").forEach(item => { item.checked = inspectionTaskCheckAll.checked; });
      updateInspectionTaskSelectedCount();
      return;
    }
    if(e.target.closest("[data-inspection-task-check]")){
      updateInspectionTaskSelectedCount();
      return;
    }
    const facePerson = e.target.closest(".action-face-person");
    if(facePerson){ mobileFaceState.personCode = facePerson.value; mobileFaceState.step = "draft"; renderMobileFaceCollectBody(); return; }
    const faceAgree = e.target.closest(".action-face-agree");
    if(faceAgree){ mobileFaceState.agreed = faceAgree.checked; renderMobileFaceCollectBody(); return; }
    const cardPersonSelect = e.target.closest("[data-card-person-select]");
    if(cardPersonSelect){ updateCardPersonFields(cardPersonSelect.value); return; }
    const vehiclePersonSelect = e.target.closest("[data-vehicle-person-select]");
    if(vehiclePersonSelect){ updateVehiclePersonFields(vehiclePersonSelect.value); return; }
    const scheduleMonthSelect = e.target.closest("[data-schedule-month-select]");
    if(scheduleMonthSelect){
      const [year, month] = scheduleMonthSelect.value.split("-").map(Number);
      scheduleCalendarState = { year, month };
      renderPage("schedule");
      return;
    }
    const scheduleAdjustType = e.target.closest("[data-schedule-adjust-type]");
    if(scheduleAdjustType){
      const alert = document.querySelector("#modalBody .alert");
      document.getElementById("modalBody").innerHTML = `${alert ? alert.outerHTML : ""}${renderScheduleAdjustFields(scheduleAdjustType.value)}`;
      return;
    }
    const releaseTypeSelect = e.target.closest("[data-release-type]");
    if(releaseTypeSelect){ syncVehicleReleaseTypeView(); return; }
    const releasePhotoInput = e.target.closest("[data-release-photo-input]");
    if(releasePhotoInput){ addVehicleReleasePhotosFromInput(releasePhotoInput); return; }
    const patrolFrequency = e.target.closest("[data-patrol-frequency]");
    if(patrolFrequency){
      patrolPlanFrequency = patrolFrequency.value;
      normalizePatrolPlanFrequencyState();
      rerenderPatrolFrequencyPanel();
      return;
    }
    const patrolFrequencyCount = e.target.closest("[data-patrol-frequency-count]");
    if(patrolFrequencyCount){
      updatePatrolFrequencyCount(patrolFrequencyCount);
      return;
    }
    if(e.target.closest("[data-patrol-start-time], [data-patrol-end-time]")){
      validatePatrolTimeRows(false);
      return;
    }
    const vehicleBlacklistLongTerm = e.target.closest("[data-vehicle-blacklist-long-term]");
    if(vehicleBlacklistLongTerm){
      const endInput = document.querySelector("[data-vehicle-blacklist-end]");
      if(endInput){
        endInput.disabled = vehicleBlacklistLongTerm.checked;
        if(vehicleBlacklistLongTerm.checked) endInput.value = "";
        else if(!endInput.value) endInput.value = "2026-12-31";
      }
      return;
    }
    const vehicleWhitelistLongTerm = e.target.closest("[data-vehicle-whitelist-long-term]");
    if(vehicleWhitelistLongTerm){
      const endInput = document.querySelector("[data-vehicle-whitelist-end]");
      if(endInput){
        endInput.disabled = vehicleWhitelistLongTerm.checked;
        if(vehicleWhitelistLongTerm.checked) endInput.value = "";
        else if(!endInput.value) endInput.value = "2026-12-31";
      }
      return;
    }
    const accessRepeatCycle = e.target.closest("[data-access-repeat-cycle]");
    if(accessRepeatCycle){
      syncAccessCustomCycleField();
      return;
    }
    const patrolPlanLongTerm = e.target.closest("[data-patrol-plan-long-term]");
    if(patrolPlanLongTerm){
      const endInput = document.querySelector("[data-patrol-plan-end-date]");
      if(endInput){
        endInput.disabled = patrolPlanLongTerm.checked;
        if(patrolPlanLongTerm.checked) endInput.value = "";
        else if(!endInput.value) endInput.value = "2026-12-31";
      }
      return;
    }
    const accessGroupSwitch = e.target.closest(".access-group-switch input");
    if(accessGroupSwitch){
      const label = accessGroupSwitch.closest(".access-group-switch").querySelector("b");
      if(label) label.textContent = accessGroupSwitch.checked ? "启用" : "停用";
      return;
    }
    const formSwitch = e.target.closest(".form-switch-control input");
    if(formSwitch){
      const label = formSwitch.closest(".form-switch-control").querySelector("b");
      if(label) label.textContent = formSwitch.checked ? "启用" : "禁用";
      return;
    }
    const accessDeviceCheck = e.target.closest("[data-access-device-check]");
    if(accessDeviceCheck){
      if(accessGroupSelectedDeviceCodes(accessPermissionGroupByName(accessDevicePickerState.groupName)).has(accessDeviceCheck.dataset.accessDeviceCheck)) return;
      if(accessDeviceCheck.checked) accessDevicePickerState.selectedCodes.add(accessDeviceCheck.dataset.accessDeviceCheck);
      else accessDevicePickerState.selectedCodes.delete(accessDeviceCheck.dataset.accessDeviceCheck);
      rerenderAccessDeviceDrawer();
      return;
    }
    const accessDeviceCheckPage = e.target.closest("[data-access-device-check-page]");
    if(accessDeviceCheckPage){
      const relatedCodes = accessGroupSelectedDeviceCodes(accessPermissionGroupByName(accessDevicePickerState.groupName));
      const filteredDevices = accessDeviceFilteredDevices();
      const start = (accessDevicePickerState.currentPage - 1) * accessDevicePickerState.pageSize;
      const pageDevices = filteredDevices.slice(start, start + accessDevicePickerState.pageSize).filter(device => !relatedCodes.has(device[1]));
      pageDevices.forEach(device => {
        if(accessDeviceCheckPage.checked) accessDevicePickerState.selectedCodes.add(device[1]);
        else accessDevicePickerState.selectedCodes.delete(device[1]);
      });
      rerenderAccessDeviceDrawer();
      return;
    }
    if(e.target.closest("[data-access-dept-group-check]")){
      syncAccessDepartmentGroupSelect();
      return;
    }
    const accessPersonGroupCheck = e.target.closest("[data-access-person-group-check]");
    if(accessPersonGroupCheck){
      if(accessPersonGroupCheck.checked) accessPersonPermissionAuthState.groupNames.add(accessPersonGroupCheck.value);
      else accessPersonPermissionAuthState.groupNames.delete(accessPersonGroupCheck.value);
      rerenderAccessPersonAuthorizeModal();
      return;
    }
    const accessPersonLongTerm = e.target.closest("[data-access-person-long-term]");
    if(accessPersonLongTerm){
      accessPersonPermissionAuthState.longTerm = accessPersonLongTerm.checked;
      rerenderAccessPersonAuthorizeModal();
      return;
    }
    const accessPersonAuthTarget = e.target.closest("[data-access-person-auth-target]");
    if(accessPersonAuthTarget){
      if(accessPersonAuthTarget.checked) accessPersonPermissionAuthState.personCodes.add(accessPersonAuthTarget.dataset.accessPersonAuthTarget);
      else accessPersonPermissionAuthState.personCodes.delete(accessPersonAuthTarget.dataset.accessPersonAuthTarget);
      rerenderAccessPersonAuthorizeModal();
      return;
    }
    const accessPersonAuthCheckAll = e.target.closest("[data-access-person-auth-check-all]");
    if(accessPersonAuthCheckAll){
      accessPersonAuthorizeFilteredPersons().forEach(row => {
        if(accessPersonAuthCheckAll.checked) accessPersonPermissionAuthState.personCodes.add(row[1]);
        else accessPersonPermissionAuthState.personCodes.delete(row[1]);
      });
      rerenderAccessPersonAuthorizeModal();
      return;
    }
    const vehicleMonitorCheck = e.target.closest(".vehicle-monitor-candidate input");
    if(vehicleMonitorCheck){
      syncVehicleMonitorBindModal(vehicleMonitorCheck);
      return;
    }
    const accessAuthTarget = e.target.closest("[data-access-auth-target]");
    if(accessAuthTarget){
      const target = accessAuthTarget.dataset.accessAuthTarget;
      const targetSet = accessAuthorizeState.mode === "department" ? accessAuthorizeState.departments : accessAuthorizeState.persons;
      if(accessAuthTarget.checked) targetSet.add(target);
      else targetSet.delete(target);
      rerenderAccessAuthorizeDrawer();
      return;
    }
    const accessAuthCheckAll = e.target.closest("[data-access-auth-check-all]");
    if(accessAuthCheckAll){
      if(accessAuthorizeState.mode === "department"){
        accessAuthorizeFilteredDepartments().forEach(row => {
          if(accessAuthCheckAll.checked) accessAuthorizeState.departments.add(row[0]);
          else accessAuthorizeState.departments.delete(row[0]);
        });
      } else {
        accessAuthorizeFilteredPersons().forEach(row => {
          if(accessAuthCheckAll.checked) accessAuthorizeState.persons.add(row[1]);
          else accessAuthorizeState.persons.delete(row[1]);
        });
      }
      rerenderAccessAuthorizeDrawer();
      return;
    }
  });
  document.getElementById("modalConfirm").addEventListener("click",()=>{
    const modal = document.getElementById("modal");
    if(modal.dataset.action && modal.dataset.action.startsWith("周界:")){
      const action = modal.dataset.action.replace("周界:", "");
      const done = handlePerimeterOperationConfirm(action, modal.dataset.perimeterAlarmId || currentPerimeterAlarmId);
      if(!done) return;
      document.getElementById("modalOverlay").classList.remove("show");
      modal.dataset.action = "";
      modal.dataset.perimeterAlarmId = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action && modal.dataset.action.startsWith("安防告警:")){
      const action = modal.dataset.action.replace("安防告警:", "");
      const done = handleSecurityAlarmOperationConfirm(action, modal.dataset.securityAlarmId);
      if(!done) return;
      document.getElementById("modalOverlay").classList.remove("show");
      modal.dataset.action = "";
      modal.dataset.securityAlarmId = "";
      modal.className = "modal";
      return;
    }
    document.getElementById("modalOverlay").classList.remove("show");
    if(modal.dataset.action && modal.dataset.action.startsWith("周界任务:")){
      const action = modal.dataset.action.replace("周界任务:", "");
      handlePerimeterTaskOperationConfirm(action, modal.dataset.perimeterTaskId || currentPerimeterTaskId);
      modal.dataset.action = "";
      modal.dataset.perimeterTaskId = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "周界未保存离开"){
      document.getElementById("drawerOverlay").classList.remove("show");
      resetMainDrawerChrome();
      toast("周界任务已保存为草稿");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "周界抓拍预览"){
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "通行照片预览"){
      modal.dataset.action = "";
      modal.className = "modal";
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      return;
    }
    if(modal.dataset.action === "移动端采集人脸"){
      modal.dataset.action = "";
      modal.className = "modal";
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      return;
    }
    if(modal.dataset.action === "访客移动端模拟"){
      modal.dataset.action = "";
      modal.className = "modal";
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      return;
    }
    if(modal.dataset.action === "访客设备选择"){
      saveVisitorDevicePicker();
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "新增访客来访事由"){
      if(!saveVisitorReason()){
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "保存访客规则配置"){
      toast("访客基础权限配置已保存");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "设备绑定位置"){
      toast("绑定位置已确认");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "无权限车辆放行"){
      const release = vehicleReleaseDraftFromForm();
      if(release.vehicleType === "特殊车辆" && !release.rawRemark){
        toast("请填写放行备注");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(release.vehicleType === "特殊车辆" && release.photoCount < 1){
        toast("请通过摄像头或相册上传至少 1 张现场照片");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      pendingVehicleRelease = release;
      modal.className = "modal vehicle-release-confirm-modal";
      modal.dataset.action = "确认放行";
      document.getElementById("modalTitle").textContent = "确认放行";
      document.getElementById("modalBody").innerHTML = `<div class="alert warning"><b>确认手动放行该车辆？</b><br>${pendingVehicleRelease.vehicleType === "特殊车辆" ? "确认后系统执行人工抬杆，并同步写入车辆通行记录和特殊车辆通行记录。" : "确认后系统执行人工抬杆，并同步写入车辆通行记录。"}</div>
        <div class="vehicle-release-confirm">
          <div><label>车牌号</label><b>${pendingVehicleRelease.plate}</b></div>
          <div><label>车辆类型</label><b>${pendingVehicleRelease.vehicleType}</b></div>
          <div><label>出入口</label><b>${pendingVehicleRelease.entrance}</b></div>
          <div><label>放行备注</label><b>${pendingVehicleRelease.remark}</b></div>
          ${pendingVehicleRelease.vehicleType === "特殊车辆" ? `<div><label>现场照片</label><b>已拍摄 ${pendingVehicleRelease.photoCount} 张</b></div>` : ""}
        </div>`;
      document.getElementById("modalConfirm").textContent = "确认";
      document.getElementById("modalOverlay").classList.add("show");
      return;
    }
    if(modal.dataset.action === "确认放行"){
      if(pendingVehicleRelease) appendVehicleReleaseRecords(pendingVehicleRelease);
      toast(pendingVehicleRelease?.vehicleType === "特殊车辆" ? "已同步写入车辆通行记录和特殊车辆通行记录" : "临时车辆已同步写入车辆通行记录");
      pendingVehicleRelease = null;
      modal.dataset.action = "";
      modal.className = "modal";
      if(currentModule === "vehicle") renderPage("vehicle");
      return;
    }
    if(modal.dataset.action === "新增车场出入口"){
      toast("车场出入口已保存");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "删除出入口"){
      toast("出入口已删除");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "删除监控"){
      toast("监控绑定已删除");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "绑定监控"){
      toast("监控绑定已保存");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "新增车辆黑名单" || modal.dataset.action === "编辑车辆黑名单"){
      const plate = document.querySelector("[data-vehicle-blacklist-plate]")?.value.trim() || "";
      const reason = document.querySelector("[data-vehicle-blacklist-reason]")?.value.trim() || "";
      const startTime = document.querySelector("[data-vehicle-blacklist-start]")?.value || "";
      const endTime = document.querySelector("[data-vehicle-blacklist-end]")?.value || "";
      const isLongTerm = document.querySelector("[data-vehicle-blacklist-long-term]")?.checked || false;
      if(!plate){
        toast("请填写车牌号");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!startTime || (!isLongTerm && !endTime)){
        toast("请完整填写有效期");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!isLongTerm && startTime >= endTime){
        toast("有效期结束时间必须晚于开始时间");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!reason){
        toast("请填写禁行原因");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(modal.dataset.action === "新增车辆黑名单" && vehicleBlacklistRows.some(row => row.plate === plate)){
        toast("该车牌已存在黑名单记录，请确认有效期是否重叠");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      toast(modal.dataset.action === "编辑车辆黑名单" ? "车辆黑名单已保存" : "车辆黑名单已新增，将按有效期参与通行判断");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "删除车辆黑名单"){
      toast("车辆黑名单已删除，历史拦截记录保留");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "新增车辆白名单" || modal.dataset.action === "编辑车辆白名单"){
      const plate = document.querySelector("[data-vehicle-whitelist-plate]")?.value.trim() || "";
      const reason = document.querySelector("[data-vehicle-whitelist-reason]")?.value.trim() || "";
      const startTime = document.querySelector("[data-vehicle-whitelist-start]")?.value || "";
      const endTime = document.querySelector("[data-vehicle-whitelist-end]")?.value || "";
      const isLongTerm = document.querySelector("[data-vehicle-whitelist-long-term]")?.checked || false;
      if(!plate){
        toast("请填写车牌号");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!startTime || (!isLongTerm && !endTime)){
        toast("请完整填写有效期");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!isLongTerm && startTime >= endTime){
        toast("有效期结束时间必须晚于开始时间");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!reason){
        toast("请填写放行原因");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(modal.dataset.action === "新增车辆白名单" && vehicleWhitelistRows.some(row => row.plate === plate)){
        toast("该车牌已存在白名单记录，请确认有效期是否重叠");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      toast(modal.dataset.action === "编辑车辆白名单" ? "车辆白名单已保存" : "车辆白名单已新增，将按有效期参与通行判断");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "删除车辆白名单"){
      toast("车辆白名单已删除，历史通行记录保留");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "新增特殊车辆" || modal.dataset.action === "编辑特殊车辆"){
      const plate = document.querySelector("[data-special-vehicle-plate]")?.value.trim() || "";
      const unit = document.querySelector("[data-special-vehicle-unit]")?.value.trim() || "";
      const owner = document.querySelector("[data-special-vehicle-owner]")?.value.trim() || "";
      const phone = document.querySelector("[data-special-vehicle-phone]")?.value.trim() || "";
      const startDate = document.querySelector("[data-special-vehicle-start]")?.value || "";
      const endDate = document.querySelector("[data-special-vehicle-end]")?.value || "";
      if(!plate){
        toast("请填写车牌号");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!unit || !owner || !phone){
        toast("请完整填写所属单位、负责人和联系方式");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!startDate || !endDate){
        toast("请完整填写有效期");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(startDate > endDate){
        toast("有效期结束日期必须不早于开始日期");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(modal.dataset.action === "新增特殊车辆" && specialVehicleRows.some(row => row.plate === plate)){
        toast("该车牌已存在特殊车辆登记");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      toast(modal.dataset.action === "编辑特殊车辆" ? "特殊车辆登记已保存" : "特殊车辆已新增，入场自动放行规则已生效");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "启用特殊车辆" || modal.dataset.action === "停用特殊车辆"){
      toast(modal.dataset.action === "启用特殊车辆" ? "特殊车辆已启用，入场自动放行规则生效" : "特殊车辆已停用，入场自动放行规则已暂停");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "删除特殊车辆"){
      toast("特殊车辆登记已删除，历史通行记录保留");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "新增车辆" || modal.dataset.action === "修改车辆"){
      const plate = document.querySelector("[data-vehicle-plate]")?.value.trim() || "";
      const personCode = document.querySelector("[data-vehicle-person-select]")?.value || "";
      if(!plate){
        toast("请填写车牌号");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(!personCode){
        toast("请选择绑定人员");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      if(modal.dataset.action === "新增车辆" && vehicleManagementRows.some(row => row.plate === plate && row.bindStatus === "已绑定")){
        toast("该车牌已绑定人员，一车仅允许绑定一人");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      toast(modal.dataset.action === "修改车辆" ? "车辆信息已保存" : "车辆已保存并完成人员绑定，授权状态为未配置");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "车辆授权"){
      toast("车辆授权已保存，需下发至边缘端后生效");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "删除车辆绑定"){
      toast("车辆绑定已删除");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "发卡"){
      toast("发卡成功，人员与卡片已绑定，卡片状态为正常");
      modal.dataset.action = "";
      return;
    }
    if(modal.dataset.action === "卡片未选择"){
      modal.dataset.action = "";
      return;
    }
    if(modal.dataset.action === "卡片规则说明"){
      modal.dataset.action = "";
      return;
    }
    if(modal.dataset.action && modal.dataset.action.startsWith("卡片")){
      toast(`${pendingCardOperation || "卡片"}操作成功，状态与操作日志已更新`);
      pendingCardOperation = "";
      modal.dataset.action = "";
      return;
    }
    if(modal.dataset.action === "新增通行时间段" || modal.dataset.action === "编辑通行时间段"){
      toast("通行时间段已保存，关联权限组下发影响需按业务规则确认");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(["新增权限组","编辑权限组"].includes(modal.dataset.action)){
      toast("权限组已保存，设备和人员授权变更需按业务规则下发");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "部门新增权限组"){
      openAccessPermissionIssueTipModal();
      return;
    }
    if(modal.dataset.action === "按人员授权"){
      const groupCount = accessPersonPermissionAuthState.groupNames.size;
      const personCount = accessPersonPermissionAuthState.personCodes.size;
      if(groupCount === 0 || personCount === 0){
        toast(groupCount === 0 ? "请至少选择一个权限组" : "请至少选择一名人员");
        document.getElementById("modalOverlay").classList.add("show");
        return;
      }
      openAccessPermissionIssueTipModal();
      return;
    }
    if(modal.dataset.action === "权限下发提示"){
      stopAccessIssueProgress();
      modal.dataset.action = "";
      modal.className = "modal";
      document.querySelector("#modal .modal-foot .btn[data-close='modal']").style.display = "";
      return;
    }
    if(modal.dataset.action === "关联设备"){
      toast("关联设备已保存，系统将生成权限下发任务");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.dataset.action === "权限组授权"){
      toast("授权已保存，人员权限将下发至关联设备");
      modal.dataset.action = "";
      modal.className = "modal";
      return;
    }
    if(modal.classList.contains("company-room-modal")) return;
    if(modal.dataset.action === "人员离职"){
      currentTab.person = "已离职人员";
      renderPage("person");
      toast("人员已办理离职，已进入已离职人员页面");
      modal.dataset.action = "";
      return;
    }
    if(modal.dataset.action === "删除离职人员档案"){
      toast(`已删除 ${pendingResignedPerson} 的人员档案`);
      pendingResignedPerson = "";
      modal.dataset.action = "";
      return;
    }
    modal.dataset.action = "";
    toast("操作成功，状态与操作日志已更新");
  });
  document.getElementById("roomPickerConfirm").addEventListener("click",()=>{ document.getElementById("roomPickerOverlay").classList.remove("show");toast(`已选择 ${selectedCompanyRoomIds.size} 间房间，绑定关系已更新`); });
  document.getElementById("roomUnbindConfirm").addEventListener("click",()=>{ document.getElementById("roomConfirmOverlay").classList.remove("show");toast(`房间“${pendingUnbindRoomName}”已解绑`); });
  document.addEventListener("keydown",e=>{
    const accessDeviceJump = e.target.closest?.("[data-access-device-jump]");
    if(accessDeviceJump && e.key === "Enter"){
      const totalPages = Math.max(1, Math.ceil(accessDeviceFilteredDevices().length / accessDevicePickerState.pageSize));
      accessDevicePickerState.currentPage = Math.min(totalPages, Math.max(1, Number(accessDeviceJump.value) || 1));
      rerenderAccessDeviceDrawer();
      return;
    }
    if(e.key==="Escape"){stopAccessIssueProgress();document.querySelectorAll(".overlay").forEach(x=>x.classList.remove("show"));resetMainDrawerChrome();}
  });
}

function toast(msg) {
  const el=document.createElement("div");el.className="toast";el.innerHTML=`<b>操作提示</b><br><span style="color:var(--text-3);font-size:12px">${msg}</span>`;document.getElementById("toastStack").appendChild(el);setTimeout(()=>el.remove(),2600);
}

function showLoading() {
  const el=document.createElement("div");el.className="loading-line";document.body.appendChild(el);setTimeout(()=>el.remove(),700);
}

init();
