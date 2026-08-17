const propertyModules = [
  {id:"space",name:"空间管理",icon:"▦",children:["空间管理"]},
  {id:"outsource",name:"外包人员管理",icon:"♙",children:["人员列表","排班日历","考勤记录"]},
  {id:"workorder",name:"工单管理",icon:"▤",children:["报修类型","工单列表","总务审批"]},
  {id:"dorm",name:"智慧宿舍",icon:"▥",children:["宿舍人员","入住审批","违规记录","违规行为维护"]},
  {id:"canteen",name:"智慧食堂",icon:"◇",children:["菜品库","周菜单管理","满意度结果"]},
  {id:"knowledge",name:"知识库",icon:"▣",children:["分类管理","文档管理"]},
  {id:"publish",name:"信息发布",icon:"◈",children:["通知公告"]},
  {id:"investment",name:"招商意向",icon:"◎",children:["招商意向列表"]}
];

const C=(desc,filters,columns,rows,options={})=>({desc,filters,columns,rows,...options});
const configs={
  "outsource:人员列表":C("维护安保、保洁、食堂三类外包人员基础信息；三类岗位互斥，人员类型新增后不可修改。",["姓名","人员类型","手机号","外包公司"],["姓名","人员类型","外包公司","手机号","入职日期"],[
    ["张建国","安保","海安物业服务有限公司","138****1208","2025-03-08"],["王小琴","保洁","洁净城市服务有限公司","136****6512","2025-08-16"],["李春梅","食堂","味佳餐饮管理有限公司","139****3207","2026-01-05"]
  ],{primary:"新增人员",actions:["查看详情","编辑","删除"],tableColumns:[{label:"序号",render:"index"},{label:"姓名",index:0,link:true},{label:"人员类型",index:1},{label:"外包公司",index:2},{label:"手机号",index:3},{label:"入职日期",index:4}],rule:"人员离职直接删除；删除已排班人员时提示并清除未来排班，不设置在职、离职或停用状态。"}),
  "outsource:考勤记录":C("查看和导出考勤机同步的原始打卡记录，不进行迟到、早退、缺卡等自动判定。",["人员","人员类型","日期区间"],["姓名","人员类型","打卡时间","考勤机编号","打卡方式"],[
    ["张建国","安保","2026-06-11 07:52:18","ATT-GATE-01","人脸识别"],["王小琴","保洁","2026-06-11 07:58:42","ATT-OFFICE-02","人脸识别"],["李春梅","食堂","2026-06-11 05:46:07","ATT-CANTEEN-01","刷卡"]
  ],{secondary:"导出",actions:[],tableColumns:[{label:"序号",render:"index"},{label:"姓名",index:0},{label:"人员类型",index:1},{label:"打卡时间",index:2},{label:"考勤机编号",index:3},{label:"打卡方式",index:4}],rule:"考勤记录仅支持查询、查看和导出，不支持页面内新增、编辑或删除。"}),
  "workorder:报修类型":C("维护 PC 后台新增工单和小程序公区报修共用的报修类型；停用类型不再进入新增报修下拉，历史工单继续展示原类型。",["类型名称","启用状态"],["类型名称","类型编码","启用状态","备注","更新人","更新时间"],[
    ["照明","REPAIR_LIGHT","启用","公共区域照明故障","林晓","2026-07-08 09:10"],
    ["给排水","REPAIR_WATER","启用","水管、龙头、排水相关问题","林晓","2026-07-08 09:12"],
    ["门窗","REPAIR_DOOR","启用","门锁、闭门器、玻璃门窗","周华","2026-07-08 10:02"],
    ["环境","REPAIR_ENV","停用","公共区域环境问题，停用后不可新选","林晓","2026-07-08 11:20"]
  ],{primary:"新增类型",actions:["编辑"],tableColumns:[{label:"序号",render:"index"},{label:"类型名称",index:0},{label:"类型编码",index:1},{label:"启用状态",index:2},{label:"备注",index:3},{label:"更新人",index:4},{label:"更新时间",index:5}],stateActions:{"启用":["编辑","停用","删除"],"停用":["编辑","启用","删除"]},rule:"新增类型仅输入类型名称，系统自动生成类型编码；启用状态使用开关按钮。已被历史工单引用的类型不可删除，仅允许停用。"}),
  "workorder:工单列表":C("管理公共区域报修工单。维修主管在待派单状态完成委派维修工、上报总务、立项维修或直接回复关单；维修处理仅在维修工 App 完成。",["工单编号","报修人/联系方式","报修位置","报修类型","当前状态","报修时间","是否超时"],["工单编号","报修人","联系方式","报修位置","报修类型","问题描述","当前状态","当前处理人","派单路径","维修工","是否超时","发起时间"],[
    ["WO-20260708-0028","王敏","13800121208","办公楼一层公共走廊","照明","照明灯闪烁，影响夜间通行","待派单","维修主管","—","—","—","2026-07-08 09:42"],
    ["WO-20260708-0025","李春梅","13900003207","食堂后门","门窗","闭门器损坏，门无法自动关闭","待总务审批","总务","上报总务","—","—","2026-07-08 08:26"],
    ["WO-20260707-0019","周明","13800001120","园区南门","设施","门禁立柱松动","待接单","赵磊","委派维修工","赵磊","否","2026-07-07 16:18"],
    ["WO-20260707-0014","陈晓","13600008031","宿舍楼公共洗衣房","给排水","排水管渗漏","处理中","孙强","委派维修工","孙强","是","2026-07-07 13:06"],
    ["WO-20260706-0008","刘芳","13900002756","园区主路","设施","井盖破损，需土建处理","已立项","—","立项维修","—","—","2026-07-06 10:20"],
    ["WO-20260705-0003","高伟","13700004690","办公楼大厅","门窗","玻璃门异响","已完成","刘海","委派维修工","刘海","否","2026-07-05 09:12"],
    ["WO-20260704-0002","吴清","13600005021","办公楼二层卫生间","给排水","感应水龙头失灵","已关闭","—","上报总务","—","是","2026-07-04 11:20"]
  ],{primary:"新增工单",secondary:"导出",actions:[],tableColumns:[{label:"工单编号",index:0},{label:"报修人（联系方式）/报修时间",render:"reporterTime"},{label:"报修位置",index:3},{label:"报修类型",index:4},{label:"问题描述",index:5},{label:"当前状态",index:6},{label:"当前处理人",index:7},{label:"维修工",index:9},{label:"是否超时",render:"timeout"}],stateActions:{"待派单":["上报总务","立项维修","强制关闭"],"待总务审批":["强制关闭"],"待接单":["强制关闭"],"处理中":["强制关闭"],"已完成":["满意度评价"],"已立项":[],"已关闭":[]},rule:"直接回复并关单后，工单状态变为已完成。已完成、已立项、已关闭为终态。仅待接单、处理中、已完成、已关闭状态展示是否超时，其他状态显示“—”；超时判断口径、提醒规则和统计口径需客户确认。"}),
  "workorder:总务审批":C("审批维修主管上报总务的公共区域报修工单。审批通过时必须指派维修工；驳回后工单进入已关闭终态。",["工单编号","报修人/联系方式","报修位置","报修类型","当前状态","报修时间"],["工单编号","报修人","联系方式","报修位置","报修类型","问题描述","上报说明","上报人","上报时间","当前状态","报修时间"],[
    ["WO-20260708-0025","李春梅","13900003207","食堂后门","门窗","闭门器损坏，门无法自动关闭","涉及食堂后门安全闭合，请总务确认处理资源","陈主管","2026-07-08 08:35","待总务审批","2026-07-08 08:26"],
    ["WO-20260704-0002","吴清","13600005021","办公楼二层卫生间","给排水","感应水龙头失灵","需确认是否更换感应龙头","陈主管","2026-07-04 11:20","已关闭","2026-07-04 11:20"]
  ],{actions:[],tableColumns:[{label:"工单编号",index:0},{label:"报修人（联系方式）/报修时间",render:"reporterTime"},{label:"报修位置",index:3},{label:"报修类型",index:4},{label:"问题描述",index:5},{label:"上报说明",index:6},{label:"当前状态",index:9}],stateActions:{"待总务审批":["审批通过","审批驳回"],"已关闭":[]},rule:"审批通过必须选择启用维修工；审批驳回必须填写驳回原因。列表操作列不提供查看详情按钮。"}),
  "dorm:宿舍人员":C("管理入住申请审批状态与房间分配，房间基础数据来源于空间管理。",["姓名/联系方式/工号","性别","所属企业/部门","预计入住时间","当前状态"],["姓名","性别","联系方式","工号","所属企业","所属部门","预计入住时间","当前状态","申请时间"],[
    ["周明","男","13800001120","WL-10021","大连微冷科技有限公司","生产一部","2026-06-15","待审批","2026-06-11 09:16"],
    ["陈晓","男","13600008031","WL-10036","大连微冷科技有限公司","行政部","2026-06-14","待分配","2026-06-10 16:32"],
    ["刘芳","女","13900002756","WL-10058","大连微冷科技有限公司","生产二部","2026-05-30","已入住","2026-05-28 11:08"],
    ["高伟","男","13700004690","WL-10072","大连微冷科技有限公司","研发部","2026-06-12","已驳回","2026-06-09 14:26"]
  ],{primary:"发起入住申请",secondary:"移动端申请模拟",afterPrimary:"导出",actions:["查看详情"],tableColumns:[{label:"序号",render:"index"},{label:"姓名",index:0},{label:"性别",index:1},{label:"联系方式",index:2},{label:"工号",index:3},{label:"所属企业/部门",render:"enterpriseDept"},{label:"预计入住时间",index:6},{label:"当前状态",index:7},{label:"申请时间",index:8}],stateActions:{"待审批":["查看详情"],"待分配":["查看详情","分配房间"],"已入住":["查看详情"],"已驳回":["查看详情"]},rule:"待审批、待分配、已入住状态不可重复提交入住申请；不提供换房、退宿、费用结算、访客管理和房间基础信息维护。"}),
  "dorm:入住审批":C("审批员工或管理员代提交的入住申请。",["姓名/联系方式/工号","性别","所属企业/部门","预计入住时间","申请时间"],["姓名","性别","联系方式","工号","所属企业","所属部门","预计入住时间","当前状态","申请原因","申请时间"],[
    ["周明","男","13800001120","WL-10021","大连微冷科技有限公司","生产一部","2026-06-15","待审批","工作地点距离居住地较远","2026-06-11 09:16"],
    ["吴清","女","13600005021","WL-10089","大连微冷科技有限公司","研发部","2026-06-18","待审批","新员工住宿申请","2026-06-10 17:05"]
  ],{actions:["查看详情"],tableColumns:[{label:"序号",render:"index"},{label:"姓名",index:0},{label:"性别",index:1},{label:"联系方式",index:2},{label:"工号",index:3},{label:"所属企业/部门",render:"enterpriseDept"},{label:"预计入住时间",index:6},{label:"当前状态",index:7},{label:"申请原因",index:8},{label:"申请时间",index:9}],stateActions:{"待审批":["查看详情"]},rule:"入住审批仅处理当前待审批申请；审批通过后状态变为待分配，审批驳回必须填写驳回原因。"}),
  "dorm:违规记录":C("仅对当前已入住人员登记违规信息。",["违规人员（姓名/工号）","违规行为","违规时间","所属企业/部门"],["违规人员","性别","工号","所属企业/部门","房间","违规行为","分值","违规时间","备注"],[
    ["刘芳","女","WL-10058","大连微冷科技有限公司 / 生产二部","宿舍2号楼-305-2号床","夜间喧哗","2分","2026-06-08 22:30","已口头提醒"],
    ["赵凯","男","WL-10093","大连微冷科技有限公司 / 生产一部","宿舍1号楼-218-1号床","公共区域堆物","1分","2026-06-05 08:10","已清理"]
  ],{primary:"新增违规记录",actions:["查看详情","删除"],tableColumns:[{label:"序号",render:"index"},{label:"违规人员",index:0},{label:"性别",index:1},{label:"工号",index:2},{label:"所属企业/部门",render:"enterpriseDeptCombined",index:3},{label:"房间",index:4},{label:"违规行为",index:5},{label:"分值",index:6},{label:"违规时间",index:7},{label:"备注",index:8}],rule:"违规记录仅允许选择已入住状态的人员。"}),
  "dorm:违规行为维护":C("维护宿舍违规行为字典和违规分值。",["违规行为"],["违规行为","违规分值","更新时间"],[
    ["违规使用大功率电器","12分","2026-07-10 09:30"],
    ["在宿舍楼内吸烟，或在宿舍区域内焚烧物品","6分","2026-07-09 16:42"],
    ["在宿舍区域围栏附近攀爬、斗殴、吸毒、赌博、盗窃","6分","2026-07-08 11:18"],
    ["夜间喧哗","2分","2026-07-06 20:15"],
    ["公共区域堆物","1分","2026-07-05 10:08"]
  ],{primary:"新增违规行为",actions:["编辑","删除"],tableColumns:[{label:"序号",render:"index"},{label:"违规行为",index:0},{label:"违规分值",index:1},{label:"更新时间",index:2}],rule:"列表按更新时间倒序排列；页面不提供查看详情入口。"}),
  "canteen:菜品库":C("维护周菜单可选择的菜品，菜品图片可点击放大查看，停用菜品不再进入新菜单选择列表。",["菜品名称","状态"],["菜品名称","菜品图片","菜品说明","状态","创建时间"],[
    ["清蒸鲈鱼","FOOD:fish","每日鲜鱼清蒸","可用","2026-05-12 10:08"],["西红柿炒蛋","FOOD:tomato","家常热菜","可用","2026-05-10 14:20"],["香菇青菜","FOOD:vegetable","时蔬菜品","已停用","2026-04-16 09:30"]
  ],{primary:"新增菜品",actions:["修改"],stateActions:{"可用":["修改","停用"],"已停用":["修改","启用"]},rule:"停用为软删除；历史周菜单中已引用的菜品名称保持不变。"}),
  "canteen:周菜单管理":C("按自然周管理 7 天 × 3 餐次菜单，每个自然周最多存在一个周菜单。",["周次","发布状态"],["周次","菜品总数","发布状态","创建时间","发布时间"],[
    ["2026年第24周（06-08 至 06-14）","46","已发布","2026-06-05 14:20","2026-06-07 18:00"],["2026年第25周（06-15 至 06-21）","38","未发布","2026-06-10 11:08","—"],["2026年第23周（06-01 至 06-07）","42","已取消发布","2026-05-28 16:20","2026-05-31 18:00"]
  ],{primary:"创建周菜单",secondary:"移动端周菜谱",actions:[],stateActions:{"未发布":["编辑","发布"],"已发布":["查看","取消发布"],"已取消发布":["编辑","重新发布"]},rule:"已发布周菜单不可直接修改，需先取消发布；移动端仅展示已发布周菜谱。"}),
  "knowledge:分类管理":C("维护两级知识分类；一级分类用于归类管理，文档仅可归属启用状态的二级分类。",["分类名称","状态"],["分类名称","上级分类","分类级别","状态"],[
    ["物业制度","—","一级","启用"],["安全作业规范","物业制度","二级","启用"],["报修指引","物业制度","二级","启用"],["培训资料归档","物业制度","二级","启用"],["设备操作指引","—","一级","启用"],["冷库设备操作","设备操作指引","二级","启用"],["历史培训资料","—","一级","停用"]
  ],{primary:"新增分类",actions:["编辑"],tableColumns:[{label:"序号",render:"index"},{label:"分类名称",index:0},{label:"上级分类",index:1},{label:"分类级别",index:2},{label:"状态",index:3}],stateActions:{"启用":["停用"],"停用":["编辑","新增二级分类","启用","删除"]},rule:"分类仅支持两级；同一上级分类下名称不可重复。文档归属到启用状态的二级分类。启用中的分类不可编辑或删除，删除分类需满足已停用、无下级分类、无关联文档，并填写删除原因。一级分类停用时，二级分类和关联文档同步停用。"}),
  "knowledge:文档管理":C("上传知识资料并按单篇文档配置权限；PC 文档名称可点击进入详情，操作列不提供查看详情、在线预览和下载按钮。",["关键词","状态","上传时间"],["文档名称","所属分类","文档类型","文档大小","上传人","上传时间","最近更新时间","状态"],[
    ["园区消防巡查制度","物业制度 / 安全作业规范","PDF","8.6MB","王敏","2026-07-08 09:30","2026-07-12 10:18","启用","按部门授权","生产部、物业部","消防巡查制度.pdf"],
    ["公共区域报修操作指引","物业制度 / 报修指引","DOCX","1.4MB","林晓","2026-07-09 14:12","2026-07-11 16:40","停用","按人员授权","张建国、王小琴","公共区域报修操作指引.docx"],
    ["2025年度物业培训材料","物业制度 / 培训资料归档","PPTX","36.2MB","周华","2026-06-18 11:05","2026-07-10 08:25","停用","未配置","--","2025年度物业培训材料.pptx"]
  ],{primary:"上传文档",secondary:"批量上传",extra:"移动端文档模拟",actions:["编辑","配置权限"],tableColumns:[{label:"序号",render:"index"},{label:"文档名称",index:0,link:true},{label:"所属分类",index:1,render:"categoryPath"},{label:"文档类型",index:2},{label:"文档大小",index:3},{label:"上传人/上传时间",render:"uploaderTime"},{label:"最近更新时间",index:6},{label:"状态",index:7}],stateActions:{"启用":["停用"],"停用":["编辑","配置权限","启用"]},rule:"文档上传完成后默认停用；未配置有效权限不可启用。启用中文档不可直接编辑，需先停用后修改。文档不可删除，仅支持单篇停用；PC 文档名称可点击进入详情，操作列不提供查看详情、在线预览和下载按钮，移动端查看或下载需重新校验状态和权限并记录下载历史。"}),
  "publish:通知公告":C("统一发布园区公告，按公开公告、员工公告、外部用户公告三类公告类型定向展示。",["标题","发布状态","发布时间区间"],["标题","公告类型","发布状态","有效期","发布人","发布时间","置顶"],[
    ["关于园区消防演练的通知","公开公告","已发布","2026-06-10 至 2026-06-30","林晓","2026-06-10 15:00","是"],
    ["夏季防暑降温提醒","员工公告","草稿","2026-06-12 至 2026-07-31","林晓","—","否"],
    ["食堂第23周菜单更新","员工公告","已取消发布","2026-05-31 至 2026-06-07","周华","2026-05-31 18:00","否"],
    ["端午节值班安排","外部用户公告","已过期","2026-05-28 至 2026-06-02","林晓","2026-05-28 09:00","是"]
  ],{primary:"新增公告",actions:[],tableColumns:[{label:"序号",render:"index"},{label:"标题",index:0,link:true},{label:"公告类型",index:1},{label:"发布状态",index:2},{label:"有效期",index:3},{label:"置顶",index:6,render:"switch"},{label:"发布人",index:4},{label:"发布时间",index:5}],stateActions:{"草稿":["编辑","发布","删除"],"已发布":["编辑","取消发布"],"已取消发布":["重新发布"],"已过期":[]},rule:"公告类型固定为公开公告、员工公告、外部用户公告三类；已发布公告不可直接编辑，需先取消发布后再编辑；有效期到期后自动变为已过期；已取消发布可重新发布。"}),
  "investment:招商意向列表":C("查看服务小程序登记的招商意向并登记成单结果，后台不提供手动新增入口。",["意向编号","联系人","意向园区","状态","登记时间区间"],["意向编号","企业名称","联系人","联系方式","意向园区","意向内容","登记来源","当前状态","登记时间"],[
    ["INV-20260611-0018","大连海链供应链有限公司","顾女士","138****6602","三里园区","咨询冷链仓储办公配套","服务小程序","未成单","2026-06-11 09:20"],["INV-20260610-0015","微冷园区商贸有限公司","吴先生","136****8907","华家园区","意向租赁园区商铺","服务小程序","已成单","2026-06-10 15:36"],["INV-20260609-0011","智联办公科技有限公司","陈先生","139****4615","三里园区","咨询园区联合办公空间","服务小程序","未成单","2026-06-09 10:08"]
  ],{secondary:"导出",extra:"移动端模拟",tableColumns:[{label:"序号",render:"index"},{label:"意向编号",index:0},{label:"企业名称",index:1},{label:"联系人",index:2},{label:"联系方式",index:3},{label:"意向园区",index:4},{label:"意向内容",index:5},{label:"当前状态",index:7},{label:"登记时间",index:8}],stateActions:{"未成单":["登记成单"],"已成单":[]},rule:"成单后保留成单结果且不可重复登记；不扩展招商跟进记录、合同管理和招商资源发布管理。"})
};

let activeModule="space",activePage="空间管理",spaceTab="园区管理",currentCfg=null,currentRow=[],drawerTabs=[],drawerMode="detail",modalMode="",currentMealCell=null,foodPickerPage=1,foodPickerKeyword="",foodPickerSelected=new Set(),scheduleDirty=false,currentPermissionMode="dept";
const dormApplicants=[
  {name:"周明",enterprise:"大连微冷科技有限公司",department:"生产一部",gender:"男",phone:"13800001120",status:"待审批"},
  {name:"陈晓",enterprise:"大连微冷科技有限公司",department:"行政部",gender:"男",phone:"13600008031",status:"待分配"},
  {name:"刘芳",enterprise:"大连微冷科技有限公司",department:"生产二部",gender:"女",phone:"13900002756",status:"已入住"},
  {name:"高伟",enterprise:"大连微冷科技有限公司",department:"研发部",gender:"男",phone:"13700004690",status:"已驳回"},
  {name:"吴清",enterprise:"大连微冷科技有限公司",department:"研发部",gender:"女",phone:"13600005021",status:"可申请"}
];
const dormViolationResidents=[
  {name:"刘芳",gender:"女",jobNo:"WL-10058",phone:"13900002756",enterprise:"大连微冷科技有限公司",department:"生产二部",roomBed:"宿舍2号楼-305-2号床",checkInTime:"2026-05-30 10:20"},
  {name:"赵凯",gender:"男",jobNo:"WL-10093",phone:"13800009031",enterprise:"大连微冷科技有限公司",department:"生产一部",roomBed:"宿舍1号楼-218-1号床",checkInTime:"2026-05-26 09:40"},
  {name:"王敏",gender:"女",jobNo:"WL-10076",phone:"13800121208",enterprise:"大连微冷科技有限公司",department:"行政部",roomBed:"宿舍2号楼-318-4号床",checkInTime:"2026-06-02 14:10"}
];
const dormViolationBehaviors=[
  {name:"违规使用大功率电器",score:"12分"},
  {name:"在宿舍楼内吸烟，或在宿舍区域内焚烧物品",score:"6分"},
  {name:"在宿舍区域围栏附近攀爬、斗殴、吸毒、赌博、盗窃",score:"6分"},
  {name:"夜间喧哗",score:"2分"},
  {name:"公共区域堆物",score:"1分"}
];
const dormRoomTree=[
  {building:"宿舍1号楼",floors:[
    {floor:"2层",rooms:["201","202","218"]},
    {floor:"3层",rooms:["301","302","318"]}
  ]},
  {building:"宿舍2号楼",floors:[
    {floor:"3层",rooms:["305","306","318"]},
    {floor:"4层",rooms:["401","406","418"]}
  ]}
];
let dormAssignSelection={building:"",floor:"",room:""};
let mobileMenuWeek=1,mobileMenuDay=3,mobileMenuMeal="午餐",mobileRatingFood="",mobileRatingScore=0;
let mobileKnowledgeView="level1",mobileKnowledgePrimary="",mobileKnowledgeSecondary="",mobileKnowledgeDocName="";
const mobileFoodRatings=new Map([["红烧排骨",4]]);
const mobileMenuWeeks=[
  {label:"第23周",range:"06.01 - 06.07",status:"已取消发布",available:false},
  {label:"第24周",range:"06.08 - 06.14",status:"本周 · 已发布",available:true},
  {label:"第25周",range:"06.15 - 06.21",status:"未发布",available:false}
];
const mobileMenuDays=[
  {week:"一",date:"08"},{week:"二",date:"09"},{week:"三",date:"10"},{week:"四",date:"11",today:true},
  {week:"五",date:"12"},{week:"六",date:"13"},{week:"日",date:"14"}
];
const mobileMenuFoods={
  "早餐":[
    {name:"鲜肉小笼包",desc:"现蒸面点 · 每份 4 个",image:"bun",tag:"主食"},
    {name:"南瓜小米粥",desc:"低糖热粥 · 约 300ml",image:"porridge",tag:"粥品"},
    {name:"茶叶蛋",desc:"当日卤制 · 每份 1 个",image:"egg",tag:"蛋类"}
  ],
  "午餐":[
    {name:"清蒸鲈鱼",desc:"鲜鱼清蒸 · 少油",image:"fish",tag:"荤菜"},
    {name:"西红柿炒蛋",desc:"家常口味 · 微甜",image:"tomato",tag:"热菜"},
    {name:"香菇青菜",desc:"时令青菜 · 清炒",image:"vegetable",tag:"素菜"},
    {name:"红烧排骨",desc:"酱香口味 · 小份",image:"ribs",tag:"荤菜"}
  ],
  "晚餐":[
    {name:"土豆烧牛肉",desc:"软烂入味 · 微辣",image:"beef",tag:"荤菜"},
    {name:"蒜蓉西兰花",desc:"蒜香清炒 · 少盐",image:"broccoli",tag:"素菜"},
    {name:"紫菜蛋花汤",desc:"清淡汤品 · 约 250ml",image:"soup",tag:"汤品"}
  ]
};
const mobileKnowledgeCategories=[
  {name:"物业制度",updated:"2026-07-12 10:18",count:7,children:[
    {name:"安全作业规范",updated:"2026-07-12 10:18",count:3,docs:[
      {name:"园区消防巡查制度",type:"PDF",size:"8.6MB",updated:"2026-07-12 10:18"},
      {name:"消防演练培训材料",type:"PPTX",size:"15.4MB",updated:"2026-07-10 15:20"},
      {name:"用电安全作业规范",type:"DOCX",size:"2.1MB",updated:"2026-07-08 09:12"}
    ]},
    {name:"报修指引",updated:"2026-07-11 16:40",count:2,docs:[
      {name:"公共区域报修操作指引",type:"DOCX",size:"1.4MB",updated:"2026-07-11 16:40"},
      {name:"维修工接单处理说明",type:"PDF",size:"3.2MB",updated:"2026-07-09 14:12"}
    ]},
    {name:"培训资料归档",updated:"2026-07-10 08:25",count:2,docs:[
      {name:"2025年度物业培训材料",type:"PPTX",size:"36.2MB",updated:"2026-07-10 08:25"},
      {name:"新员工物业制度学习清单",type:"PDF",size:"4.6MB",updated:"2026-07-02 11:30"}
    ]}
  ]},
  {name:"设备操作指引",updated:"2026-07-09 17:05",count:4,children:[
    {name:"冷库设备操作",updated:"2026-07-09 17:05",count:2,docs:[
      {name:"冷库设备日常操作手册",type:"PDF",size:"12.8MB",updated:"2026-07-09 17:05"},
      {name:"冷库温控异常处理说明",type:"DOCX",size:"1.9MB",updated:"2026-07-06 13:26"}
    ]},
    {name:"公共设备巡检",updated:"2026-07-07 15:42",count:2,docs:[
      {name:"设备巡检记录模板",type:"XLSX",size:"1.2MB",updated:"2026-07-07 15:42"},
      {name:"公共设备巡检注意事项",type:"PDF",size:"5.4MB",updated:"2026-07-05 10:00"}
    ]}
  ]},
  {name:"常见问题",updated:"2026-07-03 09:18",count:3,children:[
    {name:"园区服务 FAQ",updated:"2026-07-03 09:18",count:3,docs:[
      {name:"访客预约常见问题",type:"PDF",size:"2.4MB",updated:"2026-07-03 09:18"},
      {name:"宿舍申请常见问题",type:"PDF",size:"2.7MB",updated:"2026-06-28 16:22"},
      {name:"食堂评价操作说明",type:"PDF",size:"1.8MB",updated:"2026-06-25 12:05"}
    ]}
  ]}
];
const menu=document.getElementById("propertyMenu"),page=document.getElementById("propertyPage");
function statusClass(s){
  const value=String(s);
  if(value==="处理中")return "primary";
  if(/已立项|已完成|启用|可用|已发布|已入住|已成单|正常|通过/.test(value))return "success";
  if(value==="已关闭")return "neutral";
  if(/待|未发布|草稿|未成单/.test(value))return "warning";
  if(/停用|退回|取消|过期|驳回/.test(value))return "danger";
  return "primary";
}
const tag=s=>`<span class="tag ${statusClass(String(s))}"><i class="dot"></i>${s}</span>`;
const esc=s=>String(s??"—");
const button=(x,cls="text")=>`<button class="btn ${cls}" data-action="${x}">${x}</button>`;
const pageActions=(primary,secondary,extra,afterPrimary)=>`${extra?button(extra):""}${secondary?button(secondary):""}${primary?button(primary,"primary"):""}${afterPrimary?button(afterPrimary):""}`;
const pageHead=(title,desc,primary,secondary,extra)=>{const actions=pageActions(primary,secondary,extra);return actions?`<div class="page-head page-head-actions-only"><div class="head-actions">${actions}</div></div>`:"";};
const filterOptions={
  "启用状态":["启用","停用"],
  "发布状态":["全部","未发布","已发布","已取消发布"],
  "报修类型":["全部","照明","给排水","门窗","设施","环境"],
  "当前状态":["全部","待派单","待总务审批","待接单","处理中","已完成","已立项","已关闭"],
  "是否超时":["全部","是","否"]
};
const filterPlaceholders={
  "报修人/联系方式":"请输入报修人或联系方式",
  "报修位置":"请输入报修位置"
};
function filterControl(label,i){
  if(activePage==="通知公告"){
    if(label==="发布状态")return `<select class="control" data-filter="${i}"><option>全部</option><option>草稿</option><option>已发布</option><option>已取消发布</option><option>已过期</option></select>`;
    if(label==="发布时间区间")return `<div class="date-range-control"><input class="control" type="date" data-filter="${i}-start" aria-label="发布开始日期"><span>至</span><input class="control" type="date" data-filter="${i}-end" aria-label="发布结束日期"></div>`;
  }
  if(activePage==="招商意向列表"){
    if(label==="意向园区")return `<select class="control" data-filter="${i}"><option>全部</option><option>三里园区</option><option>华家园区</option></select>`;
    if(label==="状态")return `<select class="control" data-filter="${i}"><option>全部</option><option>未成单</option><option>已成单</option></select>`;
    if(label==="登记时间区间")return `<div class="date-range-control"><input class="control" type="date" data-filter="${i}-start" aria-label="登记开始日期"><span>至</span><input class="control" type="date" data-filter="${i}-end" aria-label="登记结束日期"></div>`;
  }
  if(activeModule==="knowledge"&&label==="状态")return `<select class="control" data-filter="${i}"><option>全部</option><option>启用</option><option>停用</option></select>`;
  if(activeModule==="knowledge"&&activePage==="文档管理"&&label==="上传时间")return `<div class="date-range-control"><input class="control" type="date" data-filter="${i}-start" aria-label="上传开始日期"><span>至</span><input class="control" type="date" data-filter="${i}-end" aria-label="上传结束日期"></div>`;
  if(label==="周次"&&["周菜单管理","满意度结果"].includes(activePage)){
    const availableWeeks=new Set();
    return `<div class="week-picker-control weekly-menu-filter-week"><input type="hidden" data-filter="${i}" id="weeklyMenuFilterWeek" value=""><button type="button" class="week-picker-trigger" id="weeklyMenuFilterWeekTrigger" data-action="切换筛选周次选择器"><span>请选择周次</span><i></i></button><div class="week-picker-popover" id="weeklyMenuFilterPicker"><div class="week-picker-head"><button type="button" class="prev" data-action="筛选上一月" aria-label="上一个月"></button><b id="weeklyMenuFilterMonthTitle">2026 年 6 月</b><button type="button" class="next" data-action="筛选下一月" aria-label="下一个月"></button></div><div class="week-calendar-weekdays">${["一","二","三","四","五","六","日"].map(day=>`<span>${day}</span>`).join("")}</div><div class="week-calendar-month" data-filter-week-month="6">${weekCalendarRows(6,availableWeeks,"选择筛选周次")}</div><div class="week-calendar-month" data-filter-week-month="7" hidden>${weekCalendarRows(7,availableWeeks,"选择筛选周次")}</div><div class="week-picker-legend"><span><i></i>整周选择</span><span>按自然周筛选</span></div></div></div>`;
  }
  if(activePage==="宿舍人员"||activePage==="入住审批"){
    if(label==="姓名/联系方式/工号")return `<input class="control" placeholder="请输入姓名、联系方式或工号" data-filter="${i}">`;
    if(label==="预计入住时间")return `<input class="control" type="date" data-filter="${i}">`;
    if(label==="申请时间")return `<input class="control" placeholder="开始时间 - 结束时间" data-filter="${i}">`;
    const dormOptions={
      "性别":["全部","男","女"],
      "所属企业/部门":["全部","大连微冷科技有限公司 / 生产一部","大连微冷科技有限公司 / 生产二部","大连微冷科技有限公司 / 行政部","大连微冷科技有限公司 / 研发部"],
      "当前状态":["全部","待审批","待分配","已入住","已驳回"]
    }[label];
    if(dormOptions)return `<select class="control" data-filter="${i}">${dormOptions.map(x=>`<option>${x}</option>`).join("")}</select>`;
  }
  if(activePage==="违规记录"){
    if(label==="违规人员（姓名/工号）")return `<input class="control" placeholder="请输入姓名或工号" data-filter="${i}">`;
    if(label==="违规行为")return `<select class="control" data-filter="${i}"><option>全部</option>${dormViolationBehaviors.map(item=>`<option>${item.name}</option>`).join("")}</select>`;
    if(label==="违规时间")return `<input class="control" placeholder="开始时间 - 结束时间" data-filter="${i}">`;
    if(label==="所属企业/部门")return `<select class="control" data-filter="${i}"><option>全部</option><option>大连微冷科技有限公司 / 生产一部</option><option>大连微冷科技有限公司 / 生产二部</option><option>大连微冷科技有限公司 / 行政部</option></select>`;
  }
  const options=filterOptions[label];
  if(options)return `<select class="control" data-filter="${i}">${options.map(x=>`<option>${x}</option>`).join("")}</select>`;
  return `<input class="control" placeholder="${filterPlaceholders[label]||(/时间|日期/.test(label)?"请选择"+label:"请输入或选择"+label)}" data-filter="${i}">`;
}
const filters=fields=>`<div class="card filter-card ${["周菜单管理","满意度结果"].includes(activePage)?"weekly-menu-filter-card":""} ${activeModule==="knowledge"&&activePage==="文档管理"?"knowledge-doc-filter-card":""}"><div class="filters">${fields.map((x,i)=>`<div class="field"><label>${x}</label>${filterControl(x,i)}</div>`).join("")}<div class="filter-actions">${button("重置")}${button("查询","primary")}</div></div></div>`;
const pagination=(total=28)=>`<div class="pagination"><span>共 ${total} 条</span><button class="page-btn active">1</button><button class="page-btn">2</button><button class="page-btn">3</button><button class="page-btn">›</button></div>`;
function rowActions(cfg,row){
  const state=row.find(x=>cfg.stateActions?.[x]);
  const actions=state?cfg.stateActions[state]:(cfg.actions||[]);
  return actions.map(x=>{
    if(activePage==="通知公告"&&state==="已发布"&&x==="编辑")return `<button class="btn text disabled-action" data-action="已发布编辑提示">编辑</button>`;
    return button(x,x==="删除"||x==="删除草稿"?"text danger":"text");
  }).join("");
}
function tableCell(cfg,x,i){
  if(String(x).startsWith("FOOD:"))return `<button class="food-thumb ${String(x).split(":")[1]}" data-action="图片预览" aria-label="查看菜品大图"><span></span></button>`;
  if(cfg.stateActions?.[x])return tag(x);
  return i===0?`<span class="link" data-action="查看详情">${esc(x)}</span>`:esc(x);
}
function renderTableCell(cfg,row,col,visibleIndex){
  if(col.render==="index")return esc(visibleIndex+1);
  if(col.render==="switch")return `<label class="switch-control table-switch" aria-label="${col.label}"><input type="checkbox" ${row[col.index]==="是"?"checked":""}><span></span></label>`;
  if(col.link)return `<span class="link" data-action="查看详情">${esc(row[col.index])}</span>`;
  if(activePage==="招商意向列表"&&col.label==="意向编号")return `<span class="link" data-action="查看详情">${esc(row[col.index])}</span>`;
  if(col.label==="性别"){
    const gender=row[col.index];
    return `<span class="gender-tag ${gender==="女"?"female":"male"}">${esc(gender)}</span>`;
  }
  if(col.render==="enterpriseDept"){
    const enterprise=row[cfg.columns.indexOf("所属企业")];
    const department=row[cfg.columns.indexOf("所属部门")];
    return `<div class="two-line-cell"><b>${esc(enterprise)}</b><span>${esc(department)}</span></div>`;
  }
  if(col.render==="enterpriseDeptCombined"){
    const [enterprise,department="—"]=String(row[col.index]||"").split(" / ");
    return `<div class="two-line-cell"><b>${esc(enterprise)}</b><span>${esc(department)}</span></div>`;
  }
  if(col.render==="categoryPath"){
    const [parent,child="—"]=String(row[col.index]||"").split(" / ");
    return `<div class="two-line-cell document-category-cell"><b>${esc(parent)}</b><span>${esc(child)}</span></div>`;
  }
  if(col.render==="reporterTime"){
    const reporter=row[cfg.columns.indexOf("报修人")];
    const phone=row[cfg.columns.indexOf("联系方式")];
    const time=row[cfg.columns.indexOf("报修时间")]||row[cfg.columns.indexOf("发起时间")];
    return `<div class="two-line-cell"><b>${esc(reporter)}（${esc(phone)}）</b><span>${esc(time)}</span></div>`;
  }
  if(col.render==="uploaderTime"){
    const uploader=row[cfg.columns.indexOf("上传人")];
    const time=row[cfg.columns.indexOf("上传时间")];
    return `<div class="two-line-cell document-uploader-time"><b>${esc(uploader)}</b><span>${esc(time)}</span></div>`;
  }
  if(col.render==="timeout"){
    const status=row[cfg.columns.indexOf("当前状态")];
    const timeout=row[cfg.columns.indexOf("是否超时")];
    return ["待接单","处理中","已完成","已关闭"].includes(status)?esc(timeout):"—";
  }
  return tableCell(cfg,row[col.index],visibleIndex);
}
function table(cfg,toolbarActions=""){
  const cols=cfg.tableColumns||cfg.columns.map((label,index)=>({label,index}));
  return `<div class="card table-card"><div class="table-toolbar"><div class="table-toolbar-left"><b>列表数据</b><span class="tag primary">${cfg.rows.length} 条示例</span></div><div class="table-toolbar-right">${(cfg.batchActions||[]).map(x=>button(x)).join("")}${toolbarActions}</div></div><div class="table-wrap"><table><thead><tr>${cols.map(x=>`<th>${x.label}</th>`).join("")}<th>操作</th></tr></thead><tbody>${cfg.rows.map((r,ri)=>`<tr data-row="${ri}">${cols.map((col,i)=>`<td>${renderTableCell(cfg,r,col,col.render==="index"?ri:i)}</td>`).join("")}<td class="actions">${rowActions(cfg,r)}</td></tr>`).join("")}</tbody></table></div>${pagination(cfg.rows.length)}</div>`;
}
function knowledgeCategoryTree(){
  return `<aside class="card knowledge-tree-card">
    <div class="knowledge-tree-head">
      <b>分类树</b>
      <span>全部分类</span>
    </div>
    <div class="knowledge-tree">
      <button class="knowledge-tree-node active" type="button"><span>全部文档</span><em>3</em></button>
      <div class="knowledge-tree-group">
        <button class="knowledge-tree-node level-1" type="button"><span>物业制度</span>${tag("启用")}</button>
        <button class="knowledge-tree-node level-2" type="button"><span>安全作业规范</span><em>1</em>${tag("启用")}</button>
        <button class="knowledge-tree-node level-2" type="button"><span>报修指引</span><em>1</em>${tag("启用")}</button>
        <button class="knowledge-tree-node level-2" type="button"><span>培训资料归档</span><em>1</em>${tag("启用")}</button>
      </div>
      <div class="knowledge-tree-group">
        <button class="knowledge-tree-node level-1" type="button"><span>设备操作指引</span>${tag("启用")}</button>
        <button class="knowledge-tree-node level-2" type="button"><span>冷库设备操作</span><em>0</em>${tag("启用")}</button>
      </div>
      <div class="knowledge-tree-group">
        <button class="knowledge-tree-node level-1 disabled" type="button"><span>历史培训资料</span>${tag("停用")}</button>
      </div>
    </div>
    <div class="knowledge-tree-tip">PC 分类树展示全部分类，包括停用分类；文档搜索按全库执行，不受当前选中分类限制。</div>
  </aside>`;
}
function renderKnowledgeDocumentList(cfg){
  const rule=`<div class="alert warning"><b>业务规则：</b>${cfg.rule}</div>`;
  const right=`<section class="knowledge-list-main">${filters(cfg.filters)}${table(cfg,pageActions(cfg.primary,cfg.secondary,cfg.extra,cfg.afterPrimary))}</section>`;
  page.innerHTML=`${rule}<div class="knowledge-layout">${knowledgeCategoryTree()}${right}</div>`;
}
function categoryTreeActions(row){
  const level=row[2],status=row[3];
  const actions=level==="一级"
    ? status==="启用"?["新增二级分类","停用"]:["编辑","新增二级分类","启用","删除"]
    : status==="启用"?["停用"]:["编辑","启用","删除"];
  return actions.map(action=>button(action,action==="删除"?"text danger":"text")).join("");
}
function renderKnowledgeCategoryList(cfg){
  const rows=cfg.rows.map((row,index)=>({row,index}));
  const parents=rows.filter(item=>item.row[2]==="一级");
  const rowHtml=parents.map((parent,parentIndex)=>{
    const parentName=parent.row[0];
    const parentKey=`knowledge-category-${parentIndex}`;
    const children=rows.filter(item=>item.row[1]===parentName&&item.row[2]==="二级");
    const expander=children.length?`<button class="category-expand expanded" type="button" data-action="切换分类展开" data-category-key="${parentKey}" aria-label="展开或收起${esc(parentName)}"></button>`:`<span class="category-expand-placeholder"></span>`;
    const parentRow=`<tr class="category-tree-row category-tree-parent" data-row="${parent.index}">
      <td>${parentIndex+1}</td>
      <td><div class="category-name-cell">${expander}<b>${esc(parentName)}</b></div></td>
      <td>${esc(parent.row[1])}</td>
      <td>${esc(parent.row[2])}</td>
      <td>${tag(parent.row[3])}</td>
      <td class="actions">${categoryTreeActions(parent.row)}</td>
    </tr>`;
    const childRows=children.map((child,childIndex)=>`<tr class="category-tree-row category-tree-child" data-category-parent="${parentKey}" data-row="${child.index}">
      <td>${parentIndex+1}.${childIndex+1}</td>
      <td><div class="category-name-cell child"><span class="category-child-line"></span><span>${esc(child.row[0])}</span></div></td>
      <td>${esc(child.row[1])}</td>
      <td>${esc(child.row[2])}</td>
      <td>${tag(child.row[3])}</td>
      <td class="actions">${categoryTreeActions(child.row)}</td>
    </tr>`).join("");
    return parentRow+childRows;
  }).join("");
  page.innerHTML=`${cfg.rule?`<div class="alert warning"><b>业务规则：</b>${cfg.rule}</div>`:""}${filters(cfg.filters)}
    <div class="card table-card category-tree-card">
      <div class="table-toolbar"><div class="table-toolbar-left"><b>分类列表</b><span class="tag primary">${cfg.rows.length} 条示例</span></div><div class="table-toolbar-right">${pageActions(cfg.primary,cfg.secondary,cfg.extra,cfg.afterPrimary)}</div></div>
      <div class="table-wrap"><table class="category-tree-table"><thead><tr><th>序号</th><th>分类名称</th><th>上级分类</th><th>分类级别</th><th>状态</th><th>操作</th></tr></thead><tbody>${rowHtml}</tbody></table></div>
      ${pagination(cfg.rows.length)}
    </div>`;
}
function renderMenu(){
  menu.innerHTML=propertyModules.map(m=>`<div><button class="menu-item menu-parent ${activeModule===m.id?"open":""}" data-module="${m.id}"><span class="menu-icon">${m.icon}</span><span>${m.name}</span><span class="menu-arrow">›</span></button>${activeModule===m.id?`<div class="submenu">${m.children.map(c=>`<button class="submenu-item ${activePage===c?"active":""}" data-page="${c}"><span class="submenu-dot"></span>${c}</button>`).join("")}</div>`:""}</div>`).join("");
}
function renderStandard(){
  const cfg=configs[`${activeModule}:${activePage}`];currentCfg=cfg;
  if(activeModule==="knowledge"&&activePage==="分类管理")return renderKnowledgeCategoryList(cfg);
  if(activeModule==="knowledge"&&activePage==="文档管理")return renderKnowledgeDocumentList(cfg);
  page.innerHTML=`${cfg.rule?`<div class="alert ${/不支持|不可|不提供/.test(cfg.rule)?"warning":""}"><b>业务规则：</b>${cfg.rule}</div>`:""}${filters(cfg.filters)}${table(cfg,pageActions(cfg.primary,cfg.secondary,cfg.extra,cfg.afterPrimary))}`;
}
const spaceRows={
  "园区管理":[["青岛科创园","山东省青岛市崂山区中韩街道2","海尔路1号","2111.00","11"],["北京园区","北京市市辖区东城区222","2222","220.00","—"],["海尔智慧园区","山东省青岛市崂山区海尔路","海尔路1号","200000.00","演示园区"],["三里园区","辽宁省大连市金州区三里园区","三里园区","15979.00","—"]],
  "区域管理":[["办公区域","12500.00","海尔智慧园区","办公及会议空间","2026-06-10 15:28"],["生活区域","18600.00","海尔智慧园区","员工生活配套","2026-06-09 11:16"],["生产区域","36500.00","青岛科创园","生产作业空间","2026-06-08 09:42"]],
  "楼宇管理":[["综合办公楼","8200.00","办公区域 / 海尔智慧园区","办公楼宇","2026-06-10 15:38"],["员工宿舍1号楼","9600.00","生活区域 / 海尔智慧园区","员工宿舍","2026-06-09 13:20"],["食堂楼","4200.00","生活区域 / 海尔智慧园区","员工食堂","2026-06-08 10:06"]],
  "楼层管理":[["综合办公楼1层","2100.00","1980.00","综合办公楼 / 办公区域","大厅与会议室","2026-06-10 16:12"],["员工宿舍1号楼2层","1800.00","1680.00","员工宿舍1号楼 / 生活区域","员工宿舍楼层","2026-06-09 14:26"],["食堂楼1层","2100.00","1920.00","食堂楼 / 生活区域","用餐区域","2026-06-08 11:08"]],
  "房间管理":[["101会议室","86.00","82.00","会议室","启用","综合办公楼1层 / 综合办公楼","会议室","2026-06-10 16:40"],["218宿舍","32.00","30.00","宿舍","启用","员工宿舍1号楼2层 / 员工宿舍1号楼","员工宿舍","2026-06-09 15:10"],["219宿舍","32.00","30.00","宿舍","停用","员工宿舍1号楼2层 / 员工宿舍1号楼","维修中","2026-06-08 12:16"]]
};
const spaceColumns={
  "园区管理":["园区名称","地址","详细地址","面积(平方米)","备注"],
  "区域管理":["区域名称","区域面积","所属位置","备注","更新时间"],
  "楼宇管理":["楼宇名称","占地面积","所属位置","备注","更新时间"],
  "楼层管理":["楼层名称","楼层面积","可用面积","所属位置","备注","更新时间"],
  "房间管理":["房间名称","房屋面积","可用面积","房","状态","所属位置","备注","更新时间"]
};
const spaceFormFields={
  "园区管理":["园区名称","地址","详细地址","面积(平方米)","备注（选填）"],
  "区域管理":["区域名称","区域面积","所属位置","备注（选填）"],
  "楼宇管理":["楼宇名称","占地面积","所属位置","备注（选填）"],
  "楼层管理":["楼层名称","楼层面积","可用面积","所属位置","备注（选填）"],
  "房间管理":["房间名称","房屋面积","可用面积","房","状态","所属位置","备注（选填）"]
};
function renderSpaceTable(){
  const cfg={columns:spaceColumns[spaceTab],rows:spaceRows[spaceTab],actions:["修改","删除"]};
  currentCfg=cfg;
  const name=cfg.columns[0],batch=spaceTab==="楼层管理"?button("批量新增楼层","primary"):spaceTab==="房间管理"?button("批量新增房间","primary"):"";
  return `<div class="card space-search-card"><div class="space-search-row"><div class="field"><label>${name}</label><input class="control" placeholder="请输入${name}" data-filter="0"></div><div class="field space-date-field"><label>创建时间</label><input class="control" placeholder="开始日期　-　结束日期" data-filter="1"></div><div class="filter-actions">${button("搜索","primary")}${button("重置","")}</div></div></div><div class="card space-list-card"><div class="space-action-bar">${button("新增","primary")}${batch}${button("修改","space-edit")}${button("删除","space-delete")}${button("导出","space-export")}</div><div class="table-wrap"><table class="space-unified-table"><thead><tr><th><input type="checkbox"></th>${cfg.columns.map(x=>`<th>${x}</th>`).join("")}<th>操作</th></tr></thead><tbody>${cfg.rows.map((r,ri)=>`<tr data-row="${ri}"><td><input type="checkbox"></td>${r.map(x=>`<td>${x==="启用"||x==="停用"?tag(x):esc(x)}</td>`).join("")}<td class="actions">${button("修改","text")}${button("删除","text danger")}</td></tr>`).join("")}</tbody></table></div><div class="space-pagination"><span>共 ${cfg.rows.length} 条</span><select class="control"><option>10条/页</option></select><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">›</button><span>前往</span><input class="control" value="1"><span>页</span></div></div>`;
}
function renderSpace(){
  const content=renderSpaceTable();
  page.innerHTML=`<div class="card space-management-shell"><div class="tabs space-management-tabs">${["园区管理","区域管理","楼宇管理","楼层管理","房间管理"].map(x=>`<button class="tab ${spaceTab===x?"active":""}" data-space-tab="${x}">${x}</button>`).join("")}</div>${spaceTab==="房间管理"?`<div class="space-room-layout"><div class="card tree-panel space-room-tree"><input class="control tree-search" placeholder="搜索空间"><div class="tree-node active">▾ 海尔智慧园区</div><div class="tree-node lv2">▾ 生活区域</div><div class="tree-node lv3">▾ 员工宿舍1号楼</div><div class="tree-node lv4">● 2层</div><div class="tree-node lv2">▸ 办公区域</div></div><div>${content}</div></div>`:content}</div>`;
}
function renderSchedule(){
  const days=[["06-08","周一"],["06-09","周二"],["06-10","周三"],["06-11","周四"],["06-12","周五"],["06-13","周六"],["06-14","周日"]];
  const rosters=[
    {label:"安保白班",type:"security",shift:"白班",people:[["张建国","刘海"],["孙凯"],["周卫华","陈强"],["赵明"],[],["孙凯","刘海"],["周卫华"]]},
    {label:"安保夜班",type:"security",shift:"夜班",people:[["赵明"],["张建国","陈强"],["孙凯"],["周卫华"],[],["张建国"],["孙凯"]]},
    {label:"保洁在岗",type:"cleaning",shift:"在岗",people:[["王小琴","李春梅"],["赵丽"],["王小琴"],["李春梅","赵丽"],[],["李春梅"],["王小琴"]]},
    {label:"食堂在岗",type:"canteen",shift:"在岗",people:[["陈师傅","李师傅"],["周阿姨"],["陈师傅"],["李师傅","周阿姨"],[],["李师傅"],["陈师傅","李师傅"]]}
  ];
  const personButton=(name,item)=>`<button class="schedule-person ${item.type}" data-action="编辑排班人员"><b>${name}</b></button>`;
  const dayCards=days.map((d,di)=>{
    const isEmptyDay=rosters.every(item=>item.people[di].length===0);
    return `<section class="schedule-day ${d[0]==="06-11"?"today":""} ${isEmptyDay?"empty-day":""}">
      <div class="schedule-day-head"><div><b>${d[0]}</b><span>${d[1]}</span></div>${d[0]==="06-11"?`<i>今日</i>`:""}</div>
      ${isEmptyDay?`<div class="schedule-empty-day">当日暂无排班人员</div>`:""}
      ${rosters.map(item=>`<div class="schedule-shift-group ${item.type}"><label>${item.label}</label><div class="schedule-people">${item.people[di].map(name=>personButton(name,item)).join("")}<button class="schedule-add ${item.type}" data-action="批量设置">＋</button></div></div>`).join("")}
    </section>`;
  }).join("");
  page.innerHTML=`${pageHead("排班日历","按自然周筛选查看历史周排班，并按岗位颜色区分班次人员。")}<div class="alert warning"><b>排班规则：</b>排班按自然周展示，可筛选查看历史周记录；安保每天维护白班人员、夜班人员，保洁和食堂每天维护在岗人员；每个班次可维护多人。保存前为临时态，未保存离开需二次确认。</div><div class="card filter-card schedule-filter-card"><div class="filters"><div class="field"><label>排班周</label><input class="control" value="2026年第24周（2026-06-08 至 2026-06-14）"></div><div class="filter-actions">${button("上一周")}${button("本周","primary")}${button("下一周")}</div></div></div><div class="card schedule-board"><div class="schedule-board-head"><div><b>2026年第24周 · 06-08 至 06-14</b><span>自然周视图，点击人员或加号维护对应日期的多人排班</span></div><div class="schedule-board-tools"><div class="schedule-legend"><span class="security">安保</span><span class="cleaning">保洁</span><span class="canteen">食堂</span></div><div class="schedule-board-actions">${button("保存排班","primary")}</div></div></div><div class="schedule-calendar">${dayCards}</div></div>`;
}
function renderSatisfaction(){
  const days=[
    {week:"周一",date:"06-08"},{week:"周二",date:"06-09"},{week:"周三",date:"06-10"},
    {week:"周四",date:"06-11"},{week:"周五",date:"06-12"},{week:"周六",date:"06-13"},{week:"周日",date:"06-14"}
  ];
  const mealFoods={
    "早餐":["鲜肉小笼包","南瓜小米粥","茶叶蛋"],
    "午餐":["清蒸鲈鱼","西红柿炒蛋","香菇青菜","红烧排骨"],
    "晚餐":["土豆烧牛肉","蒜蓉西兰花","紫菜蛋花汤"]
  };
  const meals=["早餐","午餐","晚餐"];
  const rating=(dayIndex,mealIndex,foodIndex=-1)=>(4.1+((dayIndex*2+mealIndex+foodIndex+2)%8)/10).toFixed(1);
  const stars=score=>`<span class="satisfaction-stars" style="--rating:${score}">★★★★★</span>`;
  const mealCards=days.map((day,dayIndex)=>`
    <section class="satisfaction-day">
      <div class="satisfaction-day-head"><div><b>${day.week}</b><span>${day.date}</span></div><small>共 ${57+dayIndex*9} 人次评价</small></div>
      <div class="satisfaction-meals">
        ${meals.map((meal,mealIndex)=>{
          const overall=rating(dayIndex,mealIndex);
          const overallCount=18+dayIndex*3+mealIndex;
          return `<article class="satisfaction-meal-card">
            <div class="satisfaction-meal-head">
              <div><b>${meal}</b><span>${mealFoods[meal].length} 道菜品</span></div>
              <button class="satisfaction-overall" data-action="星级分布" data-rating-title="${day.week} ${meal}总体评价">
                <span>总体评价</span><strong>${overall}</strong>${stars(overall)}<small>${overallCount} 人评价</small>
              </button>
            </div>
            <div class="satisfaction-food-list">
              ${mealFoods[meal].map((food,foodIndex)=>{
                const score=rating(dayIndex,mealIndex,foodIndex);
                const count=Math.max(8,overallCount-foodIndex*2);
                return `<button class="satisfaction-food-row" data-action="星级分布" data-rating-title="${day.week} ${meal} · ${food}">
                  <span class="satisfaction-food-name">${food}</span>
                  <span class="satisfaction-food-rating"><strong>${score}</strong>${stars(score)}<small>${count} 人评价</small></span>
                </button>`;
              }).join("")}
            </div>
          </article>`;
        }).join("")}
      </div>
    </section>`).join("");
  page.innerHTML=`${pageHead("满意度结果","按自然周查看每餐总体评价及菜品评价。",null,"导出")}${filters(["周次"])}<div class="satisfaction-summary"><div><span>当前周次</span><b>2026年第24周</b><small>06-08 至 06-14</small></div><div><span>本周总体评价</span><b>4.6</b>${stars("4.6")}<small>588 人次评价</small></div><div><span>已评价餐次</span><b>21 / 21</b><small>覆盖全部餐次</small></div></div><div class="satisfaction-board">${mealCards}</div>`;
}
function renderPage(){
  renderMenu();const module=propertyModules.find(x=>x.id===activeModule);document.getElementById("propertyBreadcrumb").textContent=`物业管理系统 / ${module.name} / ${activePage}`;
  if(activePage==="空间管理")return renderSpace();
  if(activePage==="排班日历")return renderSchedule();
  if(activePage==="满意度结果")return renderSatisfaction();
  renderStandard();
}

const actionSpecs={
  "人员列表:新增人员":["姓名","手机号","身份证号（选填）","外包公司","人员类型（安保 / 保洁 / 食堂）","入职日期","照片"],
  "人员列表:编辑":["姓名","手机号","身份证号（选填）","外包公司","人员类型（只读，不可修改）","入职日期","照片"],
  "人员列表:删除":["姓名（只读）","未来排班清除确认"],
  "报修类型:新增类型":["类型名称","类型编码（自动生成）","启用状态（开关）","备注（选填）"],
  "报修类型:编辑":["类型名称","类型编码（自动生成，只读）","启用状态（开关）","备注（选填）"],
  "工单列表:新增工单":["报修人","联系方式（选填）","报修位置","报修类型","问题描述","附件图片（选填）"],
  "工单列表:委派维修工":["工单编号（只读）","维修工（来源：园区员工）","派单说明（选填）","今日在岗安保（仅供参考）"],
  "工单列表:派单":["工单编号（只读）","维修工（来源：园区员工，必填）","处理时限","派单说明（选填）","今日在岗安保（仅供参考）"],
  "工单列表:上报总务":["工单编号（只读）","上报说明（选填）"],
  "工单列表:立项维修":["工单编号（只读）","立项说明（选填）"],
  "工单列表:直接回复并关单":["工单编号（只读）","回复内容"],
  "工单列表:直接回复关单":["工单编号（只读）","回复内容","关闭原因（选填）","二次确认"],
  "工单列表:换人":["工单编号（只读）","原维修工（只读）","新维修工（来源：园区员工）","处理时限（选填）","换人原因"],
  "工单列表:强制关闭":["工单编号（只读）","关闭原因","二次确认"],
  "工单列表:满意度评价":["工单编号（只读）","星级评分（1-5星）","文字评价（选填）"],
  "总务审批:审批通过":["工单编号（只读）","维修工（来源：园区员工，必填）","处理时限","派单说明（选填）","今日在岗安保（仅供参考）"],
  "总务审批:审批驳回":["工单编号（只读）","审批结果：驳回（只读）","驳回原因"],
  "宿舍人员:发起入住申请":["申请人","所属企业（只读）","所属部门（只读）","性别（只读）","联系方式（只读）","预计入住时间","申请原因","备注（选填）"],
  "宿舍人员:分配房间":["申请人（只读）","房间编号（仅启用房间）","床位号","入住时间"],
  "入住审批:通过":["请确认是否通过宿舍申请"],
  "入住审批:驳回":["申请人（只读）","所属企业/部门（只读）","联系方式（只读）","工号（只读）","预计入住时间（只读）","审批结果：驳回（只读）","驳回原因"],
  "违规记录:新增违规记录":["所属企业/部门","违规时间","违规人员（仅已入住人员）","违规行为","备注（选填）","违规照片（选填）"],
  "违规行为维护:新增违规行为":["违规行为","违规分值"],"违规行为维护:编辑":["违规行为","违规分值"],"违规行为维护:删除":["违规行为（只读）","删除确认"],
  "菜品库:新增菜品":["菜品名称","菜品图片","菜品说明"],"菜品库:修改":["菜品名称","菜品图片","菜品说明"],"菜品库:停用":["菜品名称（只读）","停用确认"],"菜品库:启用":["菜品名称（只读）","启用确认"],
  "周菜单管理:发布":["周次（只读）","发布确认"],"周菜单管理:取消发布":["周次（只读）","取消发布确认"],"周菜单管理:重新发布":["周次（只读）","重新发布确认"],
  "分类管理:新增分类":["分类名称","上级分类（一级分类为空，二级分类选择一级分类）","状态（默认停用）"],"分类管理:新增二级分类":["分类名称","上级分类（只读）","状态（默认停用）"],"分类管理:编辑":["分类名称","上级分类"],
  "分类管理:停用":["分类名称（只读）","停用确认"],"分类管理:启用":["分类名称（只读）","启用确认"],"分类管理:删除":["分类名称（只读）","删除原因"],
  "通知公告:发布":["标题（只读）","发布确认"],"通知公告:取消发布":["标题（只读）","取消发布确认"],"通知公告:重新发布":["标题（只读）","重新发布确认"],"通知公告:删除":["标题（只读）","删除确认"],
  "招商意向列表:登记成单":["意向编号（只读）","联系人（只读）","联系方式（只读）","意向内容（只读）","成单日期","备注"]
};
const detailTabs={
  "空间管理":["基础信息","上下级关系","业务引用","操作记录"],"人员列表":["人员信息","排班记录","考勤记录"],"报修类型":["类型信息","操作记录"],"工单列表":["基础信息","处理信息","派单信息","总务审批信息","维修信息","主管回复关单信息","换人记录","满意度信息","流转记录"],"总务审批":["基础信息","处理信息","总务审批信息","流转记录"],
  "宿舍人员":["人员信息","房间信息","入住记录","变更记录"],"违规记录":["违规信息"],"周菜单管理":["周菜单矩阵"],
  "文档管理":["基础信息","权限信息","在线预览","下载记录"],"通知公告":["基础信息","公告内容","发布记录","修改记录"],"招商意向列表":["基础信息","意向内容","成单结果"]
};
function formHtml(fields){
  return `<div class="form-grid">${fields.map((f,i)=>`<div class="form-field ${/说明|内容|原因|备注|附件|照片|图片|上传文档|替换文档|多选|确认/.test(f)?"full":""}"><label class="${/选填|只读|自动生成/.test(f)?"":"required"}">${f}</label>${f==="处理时限"?`<input class="control" type="datetime-local" step="60">`:/说明|内容|原因|备注/.test(f)?`<textarea class="control" placeholder="请输入${f}"></textarea>`:/附件|照片|图片|上传文档|替换文档/.test(f)?`<div class="upload-box">＋ ${/替换/.test(f)?"选择替换文档":"选择文档上传"}</div>`:/多选/.test(f)?`<div class="choice-box"><span class="choice-pill">张建国</span><span class="choice-pill">赵明</span><span class="choice-pill">＋ 添加人员</span></div>`:/开关/.test(f)?`<label class="switch-control"><input type="checkbox" checked><span></span><b>启用</b></label>`:/自动生成/.test(f)?`<input class="control" value="保存后系统自动生成" readonly>`:f==="类型名称"?`<input class="control" placeholder="请输入类型名称">`:/状态|类型|类别|方式|人员|房间|分类|权限|结果|分值|满意度|星级|确认/.test(f)?`<select class="control"><option>请选择${f.replace(/（.*?）/g,"")}</option><option>示例选项一</option><option>示例选项二</option></select>`:`<input class="control" ${/只读/.test(f)?'value="系统自动带出" readonly':''} placeholder="请输入${f.replace(/（.*?）/g,"")}">`} ${i===0?`<small class="form-help">字段与当前模块详细设计保持一致</small>`:""}</div>`).join("")}</div>`;
}
function violationBehaviorInputHtml(value="",allowDelete=true){
  return `<div class="violation-behavior-row">
    <label class="required">违规行为：</label>
    <input class="control" data-violation-behavior value="${esc(value)}" placeholder="请输入违规行为">
    ${allowDelete?`<button type="button" class="btn text danger" data-action="移除违规行为输入">删除</button>`:""}
  </div>`;
}
function openViolationBehaviorModal(title,row=[]){
  const isEdit=title.includes("编辑");
  const score=row[1]||"12分";
  const behaviors=isEdit?[row[0]||""]:[
    "殴打宿舍管理人员的",
    "在宿舍楼内吸烟，或在宿舍区域内焚烧物品"
  ];
  modalMode=isEdit?"violationBehaviorEdit":"violationBehaviorCreate";
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal");
  modal.classList.add("violation-behavior-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalConfirm").textContent="确定";
  document.getElementById("propertyModalTitle").textContent=title;
  document.getElementById("propertyModalBody").innerHTML=`<div class="violation-modal-form">
    <div class="violation-field-row">
      <label class="required">分值：</label>
      <input class="control" id="violationScore" value="${esc(score)}" placeholder="请输入分值">
    </div>
    <div class="violation-behavior-list" id="violationBehaviorList">
      ${behaviors.map(item=>violationBehaviorInputHtml(item,!isEdit)).join("")}
    </div>
    ${isEdit?"":`<button type="button" class="btn text violation-add-btn" data-action="添加违规行为输入">＋ 添加</button>`}
  </div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function addViolationBehaviorInput(){
  const list=document.getElementById("violationBehaviorList");
  if(!list)return;
  list.insertAdjacentHTML("beforeend",violationBehaviorInputHtml("",true));
}
function removeViolationBehaviorInput(trigger){
  const row=trigger?.closest(".violation-behavior-row");
  const list=document.getElementById("violationBehaviorList");
  if(!row||!list)return;
  if(list.querySelectorAll(".violation-behavior-row").length<=1)return toast("至少保留一条违规行为","warning");
  row.remove();
}
function openViolationDelete(row=[]){
  modalMode="violationBehaviorDelete";
  const behavior=row[0]||"该违规行为";
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalConfirm").textContent="确认删除";
  document.getElementById("propertyModalTitle").textContent="删除违规行为";
  document.getElementById("propertyModalBody").innerHTML=`<div class="confirm-message">确认删除“${esc(behavior)}”？删除后违规记录页不可再选择该行为，历史违规记录保留原名称。</div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openViolationRecordDelete(row=[]){
  modalMode="violationRecordDelete";
  currentRow=row;
  const [name,,jobNo,,,behavior,score]=row;
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal","violation-record-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalConfirm").textContent="确认删除";
  document.getElementById("propertyModalTitle").textContent="删除违规记录";
  document.getElementById("propertyModalBody").innerHTML=`<div class="confirm-message">请确认是否删除【${esc(name)}-${esc(jobNo)}】的本条违规记录</div>${infoGrid(["违规行为","分值"],[behavior,score])}`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function dormViolationResidentByName(name){
  return dormViolationResidents.find(item=>item.name===name);
}
function dormViolationBehaviorByName(name){
  return dormViolationBehaviors.find(item=>item.name===name);
}
function updateViolationResidentFields(name){
  const resident=dormViolationResidentByName(name);
  ["gender","jobNo","phone","roomBed","checkInTime"].forEach(key=>{
    const input=document.querySelector(`[data-violation-resident-field="${key}"]`);
    if(input)input.value=resident?.[key]||"";
  });
}
function updateViolationBehaviorScore(name){
  const behavior=dormViolationBehaviorByName(name);
  const input=document.getElementById("violationRecordScore");
  if(input)input.value=behavior?.score||"";
}
function violationRecordFormHtml(){
  return `<div class="violation-record-form">
    <section class="violation-record-section">
      <h3>违规信息</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">所属企业/部门</label>
          <select class="control" id="violationRecordDept">
            <option value="">请选择所属企业/部门</option>
            <option>大连微冷科技有限公司 / 生产一部</option>
            <option>大连微冷科技有限公司 / 生产二部</option>
            <option>大连微冷科技有限公司 / 行政部</option>
          </select>
        </div>
        <div class="form-field">
          <label class="required">违规时间</label>
          <input class="control" id="violationRecordTime" type="datetime-local" step="60">
        </div>
        <div class="form-field">
          <label class="required">选择违规人员</label>
          <select class="control" id="violationRecordResident" data-violation-resident>
            <option value="">请选择已入住人员</option>
            ${dormViolationResidents.map(item=>`<option value="${item.name}">${item.name}（${item.jobNo}）</option>`).join("")}
          </select>
          <small class="form-help">仅展示已入住状态的人员；选择后自动带出人员信息。</small>
        </div>
        <div class="form-field full violation-resident-block">
          <h4>人员信息</h4>
          <div class="violation-resident-info">
            <div><label>性别</label><input class="control" data-violation-resident-field="gender" placeholder="选择人员后自动带出" readonly></div>
            <div><label>工号</label><input class="control" data-violation-resident-field="jobNo" placeholder="选择人员后自动带出" readonly></div>
            <div><label>联系方式</label><input class="control" data-violation-resident-field="phone" placeholder="选择人员后自动带出" readonly></div>
            <div><label>房间-床位</label><input class="control" data-violation-resident-field="roomBed" placeholder="选择人员后自动带出" readonly></div>
            <div><label>入住时间</label><input class="control" data-violation-resident-field="checkInTime" placeholder="选择人员后自动带出" readonly></div>
          </div>
        </div>
        <div class="form-field">
          <label class="required">选择违规行为</label>
          <select class="control" id="violationRecordBehavior" data-violation-behavior-select>
            <option value="">请选择违规行为</option>
            ${dormViolationBehaviors.map(item=>`<option value="${item.name}">${item.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-field">
          <label>分值</label>
          <input class="control" id="violationRecordScore" placeholder="选择违规行为后自动带出" readonly>
        </div>
        <div class="form-field full">
          <label>备注</label>
          <textarea class="control" id="violationRecordRemark" placeholder="请输入备注"></textarea>
        </div>
        <div class="form-field full">
          <label>上传照片</label>
          <div class="upload-box">＋ 上传照片</div>
        </div>
      </div>
    </section>
  </div>`;
}
function openViolationRecordModal(){
  modalMode="violationRecordCreate";
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal");
  modal.classList.add("violation-record-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalConfirm").textContent="确定";
  document.getElementById("propertyModalTitle").textContent="新增违规记录";
  document.getElementById("propertyModalBody").innerHTML=violationRecordFormHtml();
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function dormApplicantByName(name){
  return dormApplicants.find(item=>item.name===name);
}
function dormApplicationHtml(selectedName=""){
  const selected=dormApplicantByName(selectedName);
  return `<div class="form-grid dorm-application-form">
    <div class="form-field">
      <label class="required">申请人</label>
      <select class="control" id="dormApplicantSelect" data-dorm-applicant>
        <option value="">请选择申请人</option>
        ${dormApplicants.map(item=>`<option value="${item.name}" ${item.name===selectedName?"selected":""}>${item.name}</option>`).join("")}
      </select>
      <small class="form-help">选择申请人后，系统自动带出所属企业、所属部门、性别、联系方式。</small>
    </div>
    <div class="form-field">
      <label>所属企业（只读）</label>
      <input class="control" data-dorm-field="enterprise" value="${selected?.enterprise||""}" placeholder="选择申请人后自动带出" readonly>
    </div>
    <div class="form-field">
      <label>所属部门（只读）</label>
      <input class="control" data-dorm-field="department" value="${selected?.department||""}" placeholder="选择申请人后自动带出" readonly>
    </div>
    <div class="form-field">
      <label>性别（只读）</label>
      <input class="control" data-dorm-field="gender" value="${selected?.gender||""}" placeholder="选择申请人后自动带出" readonly>
    </div>
    <div class="form-field">
      <label>联系方式（只读）</label>
      <input class="control" data-dorm-field="phone" value="${selected?.phone||""}" placeholder="选择申请人后自动带出" readonly>
    </div>
    <div class="form-field">
      <label class="required">预计入住时间</label>
      <input class="control" id="dormExpectedCheckIn" type="date">
    </div>
    <div class="form-field full">
      <label class="required">申请原因</label>
      <textarea class="control" id="dormApplyReason" placeholder="请输入申请原因"></textarea>
    </div>
    <div class="form-field full">
      <label>备注（选填）</label>
      <textarea class="control" placeholder="请输入备注（选填）"></textarea>
    </div>
  </div>`;
}
function updateDormApplicantFields(name){
  const applicant=dormApplicantByName(name);
  ["enterprise","department","gender","phone"].forEach(key=>{
    const input=document.querySelector(`[data-dorm-field="${key}"]`);
    if(input)input.value=applicant?.[key]||"";
  });
}
function openDormApplicationForm(row=[]){
  const selectedName=row[0]||"";
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  drawerMode="dormApplication";
  drawerTabs=[];
  document.getElementById("propertyDrawerTitle").textContent="发起入住申请";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=dormApplicationHtml(selectedName);
  document.getElementById("propertyDrawerConfirm").textContent="保存";
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function dormApprovalBasicValues(){
  return {
    name:rowValue("姓名"),
    gender:rowValue("性别"),
    phone:rowValue("联系方式"),
    jobNo:rowValue("工号"),
    enterprise:rowValue("所属企业"),
    department:rowValue("所属部门"),
    expectedDate:rowValue("预计入住时间"),
    status:rowValue("当前状态"),
    reason:rowValue("申请原因"),
    applyTime:rowValue("申请时间")
  };
}
function dormApprovalTimeline(){
  const item=dormApprovalBasicValues();
  return `<div class="dorm-record-timeline">
    <div class="timeline-row">
      <time>${esc(item.applyTime)}</time><i></i>
      <div><b>提交申请</b><span>${esc(item.name)}提交入住申请，申请原因：${esc(item.reason)}</span></div>
    </div>
    <div class="timeline-row">
      <time>待处理</time><i></i>
      <div><b>宿舍管理员审批</b><span>当前状态：${esc(item.status)}；通过后进入待分配，驳回需填写驳回原因。</span></div>
    </div>
  </div>`;
}
function dormApprovalDetailContent(){
  const item=dormApprovalBasicValues();
  return `<section class="dorm-person-detail">
    <div class="dorm-person-title"><b>${esc(item.name)}-${esc(item.jobNo)}</b>${tag(item.status)}</div>
    <div class="dorm-person-basic dorm-approval-basic">
      <div><label>性别</label>${renderTableCell(currentCfg,currentRow,{label:"性别",index:1},0)}</div>
      <div><label>联系方式</label><b>${esc(item.phone)}</b></div>
      <div><label>预计入住时间</label><b>${esc(item.expectedDate)}</b></div>
      <div class="wide"><label>所属企业/部门</label><b>${esc(item.enterprise)} / ${esc(item.department)}</b></div>
    </div>
    <div class="dorm-approval-reason">
      <label>申请原因</label>
      <p>${esc(item.reason)}</p>
    </div>
    <h3 class="section-title">审批处理记录</h3>
    ${dormApprovalTimeline()}
  </section>`;
}
function openDormApprovalForm(action,row=[]){
  modalMode=action==="驳回"?"dormApprovalReject":"dormApprovalPass";
  if(row.length)currentRow=row;
  const item=dormApprovalBasicValues();
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal");
  modal.classList.add("dorm-approval-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalConfirm").textContent=action==="驳回"?"确认驳回":"确认通过";
  document.getElementById("propertyModalTitle").textContent=`入住审批${action}`;
  document.getElementById("propertyModalBody").innerHTML=action==="通过"
    ? `<div class="confirm-message">请确认是否通过【${esc(item.name)}-${esc(item.jobNo)}】的宿舍申请</div>`
    : `<div class="dorm-approval-form">
      <div class="form-grid">
        <div class="form-field">
          <label>申请人（只读）</label>
          <input class="control" value="${esc(item.name)}-${esc(item.jobNo)}" readonly>
        </div>
        <div class="form-field full">
          <label class="required">驳回原因</label>
          <textarea class="control" id="dormApprovalOpinion" placeholder="请输入驳回原因"></textarea>
        </div>
      </div>
    </div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function infoGrid(labels,values=[]){return `<div class="info-grid">${labels.map((x,i)=>`<div class="info-item"><label>${x}</label><div>${values[i]||"—"}</div></div>`).join("")}</div>`;}
function timeline(title){return `<div class="timeline"><div class="timeline-item"><time>2026-06-11 10:16:20</time><b>${title}</b><span>操作人：林晓</span></div><div class="timeline-item"><time>2026-06-10 16:32:08</time><b>记录创建</b><span>操作人：系统</span></div></div>`;}
function rowValue(label){
  if(activePage==="文档管理"){
    const extraMap={"授权方式":8,"可访问对象":9,"原文档名":10};
    if(label in extraMap)return currentRow[extraMap[label]]||"";
  }
  const index=(currentCfg?.columns||[]).indexOf(label);
  return index>=0?currentRow[index]:"";
}
function workorderTimeline(){
  return `<div class="timeline"><div class="timeline-item"><time>2026-07-08 10:35:18</time><b>状态流转</b><span>操作前：待接单；操作后：处理中；操作人：赵磊（维修工）；处理意见：确认接单</span></div><div class="timeline-item"><time>2026-07-08 09:58:32</time><b>委派维修工</b><span>操作前：待派单；操作后：待接单；操作人：陈主管（维修主管）；处理意见：请当日内完成排查</span></div><div class="timeline-item"><time>${rowValue("发起时间")}</time><b>提交报修</b><span>操作人：${rowValue("报修人")}（发起人）；来源：小程序</span></div></div>`;
}
function workorderDetailTab(tab){
  if(tab==="流程明细")return workorderTimeline();
  const worker=`<div class="workorder-worker-inline"><span>${rowValue("维修工")||"—"}</span>${rowValue("当前状态")==="处理中"?button("换人","primary"):""}</div>`;
  return infoGrid(["联系方式","报修类型","当前处理人","维修工","发起端","当前状态"],[rowValue("联系方式"),rowValue("报修类型"),rowValue("当前处理人"),worker,"小程序",rowValue("当前状态")]);
}
function workorderDetailHtml(activeTab="基础信息"){
  const tabs=["基础信息","流程明细"];
  return `<section class="workorder-dialog-content">
    <div class="workorder-dialog-title">
      <h3>${rowValue("报修位置")}的${rowValue("问题描述")}</h3>
      ${tag(rowValue("当前状态"))}
    </div>
    <div class="workorder-dialog-summary">
      <div><label>报修位置</label><b>${rowValue("报修位置")}</b></div>
      <div><label>报修人</label><b>${rowValue("报修人")}</b></div>
      <div><label>报修时间</label><b>${rowValue("发起时间")}</b></div>
      <div><label>工单编号</label><b>${rowValue("工单编号")}</b></div>
    </div>
    <div class="workorder-report-box">
      <div><label>报修内容：</label><b>${rowValue("问题描述")}</b></div>
      <div class="workorder-report-media">
        <div class="workorder-photo"><span>现场照片</span></div>
        <div class="workorder-upload-placeholder"><b>＋</b><span>1/3</span></div>
        <small>上传的图片无法删除</small>
      </div>
    </div>
    <div class="workorder-dialog-tabs">
      ${tabs.map(x=>`<button class="${x===activeTab?"active":""}" data-workorder-tab="${x}">${x}</button>`).join("")}
    </div>
    <div class="workorder-dialog-tabbody">${workorderDetailTab(activeTab)}</div>
  </section>`;
}
function setWorkorderDetailFoot(){
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`${button("直接回复并关单","primary")}${button("派单","primary")}`;
}
function approvalTimeline(){
  return `<div class="timeline"><div class="timeline-item"><time>${rowValue("上报时间")}</time><b>上报总务</b><span>操作人：${rowValue("上报人")}；上报说明：${rowValue("上报说明")}</span></div><div class="timeline-item"><time>${rowValue("上报时间")}</time><b>提交报修</b><span>问题描述：${rowValue("问题描述")}</span></div></div>`;
}
function approvalDetailTab(tab){
  if(tab==="流程明细")return approvalTimeline();
  return infoGrid(["联系方式","报修类型","当前处理人","维修工","发起端","当前状态"],[rowValue("联系方式"),rowValue("报修类型"),"总务","—","小程序",rowValue("当前状态")]);
}
function approvalDetailHtml(activeTab="基础信息"){
  const tabs=["基础信息","流程明细"];
  return `<section class="workorder-dialog-content">
    <div class="workorder-dialog-title">
      <h3>${rowValue("报修位置")}的${rowValue("问题描述")}</h3>
      ${tag(rowValue("当前状态"))}
    </div>
    <div class="workorder-dialog-summary">
      <div><label>报修位置</label><b>${rowValue("报修位置")}</b></div>
      <div><label>报修人</label><b>${rowValue("报修人")}</b></div>
      <div><label>报修时间</label><b>${rowValue("报修时间")}</b></div>
      <div><label>工单编号</label><b>${rowValue("工单编号")}</b></div>
    </div>
    <div class="workorder-report-box">
      <div><label>报修内容：</label><b>${rowValue("问题描述")}</b></div>
      <div class="approval-report-note"><label>上报说明：</label><b>${rowValue("上报说明")}</b></div>
    </div>
    <div class="workorder-dialog-tabs">
      ${tabs.map(x=>`<button class="${x===activeTab?"active":""}" data-approval-tab="${x}">${x}</button>`).join("")}
    </div>
    <div class="workorder-dialog-tabbody">${approvalDetailTab(activeTab)}</div>
  </section>`;
}
function setApprovalDetailFoot(){
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`<button class="btn" data-close="drawer">关闭</button>`;
}
function resetDrawerFoot(){
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`<button class="btn" data-close="drawer">取消</button><button class="btn primary" id="propertyDrawerConfirm">确定</button>`;
  document.getElementById("propertyDrawerConfirm").addEventListener("click",handleDrawerConfirm);
}
function openWorkorderDetail(row=[]){
  currentRow=row;drawerMode="workorderDetail";drawerTabs=[];
  const drawer=document.querySelector(".property-drawer");
  drawer.classList.add("property-workorder-dialog");
  document.getElementById("propertyDrawerTitle").textContent="维修工单详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=workorderDetailHtml();
  setWorkorderDetailFoot();
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openApprovalDetail(row=[]){
  currentRow=row;drawerMode="approvalDetail";drawerTabs=[];
  const drawer=document.querySelector(".property-drawer");
  drawer.classList.add("property-workorder-dialog");
  document.getElementById("propertyDrawerTitle").textContent="总务审批详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=approvalDetailHtml();
  setApprovalDetailFoot();
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function dormPersonTabContent(tab){
  if(tab==="房间信息"){
    return `<div class="dorm-detail-room">
      <div><label>房间</label><b>${currentRow[7]==="已入住"?"宿舍2号楼-3层-305":"--"}</b></div>
      <div><label>床位</label><b>${currentRow[7]==="已入住"?"2号床位":"--"}</b></div>
      <div><label>入住时间</label><b>${currentRow[7]==="已入住"?"2026-05-30":"--"}</b></div>
    </div>`;
  }
  if(tab==="违规记录"){
    return `<div class="dorm-record-table">
      <table>
        <thead><tr><th>违规时间</th><th>违规行为</th><th>违规计分</th><th>备注</th></tr></thead>
        <tbody>
          <tr><td>2026-06-03 21:18</td><td>宿舍公共区域物品摆放不规范</td><td>-2</td><td>已现场提醒并完成整改</td></tr>
          <tr><td>2026-06-08 23:05</td><td>超过规定时间返回宿舍</td><td>-1</td><td>宿舍管理员登记</td></tr>
        </tbody>
      </table>
    </div>`;
  }
  return `<div class="dorm-record-timeline">
    <div class="timeline-row">
      <time>${esc(currentRow[8])}</time><i></i>
      <div><b>申请</b><span>${esc(currentRow[0])}提交入住申请，预计入住时间：${esc(currentRow[6])}</span></div>
    </div>
    <div class="timeline-row">
      <time>2026-05-29 15:40</time><i></i>
      <div><b>审批</b><span>宿舍管理员审批通过，申请进入待分配状态</span></div>
    </div>
    <div class="timeline-row">
      <time>${currentRow[7]==="已入住"?"2026-05-30 10:20":"--"}</time><i></i>
      <div><b>分配</b><span>${currentRow[7]==="已入住"?"分配宿舍2号楼-3层-305，2号床位":"当前未完成房间分配"}</span></div>
    </div>
    <div class="timeline-row danger">
      <time>${currentRow[7]==="已入住"?"2026-06-03 21:18":"--"}</time><i></i>
      <div><b>违规扣分</b><span>${currentRow[7]==="已入住"?"宿舍公共区域物品摆放不规范，违规计分 -2":"暂无违规扣分记录"}</span></div>
    </div>
  </div>`;
}
function dormPersonDetailHtml(activeTab="房间信息"){
  const tabs=["房间信息","违规记录","入住记录"];
  return `<section class="dorm-person-detail">
    <div class="dorm-person-title"><b>${esc(currentRow[0])}-${esc(currentRow[3])}</b>${tag(currentRow[7])}</div>
    <div class="dorm-person-basic">
      <div><label>性别</label>${renderTableCell(currentCfg,currentRow,{label:"性别",index:1},0)}</div>
      <div><label>联系方式</label><b>${esc(currentRow[2])}</b></div>
      <div class="wide"><label>所属企业/部门</label><b>${esc(currentRow[4])} / ${esc(currentRow[5])}</b></div>
    </div>
    <div class="dorm-detail-tabs">${tabs.map(tab=>`<button type="button" class="${tab===activeTab?"active":""}" data-dorm-detail-tab="${tab}">${tab}</button>`).join("")}</div>
    <div class="dorm-detail-tabbody">${dormPersonTabContent(activeTab)}</div>
  </section>`;
}
function openDormPersonDetail(row=[]){
  currentRow=row;drawerMode="dormPersonDetail";drawerTabs=[];
  const drawer=document.querySelector(".property-drawer");
  drawer.classList.remove("property-workorder-dialog");
  document.getElementById("propertyDrawerTitle").textContent="宿舍人员详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=dormPersonDetailHtml();
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`<button class="btn primary" id="propertyDrawerConfirm">关闭</button>`;
  document.getElementById("propertyDrawerConfirm").addEventListener("click",handleDrawerConfirm);
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openDormApprovalDetail(row=[]){
  currentRow=row;drawerMode="dormApprovalDetail";drawerTabs=[];
  const drawer=document.querySelector(".property-drawer");
  drawer.classList.remove("property-workorder-dialog");
  document.getElementById("propertyDrawerTitle").textContent="入住审批详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=dormApprovalDetailContent();
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`<button class="btn" data-close="drawer">关闭</button>${button("驳回")}${button("通过","primary")}`;
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function detailContent(tab){
  if(activePage==="通知公告"){
    const title=rowValue("标题")||"关于园区消防演练的通知";
    const objectType=rowValue("公告类型")||"公开公告";
    const status=rowValue("发布状态")||"已发布";
    const expireDate=rowValue("有效期")||"2026-06-10 至 2026-06-30";
    const publisher=rowValue("发布人")||"林晓";
    const publishTime=rowValue("发布时间")||"2026-06-10 15:00";
    if(tab==="基础信息")return infoGrid(["标题","公告类型","发布状态","有效期","发布时间","发布人","置顶"],[title,objectType,tag(status),expireDate,publishTime,publisher,rowValue("置顶")||"否"]);
    if(tab==="公告内容")return `<div class="article-preview"><h2>${esc(title)}</h2><p>为提升园区消防应急处置能力，计划于 2026 年 6 月 18 日开展消防演练，请相关人员按公告类型对应范围查看并配合现场安排。</p><p>本公告到达有效期后自动下架，已取消发布或已过期内容不再对外展示。</p></div>`;
    if(tab==="发布记录")return `<div class="timeline"><div class="timeline-item"><time>${esc(publishTime)}</time><b>${status==="草稿"?"保存草稿":"发布"}</b><span>操作人：${esc(publisher)}；公告类型：${esc(objectType)}</span></div>${status==="已取消发布"?`<div class="timeline-item"><time>2026-06-11 09:20:16</time><b>取消发布</b><span>操作人：林晓；取消后对外页面不再展示。</span></div>`:""}${status==="已过期"?`<div class="timeline-item"><time>${esc(expireDate.split("至").pop().trim())} 23:59:59</time><b>自动过期</b><span>超过有效期后系统自动下架。</span></div>`:""}<div class="timeline-item"><time>2026-06-10 14:32:08</time><b>记录创建</b><span>操作人：林晓</span></div></div>`;
    if(tab==="修改记录")return `<div class="timeline"><div class="timeline-item"><time>2026-06-11 10:16:20</time><b>编辑内容</b><span>修改人：林晓；修改后立即对外生效，系统保留修改记录。</span></div><div class="timeline-item"><time>2026-06-10 15:00:00</time><b>首次发布</b><span>修改人：林晓</span></div></div>`;
  }
  if(activePage==="报修类型"){
    if(tab==="操作记录")return timeline("报修类型");
    return infoGrid(["类型名称","类型编码","启用状态","备注","更新人","更新时间"],currentRow);
  }
  if(activePage==="文档管理"){
    const name=rowValue("文档名称")||"园区消防巡查制度";
    const category=rowValue("所属分类")||"物业制度 / 安全作业规范";
    const type=rowValue("文档类型")||"PDF";
    const size=rowValue("文档大小")||"8.6MB";
    const uploader=rowValue("上传人")||"王敏";
    const uploadTime=rowValue("上传时间")||"2026-07-08 09:30";
    const updateTime=rowValue("最近更新时间")||"2026-07-12 10:18";
    const status=rowValue("状态")||"启用";
    const authMode=rowValue("授权方式")||"按部门授权";
    const authScope=rowValue("可访问对象")||"生产部、物业部";
    const sourceFile=rowValue("原文档名")||`${name}.${type.toLowerCase()}`;
    if(tab==="基础信息")return infoGrid(["文档名称","所属分类路径","原文档名","文档类型","文档大小","上传人","上传时间","最近更新时间","状态"],[name,category,sourceFile,type,size,uploader,uploadTime,updateTime,tag(status)]);
    if(tab==="权限信息")return infoGrid(["授权方式","授权对象","权限类型"],[authMode,authScope,"可访问"]);
    if(tab==="在线预览"){
      const canPreview=/PDF|JPG|PNG|MP4/.test(type);
      return `<div class="document-preview"><b>${esc(sourceFile)}</b><span>${canPreview?"文档在线预览区域":"不支持预览"}</span><small>${canPreview?"PC 后台仅支持预览核对，不提供下载入口。":"Word、Excel、PPT、TXT、MP3 不支持 PC 在线预览；移动端提示“请下载后查看”。"}</small></div>`;
    }
    if(tab==="下载记录")return `<div class="table-wrap compact-table"><table><thead><tr><th>下载人</th><th>下载人所属部门</th><th>下载时间</th></tr></thead><tbody><tr><td>张建国</td><td>生产一部</td><td>2026-07-12 09:21:18</td></tr><tr><td>王小琴</td><td>物业部</td><td>2026-07-12 10:04:36</td></tr></tbody></table></div><div class="alert">下载记录由移动端下载动作自动生成，不支持人工删除或清空。</div>`;
  }
  if(activePage==="工单列表"||activePage==="总务审批"){
    if(tab==="基础信息")return infoGrid(["工单编号","报修人","联系方式","报修位置","报修类型","问题描述","附件图片","发起端","发起时间"],[rowValue("工单编号"),rowValue("报修人")||"王敏",rowValue("联系方式")||"138****1208",rowValue("报修位置"),rowValue("报修类型"),rowValue("问题描述"),"现场照片 2 张","小程序",rowValue("发起时间")||rowValue("上报时间")]);
    if(tab==="处理信息")return infoGrid(["当前状态","当前处理人","派单路径","维修主管","总务审批人","维修工"],[rowValue("当前状态"),rowValue("当前处理人"),rowValue("派单路径"),"陈主管",rowValue("当前状态")==="待总务审批"?"总务":"—",rowValue("维修工")]);
    if(tab==="派单信息")return infoGrid(["派单方式","派单说明","是否超时","派单时间","派单人"],[rowValue("派单路径"),rowValue("派单路径")==="上报总务"?"涉及资源审批，请总务确认":"请当日内完成现场维修",rowValue("是否超时"),"2026-07-08 09:58","陈主管"]);
    if(tab==="总务审批信息")return infoGrid(["审批结果","审批意见或驳回原因","审批人","审批时间"],[rowValue("当前状态")==="已关闭"?"驳回":"待审批","需客户确认审批通过后是否额外通知发起人","总务","2026-07-08 10:20"]);
    if(tab==="维修信息")return infoGrid(["接单时间","维修说明","维修附件","完成时间"],["2026-07-08 10:35","已排查现场，需更换闭门器","处理后照片 1 张",rowValue("当前状态")==="已完成"?"2026-07-08 16:20":"—"]);
    if(tab==="主管回复关单信息")return infoGrid(["回复内容","关单人","关单时间"],["该报修与已处理工单重复，已合并处理并关闭","陈主管","2026-07-08 10:05"]);
    if(tab==="换人记录")return infoGrid(["原维修工","新维修工","换人原因","换人时间","操作人"],["孙强","赵磊","原维修工账号停用，需更换当前处理人","2026-07-08 11:18","陈主管"]);
    if(tab==="满意度信息")return infoGrid(["星级评分","文字评价","评价人","评价时间"],["5 星","处理及时，现场已恢复正常","王敏","2026-07-08 17:30"]);
    if(tab==="流转记录")return workorderTimeline();
  }
  if(tab==="周菜单矩阵")return menuMatrix(true);
  if(tab==="在线预览")return `<div class="document-preview"><b>园区消防巡查制度.pdf</b><span>文档在线预览区域</span><small>仅展示已授权文档；不支持预览的文档提示下载查看。</small></div>`;
  if(tab==="业务引用")return `<div class="alert warning"><b>当前房间启用中的业务引用：</b>智慧宿舍 3 条。停用后不可用于新业务引用，历史引用保留。</div>${infoGrid(["智慧宿舍","资产管理"],["3 条启用引用","0 条启用引用"])}`;
  if(/记录/.test(tab))return timeline(tab);
  if(tab==="权限配置")return infoGrid(["授权方式","可访问对象","权限类型"],["按部门授权","生产部","可访问"]);
  if(tab==="意向内容")return infoGrid(["意向内容","登记来源"],["咨询冷链仓储办公配套","服务小程序"]);
  if(tab==="成单结果")return infoGrid(["成单结果","成单时间","备注"],["已签署空间租赁意向","2026-06-10 16:20","成单结果已保留"]);
  if(tab==="房间信息")return infoGrid(["房间编号","床位号","入住时间","房间状态"],["宿舍2号楼-305","2号床","2026-05-30","启用"]);
  if(tab==="流转记录")return timeline("工单状态流转");
  const labels=currentCfg?.columns||["名称","状态"];
  return infoGrid(labels,currentRow);
}
function documentDetailValues(){
  const name=rowValue("文档名称")||"园区消防巡查制度";
  const category=rowValue("所属分类")||"物业制度 / 安全作业规范";
  const type=rowValue("文档类型")||"PDF";
  const size=rowValue("文档大小")||"8.6MB";
  const uploader=rowValue("上传人")||"王敏";
  const uploadTime=rowValue("上传时间")||"2026-07-08 09:30";
  const updateTime=rowValue("最近更新时间")||"2026-07-12 10:18";
  const status=rowValue("状态")||"启用";
  const sourceFile=rowValue("原文档名")||`${name}.${type.toLowerCase()}`;
  return {name,category,type,size,uploader,uploadTime,updateTime,status,sourceFile};
}
function documentDetailHtml(activeTab="权限信息"){
  const item=documentDetailValues();
  const tabs=["权限信息","在线预览","下载记录"];
  return `<section class="document-detail">
    <div class="document-detail-title">
      <b>${esc(item.name)}</b>
      ${tag(item.status)}
    </div>
    <div class="document-detail-basic">
      <div><label>原文档名</label><b>${esc(item.sourceFile)}</b></div>
      <div><label>文档大小</label><b>${esc(item.size)}</b></div>
      <div><label>文档类型</label><b>${esc(item.type)}</b></div>
    </div>
    <div class="document-detail-meta">
      <div><label>所属分类</label><b>${esc(item.category)}</b></div>
      <div><label>上传人</label><b>${esc(item.uploader)}</b></div>
      <div><label>上传时间</label><b>${esc(item.uploadTime)}</b></div>
      <div><label>最近更新时间</label><b>${esc(item.updateTime)}</b></div>
    </div>
    <div class="document-detail-tabs">
      ${tabs.map(tab=>`<button type="button" class="${tab===activeTab?"active":""}" data-document-detail-tab="${tab}">${tab}</button>`).join("")}
    </div>
    <div class="document-detail-tabbody">${detailContent(activeTab)}</div>
  </section>`;
}
function openDocumentDetail(row=[],activeTab="权限信息"){
  currentRow=row;drawerMode="documentDetail";drawerTabs=[];
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  document.getElementById("propertyDrawerTitle").textContent="文档详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=documentDetailHtml(activeTab);
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`<button class="btn primary" data-close="drawer">关闭</button>`;
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openDetail(row=[]){
  if(activePage==="通知公告")return openNoticeDetail(row);
  if(activePage==="入住审批")return openDormApprovalDetail(row);
  if(activePage==="文档管理")return openDocumentDetail(row);
  const tabs=detailTabs[activePage];if(!tabs)return toast(`详细设计未定义“${activePage}”详情页面，已阻止打开`);
  if(activePage==="工单列表")return openWorkorderDetail(row);
  if(activePage==="总务审批")return openApprovalDetail(row);
  if(activePage==="宿舍人员")return openDormPersonDetail(row);
  if(activePage==="招商意向列表")return openInvestmentDetail(row);
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  currentRow=row;drawerMode="detail";drawerTabs=tabs;document.getElementById("propertyDrawerTitle").textContent=`${activePage}详情`;
  document.getElementById("propertyDrawerTabs").innerHTML=tabs.map((x,i)=>`<button class="tab ${i===0?"active":""}" data-drawer-tab="${x}">${x}</button>`).join("");
  document.getElementById("propertyDrawerBody").innerHTML=detailContent(tabs[0]);document.getElementById("propertyDrawerConfirm").textContent="关闭";document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openNoticeDetail(row=[]){
  currentRow=row;drawerMode="noticeDetail";drawerTabs=[];
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  document.getElementById("propertyDrawerTitle").textContent="公告详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=`<section class="notice-detail">
    <div class="form-section">
      <h3 class="form-section-title">基本信息</h3>
      ${detailContent("基础信息")}
    </div>
    <div class="form-section">
      <h3 class="form-section-title">公告内容</h3>
      ${detailContent("公告内容")}
    </div>
  </section>`;
  document.getElementById("propertyDrawerConfirm").textContent="关闭";
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function documentPermissionHtml(row=[]){
  const name=row[0]||"园区消防巡查制度";
  const category=row[1]||"物业制度 / 安全作业规范";
  const status=row[7]||"停用";
  const authMode=row[8]||"按部门授权";
  const authScope=row[9]&&row[9]!=="--"?String(row[9]).split("、"):[];
  const mode=currentPermissionMode|| (authMode==="按人员授权"?"person":"dept");
  const rowMode=authMode==="按人员授权"?"person":authMode==="按部门授权"?"dept":"";
  const isDept=mode==="dept";
  const candidates=isDept
    ? [
      {name:"生产部",meta:"18 人可访问"},
      {name:"物业部",meta:"26 人可访问"},
      {name:"行政部",meta:"12 人可访问"},
      {name:"研发部",meta:"34 人可访问"}
    ]
    : [
      {name:"张建国",meta:"WL-10021 / 生产一部"},
      {name:"王小琴",meta:"WL-10058 / 物业部"},
      {name:"林晓",meta:"WL-10003 / 物业部"},
      {name:"周华",meta:"WL-10016 / 行政部"}
    ];
  const selected=rowMode===mode?authScope:[];
  const selectedSet=new Set(selected);
  return `<section class="document-permission-form">
    <div class="form-section">
      <h3 class="form-section-title">文档信息</h3>
      ${infoGrid(["文档名称","所属分类","当前状态"],[name,category,tag(status)])}
    </div>
    <div class="form-section permission-section">
      <div class="permission-section-head">
        <h3 class="form-section-title">权限设置</h3>
        <span>权限固定为可访问</span>
      </div>
      <div class="permission-mode-tabs" role="radiogroup" aria-label="授权方式">
        <button type="button" class="${isDept?"active":""}" data-action="切换授权方式" data-permission-mode="dept"><b>按部门授权</b><span>适合部门统一开放</span></button>
        <button type="button" class="${isDept?"":"active"}" data-action="切换授权方式" data-permission-mode="person"><b>按人员授权</b><span>适合指定人员查看</span></button>
      </div>
      <div class="permission-panel">
        <section class="permission-source">
          <div class="permission-panel-head"><b>${isDept?"选择部门":"选择人员"}</b><span>${isDept?"仅展示启用部门":"仅展示在职人员"}</span></div>
          <div class="permission-search">
            <input class="control" placeholder="${isDept?"搜索部门名称":"搜索人员姓名或工号"}">
            <button class="btn" type="button">查询</button>
          </div>
          <div class="permission-list">
            ${candidates.map(item=>`<label class="permission-row ${selectedSet.has(item.name)?"checked":""}"><input type="checkbox" ${selectedSet.has(item.name)?"checked":""}><span><b>${item.name}</b><small>${item.meta}</small></span></label>`).join("")}
          </div>
        </section>
        <section class="permission-selected">
          <div class="permission-panel-head"><b>已选对象</b><span>${selected.length} 项</span></div>
          <div class="permission-selected-list">
            ${selected.map(item=>`<span class="permission-selected-item"><b>${esc(item)}</b><button type="button" aria-label="移除${esc(item)}">×</button></span>`).join("")}
          </div>
          <div class="permission-hint">保存后，只有已选${isDept?"部门下人员":"人员"}可在移动端查看该文档。</div>
        </section>
      </div>
      <label class="permission-remark">备注（选填）<textarea class="control" placeholder="请输入权限配置备注"></textarea></label>
    </div>
  </section>`;
}
function openDocumentPermission(row=[]){
  currentRow=row;drawerMode="documentPermission";drawerTabs=[];
  currentPermissionMode=(row[8]||"按部门授权")==="按人员授权"?"person":"dept";
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  document.getElementById("propertyDrawerTitle").textContent="配置权限";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=documentPermissionHtml(row);
  document.getElementById("propertyDrawerConfirm").textContent="保存";
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function documentEditHtml(row=[]){
  const name=row[0]||"园区消防巡查制度";
  const category=row[1]||"物业制度 / 安全作业规范";
  const type=row[2]||"PDF";
  const size=row[3]||"8.6MB";
  const status=row[7]||"停用";
  const sourceFile=row[10]||`${name}.${String(type).toLowerCase()}`;
  const disabled=status==="启用";
  return `<section class="document-edit-form">
    ${disabled?`<div class="alert danger"><b>不可编辑：</b>启用中文档不可直接编辑，请先停用后再修改。</div>`:""}
    <div class="form-section">
      <h3 class="form-section-title">当前文档信息</h3>
      ${infoGrid(["原文档名","文档类型","文档大小","当前状态"],[sourceFile,type,size,tag(status)])}
    </div>
    <div class="form-section">
      <h3 class="form-section-title">编辑信息</h3>
      <div class="form-grid">
        <div class="form-field">
          <label class="required">所属分类</label>
          <select class="control" id="documentEditCategory" ${disabled?"disabled":""}>
            <option ${category==="物业制度 / 安全作业规范"?"selected":""}>物业制度 / 安全作业规范</option>
            <option ${category==="物业制度 / 报修指引"?"selected":""}>物业制度 / 报修指引</option>
            <option ${category==="设备操作指引 / 冷库设备操作"?"selected":""}>设备操作指引 / 冷库设备操作</option>
            <option ${category==="物业制度 / 培训资料归档"?"selected":""}>物业制度 / 培训资料归档</option>
          </select>
          <small class="form-help">仅可选择启用状态的二级分类。</small>
        </div>
        <div class="form-field">
          <label class="required">文档名称</label>
          <input class="control" id="documentEditName" value="${esc(name)}" maxlength="100" ${disabled?"readonly":""} placeholder="请输入文档名称">
          <small class="form-help">同一分类下文档名称不可重复。</small>
        </div>
        <div class="form-field full">
          <label>替换文档（选填）</label>
          <div class="upload-box ${disabled?"disabled-upload":""}">＋ 选择替换文档</div>
          <small class="form-help">不选择替换文档时，仅修改文档名称、所属分类或备注；替换后原文档名同步更新。</small>
        </div>
        <div class="form-field full">
          <label>备注（选填）</label>
          <textarea class="control" ${disabled?"readonly":""} placeholder="请输入备注"></textarea>
        </div>
      </div>
    </div>
  </section>`;
}
function openDocumentEdit(row=[]){
  currentRow=row;drawerMode="documentEdit";drawerTabs=[];
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  document.getElementById("propertyDrawerTitle").textContent="编辑文档";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=documentEditHtml(row);
  document.getElementById("propertyDrawerConfirm").textContent="保存";
  document.getElementById("propertyDrawerConfirm").disabled=(row[7]||"")==="启用";
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function documentStatusConfirmHtml(action,row=[]){
  const name=row[0]||"园区消防巡查制度";
  const category=row[1]||"物业制度 / 安全作业规范";
  const status=row[7]||"停用";
  const authMode=row[8]||"未配置";
  const authScope=row[9]||"--";
  const hasPermission=authMode!=="未配置"&&authScope!=="--";
  const enableBlocked=action==="启用"&&!hasPermission;
  const message=action==="启用"
    ? "启用后，移动端将在所属分类启用且用户具备权限时展示该文档。"
    : "停用后，PC 后台保留文档记录，移动端不再展示该文档，历史下载记录保留。";
  return `<div class="document-status-confirm ${enableBlocked?"is-blocked":""}">
    ${infoGrid(["文档名称","所属分类","当前状态","授权方式","授权对象"],[name,category,tag(status),authMode,authScope])}
    <div class="alert ${enableBlocked?"danger":"warning"}"><b>${action}确认：</b>${enableBlocked?"当前文档未配置有效权限，不可启用。请先配置权限后再启用。":message}</div>
    ${action==="停用"?`<div class="form-grid"><div class="form-field full"><label class="required">停用原因</label><textarea class="control" id="documentDisableReason" placeholder="请输入停用原因"></textarea></div></div>`:""}
  </div>`;
}
function openDocumentStatusConfirm(action,row=[]){
  currentRow=row;modalMode=`document${action}`;
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal","violation-record-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalTitle").textContent=action;
  document.getElementById("propertyModalConfirm").textContent=`确认${action}`;
  document.getElementById("propertyModalConfirm").disabled=action==="启用"&&(row[8]==="未配置"||row[9]==="--");
  document.getElementById("propertyModalBody").innerHTML=documentStatusConfirmHtml(action,row);
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function investmentTimeline(row=[]){
  const [code,,contact,,,content,,status,registerTime]=row;
  const dealNode=status==="已成单"?`<div class="timeline-row">
    <time>2026-06-10 16:20</time><i></i>
    <div><b>登记成单</b><span>${esc(contact)}的招商意向已登记成单，意向编号：${esc(code)}</span></div>
  </div>`:"";
  return `<div class="dorm-record-timeline investment-timeline">
    <div class="timeline-row">
      <time>${esc(registerTime)}</time><i></i>
      <div><b>意向登记</b><span>提交招商意向：${esc(content)}</span></div>
    </div>
    ${dealNode}
  </div>`;
}
function openInvestmentDetail(row=[]){
  currentRow=row;drawerMode="investmentDetail";drawerTabs=[];
  const [code,enterprise,contact,phone,park,content]=row;
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  document.getElementById("propertyDrawerTitle").textContent="招商意向详情";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=`<section class="investment-detail">
    <div class="form-section">
      <h3 class="form-section-title">意向编号</h3>
      <div class="investment-code">${esc(code)}</div>
    </div>
    <div class="form-section">
      <h3 class="form-section-title">基本信息</h3>
      ${infoGrid(["企业名称","联系人","联系方式","意向园区","意向内容"],[enterprise,contact,phone,park,content])}
    </div>
    <div class="form-section">
      <h3 class="form-section-title">招商记录</h3>
      ${investmentTimeline(row)}
    </div>
  </section>`;
  document.getElementById("propertyDrawerConfirm").textContent="关闭";
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openForm(title,fields,drawer=true){
  if(drawer){document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");resetDrawerFoot();drawerMode="form";drawerTabs=[];document.getElementById("propertyDrawerTitle").textContent=title;document.getElementById("propertyDrawerTabs").innerHTML="";document.getElementById("propertyDrawerBody").innerHTML=formHtml(fields);syncSwitchLabels(document.getElementById("propertyDrawerBody"));document.getElementById("propertyDrawerConfirm").textContent="保存";document.getElementById("propertyDrawerOverlay").classList.add("show");}
  else{document.getElementById("propertyModalTitle").textContent=title;document.getElementById("propertyModalBody").innerHTML=`${title==="直接回复并关单"?'<div class="alert"><b>状态流转：</b>提交后，工单状态变为“已完成”。</div>':""}${formHtml(fields)}`;syncSwitchLabels(document.getElementById("propertyModalBody"));document.getElementById("propertyModalOverlay").classList.add("show");}
}
function richTextEditorHtml(content=""){
  const toolGroups=[
    ["正文⌄","“","B","U","I","…⌄"],
    ["A⌄","A▾","默认字号⌄","默认字体⌄","默认行高⌄"],
    ["☷","☰","☑","≡⌄","▸≡⌄"],
    ["☺⌄","🔗","▧⌄","▶⌄","▦","</>","☰","↶","↷"]
  ];
  return `<div class="rich-editor">
    <div class="rich-editor-toolbar">
      ${toolGroups.map(group=>`<div class="rich-editor-group">${group.map(item=>`<button type="button" tabindex="-1">${item}</button>`).join("")}</div>`).join("")}
    </div>
    <div class="rich-editor-body" contenteditable="true">
      ${content?`<div class="rich-editor-image" aria-label="公告配图"></div><p>${esc(content)}</p><p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p><p>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>`:`<span class="rich-editor-placeholder">请输入内容...</span>`}
    </div>
  </div>`;
}
function publishFormHtml(action,row=[]){
  const isEdit=action==="编辑";
  const status=row[currentCfg?.columns.indexOf("发布状态")]||"草稿";
  const title=row[currentCfg?.columns.indexOf("标题")]||"";
  const objectType=row[currentCfg?.columns.indexOf("公告类型")]||"";
  const expireDate=row[currentCfg?.columns.indexOf("有效期")]||"";
  const [expireStart="",expireEnd=""]=String(expireDate).split(" 至 ").map(item=>item.trim());
  const isPublishedEdit=isEdit&&status==="已发布";
  return `<div class="alert ${isPublishedEdit?"warning":""}"><b>发布规则：</b>公告类型固定为公开公告、员工公告、外部用户公告三类；点击发布后立即进入已发布状态。${isPublishedEdit?"已发布公告不支持直接修改公告类型，请取消发布后重新处理。":""}</div>
  <div class="form-grid publish-form">
    <div class="form-field full">
      <label class="required">标题</label>
      <input class="control" maxlength="100" value="${esc(title)}" placeholder="请输入标题，最多 100 字">
      <small class="form-help">标题为空时不得保存草稿或发布。</small>
    </div>
    <div class="form-field">
      <label class="required">公告类型</label>
      <select class="control" ${isPublishedEdit?"disabled":""}>
        <option value="">请选择公告类型</option>
        ${["公开公告","员工公告","外部用户公告"].map(item=>`<option ${item===objectType?"selected":""}>${item}</option>`).join("")}
      </select>
      <small class="form-help">${isPublishedEdit?"已发布后不可直接修改公告类型。":"仅允许选择三类固定公告类型，不支持自定义新增。"}</small>
    </div>
    <div class="form-field">
      <label class="required">有效期</label>
      <div class="date-range-control publish-date-range"><input class="control" type="date" value="${esc(expireStart)}" aria-label="有效期开始日期"><span>至</span><input class="control" type="date" value="${esc(expireEnd)}" aria-label="有效期结束日期"></div>
      <small class="form-help">到期后系统自动变为已过期。</small>
    </div>
    <div class="form-field pin-field">
      <label>置顶</label>
      <label class="switch-control switch-control-icononly"><input type="checkbox" ${row[currentCfg?.columns.indexOf("置顶")]==="是"?"checked":""}><span></span></label>
    </div>
    <div class="form-field full publish-content-field">
      <label class="required">公告内容</label>
      ${richTextEditorHtml(isEdit?"为提升园区消防应急处置能力，请相关人员按要求查看并配合现场安排。":"")}
    </div>
  </div>`;
}
function openPublishForm(action,row=[]){
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  drawerMode="publishForm";
  drawerTabs=[];
  document.getElementById("propertyDrawerTitle").textContent=action==="编辑"?"编辑公告":"新增公告";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=publishFormHtml(action,row);
  syncSwitchLabels(document.getElementById("propertyDrawerBody"));
  document.querySelector(".property-drawer .drawer-foot").innerHTML=`<button class="btn" data-close="drawer">取消</button>${button("保存草稿")}${button("发布","primary")}`;
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openPublishBatchModal(){
  modalMode="publishBatch";
  document.querySelector(".property-modal").classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal","violation-record-modal");
  document.getElementById("propertyModalConfirm").textContent="确认执行";
  document.getElementById("propertyModalTitle").textContent="公告批量操作";
  document.getElementById("propertyModalBody").innerHTML=`<div class="alert warning"><b>批量规则：</b>选中多条草稿可批量删除；选中多条已发布可批量取消发布，执行前需二次确认。</div>
  <div class="form-grid">
    <div class="form-field full"><label>已选公告（只读）</label><input class="control" value="夏季防暑降温提醒、关于园区消防演练的通知" readonly></div>
    <div class="form-field"><label class="required">批量动作</label><select class="control"><option>批量删除草稿</option><option>批量取消发布</option></select></div>
    <div class="form-field full"><label class="required">操作确认</label><textarea class="control" placeholder="请确认所选公告状态符合批量操作规则"></textarea></div>
  </div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openPublishConfirm(action,row=[]){
  const title=row[currentCfg?.columns.indexOf("标题")]||"该公告";
  const objectType=row[currentCfg?.columns.indexOf("公告类型")]||"—";
  const message={
    "发布":`请确认是否立即发布“${title}”。发布后将按【${objectType}】展示。`,
    "取消发布":`请确认是否取消发布“${title}”。取消后对外页面不再展示，历史记录保留。`,
    "重新发布":`请确认是否重新发布“${title}”。重新发布将在原公告记录上恢复，不创建新记录。`,
    "删除":`请确认是否删除草稿“${title}”。仅草稿允许删除，删除后不可恢复。`
  }[action]||`请确认是否执行“${action}”。`;
  modalMode=`publish${action}`;
  document.getElementById("propertyModalConfirm").textContent=action==="删除"?"确认删除":"确认";
  document.getElementById("propertyModalTitle").textContent=action;
  document.getElementById("propertyModalBody").innerHTML=`<div class="confirm-message">${esc(message)}</div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openInvestmentDealModal(row=[]){
  modalMode="investmentDeal";
  currentRow=row;
  document.querySelector(".property-modal").classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal","violation-record-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  const [code,,contact,phone,,content]=row;
  document.getElementById("propertyModalTitle").textContent="登记成单";
  document.getElementById("propertyModalBody").innerHTML=`<div class="form-section">
    <h3 class="form-section-title">意向基本信息</h3>
    <div class="form-grid investment-deal-info">
      <div class="form-field"><label>意向编号</label><input class="control" value="${esc(code)}" readonly></div>
      <div class="form-field"><label>联系人</label><input class="control" value="${esc(contact)}" readonly></div>
      <div class="form-field"><label>联系方式</label><input class="control" value="${esc(phone)}" readonly></div>
      <div class="form-field full"><label>意向内容</label><textarea class="control" readonly>${esc(content)}</textarea></div>
    </div>
  </div>
  <div class="form-section">
    <h3 class="form-section-title">成单信息</h3>
    <div class="form-grid">
      <div class="form-field"><label class="required">成单日期</label><input class="control" id="investmentDealDate" type="date"></div>
      <div class="form-field full"><label>备注</label><textarea class="control" id="investmentDealRemark" maxlength="200" placeholder="请输入备注"></textarea></div>
    </div>
  </div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openDormRoomAssignModal(row=[]){
  modalMode="dormRoomAssign";currentRow=row;dormAssignSelection={building:"",floor:"",room:""};
  const [name,gender,,jobNo,enterprise,department,expectedDate]=row;
  const modal=document.querySelector(".property-modal");
  modal.classList.remove("batch-space-modal","food-picker-modal","mobile-menu-modal","mobile-apply-modal");
  modal.classList.add("dorm-assign-modal");
  document.getElementById("propertyModalTitle").textContent="分配房间";
  document.getElementById("propertyModalBody").innerHTML=`<div class="dorm-assign-content">
    <section class="dorm-assign-section">
      <h3>申请人基本信息</h3>
      <div class="dorm-assign-info">
        <div><label>姓名</label><b>${esc(name)}</b></div>
        <div><label>性别</label><b>${esc(gender)}</b></div>
        <div class="wide"><label>所属企业/部门</label><b>${esc(enterprise)}<span>${esc(department)}</span></b></div>
        <div><label>预计入住时间</label><b>${esc(expectedDate)}</b></div>
      </div>
    </section>
    <section class="dorm-assign-section">
      <h3>分配信息</h3>
      <div class="dorm-assign-form">
        <div class="dorm-assign-field full">
          <label class="required">分配房间</label>
          <div class="dorm-cascader" id="dormAssignCascader">
            <input type="hidden" id="dormAssignRoomPath" value="">
            <button type="button" class="dorm-cascader-trigger" id="dormAssignCascaderTrigger" data-action="切换分配房间级联"><span>请选择楼宇 / 楼层 / 房间</span><i></i></button>
            <div class="dorm-cascader-panel" id="dormAssignCascaderPanel">${dormAssignCascaderPanelHtml()}</div>
          </div>
        </div>
        <div class="dorm-assign-field">
          <label class="required">床位号</label>
          <input class="control" id="dormAssignBed" placeholder="请输入床位号">
        </div>
        <div class="dorm-assign-field">
          <label class="required">入住时间</label>
          <input class="control" id="dormAssignCheckInDate" type="date">
        </div>
      </div>
    </section>
  </div>`;
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalConfirm").textContent="确认";
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function dormAssignCascaderColumn(items,selected,action){
  return items.map(item=>`<button type="button" class="${item===selected?"active":""}" data-action="${action}" data-value="${item}"><span>${item}</span><i>›</i></button>`).join("");
}
function dormAssignCascaderPanelHtml(){
  const buildingNode=dormRoomTree.find(item=>item.building===dormAssignSelection.building);
  const floorNode=buildingNode?.floors.find(item=>item.floor===dormAssignSelection.floor);
  return `<div class="dorm-cascader-col">
    <b>楼宇</b>
    ${dormAssignCascaderColumn(dormRoomTree.map(item=>item.building),dormAssignSelection.building,"选择分配房间楼宇")}
  </div>
  <div class="dorm-cascader-col ${buildingNode?"":"disabled"}">
    <b>楼层</b>
    ${buildingNode?dormAssignCascaderColumn(buildingNode.floors.map(item=>item.floor),dormAssignSelection.floor,"选择分配房间楼层"):`<span class="empty">请先选择楼宇</span>`}
  </div>
  <div class="dorm-cascader-col ${floorNode?"":"disabled"}">
    <b>房间</b>
    ${floorNode?dormAssignCascaderColumn(floorNode.rooms,dormAssignSelection.room,"选择分配房间房间"):`<span class="empty">请先选择楼层</span>`}
  </div>`;
}
function updateDormAssignCascader(){
  const panel=document.getElementById("dormAssignCascaderPanel");
  if(panel)panel.innerHTML=dormAssignCascaderPanelHtml();
  const value=dormAssignSelection.building&&dormAssignSelection.floor&&dormAssignSelection.room?`${dormAssignSelection.building} / ${dormAssignSelection.floor} / ${dormAssignSelection.room}`:"";
  const input=document.getElementById("dormAssignRoomPath");
  const trigger=document.getElementById("dormAssignCascaderTrigger");
  if(input)input.value=value;
  if(trigger){
    trigger.querySelector("span").textContent=value||"请选择楼宇 / 楼层 / 房间";
    trigger.classList.toggle("has-value",Boolean(value));
  }
}
function selectDormAssignRoom(level,value){
  if(level==="building")dormAssignSelection={building:value,floor:"",room:""};
  if(level==="floor")dormAssignSelection={...dormAssignSelection,floor:value,room:""};
  if(level==="room"){
    dormAssignSelection={...dormAssignSelection,room:value};
    document.getElementById("dormAssignCascaderPanel")?.classList.remove("show");
  }
  updateDormAssignCascader();
}
function syncSwitchLabels(root=document){
  root.querySelectorAll(".switch-control input").forEach(input=>{
    const label=input.closest(".switch-control")?.querySelector("b");
    if(label)label.textContent=input.checked?"启用":"停用";
  });
}
function openConfirm(title,message){
  document.getElementById("propertyModalTitle").textContent=title;
  document.getElementById("propertyModalBody").innerHTML=`<div class="confirm-message">${message}</div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
const weeklyCalendarData={
  6:[
    {week:"2026年第23周（06-01 至 06-07）",days:["06-01","06-02","06-03","06-04","06-05","06-06","06-07"]},
    {week:"2026年第24周（06-08 至 06-14）",days:["06-08","06-09","06-10","06-11","06-12","06-13","06-14"]},
    {week:"2026年第25周（06-15 至 06-21）",days:["06-15","06-16","06-17","06-18","06-19","06-20","06-21"]},
    {week:"2026年第26周（06-22 至 06-28）",days:["06-22","06-23","06-24","06-25","06-26","06-27","06-28"]},
    {week:"2026年第27周（06-29 至 07-05）",days:["06-29","06-30","07-01","07-02","07-03","07-04","07-05"]}
  ],
  7:[
    {week:"2026年第27周（06-29 至 07-05）",days:["06-29","06-30","07-01","07-02","07-03","07-04","07-05"]},
    {week:"2026年第28周（07-06 至 07-12）",days:["07-06","07-07","07-08","07-09","07-10","07-11","07-12"]},
    {week:"2026年第29周（07-13 至 07-19）",days:["07-13","07-14","07-15","07-16","07-17","07-18","07-19"]},
    {week:"2026年第30周（07-20 至 07-26）",days:["07-20","07-21","07-22","07-23","07-24","07-25","07-26"]},
    {week:"2026年第31周（07-27 至 08-02）",days:["07-27","07-28","07-29","07-30","07-31","08-01","08-02"]}
  ]
};
function weekCalendarRows(month,existingWeeks=new Set(),action="选择周次"){
  return weeklyCalendarData[month].map(item=>{
    const disabled=existingWeeks.has(item.week);
    return `<button type="button" class="week-calendar-row ${disabled?"disabled":""}" data-action="${action}" data-week="${item.week}" ${disabled?"disabled":""} title="${disabled?"该周次已创建周菜单":item.week}">${item.days.map(day=>`<span class="${Number(day.slice(0,2))===month?"":"outside"}">${Number(day.slice(3))}</span>`).join("")}</button>`;
  }).join("");
}
function menuMatrix(readonly=false,creating=false,editing=false,weekValue="2026年第25周（06-15 至 06-21）"){
  const days=["周一","周二","周三","周四","周五","周六","周日"],meals=["早餐","午餐","晚餐"],foods=["牛奶、鸡蛋、包子","米饭、清蒸鲈鱼、西红柿炒蛋","面条、香菇青菜"];
  const existingWeeks=new Set((currentCfg?.rows||[]).map(row=>row[0]));
  const weekSelector=creating?`<div class="menu-week-field"><label class="required">周次</label><div class="week-picker-control"><input type="hidden" id="weeklyMenuWeek" value=""><button type="button" class="week-picker-trigger" id="weeklyMenuWeekTrigger" data-action="切换周次选择器"><span>请选择周次</span><i></i></button><div class="week-picker-popover" id="weeklyMenuPicker"><div class="week-picker-head"><button type="button" class="prev" data-action="上一月" aria-label="上一个月"></button><b id="weeklyMenuMonthTitle">2026 年 6 月</b><button type="button" class="next" data-action="下一月" aria-label="下一个月"></button></div><div class="week-calendar-weekdays">${["一","二","三","四","五","六","日"].map(day=>`<span>${day}</span>`).join("")}</div><div class="week-calendar-month" data-week-month="6">${weekCalendarRows(6,existingWeeks)}</div><div class="week-calendar-month" data-week-month="7" hidden>${weekCalendarRows(7,existingWeeks)}</div><div class="week-picker-legend"><span><i></i>整周选择</span><span class="disabled-note">已创建周次不可选</span></div></div></div><small id="weeklyMenuWeekError">请选择未创建周菜单的周次</small><div class="menu-week-help">已创建周菜单的周次不可重复创建。</div></div>`:editing?`<div class="menu-week-field"><label class="required">周次</label><div class="week-picker-control"><button type="button" class="week-picker-trigger readonly" disabled><span>${weekValue}</span></button></div><div class="menu-week-help">周次创建后不可修改。</div></div>`:"";
  const alertText=creating?"请先选择周次；周次确定后，可按餐次选择菜品。":`${weekValue}。每格可多选菜品，也允许留空。`;
  return `${weekSelector}<div class="alert" id="weeklyMenuWeekTip"><b>${creating?"录入顺序":"自然周"}：</b>${alertText}</div><div class="menu-matrix ${creating?"is-disabled":""}" id="weeklyMenuMatrix"><div></div>${days.map(x=>`<b>${x}</b>`).join("")}${meals.map((m,mi)=>`<b>${m}</b>${days.map((d,di)=>`<button class="meal-cell" data-action="选择菜品" data-day="${d}" data-meal="${m}" ${(readonly||creating)?"disabled":""}><span>${creating?"未选择菜品":foods[(mi+di)%3]}</span>${readonly?"":`<small>${creating?"请先选择周次":"点击选择菜品"}</small>`}</button>`).join("")}`).join("")}</div>`;
}
function openMenuEditor(title,readonly=false,row=[]){
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");resetDrawerFoot();
  const creating=title==="创建周菜单",editing=title==="编辑",weekValue=row[0]||"2026年第25周（06-15 至 06-21）";
  drawerMode=creating?"menuCreate":"menu";document.getElementById("propertyDrawerTitle").textContent=title;document.getElementById("propertyDrawerTabs").innerHTML="";document.getElementById("propertyDrawerBody").innerHTML=menuMatrix(readonly,creating,editing,weekValue);document.getElementById("propertyDrawerConfirm").textContent=readonly?"关闭":"保存";document.getElementById("propertyDrawerOverlay").classList.add("show");
}
const foodPickerData=[
  {name:"清蒸鲈鱼",image:"fish",description:"每日鲜鱼清蒸"},
  {name:"西红柿炒蛋",image:"tomato",description:"家常热菜"},
  {name:"香菇青菜",image:"vegetable",description:"时蔬菜品"},
  {name:"红烧排骨",image:"tomato",description:"经典红烧荤菜"},
  {name:"宫保鸡丁",image:"tomato",description:"微辣家常菜"},
  {name:"蒜蓉西兰花",image:"vegetable",description:"清爽时蔬"},
  {name:"冬瓜排骨汤",image:"fish",description:"营养例汤"},
  {name:"米饭",image:"vegetable",description:"当日现蒸主食"},
  {name:"面条",image:"fish",description:"现煮面食"},
  {name:"水果拼盘",image:"tomato",description:"当季水果搭配"}
];
function selectedFoodChips(){
  const selected=foodPickerData.filter(food=>foodPickerSelected.has(food.name));
  return selected.length?selected.map(food=>`<span class="food-selected-chip"><b>${food.name}</b><button type="button" data-action="移除已选菜品" data-food-name="${food.name}" aria-label="移除${food.name}" title="移除${food.name}"></button></span>`).join(""):`<span class="food-selected-empty">暂无已选菜品</span>`;
}
function updateSelectedFoodArea(){
  const area=document.getElementById("foodPickerSelected");if(area)area.innerHTML=selectedFoodChips();
  const count=document.getElementById("foodPickerSelectedCount");if(count)count.textContent=foodPickerSelected.size;
}
function renderFoodPicker(){
  const pageSize=4;
  const filtered=foodPickerData.filter(food=>food.name.includes(foodPickerKeyword));
  const totalPages=Math.max(1,Math.ceil(filtered.length/pageSize));
  foodPickerPage=Math.min(Math.max(foodPickerPage,1),totalPages);
  const rows=filtered.slice((foodPickerPage-1)*pageSize,foodPickerPage*pageSize);
  document.getElementById("propertyModalBody").innerHTML=`<div class="food-picker-search"><label for="foodPickerKeyword">菜品名称</label><input class="control" id="foodPickerKeyword" placeholder="请输入菜品名称"><button class="btn primary" data-action="查询菜品">查询</button><button class="btn" data-action="重置菜品查询">重置</button></div><div class="food-picker-selected-wrap"><b>已选菜品（<em id="foodPickerSelectedCount">${foodPickerSelected.size}</em>）：</b><div class="food-picker-selected" id="foodPickerSelected">${selectedFoodChips()}</div></div><div class="food-picker-summary"><span>仅展示状态为“可用”的菜品</span></div><div class="food-picker-table"><table><thead><tr><th class="food-picker-check-col"></th><th>菜品名称</th><th>菜品图片</th><th>菜品说明</th></tr></thead><tbody>${rows.length?rows.map(food=>`<tr><td><input type="checkbox" class="food-picker-check" value="${food.name}" aria-label="选择${food.name}" ${foodPickerSelected.has(food.name)?"checked":""}></td><td><b>${food.name}</b></td><td><span class="food-thumb ${food.image}" aria-label="${food.name}缩略图"><span></span></span></td><td>${food.description}</td></tr>`).join(""):`<tr><td colspan="4"><div class="food-picker-empty">未找到符合条件的可用菜品</div></td></tr>`}</tbody></table></div><div class="food-picker-pagination"><span>共 ${filtered.length} 项数据</span><div><button class="page-btn" data-action="菜品上一页" ${foodPickerPage===1?"disabled":""} aria-label="上一页">‹</button>${Array.from({length:totalPages},(_,i)=>`<button class="page-btn ${foodPickerPage===i+1?"active":""}" data-action="菜品页码" data-food-page="${i+1}">${i+1}</button>`).join("")}<button class="page-btn" data-action="菜品下一页" ${foodPickerPage===totalPages?"disabled":""} aria-label="下一页">›</button></div></div>`;
  const keywordInput=document.getElementById("foodPickerKeyword");if(keywordInput)keywordInput.value=foodPickerKeyword;
}
function openFoodPicker(cell){
  currentMealCell=cell;modalMode="foodPicker";
  const selected=(cell.querySelector("span")?.textContent||"").split("、").filter(name=>foodPickerData.some(food=>food.name===name));
  foodPickerSelected=new Set(selected);foodPickerKeyword="";foodPickerPage=1;
  document.querySelector(".property-modal").classList.add("food-picker-modal");
  document.getElementById("propertyModalTitle").textContent=`${cell.dataset.day} · ${cell.dataset.meal}选择菜品`;
  renderFoodPicker();
  document.getElementById("propertyModalBody").scrollTop=0;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function updateWeeklyMenuWeek(value){
  const week=document.getElementById("weeklyMenuWeek");
  const trigger=document.getElementById("weeklyMenuWeekTrigger");
  if(!week||!trigger)return;
  week.value=value;
  trigger.querySelector("span").textContent=value||"请选择周次";
  trigger.classList.toggle("has-value",Boolean(value));
  trigger.classList.remove("invalid");
  document.getElementById("weeklyMenuWeekError")?.classList.remove("show");
  document.getElementById("weeklyMenuPicker")?.classList.remove("show");
  const selected=Boolean(value);
  document.getElementById("weeklyMenuMatrix")?.classList.toggle("is-disabled",!selected);
  document.querySelectorAll("#weeklyMenuMatrix .meal-cell").forEach(cell=>{cell.disabled=!selected;const hint=cell.querySelector("small");if(hint)hint.textContent=selected?"点击选择菜品":"请先选择周次";});
  const tip=document.getElementById("weeklyMenuWeekTip");if(tip)tip.innerHTML=`<b>自然周：</b>${selected?value+"。每格可多选菜品，也允许留空。":"请先选择周次；周次确定后，可按餐次选择菜品。"}`;
  document.querySelectorAll("#weeklyMenuPicker .week-calendar-row").forEach(row=>row.classList.toggle("selected",row.dataset.week===value));
}
function switchWeeklyCalendar(month){
  document.querySelectorAll("[data-week-month]").forEach(panel=>{panel.hidden=Number(panel.dataset.weekMonth)!==month;});
  const title=document.getElementById("weeklyMenuMonthTitle");if(title)title.textContent=`2026 年 ${month} 月`;
}
function updateWeeklyMenuFilterWeek(value){
  const week=document.getElementById("weeklyMenuFilterWeek");
  const trigger=document.getElementById("weeklyMenuFilterWeekTrigger");
  if(!week||!trigger)return;
  week.value=value;
  trigger.querySelector("span").textContent=value||"请选择周次";
  trigger.classList.toggle("has-value",Boolean(value));
  document.getElementById("weeklyMenuFilterPicker")?.classList.remove("show");
  document.querySelectorAll("#weeklyMenuFilterPicker .week-calendar-row").forEach(row=>row.classList.toggle("selected",row.dataset.week===value));
}
function switchWeeklyMenuFilterCalendar(month){
  document.querySelectorAll("[data-filter-week-month]").forEach(panel=>{panel.hidden=Number(panel.dataset.filterWeekMonth)!==month;});
  const title=document.getElementById("weeklyMenuFilterMonthTitle");if(title)title.textContent=`2026 年 ${month} 月`;
}
function resetWeeklyMenuFilters(){
  updateWeeklyMenuFilterWeek("");
  switchWeeklyMenuFilterCalendar(6);
  const status=document.querySelector('[data-filter="1"]');if(status)status.value="全部";
}
function batchUploadHtml(){
  const docs=[
    ["公共区域报修操作指引.pdf","公共区域报修操作指引","PDF","8.6MB"],
    ["设备巡检记录模板.xlsx","设备巡检记录模板","Excel","1.2MB"],
    ["消防演练培训材料.pptx","消防演练培训材料","PPT","15.4MB"]
  ];
  return `<section class="batch-document-upload">
    <div class="form-grid">
      <div class="form-field">
        <label class="required">所属分类</label>
        <select class="control" id="batchUploadCategory">
          <option value="">请选择所属分类</option>
          <option>物业制度 / 安全作业规范</option>
          <option>物业制度 / 报修指引</option>
          <option>设备操作指引 / 冷库设备操作</option>
          <option>物业制度 / 培训资料归档</option>
        </select>
        <small class="form-help">仅可选择启用状态的二级分类，批量上传的文档统一归入该分类。</small>
      </div>
      <div class="form-field full">
        <label class="required">上传文档</label>
        <div class="upload-box batch-upload-box">＋ 选择多个文档</div>
        <small class="form-help">选择后系统按原文档名生成下方明细，文档名称可逐条修改。</small>
      </div>
    </div>
    <div class="batch-document-panel">
      <div class="batch-document-head">
        <h3>已选文档</h3>
        <span>共 ${docs.length} 个</span>
      </div>
      <div class="table-wrap compact-table batch-document-table">
        <table>
          <thead><tr><th>序号</th><th>原文档名</th><th>文档名称</th><th>类型</th><th>大小</th><th>备注</th><th>操作</th></tr></thead>
          <tbody>
            ${docs.map((doc,index)=>`<tr>
              <td>${index+1}</td>
              <td><b>${esc(doc[0])}</b></td>
              <td><input class="control batch-document-name" value="${esc(doc[1])}" maxlength="100" placeholder="请输入文档名称"></td>
              <td>${esc(doc[2])}</td>
              <td>${esc(doc[3])}</td>
              <td><input class="control" placeholder="选填"></td>
              <td><button type="button" class="btn text danger">移除</button></td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
      <div class="alert"><b>命名规则：</b>文档名称默认取原文档名去掉后缀；提交前可逐条修改，同一分类下文档名称不可重复。</div>
    </div>
  </section>`;
}
function openBatchUpload(){
  document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");
  resetDrawerFoot();
  drawerMode="batchUpload";drawerTabs=[];
  document.getElementById("propertyDrawerTitle").textContent="批量上传文档";
  document.getElementById("propertyDrawerTabs").innerHTML="";
  document.getElementById("propertyDrawerBody").innerHTML=`<div class="alert warning"><b>上传规则：</b>支持 PDF、Word、Excel、PPT、TXT、JPG、PNG、MP4、MP3；单个文档最大 200MB。单次最多 20 个文档，整批总大小不超过 1GB；任一文档校验失败则整批上传失败。</div>${batchUploadHtml()}`;
  document.getElementById("propertyDrawerConfirm").textContent="提交上传";
  document.getElementById("propertyDrawerOverlay").classList.add("show");
}
function openUpload(batch=false){
  if(batch)return openBatchUpload();
  openForm(batch?"批量上传文档":"上传文档",["所属分类（仅启用二级分类）","文档名称","上传文档","备注（选填）"],true);
  document.getElementById("propertyDrawerBody").insertAdjacentHTML("afterbegin",`<div class="alert warning"><b>上传规则：</b>支持 PDF、Word、Excel、PPT、TXT、JPG、PNG、MP4、MP3；单个文档最大 200MB。${batch?"单次最多 20 个文档，整批总大小不超过 1GB；任一文档校验失败则整批上传失败。":"上传完成后默认停用，启用前需先配置权限。"}</div>`);
}
function renderMobileMenu(){
  const body=document.getElementById("propertyModalBody"),week=mobileMenuWeeks[mobileMenuWeek];
  if(!body)return;
  const weekNav=`<section class="m-menu-week">
    <button type="button" data-action="移动端上一周" ${mobileMenuWeek===0?"disabled":""} aria-label="上一周">‹</button>
    <div><b>${week.label}</b><span>${week.range}</span><small>${week.status}</small></div>
    <button type="button" data-action="移动端下一周" ${mobileMenuWeek===mobileMenuWeeks.length-1?"disabled":""} aria-label="下一周">›</button>
  </section>`;
  const unavailable=`<div class="m-menu-unavailable"><i>☷</i><b>${week.status==="未发布"?"该周菜谱暂未发布":"该周菜谱已取消发布"}</b><span>移动端仅展示已发布周菜谱</span><button type="button" data-action="移动端返回本周">返回本周</button></div>`;
  const days=`<div class="m-menu-days">${mobileMenuDays.map((day,index)=>`<button type="button" class="${mobileMenuDay===index?"active":""}" data-action="移动端切换日期" data-day-index="${index}"><span>${day.today?"今":day.week}</span><b>${day.date}</b>${day.today?"<i></i>":""}</button>`).join("")}</div>`;
  const meals=`<div class="m-menu-meals">${["早餐","午餐","晚餐"].map(meal=>`<button type="button" class="${mobileMenuMeal===meal?"active":""}" data-action="移动端切换餐次" data-meal="${meal}">${meal}</button>`).join("")}</div>`;
  const foods=mobileMenuFoods[mobileMenuMeal].map(food=>{
    const rating=mobileFoodRatings.get(food.name);
    return `<article class="m-food-card">
      <button type="button" class="m-food-photo ${food.image}" data-action="移动端评价菜品" data-food="${food.name}" aria-label="评价${food.name}"><span>${food.name.slice(0,1)}</span><small>${rating?"查看评价":"点击评价"}</small></button>
      <div class="m-food-info"><div><b>${food.name}</b><span>${food.tag}</span></div><p>${food.desc}</p>${rating?`<div class="m-food-rated"><strong>${"★".repeat(rating)}${"☆".repeat(5-rating)}</strong><span>你评了 ${rating} 星</span></div>`:`<button type="button" data-action="移动端评价菜品" data-food="${food.name}">评价这道菜 <i>›</i></button>`}</div>
    </article>`;
  }).join("");
  body.innerHTML=`<div class="mobile-preview mobile-canteen">
    <div class="m-statusbar"><b>10:30</b><span>●●● 5G ▰</span></div>
    <header class="m-menu-header"><button type="button" aria-label="返回">‹</button><div><small>智慧食堂</small><h3>周菜谱</h3></div><button type="button" aria-label="更多">•••</button></header>
    ${weekNav}
    ${week.available?`${days}${meals}<div class="m-menu-summary"><div><b>${mobileMenuDays[mobileMenuDay].week==="四"?"今天 · ":""}周${mobileMenuDays[mobileMenuDay].week} ${mobileMenuDays[mobileMenuDay].date}日</b><span>${mobileMenuMeal} · ${mobileMenuFoods[mobileMenuMeal].length} 道菜</span></div><small>点击菜品图片进行评价</small></div><div class="m-food-list">${foods}</div>`:unavailable}
    <div class="m-home-indicator"></div>
  </div>`;
}
function openMobileFoodRating(food){
  mobileRatingFood=food;
  const saved=mobileFoodRatings.get(food),body=document.querySelector(".mobile-canteen");
  if(!body)return;
  body.scrollTop=0;
  body.classList.add("rating-open");
  mobileRatingScore=saved||0;
  body.insertAdjacentHTML("beforeend",`<div class="m-rating-mask" data-action="关闭菜品评价"></div><section class="m-rating-sheet">
    <div class="m-rating-handle"></div><button class="m-rating-close" type="button" data-action="关闭菜品评价" aria-label="关闭">×</button>
    <small>菜品评价</small><h4>${food}</h4>
    ${saved?`<div class="m-rating-readonly"><div>${"★".repeat(saved)}${"☆".repeat(5-saved)}</div><b>你评了 ${saved} 星</b><span>评价已提交，不可修改</span></div>`:`<p>请为这道菜评分</p><div class="m-rating-stars">${[1,2,3,4,5].map(score=>`<button type="button" data-action="选择菜品星级" data-score="${score}" aria-label="${score}星">★</button>`).join("")}</div><textarea id="mobileFoodRatingNote" maxlength="100" placeholder="补充评价（选填，最多100字）"></textarea><button class="m-rating-submit" type="button" data-action="提交菜品评价" disabled>提交评价</button>`}
  </section>`);
}
function closeMobileFoodRating(){
  document.querySelector(".m-rating-mask")?.remove();
  document.querySelector(".m-rating-sheet")?.remove();
  document.querySelector(".mobile-canteen")?.classList.remove("rating-open");
  mobileRatingFood="";mobileRatingScore=0;
}
function renderMobileDormApplication(submitted=false){
  const applicant=dormApplicantByName("吴清")||dormApplicants[dormApplicants.length-1];
  document.getElementById("propertyModalBody").innerHTML=`<div class="mobile-preview mobile-dorm">
    <div class="m-statusbar"><b>10:30</b><span>●●● 5G ▰</span></div>
    <header class="m-dorm-header"><button type="button" aria-label="返回">‹</button><div><small>智慧宿舍</small><h3>入住申请</h3></div><button type="button" aria-label="更多">•••</button></header>
    <main class="m-dorm-content">
      ${submitted?`<section class="m-dorm-success">
        <i>✓</i><b>申请已提交</b><span>当前状态：待审批</span>
        <p>审批通过后由宿舍管理员在 PC 端分配房间。</p>
      </section>`:`<section class="m-dorm-card">
        <div class="m-dorm-card-title"><b>身份信息</b><span>系统自动带出，不可修改</span></div>
        <div class="m-dorm-info">
          <label>姓名</label><strong>${applicant.name}</strong>
          <label>所属企业</label><strong>${applicant.enterprise}</strong>
          <label>所属部门</label><strong>${applicant.department}</strong>
          <label>性别</label><strong>${applicant.gender}</strong>
          <label>联系方式</label><strong>${applicant.phone}</strong>
        </div>
      </section>
      <section class="m-dorm-card">
        <div class="m-dorm-card-title"><b>填写信息</b><span>提交后进入待审批</span></div>
        <label class="m-dorm-field required">预计入住时间<input id="mobileDormCheckIn" type="date"></label>
        <label class="m-dorm-field required">申请原因<textarea id="mobileDormReason" maxlength="200" placeholder="请输入申请原因"></textarea></label>
        <label class="m-dorm-field">备注<textarea id="mobileDormRemark" maxlength="200" placeholder="请输入备注（选填）"></textarea></label>
      </section>
      <button type="button" class="m-dorm-submit" data-action="提交移动端入住申请">提交</button>`}
    </main>
    <div class="m-home-indicator"></div>
  </div>`;
}
function submitMobileDormApplication(){
  const date=document.getElementById("mobileDormCheckIn")?.value||"";
  const reason=document.getElementById("mobileDormReason")?.value.trim()||"";
  if(!date)return toast("请选择预计入住时间","warning");
  if(!reason)return toast("请输入申请原因","warning");
  renderMobileDormApplication(true);
  toast("移动端入住申请已提交");
}
function renderMobileInvestmentIntent(submitted=false){
  document.getElementById("propertyModalBody").innerHTML=`<div class="mobile-preview mobile-dorm mobile-investment">
    <div class="m-statusbar"><b>10:30</b><span>●●● 5G ▰</span></div>
    <header class="m-dorm-header"><button type="button" aria-label="返回">‹</button><div><small>智慧园区服务</small><h3>招商意向</h3></div><button type="button" aria-label="更多">•••</button></header>
    <main class="m-dorm-content">
      ${submitted?`<section class="m-dorm-success">
        <i>✓</i><b>提交成功</b><span>当前状态：未成单</span>
        <p>招商意向已提交至后台，由招商负责人查看并登记成单结果。</p>
      </section>`:`<section class="m-dorm-card">
        <div class="m-dorm-card-title"><b>填写招商意向</b><span>提交后生成后台线索</span></div>
        <label class="m-dorm-field required">企业名称<input id="mobileInvestmentEnterprise" maxlength="50" placeholder="请输入企业名称"></label>
        <label class="m-dorm-field required">联系人<input id="mobileInvestmentContact" maxlength="20" placeholder="请输入联系人"></label>
        <label class="m-dorm-field required">联系方式<input id="mobileInvestmentPhone" maxlength="20" placeholder="请输入联系方式"></label>
        <label class="m-dorm-field required">意向园区<select id="mobileInvestmentPark"><option value="">请选择意向园区</option><option>三里园区</option><option>华家园区</option></select></label>
        <label class="m-dorm-field required">意向内容<textarea id="mobileInvestmentContent" maxlength="200" placeholder="请输入招商意向内容"></textarea></label>
      </section>
      <button type="button" class="m-dorm-submit" data-action="提交移动端招商意向">提交</button>`}
    </main>
    <div class="m-home-indicator"></div>
  </div>`;
}
function submitMobileInvestmentIntent(){
  const enterprise=document.getElementById("mobileInvestmentEnterprise")?.value.trim()||"";
  const contact=document.getElementById("mobileInvestmentContact")?.value.trim()||"";
  const phone=document.getElementById("mobileInvestmentPhone")?.value.trim()||"";
  const park=document.getElementById("mobileInvestmentPark")?.value||"";
  const content=document.getElementById("mobileInvestmentContent")?.value.trim()||"";
  if(!enterprise)return toast("请输入企业名称","warning");
  if(!contact)return toast("请输入联系人","warning");
  if(!phone)return toast("请输入联系方式","warning");
  if(!park)return toast("请选择意向园区","warning");
  if(!content)return toast("请输入意向内容","warning");
  renderMobileInvestmentIntent(true);
  toast("移动端招商意向已提交");
}
function mobileKnowledgePrimaryData(){
  return mobileKnowledgeCategories.find(item=>item.name===mobileKnowledgePrimary)||mobileKnowledgeCategories[0];
}
function mobileKnowledgeSecondaryData(){
  const primary=mobileKnowledgePrimaryData();
  return primary.children.find(item=>item.name===mobileKnowledgeSecondary)||primary.children[0];
}
function mobileKnowledgeIcon(type){
  if(type==="PDF")return "pdf";
  if(type==="PPTX")return "ppt";
  if(type==="XLSX")return "xls";
  if(type==="DOCX")return "doc";
  return "file";
}
function mobileKnowledgeCanPreview(type){
  return ["PDF","JPG","PNG","MP4"].includes(String(type).toUpperCase());
}
function renderMobileKnowledge(){
  const isRoot=mobileKnowledgeView==="level1";
  const isSecond=mobileKnowledgeView==="level2";
  const isSearch=mobileKnowledgeView==="search";
  const primary=mobileKnowledgePrimaryData();
  const secondary=mobileKnowledgeSecondaryData();
  const docs=isSearch
    ? mobileKnowledgeCategories.flatMap(cat=>cat.children.flatMap(child=>child.docs.map(doc=>({...doc,primary:cat.name,secondary:child.name}))))
    : secondary.docs.map(doc=>({...doc,primary:primary.name,secondary:secondary.name}));
  const activeDoc=docs.find(doc=>doc.name===mobileKnowledgeDocName)||docs[0];
  const activeDocCanPreview=mobileKnowledgeCanPreview(activeDoc?.type);
  const breadcrumb=isSearch?"知识库 / 全局搜索":isRoot?"知识库":isSecond?`知识库 / ${primary.name}`:`知识库 / ${primary.name} / ${secondary.name}`;
  const rows=isSearch||mobileKnowledgeView==="docs"
    ? docs.map(doc=>`<button type="button" class="kb-row kb-file-row" data-action="移动端查看知识文档" data-doc-name="${esc(doc.name)}" data-primary="${esc(doc.primary)}" data-secondary="${esc(doc.secondary)}">
        <span class="kb-file-icon ${mobileKnowledgeIcon(doc.type)}">${doc.type==="PDF"?"PDF":doc.type==="PPTX"?"P":doc.type==="XLSX"?"X":"W"}</span>
        <span class="kb-row-main"><b>${esc(doc.name)}</b><small>${esc(doc.primary)} / ${esc(doc.secondary)} · ${esc(doc.updated)} · ${esc(doc.size)}</small></span>
        <i></i>
      </button>`).join("")
    : (isRoot?mobileKnowledgeCategories:primary.children).map(item=>`<button type="button" class="kb-row" data-action="${isRoot?"移动端进入一级分类":"移动端进入二级分类"}" data-name="${esc(item.name)}">
        <span class="kb-folder-icon"></span>
        <span class="kb-row-main"><b>${esc(item.name)}</b><small>${item.count} 个文档 · ${esc(item.updated)}</small></span>
        <i></i>
      </button>`).join("");
  document.getElementById("propertyModalBody").innerHTML=`<div class="mobile-preview knowledge-mobile-preview">
    <div class="kb-statusbar"><b>01:49</b><span>5G 49%</span></div>
    <div class="kb-topbar">
      <button type="button" class="kb-back" data-action="移动端知识库返回" ${isRoot?"disabled":""} aria-label="返回">‹</button>
      <button type="button" class="kb-search" data-action="移动端知识库全局搜索"><span></span><b>支持文档名称、分类名称、文档内容搜索</b></button>
      <button type="button" class="kb-more" aria-label="更多">•••</button>
    </div>
    <div class="kb-breadcrumb">${breadcrumb}</div>
    ${isSearch?`<div class="kb-search-result"><b>全局搜索结果</b><span>跨全部分类检索文档名称、分类名称和文档内容</span></div>`:""}
    <div class="kb-sort"><button type="button">↓ 按最近更新</button><button type="button">▦</button></div>
    <div class="kb-list">${rows}</div>
    ${mobileKnowledgeView==="docs"?`<div class="document-preview mobile-doc-detail">
      <b>${esc(activeDoc?.name||"园区消防巡查制度")}</b>
      <span>${activeDocCanPreview?`${esc(activeDoc?.type||"PDF")} 可在线查看，也允许下载到本地`:`${esc(activeDoc?.type||"DOCX")} 请下载后查看`}</span>
      <small>移动端打开或下载前重新校验文档状态和当前用户权限；下载成功后写入 PC 后台下载记录。</small>
      <button class="btn primary" type="button">下载</button>
    </div>`:""}
  </div>`;
}
function openMobile(type){
  document.getElementById("propertyModalTitle").textContent=type;
  document.querySelector(".property-modal").classList.remove("mobile-apply-modal","mobile-menu-modal");
  if(/菜单|菜谱/.test(type)){
    modalMode="mobileMenu";mobileMenuWeek=1;mobileMenuDay=3;mobileMenuMeal="午餐";
    document.querySelector(".property-modal").classList.add("mobile-menu-modal");
    renderMobileMenu();
  }else if(type.includes("入住")){
    modalMode="mobileDormApplication";
    document.querySelector(".property-modal").classList.add("mobile-apply-modal");
    renderMobileDormApplication(false);
  }else if(type.includes("招商意向")){
    modalMode="mobileInvestmentIntent";
    document.querySelector(".property-modal").classList.add("mobile-apply-modal");
    renderMobileInvestmentIntent(false);
  }else if(type.includes("文档")){
    modalMode="mobileKnowledge";
    mobileKnowledgeView="level1";mobileKnowledgePrimary="";mobileKnowledgeSecondary="";mobileKnowledgeDocName="";
    document.querySelector(".property-modal").classList.add("mobile-menu-modal");
    renderMobileKnowledge();
  }else{
    document.getElementById("propertyModalBody").innerHTML=`<div class="mobile-preview"><div class="mobile-bar">智慧园区服务</div><h3>${type}</h3>${type.includes("入住")?formHtml(["预计入住时间","申请原因","备注（选填）"]):`<div class="document-preview"><b>园区消防巡查制度</b><span>移动端文档详情</span></div>`}</div>`;
  }
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openBatchSpace(kind){
  const isFloor=kind==="楼层",parent=isFloor?"楼宇":"楼层",area=isFloor?"楼层面积":"房间面积",prefix=isFloor?"楼层前缀":"房间前缀",suffix=isFloor?"楼层后缀":"房间后缀",range=isFloor?"楼层范围":"房间范围",exclude=isFloor?"除外楼层":"除外房间";
  document.getElementById("propertyModalTitle").textContent=`批量新增${kind}`;
  document.querySelector(".property-modal").classList.add("batch-space-modal");
  document.getElementById("propertyModalBody").innerHTML=`<div class="batch-space-form"><div class="batch-row"><label class="required">所属${parent}</label><select class="control"><option>请选择所属${parent}</option></select></div><div class="batch-row"><label>添加方式</label><div class="batch-radio"><label><input type="radio" checked> 按规则添加</label><label><input type="radio"> 自定义添加</label></div></div><div class="batch-row"><label>${area}(m²)</label><div class="number-step"><button>−</button><input value="0.00"><button>＋</button></div></div><div class="batch-row"><label>${prefix}</label><input class="control" placeholder="请输入${prefix}"></div><div class="batch-row"><label>${suffix}</label><input class="control" placeholder="请输入${suffix}"></div><div class="batch-row"><label class="required">${range}</label><div class="range-step"><div class="number-step"><button>−</button><input><button>＋</button></div><b>——</b><div class="number-step"><button>−</button><input><button>＋</button></div></div></div><div class="batch-row"><label>${exclude}</label><input class="control" placeholder="请输入${exclude}，多个${kind}之间请用“+”号进行间隔"></div><div class="batch-row preview-row"><label>展示效果</label><div id="batchSpacePreview">—</div></div><div class="batch-row"><label>备注</label><input class="control" placeholder="请输入备注"></div></div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function categoryFormHtml(parentName="",row=[]){
  const isChild=Boolean(parentName);
  const name=row[0]||"";
  const status=row[3]||"停用";
  return `<div class="form-grid category-form">
    <div class="form-field">
      <label class="required">分类名称</label>
      <input class="control" id="categoryNameInput" maxlength="30" value="${esc(name)}" placeholder="请输入分类名称">
      <small class="form-help">保存前去除首尾空格，同一上级分类下名称不可重复。</small>
    </div>
    <div class="form-field">
      <label>上级分类</label>
      <input class="control" value="${isChild?esc(parentName):"无（一级分类）"}" readonly>
    </div>
    <div class="form-field">
      <label>状态</label>
      <label class="switch-control"><input type="checkbox" id="categoryStatusSwitch" ${status==="启用"?"checked":""}><span></span><b>${status}</b></label>
    </div>
  </div>`;
}
function openCategoryForm(action,row=[]){
  const isChild=action==="新增二级分类";
  const isEdit=action==="编辑";
  const parentName=isChild?row[0]||"":isEdit&&row[2]==="二级"?row[1]||"":"";
  modalMode=isEdit?"categoryEdit":isChild?"categorySubCreate":"categoryCreate";
  document.querySelector(".property-modal").classList.remove("batch-space-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalTitle").textContent=isEdit?"编辑分类":isChild?"新增二级分类":"新增分类";
  document.getElementById("propertyModalConfirm").textContent="保存";
  document.getElementById("propertyModalBody").innerHTML=categoryFormHtml(parentName,isEdit?row:[]);
  syncSwitchLabels(document.getElementById("propertyModalBody"));
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openCategoryDelete(row=[]){
  const name=row[0]||"该分类";
  modalMode="categoryDelete";
  document.querySelector(".property-modal").classList.remove("batch-space-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalTitle").textContent="删除分类";
  document.getElementById("propertyModalConfirm").textContent="确认删除";
  document.getElementById("propertyModalBody").innerHTML=`<div class="form-grid category-form">
    <div class="form-field">
      <label>分类名称</label>
      <input class="control" value="${esc(name)}" readonly>
    </div>
    <div class="form-field full">
      <label class="required">删除原因</label>
      <textarea class="control" id="categoryDeleteReason" placeholder="请输入删除原因"></textarea>
    </div>
  </div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openCategoryStatusConfirm(action,row=[]){
  const name=row[0]||"该分类";
  modalMode=`category${action}`;
  document.querySelector(".property-modal").classList.remove("batch-space-modal");
  document.querySelector(".property-modal .modal-foot").style.display="";
  document.getElementById("propertyModalTitle").textContent=action;
  document.getElementById("propertyModalConfirm").textContent=`确认${action}`;
  document.getElementById("propertyModalBody").innerHTML=`<div class="confirm-message">请确认是否${action}【${esc(name)}】分类？</div>`;
  document.getElementById("propertyModalOverlay").classList.add("show");
}
function openAction(action,row=[],trigger=null){
  if(row.length)currentRow=row;
  document.querySelector(".property-modal").classList.remove("batch-space-modal");
  if(action==="切换分类展开"&&trigger?.dataset.categoryKey){
    const key=trigger.dataset.categoryKey;
    const expanded=trigger.classList.toggle("expanded");
    trigger.setAttribute("aria-expanded",String(expanded));
    document.querySelectorAll(`[data-category-parent="${key}"]`).forEach(item=>{item.hidden=!expanded;});
    return;
  }
  if(action==="切换授权方式"&&trigger?.dataset.permissionMode){
    currentPermissionMode=trigger.dataset.permissionMode;
    document.getElementById("propertyDrawerBody").innerHTML=documentPermissionHtml(currentRow);
    return;
  }
  if(activePage==="分类管理"&&["新增分类","新增二级分类","编辑"].includes(action))return openCategoryForm(action,row);
  if(activePage==="分类管理"&&["停用","启用"].includes(action))return openCategoryStatusConfirm(action,row);
  if(activePage==="分类管理"&&action==="删除")return openCategoryDelete(row);
  if(action==="添加违规行为输入")return addViolationBehaviorInput();
  if(action==="移除违规行为输入")return removeViolationBehaviorInput(trigger);
  if(action==="查看详情"||action==="查看")return openDetail(row);
  if(action==="编辑"&&activePage==="周菜单管理")return openMenuEditor(action,false,row);
  if(action==="创建周菜单")return openMenuEditor(action);
  if(action==="查看"&&activePage==="周菜单管理")return openMenuEditor("查看周菜单",true,row);
  if(action==="发布"&&activePage==="周菜单管理"){
    const week=row[0]||"2026年第25周（06-15 至 06-21）";
    modalMode="weeklyMenuPublish";
    document.getElementById("propertyModalTitle").textContent="发布";
    document.getElementById("propertyModalBody").innerHTML=`<div class="weekly-menu-publish-confirm">请确认是否发布<span>【${week}】</span>周菜谱</div>`;
    return document.getElementById("propertyModalOverlay").classList.add("show");
  }
  if(action==="取消发布"&&activePage==="周菜单管理"){
    const week=row[0]||"2026年第24周（06-08 至 06-14）";
    modalMode="weeklyMenuCancelPublish";
    document.getElementById("propertyModalTitle").textContent="取消发布";
    document.getElementById("propertyModalBody").innerHTML=`<div class="weekly-menu-publish-confirm">请确认是否取消发布<span>【${week}】</span>周菜谱</div>`;
    return document.getElementById("propertyModalOverlay").classList.add("show");
  }
  if(action==="切换周次选择器")return document.getElementById("weeklyMenuPicker")?.classList.toggle("show");
  if(action==="上一月")return switchWeeklyCalendar(6);
  if(action==="下一月")return switchWeeklyCalendar(7);
  if(action==="选择周次"&&trigger?.dataset.week)return updateWeeklyMenuWeek(trigger.dataset.week);
  if(action==="切换筛选周次选择器")return document.getElementById("weeklyMenuFilterPicker")?.classList.toggle("show");
  if(action==="筛选上一月")return switchWeeklyMenuFilterCalendar(6);
  if(action==="筛选下一月")return switchWeeklyMenuFilterCalendar(7);
  if(action==="选择筛选周次"&&trigger?.dataset.week)return updateWeeklyMenuFilterWeek(trigger.dataset.week);
  if(action==="切换分配房间级联")return document.getElementById("dormAssignCascaderPanel")?.classList.toggle("show");
  if(action==="选择分配房间楼宇"&&trigger?.dataset.value)return selectDormAssignRoom("building",trigger.dataset.value);
  if(action==="选择分配房间楼层"&&trigger?.dataset.value)return selectDormAssignRoom("floor",trigger.dataset.value);
  if(action==="选择分配房间房间"&&trigger?.dataset.value)return selectDormAssignRoom("room",trigger.dataset.value);
  if(action==="选择菜品"&&trigger)return openFoodPicker(trigger);
  if(action==="查询菜品"){foodPickerKeyword=document.getElementById("foodPickerKeyword")?.value.trim()||"";foodPickerPage=1;return renderFoodPicker();}
  if(action==="重置菜品查询"){foodPickerKeyword="";foodPickerPage=1;return renderFoodPicker();}
  if(action==="菜品上一页"){foodPickerPage=Math.max(1,foodPickerPage-1);return renderFoodPicker();}
  if(action==="菜品下一页"){foodPickerPage+=1;return renderFoodPicker();}
  if(action==="菜品页码"&&trigger?.dataset.foodPage){foodPickerPage=Number(trigger.dataset.foodPage);return renderFoodPicker();}
  if(action==="移除已选菜品"&&trigger?.dataset.foodName){foodPickerSelected.delete(trigger.dataset.foodName);return renderFoodPicker();}
  if(action==="上传文档")return openUpload(false);if(action==="批量上传")return openUpload(true);
  if(activePage==="文档管理"&&action==="编辑")return openDocumentEdit(row);
  if(activePage==="文档管理"&&action==="配置权限")return openDocumentPermission(row);
  if(activePage==="文档管理"&&["启用","停用"].includes(action))return openDocumentStatusConfirm(action,row);
  if(action==="移动端申请模拟")return openMobile("移动端入住申请");if(action==="移动端周菜谱")return openMobile("移动端周菜谱");if(action==="移动端文档模拟")return openMobile("移动端文档列表与详情");if(action==="移动端模拟"&&activePage==="招商意向列表")return openMobile("移动端招商意向填写");
  if(action==="移动端上一周"){mobileMenuWeek=Math.max(0,mobileMenuWeek-1);return renderMobileMenu();}
  if(action==="移动端下一周"){mobileMenuWeek=Math.min(mobileMenuWeeks.length-1,mobileMenuWeek+1);return renderMobileMenu();}
  if(action==="移动端返回本周"){mobileMenuWeek=1;return renderMobileMenu();}
  if(action==="移动端切换日期"&&trigger?.dataset.dayIndex){mobileMenuDay=Number(trigger.dataset.dayIndex);return renderMobileMenu();}
  if(action==="移动端切换餐次"&&trigger?.dataset.meal){mobileMenuMeal=trigger.dataset.meal;return renderMobileMenu();}
  if(action==="移动端进入一级分类"&&trigger?.dataset.name){mobileKnowledgePrimary=trigger.dataset.name;mobileKnowledgeSecondary="";mobileKnowledgeDocName="";mobileKnowledgeView="level2";return renderMobileKnowledge();}
  if(action==="移动端进入二级分类"&&trigger?.dataset.name){mobileKnowledgeSecondary=trigger.dataset.name;mobileKnowledgeDocName="";mobileKnowledgeView="docs";return renderMobileKnowledge();}
  if(action==="移动端知识库返回"){
    if(mobileKnowledgeView==="search"){mobileKnowledgeView="level1";mobileKnowledgePrimary="";mobileKnowledgeSecondary="";mobileKnowledgeDocName="";}
    else if(mobileKnowledgeView==="docs"){mobileKnowledgeView="level2";mobileKnowledgeSecondary="";mobileKnowledgeDocName="";}
    else if(mobileKnowledgeView==="level2"){mobileKnowledgeView="level1";mobileKnowledgePrimary="";}
    return renderMobileKnowledge();
  }
  if(action==="移动端知识库全局搜索"){mobileKnowledgeView="search";return renderMobileKnowledge();}
  if(action==="移动端查看知识文档"){
    if(trigger?.dataset.primary)mobileKnowledgePrimary=trigger.dataset.primary;
    if(trigger?.dataset.secondary)mobileKnowledgeSecondary=trigger.dataset.secondary;
    if(trigger?.dataset.docName)mobileKnowledgeDocName=trigger.dataset.docName;
    mobileKnowledgeView="docs";return renderMobileKnowledge();
  }
  if(action==="移动端评价菜品"&&trigger?.dataset.food)return openMobileFoodRating(trigger.dataset.food);
  if(action==="关闭菜品评价")return closeMobileFoodRating();
  if(action==="选择菜品星级"&&trigger?.dataset.score){
    mobileRatingScore=Number(trigger.dataset.score);
    document.querySelectorAll(".m-rating-stars button").forEach((star,index)=>star.classList.toggle("active",index<mobileRatingScore));
    const submit=document.querySelector(".m-rating-submit");if(submit)submit.disabled=false;
    return;
  }
  if(action==="提交菜品评价"){
    if(!mobileRatingScore)return toast("请选择 1 至 5 星","warning");
    mobileFoodRatings.set(mobileRatingFood,mobileRatingScore);closeMobileFoodRating();renderMobileMenu();return toast("菜品评价已提交");
  }
  if(action==="提交移动端入住申请")return submitMobileDormApplication();
  if(action==="提交移动端招商意向")return submitMobileInvestmentIntent();
  if(action==="图片预览"){const food=currentRow[currentCfg?.columns.indexOf("菜品名称")]||"菜品图片";const image=currentRow[currentCfg?.columns.indexOf("菜品图片")]||"FOOD:fish";const style=String(image).split(":")[1];document.getElementById("propertyModalTitle").textContent=`${food} · 图片预览`;document.getElementById("propertyModalBody").innerHTML=`<div class="food-preview ${style}"><span></span><b>${food}</b></div>`;return document.getElementById("propertyModalOverlay").classList.add("show");}
  if(action==="星级分布"){document.getElementById("propertyModalTitle").textContent=trigger?.dataset.ratingTitle||"餐次星级分布";document.getElementById("propertyModalBody").innerHTML=`<div class="star-bars">${[["5星",38],["4星",26],["3星",14],["2星",5],["1星",2]].map(x=>`<div><b>${x[0]}</b><i style="--w:${x[1]*2}%"></i><span>${x[1]} 人</span></div>`).join("")}</div><div class="alert">仅展示星级分布，不展示评价人。</div>`;return document.getElementById("propertyModalOverlay").classList.add("show");}
  if(action==="批量新增楼层")return openBatchSpace("楼层");
  if(action==="批量新增房间")return openBatchSpace("房间");
  if(activePage==="宿舍人员"&&action==="发起入住申请")return openDormApplicationForm(row);
  if(activePage==="宿舍人员"&&action==="分配房间")return openDormRoomAssignModal(row);
  if(activePage==="入住审批"&&["通过","驳回"].includes(action))return openDormApprovalForm(action,row);
  if(activePage==="违规记录"&&action==="新增违规记录")return openViolationRecordModal();
  if(activePage==="违规记录"&&action==="删除")return openViolationRecordDelete(row);
  if(activePage==="违规行为维护"&&action==="新增违规行为")return openViolationBehaviorModal("新增违规行为",row);
  if(activePage==="违规行为维护"&&action==="编辑")return openViolationBehaviorModal("编辑违规行为",row);
  if(activePage==="违规行为维护"&&action==="删除")return openViolationDelete(row);
  if(activePage==="工单列表"&&["派单","直接回复并关单","换人"].includes(action))return openForm(action,actionSpecs[`工单列表:${action}`],false);
  if(activePage==="总务审批"&&["审批通过","审批驳回"].includes(action))return openForm(action,actionSpecs[`总务审批:${action}`],false);
  if(activePage==="招商意向列表"&&action==="登记成单")return openInvestmentDealModal(row);
  if(activePage==="空间管理"&&(action==="新增"||action==="修改"))return openForm(`${action}${spaceTab.replace("管理","")}`,spaceFormFields[spaceTab],true);
  if(activePage==="空间管理"&&action==="删除")return openForm("删除空间",["空间名称（只读）","删除确认"],false);
  if(activePage==="报修类型"&&action==="停用")return openConfirm("停用","是否停用该报修类型？");
  if(activePage==="报修类型"&&action==="启用")return openConfirm("启用","是否启用该报修类型？");
  if(activePage==="报修类型"&&action==="删除")return openConfirm("删除","是否删除该报修类型？");
  if(activePage==="通知公告"&&action==="已发布编辑提示")return toast("已发布公告需先取消发布后才能编辑","warning");
  if(activePage==="通知公告"&&["新增公告","编辑"].includes(action))return openPublishForm(action,row);
  if(activePage==="通知公告"&&["发布","取消发布","重新发布","删除"].includes(action)){
    if(drawerMode==="publishForm"&&["发布"].includes(action)){
      close("drawer");
      return toast("公告已发布，状态变为已发布");
    }
    return openPublishConfirm(action,row);
  }
  if(activePage==="通知公告"&&action==="批量操作")return openPublishBatchModal();
  if(drawerMode==="publishForm"&&action==="保存草稿"){
    close("drawer");
    return toast("公告草稿已保存");
  }
  if(action==="保存排班"){scheduleDirty=false;return toast("排班已保存");}
  if(action==="批量设置")return openForm("维护排班人员",["排班周（只读）","选择日期","班次类型（安保白班 / 安保夜班 / 保洁在岗 / 食堂在岗）","选择人员（可多选）"],false);
  if(action==="编辑排班人员")return openForm("维护排班人员",["排班周（只读）","日期（只读）","班次类型（只读）","已排人员（可多选）"],false);
  if(action==="批量操作")return openForm("信息批量操作",["已选信息（只读）","批量动作（删除草稿 / 取消发布）"],false);
  if(action==="重置"){document.querySelectorAll("[data-filter]").forEach(x=>x.value="");if(["周菜单管理","满意度结果"].includes(activePage))resetWeeklyMenuFilters();return toast("筛选条件已重置");}
  if(["查询","搜索","导出","上一周","本周","下一周","下载","批量启用","保存草稿","立即发布","置顶"].includes(action))return toast(`${action}操作已执行`);
  const spec=actionSpecs[`${activePage}:${action}`];if(spec)return openForm(action,spec,!/通过|退回|驳回|删除|停用|启用|发布|接单|立项|上报|提交完成|评价|登记成单/.test(action));
  toast(`详细设计未定义“${activePage} - ${action}”操作界面，已阻止打开`,"warning");
}
function toast(message,type="success"){
  const el=document.createElement("div");el.className="toast";el.style.borderLeftColor=type==="warning"?"var(--warning)":"var(--success)";el.innerHTML=`<b>${type==="warning"?"提示":"操作成功"}</b><div>${message}</div>`;document.getElementById("propertyToastStack").appendChild(el);setTimeout(()=>el.remove(),2800);
}
function close(kind){
  document.getElementById(kind==="drawer"?"propertyDrawerOverlay":"propertyModalOverlay").classList.remove("show");
  if(kind==="drawer"){document.querySelector(".property-drawer").classList.remove("property-workorder-dialog");resetDrawerFoot();document.getElementById("propertyDrawerConfirm").disabled=false;}
  else{document.querySelector(".property-modal").classList.remove("food-picker-modal","mobile-menu-modal","mobile-apply-modal","dorm-assign-modal","dorm-approval-modal","violation-behavior-modal","violation-record-modal");document.querySelector(".property-modal .modal-foot").style.display="";document.getElementById("propertyModalConfirm").disabled=false;modalMode="";currentMealCell=null;mobileRatingFood="";mobileRatingScore=0;}
}
function handleDrawerConfirm(){
  if(drawerMode==="batchUpload"){
    const category=document.getElementById("batchUploadCategory")?.value||"";
    const names=[...document.querySelectorAll(".batch-document-name")].map(input=>input.value.trim().replace(/\s+/g," ")).filter(Boolean);
    if(!category)return toast("请选择所属分类","warning");
    if(!names.length)return toast("请至少选择一个文档","warning");
    if(names.length!==document.querySelectorAll(".batch-document-name").length)return toast("请完善每条文档名称","warning");
    if(new Set(names).size!==names.length)return toast("同一批次内文档名称不可重复","warning");
  }
  if(drawerMode==="documentEdit"){
    if((currentRow[7]||"")==="启用")return toast("启用中文档不可直接编辑，请先停用","warning");
    const category=document.getElementById("documentEditCategory")?.value||"";
    const name=document.getElementById("documentEditName")?.value.trim().replace(/\s+/g," ")||"";
    if(!category)return toast("请选择所属分类","warning");
    if(!name)return toast("请输入文档名称","warning");
  }
  if(drawerMode==="dormApplication"){
    const applicantName=document.getElementById("dormApplicantSelect")?.value||"";
    const applicant=dormApplicantByName(applicantName);
    const expectedDate=document.getElementById("dormExpectedCheckIn")?.value||"";
    const reason=document.getElementById("dormApplyReason")?.value.trim()||"";
    if(!applicantName)return toast("请选择申请人","warning");
    if(["待审批","待分配"].includes(applicant?.status))return toast("当前人员已有进行中的入住申请","warning");
    if(applicant?.status==="已入住")return toast("当前人员已入住，不可重复提交入住申请","warning");
    if(!expectedDate)return toast("请选择预计入住时间","warning");
    if(!reason)return toast("请输入申请原因","warning");
  }
  if(drawerMode==="menuCreate"){
    const week=document.getElementById("weeklyMenuWeek");
    if(!week?.value){
      document.getElementById("weeklyMenuWeekTrigger")?.classList.add("invalid");
      document.getElementById("weeklyMenuWeekError")?.classList.add("show");
      return toast("请选择周次后再保存","warning");
    }
    if((currentCfg?.rows||[]).some(row=>row[0]===week.value)){
      document.getElementById("weeklyMenuWeekTrigger")?.classList.add("invalid");
      document.getElementById("weeklyMenuWeekError")?.classList.add("show");
      return toast("该周次已创建周菜单，不可重复创建","warning");
    }
  }
  close("drawer");toast(drawerMode==="detail"?"详情已关闭":"已保存");
}
function handleModalConfirm(){
  if(modalMode==="document停用"){
    const reason=document.getElementById("documentDisableReason")?.value.trim()||"";
    if(!reason)return toast("请输入停用原因","warning");
    close("modal");return toast("文档已停用");
  }
  if(modalMode==="document启用"){
    const authMode=currentRow[8]||"未配置";
    const authScope=currentRow[9]||"--";
    if(authMode==="未配置"||authScope==="--")return toast("请先配置权限后再启用","warning");
    close("modal");return toast("文档已启用");
  }
  if(modalMode==="categoryCreate"||modalMode==="categorySubCreate"||modalMode==="categoryEdit"){
    const name=document.getElementById("categoryNameInput")?.value.trim().replace(/\s+/g," ")||"";
    if(!name)return toast("请输入分类名称","warning");
    close("modal");return toast(modalMode==="categoryEdit"?"分类已更新":modalMode==="categorySubCreate"?"二级分类已新增":"分类已新增");
  }
  if(modalMode==="categoryDelete"){
    const reason=document.getElementById("categoryDeleteReason")?.value.trim()||"";
    if(!reason)return toast("请输入删除原因","warning");
    close("modal");return toast("分类已删除");
  }
  if(modalMode==="category停用"||modalMode==="category启用"){
    const action=modalMode.replace("category","");
    close("modal");return toast(`分类已${action}`);
  }
  if(modalMode==="violationBehaviorCreate"||modalMode==="violationBehaviorEdit"){
    const score=document.getElementById("violationScore")?.value||"";
    const behaviors=[...document.querySelectorAll("[data-violation-behavior]")].map(input=>input.value.trim()).filter(Boolean);
    if(!score)return toast("请选择分值","warning");
    if(!behaviors.length)return toast("请输入违规行为","warning");
    close("modal");return toast(modalMode==="violationBehaviorEdit"?"违规行为已更新":"违规行为已新增");
  }
  if(modalMode==="violationBehaviorDelete"){
    close("modal");return toast("违规行为已删除");
  }
  if(modalMode==="violationRecordCreate"){
    const dept=document.getElementById("violationRecordDept")?.value||"";
    const time=document.getElementById("violationRecordTime")?.value||"";
    const resident=document.getElementById("violationRecordResident")?.value||"";
    const behavior=document.getElementById("violationRecordBehavior")?.value||"";
    if(!dept)return toast("请选择所属企业/部门","warning");
    if(!time)return toast("请选择违规时间","warning");
    if(!resident)return toast("请选择违规人员","warning");
    if(!behavior)return toast("请选择违规行为","warning");
    close("modal");return toast("违规记录已新增");
  }
  if(modalMode==="violationRecordDelete"){
    close("modal");return toast("违规记录已删除");
  }
  if(modalMode==="foodPicker"&&currentMealCell){
    const selected=foodPickerData.filter(food=>foodPickerSelected.has(food.name)).map(food=>food.name);
    currentMealCell.querySelector("span").textContent=selected.length?selected.join("、"):"未选择菜品";
    const hint=currentMealCell.querySelector("small");if(hint)hint.textContent="点击重新选择";
    close("modal");return toast("菜品选择已更新");
  }
  if(modalMode==="dormRoomAssign"){
    const roomPath=document.getElementById("dormAssignRoomPath")?.value||"";
    const bed=document.getElementById("dormAssignBed")?.value.trim()||"";
    const checkInDate=document.getElementById("dormAssignCheckInDate")?.value||"";
    if(!roomPath)return toast("请选择楼宇 / 楼层 / 房间","warning");
    if(!bed)return toast("请输入床位号","warning");
    if(!checkInDate)return toast("请选择入住时间","warning");
    close("modal");return toast("房间已分配");
  }
  if(modalMode==="dormApprovalReject"){
    const reason=document.getElementById("dormApprovalOpinion")?.value.trim()||"";
    if(!reason)return toast("请输入驳回原因","warning");
    close("modal");return toast("入住申请已驳回");
  }
  if(modalMode==="dormApprovalPass"){
    close("modal");return toast("入住申请已通过，状态变为待分配");
  }
  if(modalMode==="investmentDeal"){
    const dealDate=document.getElementById("investmentDealDate")?.value||"";
    if(!dealDate)return toast("请选择成单日期","warning");
    close("modal");return toast("招商意向已登记成单");
  }
  if(String(modalMode).startsWith("publish")){
    const mode=modalMode;
    close("modal");
    if(mode==="publishBatch")return toast("批量操作已提交");
    if(mode.includes("删除"))return toast("草稿已删除");
    if(mode.includes("取消发布"))return toast("公告已取消发布");
    if(mode.includes("重新发布"))return toast("公告已重新发布");
    if(mode.includes("发布"))return toast("公告已发布");
  }
  close("modal");toast("操作已确认");
}

document.addEventListener("click",e=>{
  if(!e.target.closest(".week-picker-control"))document.getElementById("weeklyMenuPicker")?.classList.remove("show");
  if(!e.target.closest(".weekly-menu-filter-week"))document.getElementById("weeklyMenuFilterPicker")?.classList.remove("show");
  if(!e.target.closest("#dormAssignCascader"))document.getElementById("dormAssignCascaderPanel")?.classList.remove("show");
  const module=e.target.closest("[data-module]");if(module){activeModule=module.dataset.module;activePage=propertyModules.find(x=>x.id===activeModule).children[0];return renderPage();}
  const p=e.target.closest("[data-page]");if(p){if(scheduleDirty&&!confirm("排班尚未保存，确认离开当前页面？"))return;activePage=p.dataset.page;return renderPage();}
  const st=e.target.closest("[data-space-tab]");if(st){spaceTab=st.dataset.spaceTab;return renderSpace();}
  const dt=e.target.closest("[data-drawer-tab]");if(dt){document.querySelectorAll("[data-drawer-tab]").forEach(x=>x.classList.toggle("active",x===dt));document.getElementById("propertyDrawerBody").innerHTML=detailContent(dt.dataset.drawerTab);return;}
  const documentTab=e.target.closest("[data-document-detail-tab]");if(documentTab){document.getElementById("propertyDrawerBody").innerHTML=documentDetailHtml(documentTab.dataset.documentDetailTab);return;}
  const dormTab=e.target.closest("[data-dorm-detail-tab]");if(dormTab){document.getElementById("propertyDrawerBody").innerHTML=dormPersonDetailHtml(dormTab.dataset.dormDetailTab);return;}
  const wt=e.target.closest("[data-workorder-tab]");if(wt){document.getElementById("propertyDrawerBody").innerHTML=workorderDetailHtml(wt.dataset.workorderTab);return;}
  const at=e.target.closest("[data-approval-tab]");if(at){document.getElementById("propertyDrawerBody").innerHTML=approvalDetailHtml(at.dataset.approvalTab);return;}
  const action=e.target.closest("[data-action]");if(action){const tr=action.closest("tr");const row=tr&&currentCfg?.rows?.[Number(tr.dataset.row)]||[];return openAction(action.dataset.action,row,action);}
  const closer=e.target.closest("[data-close]");if(closer)return close(closer.dataset.close);
});
document.addEventListener("change",e=>{
  const dormApplicant=e.target.closest("[data-dorm-applicant]");
  if(dormApplicant){
    updateDormApplicantFields(dormApplicant.value);
    return;
  }
  const violationResident=e.target.closest("[data-violation-resident]");
  if(violationResident){
    updateViolationResidentFields(violationResident.value);
    return;
  }
  const violationBehavior=e.target.closest("[data-violation-behavior-select]");
  if(violationBehavior){
    updateViolationBehaviorScore(violationBehavior.value);
    return;
  }
  const foodCheck=e.target.closest(".food-picker-check");
  if(foodCheck){
    if(foodCheck.checked)foodPickerSelected.add(foodCheck.value);else foodPickerSelected.delete(foodCheck.value);
    updateSelectedFoodArea();
    return;
  }
  const input=e.target.closest(".switch-control input");if(!input)return;
  syncSwitchLabels(input.closest(".switch-control"));
});
document.getElementById("propertyDrawerConfirm").addEventListener("click",handleDrawerConfirm);
document.getElementById("propertyModalConfirm").addEventListener("click",handleModalConfirm);
document.querySelectorAll(".overlay").forEach(x=>x.addEventListener("click",e=>{if(e.target===x){if(x.id==="propertyDrawerOverlay")return close("drawer");return close("modal");}}));
renderPage();
