const energyModules = [
  {id:"overview",name:"能源总览",icon:"◫",children:["能源总览"]},
  {id:"monitor",name:"能源监测",icon:"⌁",children:["远传设备管理","人工表计管理","每日能耗","抄表管理"]},
  {id:"billing",name:"计量与收费",icon:"▤",children:["计费方式","计量关系","能源账单","缴费管理"]},
  {id:"alarm",name:"能源告警",icon:"⚠",children:["告警规则配置","能源告警"]},
  {id:"budget",name:"能源预算",icon:"◎",children:["预算管理","预算执行","预算报告"]},
  {id:"carbon",name:"碳排放管理",icon:"♧",children:["碳排放核算","碳足迹与碳流图","碳排放报告"]},
  {id:"safety",name:"安全监测",icon:"▵",children:["氨气监测管理","阈值配置","设备告警"]}
];

const E = (desc,filters,columns,rows,options={}) => ({desc,filters,columns,rows,...options});
const configs = {
  "billing:计费规则配置":E("统一配置能源费用计算规则，规则审批通过后生效，历史账单始终使用规则快照。",["规则名称","能源类型","计费模式","状态"],["规则名称","能源类型","计费模式","适用对象","生效日期","失效日期","状态","审批状态"],[
    ["生产用电分时计费","电力","分时单价","生产部门","2026-01-01","长期","生效中","已通过"],
    ["办公用水阶梯计费","水","阶梯单价","办公部门","2026-03-01","长期","草稿","未提交"],
    ["冷库用电包干规则","电力","按年包干","冷库部门","2026-01-01","2026-12-31","待审批","审批中"],
    ["动力站蒸汽平均计费","蒸汽","平均单价","动力站","2026-01-01","长期","生效中","已通过"]
  ],{primary:"新增规则",secondary:"批量停用",actions:["详情","编辑"],stateActions:{"草稿":["详情","编辑","提交审批","删除"],"待审批":["详情","审批通过","审批驳回"],"生效中":["详情","编辑","停用"],"已停用":["详情"],"已失效":["详情"],"已驳回":["详情","编辑","提交审批"]},rule:"支持按年包干、平均单价、阶梯单价、分时单价四种计费方式；每种方式需分别维护水、电、蒸汽参数。被引用规则不可物理删除，账单保存规则快照，后续变更不反算历史账单。"}),
  "billing:表具与计费关联":E("维护表具台账、计费主体与计费方式关联关系，并查看抄表记录。",["表具编号","表具类型","状态","关联主体"],["表具编号","类型","安装位置","关联主体","计费方式","最近校验日期","状态","最近读数"],[
    ["EL-MTR-000128","电表","1#配电室","生产一部","生产用电分时计费","2026-05-20","正常","286,452.8 kWh"],
    ["WT-MTR-000036","水表","办公楼总管","行政部","办公用水阶梯计费","2026-04-11","正常","18,692.3 m³"],
    ["ST-MTR-000021","蒸汽表","动力站蒸汽主管","动力站","动力站蒸汽平均计费","2026-05-28","正常","2,186.8 t"]
  ],{tabs:["表具台账","关联台账"],primary:"新增表具",actions:["详情","编辑","查看抄表记录"],stateActions:{"正常":["详情","编辑","人工抄表","查看抄表记录","停用"],"故障":["详情","编辑","人工抄表","查看抄表记录","停用"],"通讯中断":["详情","编辑","人工抄表","查看抄表记录","停用"],"已停用":["详情","查看抄表记录","启用"]},rule:"表具停用后不参与新账单；人工抄表按周期唯一校验，自动采集数据优先，读数倒走可自动触发异常。"}),
  "billing:账单列表":E("查看按抄表记录和计费方式生成的账单，完成线上缴费及财务确认。",["账单月份","部门","缴费状态","超额标记"],["账单编号","账单月份","部门","账单金额","缴费状态","截止日","超额标记"],[
    ["EN-BILL-202605-00128","2026-05","生产一部","¥ 126,841.20","待缴费","2026-06-20","否"],
    ["EN-BILL-202605-00117","2026-05","行政部","¥ 11,726.00","待确认","2026-06-20","否"],
    ["EN-BILL-202604-00098","2026-04","冷库部门","¥ 72,157.50","已缴费","2026-05-20","是"],
    ["EN-BILL-202604-00092","2026-04","后勤部","¥ 7,254.00","逾期未缴","2026-05-20","否"]
  ],{primary:"生成账单",actions:["详情"],stateActions:{"待缴费":["详情","缴费"],"待确认":["详情","财务确认","驳回凭证"],"已缴费":["详情"],"逾期未缴":["详情","缴费"]},rule:"账单详情展示费用明细、计费过程、规则快照、缴费凭证和财务确认状态；线下转账需财务确认。"}),
  "billing:用能统计与报表":E("按时间、能源、部门及设备查询能源用量与费用，支持报表导出。",["统计周期","能源类型","部门","设备"],["统计周期","能源类型","部门","设备","用量","费用"],[
    ["2026年05月","电力","生产一部","冷冻机组01","168,322 kWh","¥ 126,841.20"],
    ["2026年05月","水","行政部","办公楼总水表","2,860 m³","¥ 11,726.00"],
    ["2026年05月","天然气","后勤部","食堂燃气总表","1,860 m³","¥ 7,254.00"]
  ],{secondary:"导出报表",actions:["查看趋势"],rule:"用量报表按抄表记录和采集记录汇总；费用报表按账单和计费明细统计。"}),
  "billing:水电气能耗监控":E("查看水、电、气表具实时或最新读数、抄表记录和异常。",["能源类型","采集状态","表具状态","安装位置","表具编号"],["表具编号","能源类型","安装位置","最新读数","采集时间","采集状态","表具状态","异常状态"],[
    ["EL-MTR-000128","电","1#配电室","286,452.8 kWh","2026-06-11 10:28","正常","启用","正常"],
    ["WT-MTR-000036","水","办公楼总管","18,692.3 m³","2026-06-11 10:25","正常","启用","正常"],
    ["GS-MTR-000017","气","食堂燃气间","4,206.1 m³","2026-06-11 09:40","通讯中断","启用","通讯中断"]
  ],{actions:["详情","查看抄表记录"],rule:"采集数据用于账单、统计、异常诊断与碳排核算；通讯中断和读数倒走由系统自动生成异常。"}),

  "analysis:指标分析与预警":E("维护能效指标、查看运行参数曲线并配置预警阈值。",["指标名称","状态"],["指标名称","目标值","计算周期","状态"],[
    ["单位产量电耗","40.0 kWh/t","按月","预警"],
    ["办公楼单位面积水耗","0.45 m³/㎡","按月","正常"],
    ["冷库综合能效","85.0%","按日","关注"]
  ],{tabs:["能效指标管理","运行参数曲线","预警配置"],primary:"新增指标",secondary:"新增预警规则",actions:["编辑","查看趋势"],linkAction:false,rule:"预警阈值用于指标监控；异常诊断阈值由系统配置驱动，触发后异常仅由系统自动生成。"}),
  "analysis:异常诊断与处置":E("处理系统自动诊断的能源异常，记录原因与处置结果。",["异常类型","异常子类","当前状态","负责人","触发时间","异常编号"],["异常编号","异常类型","异常子类","异常来源","关联对象","触发时间","当前状态","负责人"],[
    ["EN-EX-20260611-0038","能耗用量异常","用量突增","系统自动检测","生产一部 / 电","2026-06-11 09:42:18","待处理","—"],
    ["EN-EX-20260611-0036","表具计量异常","通讯中断","系统自动检测","GS-MTR-000017","2026-06-11 09:40:06","处理中","王海"],
    ["EN-EX-20260610-0029","表具计量异常","读数倒走","系统自动检测","WT-MTR-000036","2026-06-10 16:20:42","已关闭","刘洋"],
    ["EN-EX-20260609-0018","设备能耗异常","偏离阈值","系统自动检测","冷冻机组01","2026-06-09 13:02:15","误告警","陈凯"],
    ["EN-EX-20260609-0016","能耗用量异常","持续偏高","系统自动检测","冷库部门 / 电","2026-06-09 10:16:32","已关闭","周正"]
  ],{actions:["详情"],stateActions:{"待处理":["详情","开始处理","误告警","催办"],"处理中":["详情","填写结果并关闭","误告警","催办"],"已关闭":["详情"],"误告警":["详情"]},secondary:"阈值配置",rule:"异常仅由系统自动生成，不支持人工新增；不设置复核环节，不提供派单或生成工单动作。流程：待处理 → 处理中 → 已关闭 / 误告警。"}),

  "carbon:碳排放核算":E("按自然年度建立园区碳排放核算记录，用户线下计算后一类、二类、三类统一手动上传结果及支撑材料。",["核算年度","核算状态","数据情况","更新时间"],["序号","核算年度","报告主体","核算边界摘要","一类排放量","二类排放量","三类排放量","园区综合碳排放量","数据情况","核算状态","更新时间"],[
    ["1","2026 年","大连微冷园区运营管理有限公司","园区运营主体自有及控制设施","128.46 tCO₂e","1,842.35 tCO₂e","316.72 tCO₂e","2,287.53 tCO₂e","存在异常","编制中","2026-07-29 10:18:42"],
    ["2","2025 年","大连微冷园区运营管理有限公司","园区运营主体自有及控制设施","116.80 tCO₂e","1,765.20 tCO₂e","298.40 tCO₂e","2,180.40 tCO₂e","数据完整","已完成","2026-03-15 16:42:08"],
    ["3","2024 年","大连微冷园区运营管理有限公司","园区运营主体自有及控制设施","109.62 tCO₂e","1,692.18 tCO₂e","--","1,801.80 tCO₂e","待上传","编制中","2025-01-08 09:26:31"]
  ],{total:3,primary:"新增核算年度",actions:["继续编制"],stateActions:{"编制中":["继续编制"],"已完成":["查看","重新打开"]},linkAction:false,noRule:true,tableClass:"carbon-accounting-table"}),
  "carbon:碳排放报告":E("根据已完成年度核算数据生成年度园区温室气体排放报告和碳资产基础数据报表。",["报告年度","报告类型","报告状态","生成时间"],["序号","报告名称","报告类型","报告年度","核算依据","报告口径","报告版本","生成方式","生成人","生成时间","报告状态"],[
    ["1","2025 年度园区温室气体排放报告","排放报告","2025 年","GB/T 32150—2025","园区综合口径","V2","系统生成","周正","2026-03-18 09:32:16","已归档"],
    ["2","2025 年度碳资产基础数据报表","基础数据报表","2025 年","GB/T 32150—2025","园区核算口径","V1","系统生成","周正","2026-03-18 09:40:02","已生成"],
    ["3","2026 年度园区温室气体排放报告","排放报告","2026 年","GB/T 32150—2025","园区综合口径","--","系统生成","--","--","待生成"]
  ],{total:3,secondary:"生成报告",actions:["预览","下载","重新生成"],linkAction:false,noRule:true,tableClass:"carbon-report-table"}),

  "safety:氨气监测管理":E("查看氨气监测设备台账、在线状态、最新浓度与最近上报时间。",["设备编码/设备名称","安装位置","所属园区","在线状态","浓度状态","最近上报时间"],["序号","设备编码","设备名称","安装位置/所属园区","在线状态","最新浓度","浓度状态","最近上报时间","操作"],[
    ["1","NH3-00012","1号氨气监测仪","制冷机房北侧","微冷园区","在线","38 ppm","高报","2026-06-11 10:30:10"],
    ["2","NH3-00018","2号氨气监测仪","冷库机房西侧","微冷园区","在线","28 ppm","低报","2026-06-11 10:29:42"],
    ["3","NH3-00009","卸货区氨气监测仪","卸货区监测点","微冷园区","在线","12 ppm","正常","2026-06-11 10:28:16"],
    ["4","NH3-00023","配电间氨气监测仪","配电间外侧","微冷园区","离线","—","离线","2026-06-11 09:56:08"],
    ["5","NH3-00031","东侧氨气监测仪","制冷机房东侧","微冷园区","在线","21 ppm","低报","2026-06-11 10:27:03"],
    ["6","NH3-00036","冷凝区氨气监测仪","冷凝设备区","微冷园区","离线","—","离线","2026-06-11 09:41:25"]
  ],{total:28,actions:[],linkAction:false,rule:"氨气监测设备按最新采集结果展示在线状态和浓度；离线设备以最近一次上报时间为准，低报和高报按当前生效阈值口径统计。"}),
  "safety:阈值配置":E("维护氨气监测阈值、持续时长、恢复时长和冷却时长，统一告警触发口径。",["配置名称","适用区域","启用状态","适用设备"],["配置名称","低报阈值","高报阈值","持续时长","恢复持续时长","告警冷却时长","适用设备","启用状态"],[
    ["制冷机房高风险区","20 ppm","30 ppm","连续 30 秒","连续 5 分钟","30 分钟","制冷机房 12 台设备","启用"],
    ["冷库机房标准区","15 ppm","25 ppm","连续 60 秒","连续 10 分钟","20 分钟","冷库机房 8 台设备","启用"],
    ["卸货区卸氨点","10 ppm","18 ppm","连续 45 秒","连续 8 分钟","15 分钟","卸货区 4 台设备","停用"]
  ],{total:7,primary:"新增阈值",actions:["详情","编辑"],stateActions:{"启用":["详情","编辑","停用"],"停用":["详情","编辑","启用"]},rule:"同一设备同一时段只命中一条生效阈值配置；恢复持续时长用于标记告警恢复，冷却时长内不重复生成相同告警。"}),
  "safety:设备告警":E("跟踪氨气监测设备告警处置闭环，按状态推进确认、接单、处置和归档。",["告警编号/设备编码","告警状态","告警级别","监测点","当前处理人","触发时间"],["告警编号","监测点","设备编号","告警级别","触发浓度","当前浓度","触发时间","告警状态","当前处理人"],[
    ["NH3-AL-20260611-0028","制冷机房北侧","NH3-00012","38 ppm","高报","2026-06-11 10:12:08","待确认","—"],
    ["NH3-AL-20260611-0027","冷库机房西侧","NH3-00018","28 ppm","低报","2026-06-11 10:08:34","待接单","王海"],
    ["NH3-AL-20260611-0024","配电间外侧","NH3-00023","26 ppm","高报","2026-06-11 09:42:51","处置中","赵峰"],
    ["NH3-AL-20260610-0019","卸货区监测点","NH3-00009","19 ppm","低报","2026-06-10 16:18:20","已完成","李青"],
    ["NH3-AL-20260610-0016","制冷机房东侧","NH3-00031","21 ppm","低报","2026-06-10 13:06:45","误报关闭","周正"]
  ],{total:36,actions:[],stateActions:{"待确认":["误报关闭","派单处置"],"待接单":["换人"],"处置中":["换人"],"已完成":[],"误报关闭":[]},rule:"设备告警由系统自动生成，不允许人工新增；确认环节支持误报关闭或派单处置，派单后由处理人在 App 接单并在移动端提交处置完成。"})
};

const dynamicPages=new Set(["氨气监测管理","阈值配置","设备告警","人工表计管理","抄表管理"]);
const pageRuntimeState={};
for(const pageName of dynamicPages){
  const cfg=configs[`safety:${pageName}`];
  if(!cfg) continue;
  cfg.allRows=cfg.rows.map(row=>[...row]);
  cfg.pageSize=cfg.pageSize||(pageName==="设备告警"?Math.max(cfg.rows.length,10):3);
  pageRuntimeState[pageName]={filters:{},currentPage:1};
}
const thresholdConfigDefaults={
  low:"20",
  high:"30",
  uploadFrequency:"10",
  duration:"30",
  recover:"300",
  cooldown:"1800"
};
const thresholdConfigState={...thresholdConfigDefaults};
let thresholdConfigLastModified="2026-07-26 14:20:27";
const thresholdConfigFields=[
  {key:"low",label:"低报浓度",unit:"PPM",note:"浓度达到该值后，按低报口径判定。"},
  {key:"high",label:"高报浓度",unit:"PPM",note:"浓度达到该值后，按高报口径判定。"},
  {key:"uploadFrequency",label:"浓度上传频率",unit:"秒",note:"设备按该频率上送最新浓度值。"},
  {key:"duration",label:"浓度持续时长",unit:"秒",note:"浓度连续达到阈值多久后生成告警。"},
  {key:"recover",label:"恢复持续时长",unit:"秒",note:"浓度连续恢复正常多久后标记恢复。"},
  {key:"cooldown",label:"告警冷却时长",unit:"秒",note:"同类告警在冷却期内不重复生成。"}
];
let alarmRuleConfigTab="阈值配置";
let alarmRuleLastModified="2026-07-28 10:18:42";
const alarmEnergyTypes=[
  {key:"electric",name:"用电",unit:"kW·h",icon:"电"},
  {key:"water",name:"用水",unit:"m³",icon:"水"},
  {key:"steam",name:"用蒸汽",unit:"t",icon:"汽"}
];
const alarmBaseStrategies=[
  {key:"fixed",name:"固定阈值",desc:"按每日能源用量固定上限触发告警。"},
  {key:"mom",name:"环比上月均值",desc:"较上月均值增长超过配置比例时预警。"},
  {key:"yoy",name:"同比去年均值",desc:"较去年同期均值增长超过配置比例时预警。"}
];
const alarmIndependentMeta={
  surge:{
    title:"能耗骤增异常",
    desc:"按监测时间窗口判断用电、用水、用蒸汽的短时增量。",
    fieldNote:"监测窗口内用量增量超过该值时预警。"
  },
  single:{
    title:"单次读数增量阈值",
    desc:"按相邻两次采集读数的差值判断异常突增。",
    fieldNote:"本次读数减上次读数超过该值时预警。"
  },
  period:{
    title:"时间段异常",
    desc:"指定时段内用量超过阈值时触发告警，适用于夜间、节假日等特殊时段监控。",
    fieldNote:"指定时段内用量超过该阈值时预警。"
  }
};
const alarmRuleConfigState={
  baseStrategy:"fixed",
  base:{
    fixed:{electric:"30.00",water:"1.00",steam:"1.00"},
    mom:{electric:"5.00",water:"5.00",steam:"5.00"},
    yoy:{electric:"13.00",water:"11.00",steam:"12.00"}
  },
  surge:{enabled:false,window:"2",electric:"0.00",water:"0.00",steam:"0.00"},
  single:{enabled:false,electric:"0.00",water:"0.00",steam:"0.00"},
  period:{enabled:false,start:"22:00",end:"06:00",electric:"50.00",water:"30.00",steam:"0.00"}
};
const meterRelationPickerRows=[
  ["1","A区1号电表","EL-MTR-000128","远传设备","A区冷库配电间","99999"],
  ["2","A区2号电表","EL-MTR-000145","远传设备","A区冷库配电间-2","999999"],
  ["3","A区备用人工电表","EL-MTR-000162","人工表计","A区冷库配电间-3","999999"],
  ["4","包装线电表","EL-MTR-000179","远传设备","包装车间配电箱","99999"],
  ["5","动力站辅机电表","EL-MTR-000196","人工表计","动力站辅机间","999999"],
  ["6","研发楼实验室电表","EL-MTR-000213","远传设备","研发楼实验室配电箱","999999"],
  ["7","冷库补水表","WT-MTR-000230","人工表计","北区冷库补水管","99999"]
];
const meterRelationPickerState={selectedCodes:new Set(["EL-MTR-000128","EL-MTR-000145","EL-MTR-000162"]),page:1,pageSize:5};
const formatDateTime=value=>{
  const date=value instanceof Date?value:new Date(value);
  const pad=num=>String(num).padStart(2,"0");
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
const escapeAttr=value=>String(value??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;");
const filterFieldMap={
  "氨气监测管理":{
    "设备编码/设备名称":row=>`${row[1]} ${row[2]}`,
    "安装位置":row=>row[3],
    "所属园区":row=>row[4],
    "在线状态":row=>row[5],
    "浓度状态":row=>row[7],
    "最近上报时间":row=>row[8]
  },
  "阈值配置":{
    "配置名称":row=>row[0],
    "适用区域":row=>row[0],
    "启用状态":row=>row[7],
    "适用设备":row=>row[6]
  },
  "设备告警":{
    "告警编号":row=>row[0],
    "告警编号/设备编码":row=>`${row[0]} ${row[2]}`,
    "告警状态":row=>row[6],
    "告警级别":row=>row[4],
    "监测点":row=>row[1],
    "当前处理人":row=>row[7],
    "触发时间":row=>row[5]
  },
  "能源告警":{
    "报警位置":row=>row[1],
    "用能类型":row=>row[2],
    "告警类型":row=>row[3],
    "报警时间":row=>row[7]
  },
  "人工表计管理":{
    "设备名称/编码":row=>`${row[1]} ${row[2]}`,
    "设备名称":row=>row[1],
    "设备编码":row=>row[2],
    "设备类型":row=>row[3],
    "表计类型":row=>row[4],
    "安装位置":row=>row[6],
    "所属园区":row=>row[5],
    "状态":row=>row[13],
    "循环点":row=>row[9]
  },
  "抄表管理":{
    "设备名称/编码":row=>`${row[1]} ${row[2]}`,
    "设备类型":row=>row[3],
    "安装位置":row=>`${row[4]} ${row[6]}`,
    "抄表时间":row=>row[11],
    "是否作废":row=>row[13]==="已作废"?"是":"否",
    "账单关联状态":row=>row[14],
    "抄表人":row=>row[12]
  },
  "计量关系":{
    "企业名称":row=>row[1],
    "所属园区":row=>row[2],
    "能源类型":row=>row[3],
    "计费方式":row=>row[5],
    "有效期":row=>`${row[12]} ${row[13]}`,
    "有效期开始":row=>row[12],
    "有效期结束":row=>row[13],
    "状态":row=>row[8]
  }
};
const getPageRuntime=pageName=>pageRuntimeState[pageName]||{filters:{},currentPage:1};
const collectFilterValues=()=>{
  const filters={};
  document.querySelectorAll(".filter-input").forEach(input=>{const label=input.dataset.filterLabel;if(label)filters[label]=input.value.trim();});
  return filters;
};
function getDynamicTableData(cfg){
  const runtime=getPageRuntime(activePage);
  const resolver=filterFieldMap[activePage]||{};
  const filtered=cfg.allRows.filter(row=>Object.entries(runtime.filters).every(([label,value])=>{
    if(!value) return true;
    const text=String((resolver[label]?resolver[label](row):row.join(" "))).toLowerCase();
    return text.includes(value.toLowerCase());
  }));
  const total=filtered.length;
  const pageCount=Math.max(1,Math.ceil(total/(cfg.pageSize||10)));
  const currentPage=Math.min(runtime.currentPage,pageCount);
  runtime.currentPage=currentPage;
  const start=(currentPage-1)*(cfg.pageSize||10);
  return {
    total,
    currentPage,
    pageCount,
    rows:filtered.slice(start,start+(cfg.pageSize||10)).map(row=>({row,sourceIndex:cfg.allRows.indexOf(row)}))
  };
}
const getFieldValue=(values,label,fallback="—")=>values[label]?.trim()||fallback;
const getFormValues=containerId=>{
  const values={};
  document.querySelectorAll(`#${containerId} .form-field`).forEach(fieldNode=>{
    const label=fieldNode.querySelector("label")?.textContent.trim();
    const input=fieldNode.querySelector(".control");
    if(label&&input) values[label]=input.value.trim();
  });
  return values;
};
function applyModalAction(title){
  if(activePage==="计量关系") return true;
  if(activePage==="人工表计管理") return applyManualMeterAction(title);
  if(activePage==="抄表管理") return applyReadingRecordAction(title);
  if(!dynamicPages.has(activePage)) return false;
  const ctx=currentActionContext;
  const cfg=configs[`safety:${activePage}`];
  if(!ctx||!cfg?.allRows) return false;
  const values=getFormValues("energyModalBody");
  const row=ctx.rowIndex>=0?cfg.allRows[ctx.rowIndex]:null;
  if(activePage==="阈值配置"){
    if(title==="新增阈值"){
      cfg.allRows.unshift([
        getFieldValue(values,"配置名称","新建氨气阈值"),
        getFieldValue(values,"低报阈值","15 ppm"),
        getFieldValue(values,"高报阈值","25 ppm"),
        getFieldValue(values,"持续时长","连续 60 秒"),
        getFieldValue(values,"恢复持续时长","连续 10 分钟"),
        getFieldValue(values,"告警冷却时长","20 分钟"),
        getFieldValue(values,"适用设备","待绑定设备"),
        getFieldValue(values,"启用状态","启用")
      ]);
    }
    if(title==="编辑"&&row){
      row.splice(0,row.length,
        getFieldValue(values,"配置名称",row[0]),
        getFieldValue(values,"低报阈值",row[1]),
        getFieldValue(values,"高报阈值",row[2]),
        getFieldValue(values,"持续时长",row[3]),
        getFieldValue(values,"恢复持续时长",row[4]),
        getFieldValue(values,"告警冷却时长",row[5]),
        getFieldValue(values,"适用设备",row[6]),
        getFieldValue(values,"启用状态",row[7])
      );
    }
    if(title==="停用"&&row) row[7]="停用";
    if(title==="启用"&&row) row[7]="启用";
    return true;
  }
  if(activePage==="设备告警"&&row){
    if(title==="误报关闭"){
      if(row[6]!=="待确认"){
        toast("仅待确认告警可误报关闭");
        return false;
      }
      const reasonInput=document.querySelector(".action-security-alarm-false-reason");
      const reason=reasonInput?reasonInput.value.trim():"";
      if(!reason){
        toast("请填写误报原因");
        reasonInput?.focus();
        return false;
      }
      row[6]="误报关闭";
      row[7]=row[7]==="—"?"周正":row[7];
      return true;
    }
    if(title==="派单处置"){
      row[6]="待接单";
      row[7]=document.querySelector('[data-modal-field="处理人"]')?.value.trim()||getFieldValue(values,"处理人","王海");
      return true;
    }
    if(title==="派单换人"){
      if(!["待接单","处置中"].includes(row[6])){
        toast("仅待接单、处置中的告警支持换人");
        return false;
      }
      const handlerInput=document.querySelector('[data-modal-field="新处理人"]');
      const reasonInput=document.querySelector('[data-modal-field="换人说明"]');
      const handler=handlerInput?.value.trim()||"";
      const reason=reasonInput?.value.trim()||"";
      if(!handler){
        toast("请选择新处理人");
        handlerInput?.focus();
        return false;
      }
      if(!reason){
        toast("请填写换人说明");
        reasonInput?.focus();
        return false;
      }
      row[7]=handler;
      return true;
    }
  }
  return false;
}

const configRule="配置被引用后不允许物理删除；配置变更记录生效时间；已生成业务数据使用配置快照，配置变更不反算历史业务数据。";
configs["config:能源类型与单位配置"]=E("配置能源类型、计量单位和数据精度。",["能源类型","状态"],["能源类型","计量单位","数据精度","生效时间","状态"],[["电力","kWh","2位小数","2026-01-01 00:00:00","启用"],["水","m³","2位小数","2026-01-01 00:00:00","启用"],["天然气","m³","2位小数","2026-01-01 00:00:00","启用"],["蒸汽","t","4位小数","2026-01-01 00:00:00","启用"]],{primary:"新增能源类型与单位",actions:["详情","编辑","查看变更记录","停用"],rule:configRule});
configs["config:碳排换算系数配置"]=E("配置能源类型对应的碳排换算系数。",["能源类型","状态"],["能源类型","碳排换算系数","生效时间","状态"],[["电力","0.5703 kgCO₂e/kWh","2026-01-01 00:00:00","启用"],["天然气","2.1622 kgCO₂e/m³","2026-01-01 00:00:00","启用"]],{primary:"新增碳排换算系数",actions:["详情","编辑","查看变更记录","停用"],rule:configRule});
configs["config:计费参数配置"]=E("配置计费参数和计费规则基础项。",["计费参数名称","状态"],["计费参数名称","计费参数值","生效时间","状态"],[["峰时段","08:00-12:00, 17:00-21:00","2026-01-01 00:00:00","启用"],["账单缴费截止天数","20天","2026-01-01 00:00:00","启用"]],{primary:"新增计费参数",actions:["详情","编辑","查看变更记录","停用"],rule:configRule});
configs["config:分项类型配置"]=E("配置照明、空调、动力和设备等用能分项。",["分项类型名称","状态"],["分项类型名称","生效时间","状态"],[["照明","2026-01-01 00:00:00","启用"],["空调","2026-01-01 00:00:00","启用"],["动力","2026-01-01 00:00:00","启用"],["设备","2026-01-01 00:00:00","启用"]],{primary:"新增分项类型",actions:["详情","编辑","查看变更记录","停用"],rule:configRule});
configs["config:异常规则参数配置"]=E("配置三类能源异常诊断阈值参数。",["异常类型","异常子类","状态"],["异常类型","异常子类","阈值参数","生效时间","状态"],[["能耗用量异常","突增","环比增长 30%","2026-01-01 00:00:00","启用"],["表具计量异常","通讯中断","连续 30 分钟无数据","2026-01-01 00:00:00","启用"]],{primary:"新增异常规则参数",actions:["详情","编辑","查看变更记录","停用"],rule:configRule});
configs["config:行业能耗标准配置"]=E("配置行业能耗标准和对标值。",["行业能耗标准名称","状态"],["行业能耗标准名称","对标值","生效时间","状态"],[["冷库单位面积电耗标准","≤ 85 kWh/㎡","2026-01-01 00:00:00","启用"],["办公楼单位面积水耗标准","≤ 0.45 m³/㎡","2026-01-01 00:00:00","启用"]],{primary:"新增行业能耗标准",actions:["详情","编辑","查看变更记录","停用"],rule:configRule});

configs["overview:能源总览"]=E("汇总当前园区能源用量、费用、预算执行和告警情况。",["时间范围","能源类型"],["指标","数值","说明"],[],{linkAction:false});
configs["monitor:远传设备管理"]=E("管理由接口同步的远传水表、电表、蒸汽表设备。",["设备名称/编码","设备类型","表计类型","安装位置","状态"],["序号","设备名称","设备编码","设备类型","表计类型","安装位置/所属园区","在线状态","起码读数/读数时间","循环点","最新读数/读数时间"],[
  ["1","1#配电室总电表","EL-MTR-000128","电表","总表","微冷园区","1#配电室","在线","268,130.8 kWh","2026-06-01 00:05:12","99999","286,452.8 kWh","2026-06-11 10:28:16"],
  ["2","办公楼总水表","WT-MTR-000036","水表","总表","微冷园区","办公楼总管","在线","18,214.1 m³","2026-06-01 00:05:12","99999","18,692.3 m³","2026-06-11 10:25:42"],
  ["3","动力站蒸汽主管表","ST-MTR-000021","蒸汽表","总表","微冷园区","动力站蒸汽主管","在线","2,102.1 t","2026-06-01 00:05:12","99999","2,186.8 t","2026-06-11 10:18:09"],
  ["4","冷库配电间电表","EL-MTR-000216","电表","入户表","微冷园区","冷库配电间","离线","70,912.0 kWh","2026-06-01 00:05:12","99999","72,157.5 kWh","2026-06-11 09:44:03"]
],{primary:"同步设备",secondary:"导出",actions:["读数","绑定位置","编辑","删除"],linkAction:false,noRule:true,tableClass:"remote-device-table",hideToolbarSummary:true});
configs["monitor:人工表计管理"]=E("管理无法远传的水表、电表、蒸汽表，支持新增、编辑、停用和绑定位置，并展示最新人工抄表读数与最近抄表时间。",["设备名称/编码","设备类型","表计类型","安装位置","状态"],["序号","设备名称","设备编码","设备类型","表计类型","安装位置/所属园区","起码读数/读数时间","循环点","最近抄表读数/抄表时间"],[
  ["1","食堂给水支管水表","MAN-WT-00012","水表","入户表","微冷园区","食堂给水支管","8,102.8 m³","2026-06-01 00:05:12","99999","8,216.4 m³","2026-06-10 18:20:00","后勤部","启用",""],
  ["2","2#仓库配电箱电表","MAN-EL-00008","电表","入户表","微冷园区","2#仓库配电箱","47,980.5 kWh","2026-06-01 00:05:12","99999","48,621.2 kWh","2026-06-10 17:45:00","仓储部","启用",""],
  ["3","换热站入口蒸汽表","MAN-ST-00003","蒸汽表","总表","微冷园区","换热站入口","896.4 t","2026-06-01 00:05:12","99999","918.6 t","2026-06-10 16:30:00","生产二部","启用",""],
  ["4","绿化取水点水表","MAN-WT-00021","水表","入户表","微冷园区","绿化取水点","2,060.0 m³","2026-05-01 00:05:12","99999","2,106.0 m³","2026-05-31 09:10:00","物业部","停用",""],
  ["5","研发楼实验室电表","MAN-EL-00016","电表","入户表","微冷园区","研发楼实验室配电箱","12,420.0 kWh","2026-06-01 00:05:12","99999","12,842.6 kWh","2026-06-10 17:10:00","研发部","启用",""],
  ["6","宿舍楼生活水井水表","MAN-WT-00026","水表","总表","微冷园区","宿舍楼生活水井","6,620.0 m³","2026-06-01 00:05:12","99999","6,732.8 m³","2026-06-10 16:55:00","宿舍运营组","启用",""]
],{pageSize:8,tableClass:"manual-meter-table",primary:"新增表计",secondary:"导出",actions:["读数","绑定位置","编辑"],stateActions:{"启用":["读数","绑定位置","编辑","停用"],"停用":["读数","绑定位置","编辑","启用"]},linkAction:false,noRule:true});
configs["monitor:人工表计管理"].allRows=configs["monitor:人工表计管理"].rows.map(row=>[...row]);
configs["monitor:人工表计管理"].total=configs["monitor:人工表计管理"].allRows.length;
pageRuntimeState["人工表计管理"]={filters:{},currentPage:1};
configs["monitor:每日能耗"]=E("按日汇总展示水、电、蒸汽用量，数据来源于远传设备历史读数和人工表计抄表记录。",["设备类型","能耗日期"],["序号","能耗日期","能耗类型","日用量","数据更新时间"],[
  ["1","2025-01-01","水","979.02 m³","2016-06-02 12:12:12"],
  ["2","2025-01-02","电","979.02 kW·h","2016-06-02 12:12:12"],
  ["3","2025-01-03","蒸汽","46.80 t","2016-06-02 12:12:12"],
  ["4","2025-01-04","水","979.02 m³","2016-06-02 12:12:12"],
  ["5","2025-01-05","电","1,128.36 kW·h","2016-06-02 12:12:12"],
  ["6","2025-01-06","蒸汽","42.15 t","2016-06-02 12:12:12"],
  ["7","2025-01-07","水","864.40 m³","2016-06-02 12:12:12"]
],{secondary:"导出",actions:["详情"],linkAction:false,noRule:true,tableClass:"daily-energy-table"});
configs["monitor:水表读数"]=E("查看水表最新读数、采集时间和读数异常。",["水表编号","安装位置","采集状态","读数状态"],["水表编号","安装位置","本次读数","上次读数","本次用量","采集时间","采集状态","读数状态"],[
  ["WT-MTR-000036","办公楼总管","18,692.3 m³","18,214.1 m³","478.2 m³","2026-06-11 10:25","正常","正常"],
  ["WT-MTR-000041","食堂给水支管","8,216.4 m³","8,102.8 m³","113.6 m³","2026-06-11 10:20","正常","正常"],
  ["WT-MTR-000052","冷库补水管","5,120.0 m³","5,226.2 m³","—","2026-06-11 09:58","正常","读数倒走"]
],{actions:["详情","查看抄表记录"],rule:"读数倒走、长时间未采集和用量突增需进入能源告警闭环。"});
configs["monitor:电表读数"]=E("查看电表最新读数、分项用电和采集状态。",["电表编号","安装位置","采集状态","读数状态"],["电表编号","安装位置","本次读数","上次读数","本次用量","采集时间","采集状态","读数状态"],[
  ["EL-MTR-000128","1#配电室","286,452.8 kWh","268,130.8 kWh","18,322.0 kWh","2026-06-11 10:28","正常","正常"],
  ["EL-MTR-000216","冷库配电间","72,157.5 kWh","70,912.0 kWh","1,245.5 kWh","2026-06-11 09:44","通讯中断","异常"],
  ["EL-MTR-000305","办公楼配电箱","48,621.2 kWh","47,980.5 kWh","640.7 kWh","2026-06-11 10:26","正常","正常"]
],{actions:["详情","查看抄表记录"],rule:"电表读数作为电费账单、预算执行和碳排放核算的基础数据。"});
configs["monitor:蒸汽表读数"]=E("查看蒸汽表最新读数、采集时间和异常状态。",["蒸汽表编号","安装位置","采集状态","读数状态"],["蒸汽表编号","安装位置","本次读数","上次读数","本次用量","采集时间","采集状态","读数状态"],[
  ["ST-MTR-000021","动力站蒸汽主管","2,186.8 t","2,102.1 t","84.7 t","2026-06-11 10:18","正常","正常"],
  ["ST-MTR-000028","生产车间蒸汽支管","1,526.4 t","1,486.0 t","40.4 t","2026-06-11 10:16","正常","正常"],
  ["ST-MTR-000033","换热站入口","918.6 t","918.6 t","0.0 t","2026-06-11 08:56","超时未采集","异常"]
],{actions:["详情","查看抄表记录"],rule:"蒸汽表读数用于蒸汽费用分摊、用能分析和碳排活动数据汇总。"});
configs["monitor:抄表管理"]=E("用于对人工表计录入和维护现场抄表数据，自动计算两次有效抄表之间的本次增量，并展示抄表记录与能源账单的关联情况。",["设备名称/编码","设备类型","安装位置","抄表时间","是否作废","账单关联状态","抄表人"],["序号","设备名称/编码","设备类型","安装位置/所属园区","上次读数/读数时间","本次读数/抄表时间","本次增量","抄表人/更新时间","账单关联状态"],[
  ["MR-202607-00031","食堂给水支管水表","MAN-WT-00012","水表","微冷园区","能源站","食堂给水支管","8,102.8 m³","8,216.4 m³","113.6 m³","99999","2026-07-10 18:20:00","王海","正常","已关联","EN-BILL-202607-0018｜2026-07｜期末读数｜已生成;EN-BILL-202608-0002｜2026-08｜期初读数｜待生成","2026-06-30 18:00:00","","2026-07-10 18:25:36"],
  ["MR-202607-00032","食堂给水支管水表","MAN-WT-00012","水表","微冷园区","能源站","食堂给水支管","8,216.4 m³","8,246.0 m³","29.6 m³","99999","2026-07-20 18:10:00","王海","正常","未关联","","2026-07-10 18:20:00","","2026-07-20 18:12:08"],
  ["MR-202607-00033","食堂给水支管水表","MAN-WT-00012","水表","微冷园区","能源站","食堂给水支管","8,246.0 m³","8,280.2 m³","34.2 m³","99999","2026-07-31 18:15:00","王海","正常","未关联","","2026-07-20 18:10:00","","2026-07-31 18:18:22"],
  ["MR-202607-00022","2#仓库配电箱电表","MAN-EL-00008","电表","微冷园区","仓储区","2#仓库配电箱","47,980.5 kWh","48,621.2 kWh","640.7 kWh","99999","2026-07-10 17:45:00","李青","正常","已关联","EN-BILL-202607-0019｜2026-07｜期末读数｜已生成","2026-06-30 18:00:00","","2026-07-10 17:48:40"],
  ["MR-202607-00018","换热站入口蒸汽表","MAN-ST-00003","蒸汽表","微冷园区","能源站","换热站入口","896.4 t","918.6 t","22.2 t","99999","2026-07-10 16:30:00","赵峰","正常","未关联","","2026-06-30 18:00:00","","2026-07-10 16:32:11"],
  ["MR-202607-00015","研发楼实验室电表","MAN-EL-00016","电表","微冷园区","研发楼","研发楼实验室配电箱","12,420.0 kWh","12,842.6 kWh","422.6 kWh","99999","2026-07-10 17:10:00","陈凯","正常","未关联","","2026-06-30 18:00:00","","2026-07-10 17:13:29"],
  ["MR-202606-00041","绿化取水点水表","MAN-WT-00021","水表","微冷园区","室外公共区","绿化取水点","2,060.0 m³","2,106.0 m³","46.0 m³","99999","2026-06-30 09:10:00","刘洋","已作废","未关联","","2026-05-31 09:10:00","现场复核录入错误，已重新录入有效读数。","2026-06-30 09:35:18"],
  ["MR-202607-00026","宿舍楼生活水井水表","MAN-WT-00026","水表","微冷园区","宿舍区","宿舍楼生活水井","6,620.0 m³","6,732.8 m³","112.8 m³","99999","2026-07-10 16:55:00","王海","正常","未关联","","2026-06-30 18:00:00","","2026-07-10 16:58:04"]
],{pageSize:8,tableClass:"meter-reading-table",primary:"新增抄表",secondary:"导出",actions:["编辑","作废"],linkAction:false,noRule:true});
configs["monitor:抄表管理"].allRows=configs["monitor:抄表管理"].rows.map(row=>[...row]);
configs["monitor:抄表管理"].total=configs["monitor:抄表管理"].allRows.length;
pageRuntimeState["抄表管理"]={filters:{},currentPage:1};
const billingMethodTypes=["按年包干","平均单价","阶梯单价","分时单价"];
const billingEnergyTypes=[
  {name:"水",unit:"m³",meter:"水表"},
  {name:"电",unit:"kWh",meter:"电表"},
  {name:"蒸汽",unit:"t",meter:"蒸汽表"}
];
const billingMethodConfigs={
  "按年包干":{
    desc:"按年度固定金额计费，账单按月生成分摊金额，适用于年度费用确定的计量主体。",
    values:{
      "水":{price:"¥ 168,000 / 年",cycle:"按月分摊",scope:"办公楼、宿舍楼、绿化公共区",rule:"年度包干金额 / 12，超包干用量仅记录不加收"},
      "电":{price:"¥ 1,260,000 / 年",cycle:"按月分摊",scope:"冷库、动力站、公共照明",rule:"年度包干金额 / 12，停用次月停止生成"},
      "蒸汽":null
    }
  },
  "平均单价":{
    desc:"按实际用量乘以统一单价计费，适用于单价固定且无需区分时段或阶梯的计量主体。",
    values:{
      "水":{price:"4.10 元 / m³",cycle:"按抄表周期",scope:"食堂、办公、宿舍",rule:"费用 = 本期用量 × 平均单价"},
      "电":null,
      "蒸汽":{price:"238.00 元 / t",cycle:"按抄表周期",scope:"生产车间、换热站",rule:"费用 = 本期用量 × 平均单价"}
    }
  },
  "阶梯单价":{
    desc:"按用量落入阶梯分段计算费用，适用于需要控制超额用能成本的主体。",
    values:{
      "水":null,
      "电":{price:"0-50000 kWh：0.68；50000-120000 kWh：0.76；120000 kWh以上：0.88",cycle:"按月阶梯",scope:"生产车间、冷库",rule:"按本月累计用电量分段计费"},
      "蒸汽":{price:"0-500 t：220；500-1200 t：245；1200 t以上：268",cycle:"按月阶梯",scope:"动力站、生产车间",rule:"按本月累计蒸汽用量分段计费"}
    }
  },
  "分时单价":{
    desc:"按用能发生时段匹配不同单价，适用于电价时段明显或需引导错峰使用的主体。",
    values:{
      "水":null,
      "电":{price:"尖 1.08；峰 0.92；平 0.68；谷 0.38 元 / kWh",cycle:"按时段汇总",scope:"生产线、冷库、充电区",rule:"按采集时间匹配尖峰平谷时段"},
      "蒸汽":{price:"尖峰 288；高峰 268；平段 238；低谷 218 元 / t",cycle:"按时段汇总",scope:"生产车间、换热站",rule:"按采集时间匹配尖峰平谷时段"}
    }
  }
};
const billingMethodLastModified="2026-07-28 09:42:16";
configs["billing:计费方式"]={...configs["billing:计费规则配置"],primary:"保存配置"};
configs["billing:计量关系"]=E("建立企业、能源类型、表计和计费方式之间的有效关联，能源账单按该关系汇总用量并计算费用。",["企业名称","所属园区","能源类型","计费方式","有效期","状态"],["序号","企业名称","所属园区","能源类型","关联表计","计费方式","计费规则摘要","有效期","状态"],[
  ["1","大连微冷食品股份有限公司","三里园区","电","2块：A区1号电表、A区2号电表","分时单价","尖/峰/平/谷4个时段","2026-08-01 至 长期","待生效","未产生账单","EN-REL-202608-0001","A区冷库配电间","2026-08-01","长期"],
  ["2","大连瑞兴天宝水产品有限公司","三里园区","水","3块：1号水表、2号水表、3号水表","阶梯单价","3个阶梯，按月累进","2026-06-01 至 长期","生效中","已产生账单","EN-REL-202606-0008","生产车间给水主管","2026-06-01","长期"],
  ["3","大连微冷农产品有限公司","三里园区","蒸汽","1块：动力站蒸汽主管表","平均单价","238.00元/t","2026-05-01 至 2026-12-31","生效中","已产生账单","EN-REL-202605-0012","动力站蒸汽主管","2026-05-01","2026-12-31"],
  ["4","联合林洋食品（大连）有限公司","三里园区","电","1块：包装线电表","按年包干","120,000.00元/年，按月分摊","2026-01-01 至 2026-07-15","已失效","已产生账单","EN-REL-202601-0006","包装车间配电箱","2026-01-01","2026-07-15"],
  ["5","海洋食品设计与创制高新技术研究院","三里园区","水","2块：冷库补水表、清洗区水表","平均单价","3.50元/m³","2026-03-01 至 长期","已停用","已产生账单","EN-REL-202603-0010","北区冷库补水管","2026-03-01","长期"]
],{total:5,primary:"新增计量关系",secondary:"导出",actions:["编辑","停用"],stateActions:{"待生效":["编辑","停用"],"生效中":["编辑","停用"],"已停用":["编辑","停用"],"已失效":["编辑","停用"]},tableClass:"meter-relation-table",linkAction:false,rule:"同一表计有效期不可重复关联；已出账关系锁定关键字段，到期自动转为已失效。"});
configs["billing:能源账单"]={...configs["billing:账单列表"],primary:"生成账单"};
configs["billing:缴费管理"]=E("跟踪能源账单缴费、凭证上传和财务确认结果。",["账单月份","缴费主体","缴费状态","确认状态"],["缴费单号","账单编号","缴费主体","应缴金额","支付方式","缴费状态","确认状态","缴费时间"],[
  ["PAY-202605-00128","EN-BILL-202605-00128","生产一部","¥ 126,841.20","线下转账","待缴费","待提交","—"],
  ["PAY-202605-00117","EN-BILL-202605-00117","行政部","¥ 11,726.00","银行转账","已缴费","待确认","2026-06-09 15:26"],
  ["PAY-202604-00098","EN-BILL-202604-00098","冷库部门","¥ 72,157.50","银行转账","已缴费","已确认","2026-05-18 11:20"]
],{actions:["详情"],stateActions:{"待缴费":["详情","缴费"],"待确认":["详情","财务确认","驳回凭证"],"已确认":["详情"],"已驳回":["详情","重新提交凭证"]},rule:"线下转账需上传缴费凭证并由财务确认；驳回后可重新提交凭证。"});
configs["alarm:告警规则配置"]=E("配置能源告警阈值策略，阈值配置保存后仅影响后续告警判定。",["规则名称","监测维度","启用状态"],["规则名称","监测维度","能源类型","触发条件","生效时间","启用状态"],[
  ["基础固定阈值","基础能耗告警策略","用电 / 用水 / 用蒸汽","按固定日上限触发","2026-01-01 00:00:00","启用"],
  ["环比上月均值","基础能耗告警策略","用电 / 用水 / 用蒸汽","超过上月均值触发","2026-01-01 00:00:00","停用"],
  ["同比去年均值","基础能耗告警策略","用电 / 用水 / 用蒸汽","超过去年均值触发","2026-01-01 00:00:00","停用"],
  ["能耗骤增异常","独立监测维度","用电 / 用水 / 用蒸汽","监测窗口内增量超过阈值","2026-01-01 00:00:00","启用"],
  ["单次读数增量阈值","独立监测维度","用电 / 用水 / 用蒸汽","单次采集读数增量超过阈值","2026-01-01 00:00:00","启用"]
],{tabs:["阈值配置","阈值列表"],primary:"新增阈值",actions:["详情","编辑"],stateActions:{"启用":["详情","编辑","停用"],"停用":["详情","编辑","启用"]},rule:"基础能耗告警策略三选一；独立监测维度无论基础策略选哪种均独立生效。"});
const alarmThresholdListRows=[
  ["1","冷库一号库","日累计","固定阈值","全天","30.00 kW·h","1.00 m³","1.00 t","周正","2026-07-28 10:18:42"],
  ["2","冷库二号库","日累计","环比上月均值","全天","+5.00%","+5.00%","+5.00%","周正","2026-07-28 10:18:42"],
  ["3","生产车间A区","日累计","同比去年均值","全天","+13.00%","+11.00%","+12.00%","王海","2026-07-27 16:24:08"],
  ["4","办公楼","时间窗口","能耗骤增异常","2 小时","0.00 kW·h","0.00 m³","0.00 t","刘洋","2026-07-26 14:35:21"],
  ["5","动力站","读数增量","单次读数增量阈值","单次采集","0.00 kW·h","0.00 m³","0.00 t","陈凯","2026-07-25 09:12:36"],
  ["6","制冷机房","时段","固定阈值","08:00-20:00","48.00 kW·h","1.50 m³","1.20 t","赵峰","2026-07-24 11:08:15"]
];
configs["alarm:能源告警"]=E("查看系统按能源告警规则自动生成的能耗与设备类报警记录，预算预警不进入本页面。",["报警位置","用能类型","告警类型","报警时间"],["序号","报警位置","用能类型","告警类型","用能值","设定阈值","备注说明","报警时间"],[
  ["1","冷库一号库","用电","日累计超标","36.82 kW·h","30.00 kW·h","日累计用电超过设定阈值。","2026-07-28 10:42:18"],
  ["2","冷库二号库","用水","增量异常","12.60 m³","+5.00%","本次采集用水增量较基准值异常升高。","2026-07-28 10:36:06"],
  ["3","生产车间A区","用蒸汽","时间窗口超限","86.40 t / 2小时","72.00 t / 2小时","监测时间窗口内蒸汽用量超过阈值。","2026-07-27 16:20:42"],
  ["4","办公楼","用电","时间段超限","18.25 kW·h","15.00 kW·h","指定时间段内用电超过设定阈值。","2026-07-26 13:02:15"],
  ["5","动力站","用蒸汽","设备离线","—","离线超过 30 分钟","关联蒸汽表长时间未上报采集数据。","2026-07-25 10:16:32"],
  ["6","制冷机房","用电","增量异常","54.30 kW·h","50.00 kW·h","本次采集读数增量超过单次阈值。","2026-07-24 23:48:09"]
],{secondary:"导出",actions:[],linkAction:false,rule:"能源告警仅展示能耗规则和设备采集异常生成的告警；预算预警只在预算执行页面展示，不进入能源告警。"});
dynamicPages.add("能源告警");
configs["alarm:能源告警"].allRows=configs["alarm:能源告警"].rows.map(row=>[...row]);
configs["alarm:能源告警"].pageSize=10;
pageRuntimeState["能源告警"]={filters:{},currentPage:1};
configs["carbon:碳足迹与碳流图"]=E("展示年度园区运营碳足迹、排放构成、排放趋势和碳流图。",["核算年度","时间范围","排放类别","报告口径"],["序号","活动数据或能源品种","排放项目","排放类别","排放量","占比"],[
  ["1","外购电力","净购入使用电力","二类","1,642.30 tCO₂e","71.80%"],
  ["2","外购蒸汽","净购入使用热力","二类","200.05 tCO₂e","8.75%"],
  ["3","天然气","化石燃料燃烧","一类","86.40 tCO₂e","3.78%"],
  ["4","员工通勤","其他间接排放","三类","118.62 tCO₂e","5.19%"],
  ["5","商务差旅","其他间接排放","三类","74.18 tCO₂e","3.24%"]
],{secondary:"导出",actions:["详情"],linkAction:false,noRule:true,tableClass:"carbon-flow-table"});

const budgetUnits={水:"m³",电:"kWh",蒸汽:"t"};
const budgetState={reportPreview:null,monthRange:"1-12月"};
const budgetRows=[
  {id:"BD-2027-D-E",year:"2027",park:"东园区",type:"电",usage:1680000,split:"按月平均",effective:"2027-01-01",warningEnabled:true,threshold:80,currentRate:null,warningStatus:"正常",status:"待生效",updated:"2026-07-29 09:36:18",remark:"东园区年度整体用电预算"},
  {id:"BD-2026-D-E",year:"2026",park:"东园区",type:"电",usage:1560000,split:"手动分解",effective:"2026-01-01",warningEnabled:true,threshold:80,currentRate:87.4,warningStatus:"临近预算",status:"生效中",updated:"2026-07-29 10:20:42",remark:"旺季月份手动提高用量预算"},
  {id:"BD-2026-D-W",year:"2026",park:"东园区",type:"水",usage:132000,split:"按月平均",effective:"2026-01-01",warningEnabled:true,threshold:85,currentRate:62.4,warningStatus:"正常",status:"生效中",updated:"2026-07-28 11:08:03",remark:"园区整体用水预算"},
  {id:"BD-2025-X-S",year:"2025",park:"西园区",type:"蒸汽",usage:18600,split:"手动分解",effective:"2025-01-01",warningEnabled:true,threshold:80,currentRate:98.1,warningStatus:"临近预算",status:"已结束",updated:"2026-01-03 10:12:44",remark:"历史年度蒸汽预算"},
  {id:"BD-2026-X-S",year:"2026",park:"西园区",type:"蒸汽",usage:19800,split:"按月平均",effective:"2026-01-01",warningEnabled:false,threshold:80,currentRate:103.4,warningStatus:"超预算",status:"已停用",updated:"2026-05-18 15:46:27",remark:"因合同范围调整停用"}
];
const budgetMonthRatios=[0.07,0.07,0.08,0.08,0.09,0.09,0.1,0.1,0.09,0.08,0.08,0.07];
const actualUsage=[88000,93000,103000,111000,126000,138000,132000,null,null,null,null,null];
const budgetExecutionRows=Array.from({length:12},(_,index)=>{
  const month=index+1;
  const budget=budgetRows[1];
  const usageBudget=Math.round(budget.usage*budgetMonthRatios[index]);
  const au=actualUsage[index];
  const noData=au===null;
  const abnormal=false;
  const previousRows=actualUsage.slice(0,index+1);
  const cumulativeBudget=Math.round(budget.usage*budgetMonthRatios.slice(0,index+1).reduce((sum,ratio)=>sum+ratio,0));
  const cumulativeActual=previousRows.reduce((sum,value)=>typeof value==="number"?sum+value:sum,0);
  const rate=noData||abnormal?null:(au/usageBudget*100);
  const cumulativeRate=noData||abnormal?null:(cumulativeActual/cumulativeBudget*100);
  const warningStatus=cumulativeRate===null?"正常":cumulativeRate>=100?"超预算":cumulativeRate>=budget.threshold?"临近预算":"正常";
  return {
    month:`${month}月`,
    period:`2026-${String(month).padStart(2,"0")}`,
    usageBudget,
    actualUsage:au,
    usageDiff:noData||abnormal?null:usageBudget-au,
    usageRate:rate,
    cumulativeBudget,
    cumulativeActual:noData||abnormal?null:cumulativeActual,
    cumulativeRate,
    dataStatus:noData?"暂无数据":"完整",
    warningStatus
  };
});
const budgetReports=[
  {id:"BR-202607-D-E",name:"东园区2026年7月电预算执行报告",reportType:"月度报告",year:"2026",month:"7月",park:"东园区",energy:"电",period:"2026年7月",usageBudget:"156,000 kWh",actualUsage:"132,000 kWh",remainingUsage:"24,000 kWh",rate:"84.6%",executionStatus:"临近预算",created:"2026-07-29 10:12:08",statTime:"2026-07-01 00:00:00 至 2026-07-29 10:00:00",source:"预算管理有效预算快照、园区能耗统计结果快照",snapshot:"BR-SNAPSHOT-202607-D-E"},
  {id:"BR-202606-D-W",name:"东园区2026年6月水预算执行报告",reportType:"月度报告",year:"2026",month:"6月",park:"东园区",energy:"水",period:"2026年6月",usageBudget:"11,000 m³",actualUsage:"10,860 m³",remainingUsage:"140 m³",rate:"98.7%",executionStatus:"临近预算",created:"2026-07-02 09:30:26",statTime:"2026-06-01 00:00:00 至 2026-06-30 23:59:59",source:"预算管理有效预算快照、园区能耗统计结果快照",snapshot:"BR-SNAPSHOT-202606-D-W"},
  {id:"BR-2026-D-E",name:"东园区2026年度电预算执行报告",reportType:"年度报告",year:"2026",month:"全年",park:"东园区",energy:"电",period:"2026年",usageBudget:"1,560,000 kWh",actualUsage:"1,363,000 kWh",remainingUsage:"197,000 kWh",rate:"87.4%",executionStatus:"临近预算",created:"2026-07-29 10:18:35",statTime:"2026-01-01 00:00:00 至 2026-07-29 10:00:00",source:"预算管理有效预算快照、园区能耗统计结果快照",snapshot:"BR-SNAPSHOT-2026-D-E"},
  {id:"BR-2025-X-S",name:"西园区2025年度蒸汽预算执行报告",reportType:"年度报告",year:"2025",month:"全年",park:"西园区",energy:"蒸汽",period:"2025年",usageBudget:"18,600 t",actualUsage:"18,240 t",remainingUsage:"360 t",rate:"98.1%",executionStatus:"临近预算",created:"2026-01-05 16:45:11",statTime:"2025-01-01 00:00:00 至 2025-12-31 23:59:59",source:"预算管理有效预算快照、园区能耗统计结果快照",snapshot:"BR-SNAPSHOT-2025-X-S"}
];

let activeModule="overview", activePage="能源总览", currentCfg=null, drawerContext={}, drawerMode="detail", currentActionContext=null;
const menu=document.getElementById("energyMenu"), page=document.getElementById("energyPage");
const statusClass=s=>/误报关闭|已结束|未开始|未启用|—/.test(s)?"neutral":/启用|已通过|已生效|已缴费|已关闭|已生成|已核算|在线|正常|有效|已完成|完整/.test(s)?"success":/待|处理中|审批中|关注|编制中|未提交|预警|低报|临近预算|暂无数据/.test(s)?"warning":/停用|已作废|驳回|异常|告警|逾期|超额|离线|误告警|高报|超预算|数据异常/.test(s)?"danger":"primary";
const tag=s=>`<span class="tag ${statusClass(String(s))}">${s}</span>`;
const meterRelationStatusTag=s=>`<span class="meter-relation-status ${s==="已失效"?"expired":s==="已停用"?"disabled":s==="待生效"?"pending":"active"}">${s}</span>`;
const voidedMark=()=>`<img class="meter-reading-void-mark" src="assets/energy/voided.svg" alt="已作废">`;
function initPageFromUrl(){
  const params=new URLSearchParams(window.location.search);
  const moduleParam=params.get("module");
  const pageParam=params.get("page");
  const matchedModule=energyModules.find(item=>item.id===moduleParam||item.children.includes(pageParam));
  if(!matchedModule) return;
  activeModule=matchedModule.id;
  activePage=matchedModule.children.includes(pageParam)?pageParam:matchedModule.children[0];
}

function renderMenu(){
  menu.innerHTML=energyModules.map(m=>`<div><button class="menu-item menu-parent ${m.id===activeModule?"open":""}" data-module="${m.id}"><span class="menu-icon">${m.icon}</span>${m.name}<span class="menu-arrow">›</span></button>${m.id===activeModule?`<div class="submenu">${m.children.map(c=>`<button class="submenu-item ${c===activePage?"active":""}" data-page="${c}"><i class="submenu-dot"></i>${c}</button>`).join("")}</div>`:""}</div>`).join("");
}
function filters(items){return `<div class="card filter-card"><div class="filters">${items.map(f=>`<div class="field"><label>${f}</label><input class="control filter-input" placeholder="请输入或选择${f}"></div>`).join("")}<div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div></div></div>`;}
function dailyEnergyFilters(){
  return `<div class="card filter-card daily-energy-filter"><div class="filters">
    <div class="field"><label>设备类型</label><select class="control filter-input"><option value="">请选择设备类型</option><option>水</option><option>电</option><option>蒸汽</option></select></div>
    <div class="field daily-energy-date-field"><label>能耗日期</label><div class="date-range-control daily-energy-date-range"><input class="control filter-input" placeholder="开始时间"><span>-</span><input class="control filter-input" placeholder="结束时间"></div></div>
    <div class="filter-actions"><button class="btn primary" data-action="查询">查询</button><button class="btn" data-action="重置">重置</button></div>
  </div></div>`;
}
function remoteDeviceFilters(){
  return `<div class="card filter-card"><div class="filters">
    <div class="field"><label>设备名称/编码</label><input class="control filter-input" placeholder="请输入设备名称或编码"></div>
    <div class="field"><label>设备类型</label><select class="control filter-input"><option>全部</option><option>电表</option><option>水表</option><option>蒸汽表</option></select></div>
    <div class="field"><label>表计类型</label><select class="control filter-input"><option>全部</option><option>总表</option><option>入户表</option></select></div>
    <div class="field"><label>安装位置</label><select class="control filter-input"><option>全部位置</option><option>微冷园区 / 1#配电室</option><option>微冷园区 / 办公楼总管</option><option>微冷园区 / 动力站蒸汽主管</option><option>微冷园区 / 冷库配电间</option></select></div>
    <div class="field"><label>状态</label><select class="control filter-input"><option>全部</option><option>在线</option><option>离线</option></select></div>
    <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
  </div></div>`;
}
function manualMeterFilters(){
  const runtime=getPageRuntime("人工表计管理");
  const selected=(label,value)=>runtime.filters[label]===value?" selected":"";
  return `<div class="card filter-card">
    <div class="filters">
      <div class="field"><label>设备名称/编码</label><input class="control filter-input" data-filter-label="设备名称/编码" value="${escapeAttr(runtime.filters["设备名称/编码"]||"")}" placeholder="请输入设备名称或编码"></div>
      <div class="field"><label>设备类型</label><select class="control filter-input" data-filter-label="设备类型"><option value=""${selected("设备类型","")}>全部</option><option value="水表"${selected("设备类型","水表")}>水表</option><option value="电表"${selected("设备类型","电表")}>电表</option><option value="蒸汽表"${selected("设备类型","蒸汽表")}>蒸汽表</option></select></div>
      <div class="field"><label>表计类型</label><select class="control filter-input" data-filter-label="表计类型"><option value=""${selected("表计类型","")}>全部</option><option value="总表"${selected("表计类型","总表")}>总表</option><option value="入户表"${selected("表计类型","入户表")}>入户表</option></select></div>
      <div class="field"><label>安装位置</label><select class="control filter-input" data-filter-label="安装位置"><option value=""${selected("安装位置","")}>全部位置</option><option value="食堂给水支管"${selected("安装位置","食堂给水支管")}>食堂给水支管</option><option value="2#仓库配电箱"${selected("安装位置","2#仓库配电箱")}>2#仓库配电箱</option><option value="换热站入口"${selected("安装位置","换热站入口")}>换热站入口</option><option value="绿化取水点"${selected("安装位置","绿化取水点")}>绿化取水点</option></select></div>
      <div class="field"><label>状态</label><select class="control filter-input" data-filter-label="状态"><option value=""${selected("状态","")}>全部</option><option value="启用"${selected("状态","启用")}>启用</option><option value="停用"${selected("状态","停用")}>停用</option></select></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>`;
}
function meterReadingFilters(){
  const runtime=getPageRuntime("抄表管理");
  const selected=(label,value)=>runtime.filters[label]===value?" selected":"";
  return `<div class="card filter-card meter-reading-filter">
    <div class="filters">
      <div class="field meter-reading-name-field"><label>设备名称/编码</label><input class="control filter-input" data-filter-label="设备名称/编码" value="${escapeAttr(runtime.filters["设备名称/编码"]||"")}" placeholder="请输入设备名称或编码"></div>
      <div class="field"><label>设备类型</label><select class="control filter-input" data-filter-label="设备类型"><option value=""${selected("设备类型","")}>全部</option><option value="水表"${selected("设备类型","水表")}>水表</option><option value="电表"${selected("设备类型","电表")}>电表</option><option value="蒸汽表"${selected("设备类型","蒸汽表")}>蒸汽表</option></select></div>
      <div class="field meter-reading-location-field"><label>安装位置</label><select class="control filter-input" data-filter-label="安装位置"><option value=""${selected("安装位置","")}>全部位置</option><option value="微冷园区 食堂给水支管"${selected("安装位置","微冷园区 食堂给水支管")}>微冷园区 / 能源站 / 食堂给水支管</option><option value="微冷园区 2#仓库配电箱"${selected("安装位置","微冷园区 2#仓库配电箱")}>微冷园区 / 仓储区 / 2#仓库配电箱</option><option value="微冷园区 换热站入口"${selected("安装位置","微冷园区 换热站入口")}>微冷园区 / 能源站 / 换热站入口</option><option value="微冷园区 研发楼实验室配电箱"${selected("安装位置","微冷园区 研发楼实验室配电箱")}>微冷园区 / 研发楼 / 实验室配电箱</option></select></div>
      <div class="field meter-reading-time-field"><label>抄表时间</label><input class="control filter-input" data-filter-label="抄表时间" value="${escapeAttr(runtime.filters["抄表时间"]||"")}" placeholder="请输入日期或时间"></div>
      <div class="field"><label>是否作废</label><select class="control filter-input" data-filter-label="是否作废"><option value=""${selected("是否作废","")}>全部</option><option value="否"${selected("是否作废","否")}>否</option><option value="是"${selected("是否作废","是")}>是</option></select></div>
      <div class="field meter-reading-bill-field"><label>账单关联状态</label><select class="control filter-input" data-filter-label="账单关联状态"><option value=""${selected("账单关联状态","")}>全部</option><option value="未关联"${selected("账单关联状态","未关联")}>未关联</option><option value="已关联"${selected("账单关联状态","已关联")}>已关联</option></select></div>
      <div class="field"><label>抄表人</label><input class="control filter-input" data-filter-label="抄表人" value="${escapeAttr(runtime.filters["抄表人"]||"")}" placeholder="请输入抄表人"></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>`;
}
function meterRelationFilters(){
  const runtime=getPageRuntime("计量关系");
  const selected=(label,value)=>runtime.filters[label]===value?" selected":"";
  return `<div class="card filter-card meter-relation-filter">
    <div class="filters">
      <div class="field"><label>企业名称</label><input class="control filter-input" data-filter-label="企业名称" value="${escapeAttr(runtime.filters["企业名称"]||"")}" placeholder="请输入企业名称"></div>
      <div class="field"><label>所属园区</label><select class="control filter-input" data-filter-label="所属园区"><option value=""${selected("所属园区","")}>全部</option><option value="三里园区"${selected("所属园区","三里园区")}>三里园区</option></select></div>
      <div class="field"><label>能源类型</label><select class="control filter-input" data-filter-label="能源类型"><option value=""${selected("能源类型","")}>全部</option><option value="水"${selected("能源类型","水")}>水</option><option value="电"${selected("能源类型","电")}>电</option><option value="蒸汽"${selected("能源类型","蒸汽")}>蒸汽</option></select></div>
      <div class="field"><label>计费方式</label><select class="control filter-input" data-filter-label="计费方式"><option value=""${selected("计费方式","")}>全部</option>${billingMethodTypes.map(type=>`<option value="${type}"${selected("计费方式",type)}>${type}</option>`).join("")}</select></div>
      <div class="field meter-relation-valid-filter"><label>有效期</label><div class="date-range-control"><input class="control filter-input" data-filter-label="有效期开始" value="${escapeAttr(runtime.filters["有效期开始"]||"")}" placeholder="开始日期"><span>-</span><input class="control filter-input" data-filter-label="有效期结束" value="${escapeAttr(runtime.filters["有效期结束"]||"")}" placeholder="结束日期"></div></div>
      <div class="field"><label>状态</label><select class="control filter-input" data-filter-label="状态"><option value=""${selected("状态","")}>全部</option><option value="待生效"${selected("状态","待生效")}>待生效</option><option value="生效中"${selected("状态","生效中")}>生效中</option><option value="已失效"${selected("状态","已失效")}>已失效</option><option value="已停用"${selected("状态","已停用")}>已停用</option></select></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>`;
}
function flexFilters(items,longLabels=[]){
  const runtime=getPageRuntime(activePage);
  return `<div class="card filter-card safety-search-card"><div class="safety-flex-filters">${items.map(f=>`<div class="field safety-filter-field ${longLabels.includes(f)?"long-label":""}"><label>${f}</label><input class="control filter-input" data-filter-label="${f}" value="${escapeAttr(runtime.filters[f]||"")}" placeholder="请输入或选择${f}"></div>`).join("")}<div class="filter-actions safety-filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div></div></div>`;
}
function stats(items){return `<div class="stats">${items.map(x=>`<div class="card stat"><div class="stat-title">${x[0]}</div><div class="stat-value">${x[1]}</div><div class="stat-note">${x[2]}</div></div>`).join("")}</div>`;}
function safetyCards(items){
  return `<div class="safety-summary-grid">${items.map(x=>`<div class="card safety-summary-card"><div class="safety-summary-label">${x[0]}</div><div class="safety-summary-value">${x[1]}</div><div class="safety-summary-note">${x[2]}</div></div>`).join("")}</div>`;
}
function safetyPerimeterFilters(){
  const runtime=getPageRuntime(activePage);
  const selected=(label,value)=>runtime.filters[label]===value?" selected":"";
  return `<div class="card filter-card perimeter-filter-card">
    <div class="filters perimeter-alarm-filters">
      <div class="field ammonia-name-field"><label>设备编码/设备名称</label><input class="control filter-input" data-filter-label="设备编码/设备名称" value="${escapeAttr(runtime.filters["设备编码/设备名称"]||"")}" placeholder="请输入设备编码/设备名称"></div>
      <div class="field"><label>安装位置</label><select class="control filter-input" data-filter-label="安装位置"><option value=""${selected("安装位置","")}>全部</option><option value="制冷机房"${selected("安装位置","制冷机房")}>制冷机房</option><option value="冷库机房"${selected("安装位置","冷库机房")}>冷库机房</option><option value="卸货区"${selected("安装位置","卸货区")}>卸货区</option><option value="配电间"${selected("安装位置","配电间")}>配电间</option><option value="冷凝设备区"${selected("安装位置","冷凝设备区")}>冷凝设备区</option></select></div>
      <div class="field"><label>所属园区</label><input class="control filter-input" data-filter-label="所属园区" value="${escapeAttr(runtime.filters["所属园区"]||"")}" placeholder="请输入所属园区"></div>
      <div class="field"><label>在线状态</label><select class="control filter-input" data-filter-label="在线状态"><option value=""${selected("在线状态","")}>全部</option><option value="在线"${selected("在线状态","在线")}>在线</option><option value="离线"${selected("在线状态","离线")}>离线</option></select></div>
      <div class="field"><label>浓度状态</label><select class="control filter-input" data-filter-label="浓度状态"><option value=""${selected("浓度状态","")}>全部</option><option value="正常"${selected("浓度状态","正常")}>正常</option><option value="低报"${selected("浓度状态","低报")}>低报</option><option value="高报"${selected("浓度状态","高报")}>高报</option><option value="离线"${selected("浓度状态","离线")}>离线</option></select></div>
      <div class="field"><label>最近上报时间</label><input class="control filter-input" data-filter-label="最近上报时间" value="${escapeAttr(runtime.filters["最近上报时间"]||"")}" placeholder="请输入最近上报时间"></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>`;
}
function safetyManagementTable(cfg){
  const dynamicData=getDynamicTableData(cfg);
  const list=dynamicData.rows;
  const total=dynamicData.total;
  const currentPage=dynamicData.currentPage;
  const pageCount=dynamicData.pageCount;
  const pageButtons=Array.from({length:pageCount},(_,index)=>`<button class="page-btn ${index+1===currentPage?"active":""}" data-page-index="${index+1}">${index+1}</button>`).join("");
  return `<div class="card table-card perimeter-alarm-card">
    <div class="table-toolbar">
      <div class="table-toolbar-left"><span class="tag primary">设备监测</span><span class="muted">设备编码可查看详情；离线设备按最近上报时间追踪</span></div>
      <div class="table-toolbar-right"></div>
    </div>
    <div class="table-wrap">
      <table class="perimeter-alarm-table ammonia-device-table">
        <thead><tr>${cfg.columns.map(column=>`<th>${column}</th>`).join("")}</tr></thead>
        <tbody>${list.length?list.map(({row,sourceIndex})=>`<tr data-row="${sourceIndex}">
          <td>${row[0]}</td>
          <td><button class="table-link ammonia-device-code-link" data-action="详情">${row[1]}</button></td>
          <td>${row[2]}</td>
          <td><div class="two-line-cell ammonia-device-meta"><b>${row[3]}</b><span>${row[4]}</span></div></td>
          <td>${tag(row[5])}</td>
          <td>${row[6]}</td>
          <td>${tag(row[7])}</td>
          <td>${row[8]}</td>
          <td class="actions"><button class="btn text" data-action="绑定位置">绑定位置</button></td>
        </tr>`).join(""):`<tr><td class="table-empty" colspan="${cfg.columns.length}">暂无数据</td></tr>`}</tbody>
      </table>
    </div>
    <div class="pagination"><span>共 ${total} 条</span><button class="page-btn" data-page-step="prev" ${currentPage===1?"disabled":""}>‹</button>${pageButtons}<button class="page-btn" data-page-step="next" ${currentPage===pageCount?"disabled":""}>›</button></div>
  </div>`;
}
function alarmDeviceMeta(deviceCode){
  const deviceRows=configs["safety:氨气监测管理"].allRows||configs["safety:氨气监测管理"].rows||[];
  const matched=deviceRows.find(item=>item[1]===deviceCode);
  return {
    code:deviceCode||"—",
    name:matched?.[2]||"未绑定设备名称",
    location:matched?.[3]||"—",
    park:matched?.[4]||"—"
  };
}
function deviceAlarmCurrentConcentration(row=[]){
  const concentrationMap={
    "NH3-AL-20260611-0028":"41 ppm",
    "NH3-AL-20260611-0027":"24 ppm",
    "NH3-AL-20260611-0024":"22 ppm",
    "NH3-AL-20260610-0019":"8 ppm",
    "NH3-AL-20260610-0016":"12 ppm"
  };
  return concentrationMap[row[0]]||row[3]||"—";
}
function safetyAlarmFilters(){
  const runtime=getPageRuntime(activePage);
  const selected=(label,value)=>runtime.filters[label]===value?" selected":"";
  return `<div class="card filter-card perimeter-filter-card">
    <div class="filters perimeter-alarm-filters">
      <div class="field ammonia-name-field"><label>告警编号/设备编码</label><input class="control filter-input" data-filter-label="告警编号/设备编码" value="${escapeAttr(runtime.filters["告警编号/设备编码"]||"")}" placeholder="请输入告警编号/设备编码"></div>
      <div class="field"><label>告警状态</label><select class="control filter-input" data-filter-label="告警状态"><option value=""${selected("告警状态","")}>全部</option><option value="待确认"${selected("告警状态","待确认")}>待确认</option><option value="待接单"${selected("告警状态","待接单")}>待接单</option><option value="处置中"${selected("告警状态","处置中")}>处置中</option><option value="已完成"${selected("告警状态","已完成")}>已完成</option><option value="误报关闭"${selected("告警状态","误报关闭")}>误报关闭</option></select></div>
      <div class="field"><label>告警级别</label><select class="control filter-input" data-filter-label="告警级别"><option value=""${selected("告警级别","")}>全部</option><option value="高报"${selected("告警级别","高报")}>高报</option><option value="低报"${selected("告警级别","低报")}>低报</option></select></div>
      <div class="field"><label>监测点</label><input class="control filter-input" data-filter-label="监测点" value="${escapeAttr(runtime.filters["监测点"]||"")}" placeholder="请输入监测点"></div>
      <div class="field"><label>当前处理人</label><input class="control filter-input" data-filter-label="当前处理人" value="${escapeAttr(runtime.filters["当前处理人"]||"")}" placeholder="请输入当前处理人"></div>
      <div class="field"><label>触发时间</label><input class="control filter-input" data-filter-label="触发时间" value="${escapeAttr(runtime.filters["触发时间"]||"")}" placeholder="请输入触发时间"></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>`;
}
function energyAlarmFilters(){
  const runtime=getPageRuntime("能源告警");
  const selected=(label,value)=>runtime.filters[label]===value?" selected":"";
  return `<div class="card filter-card">
    <div class="filters">
      <div class="field"><label>报警位置</label><select class="control filter-input" data-filter-label="报警位置"><option value=""${selected("报警位置","")}>全部位置</option><option value="冷库一号库"${selected("报警位置","冷库一号库")}>冷库一号库</option><option value="冷库二号库"${selected("报警位置","冷库二号库")}>冷库二号库</option><option value="生产车间A区"${selected("报警位置","生产车间A区")}>生产车间A区</option><option value="办公楼"${selected("报警位置","办公楼")}>办公楼</option><option value="动力站"${selected("报警位置","动力站")}>动力站</option><option value="制冷机房"${selected("报警位置","制冷机房")}>制冷机房</option></select></div>
      <div class="field"><label>用能类型</label><select class="control filter-input" data-filter-label="用能类型"><option value=""${selected("用能类型","")}>全部类型</option><option value="用电"${selected("用能类型","用电")}>用电</option><option value="用水"${selected("用能类型","用水")}>用水</option><option value="用蒸汽"${selected("用能类型","用蒸汽")}>用蒸汽</option></select></div>
      <div class="field"><label>告警类型</label><select class="control filter-input" data-filter-label="告警类型"><option value=""${selected("告警类型","")}>全部类型</option><option value="增量异常"${selected("告警类型","增量异常")}>增量异常</option><option value="设备离线"${selected("告警类型","设备离线")}>设备离线</option><option value="日累计超标"${selected("告警类型","日累计超标")}>日累计超标</option><option value="时间窗口超限"${selected("告警类型","时间窗口超限")}>时间窗口超限</option><option value="时间段超限"${selected("告警类型","时间段超限")}>时间段超限</option></select></div>
      <div class="field"><label>报警时间</label><input class="control filter-input" data-filter-label="报警时间" value="${escapeAttr(runtime.filters["报警时间"]||"")}" placeholder="请输入报警日期或时间"></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>`;
}
function deviceAlarmSuggestion(row=[]){
  const point=row[1]||"当前监测点";
  const level=row[4]||"告警";
  return level==="高报"
    ? `请优先前往${point}核查是否存在氨气泄漏，检查通风、阀门及制冷设备运行状态，完成复测后回传处置结果。`
    : `请前往${point}复核浓度趋势，排查环境波动、设备误触发和现场作业影响，必要时补充现场照片。`;
}
function deviceAlarmWorkOrderNo(alarmId=""){
  const suffix=(alarmId.match(/(\d{8})-(\d+)$/)||[]).slice(1);
  if(suffix.length===2) return `GD-${suffix[0]}-${suffix[1]}`;
  return `GD-${formatDate(new Date()).replaceAll("-","")}-001`;
}
function deviceAlarmTable(cfg){
  const dynamicData=getDynamicTableData(cfg);
  const list=dynamicData.rows;
  const total=dynamicData.total;
  const currentPage=dynamicData.currentPage;
  const pageCount=dynamicData.pageCount;
  const pageButtons=Array.from({length:pageCount},(_,index)=>`<button class="page-btn ${index+1===currentPage?"active":""}" data-page-index="${index+1}">${index+1}</button>`).join("");
  const pageOffset=(currentPage-1)*(cfg.pageSize||10);
  return `<div class="card table-card perimeter-alarm-card">
    <div class="table-toolbar">
      <div class="table-toolbar-left"><span class="tag primary">告警闭环</span><span class="muted">确认环节支持误报关闭或派单处置，列表展示当前责任人与处理进展</span></div>
      <div class="table-toolbar-right"></div>
    </div>
    <div class="table-wrap">
      <table class="perimeter-alarm-table ammonia-device-table device-alarm-table">
        <thead><tr><th>序号</th><th>告警编号</th><th>设备编码/设备名称</th><th>监测点/所属园区</th><th>告警级别</th><th>触发浓度</th><th>当前浓度</th><th>告警时间</th><th>处理人</th><th>告警状态</th></tr></thead>
        <tbody>${list.length?list.map(({row,sourceIndex},index)=>{
          const device=alarmDeviceMeta(row[2]);
          const currentConcentration=deviceAlarmCurrentConcentration(row);
          return `<tr data-row="${sourceIndex}">
          <td>${pageOffset+index+1}</td>
          <td><button class="table-link device-alarm-id-link" data-action="详情">${row[0]}</button></td>
          <td><div class="two-line-cell ammonia-device-meta"><b>${device.code}</b><span>${device.name}</span></div></td>
          <td><div class="two-line-cell ammonia-device-meta"><b>${row[1]}</b><span>${device.park}</span></div></td>
          <td>${tag(row[4])}</td>
          <td>${row[3]}</td>
          <td>${currentConcentration}</td>
          <td>${row[5]}</td>
          <td>${row[7]}</td>
          <td>${tag(row[6])}</td>
        </tr>`;
        }).join(""):`<tr><td class="table-empty" colspan="10">暂无数据</td></tr>`}</tbody>
      </table>
    </div>
    <div class="pagination"><span>共 ${total} 条</span><button class="page-btn" data-page-step="prev" ${currentPage===1?"disabled":""}>‹</button>${pageButtons}<button class="page-btn" data-page-step="next" ${currentPage===pageCount?"disabled":""}>›</button></div>
  </div>`;
}
function actionsFor(cfg,row){
  if(activePage==="抄表管理"){
    if(row[14]==="已关联"||row[13]==="已作废") return `<span class="muted">—</span>`;
    return ["编辑","作废"].map(a=>`<button class="btn text ${a==="作废"?"danger":""}" data-action="${a}">${a}</button>`).join("");
  }
  const states=cfg.stateActions||{};const found=Object.entries(states).find(([s])=>row.includes(s));return (found?found[1]:(cfg.actions||[])).map(a=>`<button class="btn text ${/删除|驳回|关闭|停用|误告警/.test(a)?"danger":""}" data-action="${a}">${a}</button>`).join("");
}
function meterRelationCell(row,j){
  if(activePage!=="计量关系") return null;
  if(j===0) return row[0];
  if(j===1) return `<button class="table-link meter-relation-enterprise" data-action="查看">${row[1]}</button>`;
  if(j===3) return row[3];
  if(j===4){
    const [count,names]=String(row[4]).split("：");
    return `<button class="table-link meter-relation-meters" data-action="查看"><b>${count}</b><span>${names||row[3]}</span></button>`;
  }
  if(j===6) return `<div class="meter-relation-summary">${row[6]}</div>`;
  if(j===7) return `<div class="meter-relation-validity-cell">${row[12]||"—"} 至 ${row[13]||"长期"}</div>`;
  if(j===8) return meterRelationStatusTag(row[8]);
  return null;
}
function remoteDeviceCell(row,j){
  if(activePage!=="远传设备管理") return null;
  if(j===5) return `<div class="two-line-cell remote-device-two-line"><b>${row[6]}</b><span>${row[5]}</span></div>`;
  if(j===6) return `<span class="tag remote-online-tag ${row[7]==="离线"?"danger":"success"}">${row[7]}</span>`;
  if(j===7) return `<div class="two-line-cell remote-device-two-line"><b>${row[8]}</b><span>${row[9]}</span></div>`;
  if(j===8) return row[10];
  if(j===9) return `<div class="two-line-cell remote-device-two-line"><b>${row[11]}</b><span>${row[12]}</span></div>`;
  if(j>9) return "";
  return null;
}
function manualMeterCell(row,j){
  if(activePage!=="人工表计管理") return null;
  if(j===0) return row[0];
  if(j===1) return row[1];
  if(j===2) return row[2];
  if(j===3) return row[3];
  if(j===4) return row[4];
  if(j===5) return `<div class="two-line-cell manual-meter-two-line"><b>${row[6]}</b><span>${row[5]}</span></div>`;
  if(j===6) return `<div class="two-line-cell manual-meter-two-line"><b>${row[7]}</b><span>${row[8]}</span></div>`;
  if(j===7) return row[9];
  if(j===8) return `<div class="two-line-cell manual-meter-two-line"><b>${row[10]}</b><span>${row[11]}</span></div>`;
  return "";
}
function meterReadingCell(row,j){
  if(activePage!=="抄表管理") return null;
  const index=(configs["monitor:抄表管理"].allRows||[]).indexOf(row);
  if(j===0) return String(index>=0?index+1:1);
  if(j===1) return `<div class="two-line-cell meter-reading-two-line"><b>${row[1]}</b><span>${row[2]}</span></div>`;
  if(j===2) return row[3];
  if(j===3) return `<div class="two-line-cell meter-reading-two-line"><b>${row[6]}</b><span>${row[4]}</span></div>`;
  if(j===4) return `<div class="two-line-cell meter-reading-two-line"><b>${row[7]}</b><span>${row[16]}</span></div>`;
  if(j===5) return `<div class="two-line-cell meter-reading-two-line"><b>${row[8]}</b><span>${row[11]}</span></div>`;
  if(j===6) return `<div class="meter-reading-delta-cell"><span>${row[9]}</span>${row[13]==="已作废"?voidedMark():""}</div>`;
  if(j===7) return `<div class="two-line-cell meter-reading-two-line"><b>${row[12]}</b><span>${row[18]||row[11]}</span></div>`;
  if(j===8) return `<button class="table-link meter-reading-bill-link" data-action="查看关联账单">${row[14]==="已关联"?`已关联（${meterReadingBillList(row).length}）`:"未关联"}</button>`;
  return "";
}
function energyAlarmCell(row,j){
  if(activePage!=="能源告警") return null;
  if(j===3) return energyAlarmTypeTag(row[3]);
  return null;
}
function energyAlarmTypeTag(type){
  const classMap={
    "增量异常":"increment",
    "设备离线":"offline",
    "日累计超标":"daily",
    "时间窗口超限":"window",
    "时间段超限":"period"
  };
  return `<span class="tag energy-alarm-type ${classMap[type]||"default"}">${type}</span>`;
}
function table(cfg,toolbarActions=""){
  const hasActions=(cfg.actions?.length||Object.keys(cfg.stateActions||{}).length)>0;
  const dynamicData=dynamicPages.has(activePage)&&cfg.allRows?getDynamicTableData(cfg):null;
  const list=dynamicData?.rows||cfg.rows.map((row,sourceIndex)=>({row,sourceIndex}));
  const total=dynamicData?.total??cfg.total??cfg.rows.length*16+2;
  const pageCount=dynamicData?.pageCount??1;
  const currentPage=dynamicData?.currentPage??1;
  const pageButtons=Array.from({length:pageCount},(_,index)=>`<button class="page-btn ${index+1===currentPage?"active":""}" data-page-index="${index+1}">${index+1}</button>`).join("");
  const linkColumn=Number.isInteger(cfg.linkColumn)?cfg.linkColumn:0;
  const toolbarLeft=cfg.hideToolbarSummary?"":`<b>${activePage}列表</b><span class="tag">共 ${total} 条</span>`;
  return `<div class="card table-card"><div class="table-toolbar"><div class="table-toolbar-left">${toolbarLeft}</div><div class="table-toolbar-right">${toolbarActions}</div></div><div class="table-wrap"><table class="${cfg.tableClass||""}"><thead><tr>${cfg.columns.map(x=>`<th>${x}</th>`).join("")}${hasActions?"<th>操作</th>":""}</tr></thead><tbody>${list.length?list.map(({row,sourceIndex})=>`<tr data-row="${sourceIndex}">${cfg.columns.map((column,j)=>{const customCell=meterRelationCell(row,j)??meterReadingCell(row,j)??manualMeterCell(row,j)??remoteDeviceCell(row,j)??energyAlarmCell(row,j);const v=row[j];return `<td>${customCell??(j===linkColumn&&cfg.linkAction!==false?`<span class="link" data-action="详情">${v}</span>`:/状态|等级|标记|采集状态|审批/.test(column)?tag(v):v)}</td>`;}).join("")}${hasActions?`<td class="actions">${actionsFor(cfg,row)}</td>`:""}</tr>`).join(""):`<tr><td class="table-empty" colspan="${cfg.columns.length+(hasActions?1:0)}">暂无数据</td></tr>`}</tbody></table></div><div class="pagination"><span>共 ${total} 条</span><button class="page-btn" data-page-step="prev" ${currentPage===1?"disabled":""}>‹</button>${pageButtons}<button class="page-btn" data-page-step="next" ${currentPage===pageCount?"disabled":""}>›</button></div></div>`;
}
function pageActions(primary,secondary){
  const primaryText=primary&&(/^同步/.test(primary)||primary==="新增表计"||primary==="新增抄表"||primary==="新增计量关系")?primary:`＋ ${primary}`;
  return `${primary?`<button class="btn primary" data-action="${primary}">${primaryText}</button>`:""}${secondary?`<button class="btn" data-action="${secondary}">${secondary}</button>`:""}`;
}
function pageHead(_title,_desc,primary,secondary){
  const actions=pageActions(primary,secondary);
  return actions?`<div class="page-head page-head-actions-only"><div class="head-actions">${actions}</div></div>`:"";
}
const numberText=(value,unit="")=>value===null||value===undefined?"暂无数据":`${Number(value).toLocaleString("zh-CN")}${unit?` ${unit}`:""}`;
const percentText=value=>value===null||value===undefined?"—":`${Number(value).toFixed(1)}%`;
function budgetFilters(type){
  if(type==="manage") return `<div class="card filter-card"><div class="filters">
    <div class="field"><label>预算年度</label><input class="control filter-input" value="2026" placeholder="请选择预算年度"></div>
    <div class="field"><label>所属园区</label><select class="control filter-input"><option>全部园区</option><option>东园区</option><option>西园区</option></select></div>
    <div class="field"><label>能源类型</label><select class="control filter-input"><option>全部</option><option>水</option><option>电</option><option>蒸汽</option></select></div>
    <div class="field"><label>预警状态</label><select class="control filter-input"><option>全部</option><option>未开始</option><option>正常</option><option>临近预算</option><option>超预算</option><option>未启用</option></select></div>
    <div class="field"><label>预算状态</label><select class="control filter-input"><option>全部</option><option>待生效</option><option>生效中</option><option>已结束</option><option>已停用</option></select></div>
    <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
  </div></div>`;
  if(type==="execute") return `<div class="card filter-card budget-execution-filter"><div class="filters">
    <div class="field"><label>预算年度</label><input class="control filter-input" value="2026" placeholder="请选择预算年度"></div>
    <div class="field"><label>所属园区</label><select class="control filter-input"><option>东园区</option><option>西园区</option></select></div>
    <div class="field"><label>能源类型</label><select class="control filter-input"><option>电</option><option>水</option><option>蒸汽</option></select></div>
    <div class="filter-actions"><span class="budget-filter-time">更新：2026-07-29 10:30:16</span><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
  </div></div>`;
  return `<div class="card filter-card"><div class="filters">
    <div class="field"><label>报告名称</label><input class="control filter-input" placeholder="请输入报告名称"></div>
    <div class="field"><label>所属园区</label><select class="control filter-input"><option>全部园区</option><option>东园区</option><option>西园区</option></select></div>
    <div class="field"><label>能源类型</label><select class="control filter-input"><option>全部</option><option>水</option><option>电</option><option>蒸汽</option></select></div>
    <div class="field"><label>报告类型</label><select class="control filter-input"><option>全部</option><option>月度报告</option><option>年度报告</option></select></div>
    <div class="field"><label>报告年度</label><select class="control filter-input"><option>全部年度</option><option>2026年</option><option>2025年</option></select></div>
    <div class="field"><label>报告月份</label><select class="control filter-input"><option>全部月份</option><option>1月</option><option>2月</option><option>3月</option><option>4月</option><option>5月</option><option>6月</option><option>7月</option><option>全年</option></select></div>
    <div class="field"><label>生成时间</label><input class="control filter-input" placeholder="请选择时间范围"></div>
    <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
  </div></div>`;
}
function budgetMonthRows(budget){
  const ratios=budget.split==="按月平均"?Array(12).fill(1/12):budgetMonthRatios;
  return ratios.map((ratio,index)=>({
    month:`${index+1}月`,
    usage:budget.usage?Math.round(budget.usage*ratio):"",
    remark:budget.usage?(budget.split==="按月平均"?"系统按月平均分解":"手动设置"):""
  }));
}
function budgetListWarningStatus(row){
  if(row.status==="待生效") return "未开始";
  if(row.status==="已停用") return "已停用";
  if(!row.warningEnabled) return "未启用";
  return row.warningStatus||"—";
}
function budgetListRateText(row){
  const thresholdText=row.warningEnabled?`${row.threshold}%`:"未启用";
  if(row.status==="待生效"||row.status==="已停用") return `${thresholdText} / —`;
  return `${thresholdText} / ${row.currentRate===null?"—":percentText(row.currentRate)}`;
}
function budgetManageTable(){
  currentCfg={rows:budgetRows,columns:["序号","预算年度","所属园区","能源类型","年度预算用量/分解方式","预算状态","预警阈值/当前累计执行率","预警状态","更新时间"]};
  return `<div class="card table-card budget-table-card">
    <div class="table-toolbar"><div class="table-toolbar-left"><b>预算列表</b><span class="tag">共 ${budgetRows.length} 条</span></div><div class="table-toolbar-right"><button class="btn primary" data-action="新增预算">新增预算</button><button class="btn" data-action="导出">导出</button></div></div>
    <div class="table-wrap"><table class="budget-wide-table budget-manage-table"><colgroup><col class="budget-col-index"><col class="budget-col-year"><col class="budget-col-park"><col class="budget-col-type"><col class="budget-col-usage"><col class="budget-col-status"><col class="budget-col-rate"><col class="budget-col-warning"><col class="budget-col-time"><col class="budget-col-action"></colgroup><thead><tr><th>序号</th><th>预算年度</th><th>所属园区</th><th>能源类型</th><th>年度预算用量/分解方式</th><th>预算状态</th><th>预警阈值/当前累计执行率</th><th>预警状态</th><th>更新时间</th><th>操作</th></tr></thead>
      <tbody>${budgetRows.map((row,index)=>{
        const warningStatus=budgetListWarningStatus(row);
        const rateText=budgetListRateText(row);
        const isWarningExceeded=row.status==="生效中"&&row.warningEnabled&&row.currentRate!==null&&row.currentRate>=row.threshold;
        const disabledStop=!["待生效","生效中"].includes(row.status);
        return `<tr data-row="${index}">
          <td>${index+1}</td>
          <td><button class="btn text budget-year-link" data-action="查看月度预算">${row.year}年</button></td>
          <td>${row.park}</td>
          <td>${row.type}</td>
          <td><div class="budget-two-line"><b>${numberText(row.usage,budgetUnits[row.type])}</b><span>${row.split}</span></div></td>
          <td>${tag(row.status)}</td>
          <td><span class="budget-rate-line ${isWarningExceeded?"danger":""}">${rateText}</span></td>
          <td>${tag(warningStatus)}</td>
          <td>${row.updated}</td>
          <td class="actions"><button class="btn text" data-action="编辑">编辑</button><button class="btn text danger ${disabledStop?"disabled-action":""}" ${disabledStop?"disabled":""} data-action="停用">停用</button></td>
        </tr>`;
      }).join("")}</tbody>
    </table></div><div class="pagination"><span>共 ${budgetRows.length} 项数据</span><button class="page-btn" disabled>‹</button><button class="page-btn active">1</button><button class="page-btn" disabled>›</button></div>
  </div>`;
}
function renderBudgetManagement(){
  page.innerHTML=`<div class="alert"><b>业务口径：</b>预算对象仅支持园区整体，只管理水、电、蒸汽用量预算；实际用量统一读取园区能耗统计结果。</div>${budgetFilters("manage")}${budgetManageTable()}`;
}
function renderBudgetExecution(){
  const rows=budgetExecutionRows;
  const budget=budgetRows[1];
  const completeRows=rows.filter(row=>typeof row.actualUsage==="number");
  const latest=completeRows[completeRows.length-1]||rows[0];
  const unit=budgetUnits[budget.type];
  const forecastUsage=Math.round(budget.usage*1.023);
  const forecastRate=forecastUsage/budget.usage*100;
  const forecastDiff=forecastUsage-budget.usage;
  const kpis=[
    {label:"年度预算用量",value:numberText(budget.usage,unit),note:"预算年度整体用量目标",icon:"target",tone:"blue"},
    {label:"实际累计用量",value:numberText(latest.cumulativeActual,unit),note:"1-7月实际用量合计",icon:"actual",tone:"green"},
    {label:"剩余预算用量",value:numberText(budget.usage-latest.cumulativeActual,unit),note:"预算剩余可用量",icon:"remain",tone:"orange"},
    {label:"累计执行率",value:percentText(latest.cumulativeRate),note:"实际用量 / 预算用量",icon:"rate",tone:"purple"},
    {label:"预算预警状态",value:tag(latest.warningStatus),note:`阈值：${budget.threshold}%｜超预算：100%`,icon:"warning",tone:"red"}
  ];
  currentCfg={rows:rows,columns:["月份","月度预算用量","月度实际用量","月度差额","月度执行率","累计预算用量","累计实际用量","累计执行率","预警状态"]};
  page.innerHTML=`${budgetFilters("execute")}
  <div class="budget-execution-alert ${latest.warningStatus==="超预算"?"danger":latest.warningStatus==="临近预算"?"warning":"success"}">
    <b><i>i</i>预算预警</b>
    <span>${budget.park}${budget.year}年度${budget.type}预算累计执行率为 ${percentText(latest.cumulativeRate)}，当前处于${latest.warningStatus}状态。预算预警仅在本页面展示，不进入能源告警。</span>
  </div>
  <div class="budget-kpi-summary">
    ${kpis.map(item=>`<div class="card budget-kpi-card ${item.icon} ${item.tone}">
      <div class="budget-kpi-card-head">${budgetKpiIcon(item.icon)}<span>${item.label}</span></div>
      <strong>${item.value}</strong>
      <p>${item.note}</p>
    </div>`).join("")}
  </div>
  <div class="budget-execution-main-grid">
    <div class="card budget-chart-card"><div class="table-toolbar"><div class="table-toolbar-left"><b>月度执行趋势</b></div><div class="table-toolbar-right"><select class="control compact-control" data-action="切换月份范围"><option>1-12月</option><option>1-6月</option><option>7-12月</option></select><button class="btn" data-action="导出图表图片">导出图表</button></div></div>${budgetTrendChart(unit)}</div>
    <div class="card budget-gauge-card">
      <div class="budget-panel-title">执行率仪表盘</div>
      ${budgetGauge(latest.cumulativeRate,"累计执行率","warning")}
      <div class="budget-gauge-note ${latest.warningStatus==="超预算"?"danger":"warning"}"><b>${latest.warningStatus}</b><span>当前累计执行率已达到${percentText(latest.cumulativeRate)}，接近预算阈值(${budget.threshold}%)，请关注后续用能情况。</span></div>
    </div>
  </div>
  <div class="budget-analysis-grid">
    <div class="card budget-analysis-card">
      <div class="budget-panel-title">月度对比分析</div>
      ${budgetCompareTable(unit)}
    </div>
    <div class="card budget-forecast-card">
      <div class="budget-panel-title">预算完成预测</div>
      <div class="budget-forecast-layout">
        <div class="budget-forecast-gauge">
          ${budgetGauge(forecastRate,"预计年度完成率","primary")}
          <div class="budget-forecast-values"><span>预计用量：<b>${numberText(forecastUsage,unit)}</b></span><span>预计偏差：<b>+${numberText(forecastDiff,unit)}</b></span></div>
        </div>
        <div class="budget-forecast-side">
          <div class="budget-forecast-info"><b>预测说明</b><span>基于1-7月实际用能趋势，结合历史同期数据，预测全年用量及预算完成情况。</span><span>若保持当前用能趋势，预计将超出预算2.3%。</span></div>
          <div class="budget-forecast-info warning"><b>建议措施</b><span>关注高能耗设备运行状态；优化用能策略，降低不必要能耗；加强后续用能监控与管理。</span></div>
        </div>
      </div>
    </div>
  </div>
  <div class="card table-card budget-table-card"><div class="table-toolbar"><div class="table-toolbar-left"><b>月度执行明细</b><span class="tag">共 12 项数据</span></div><div class="table-toolbar-right"><button class="btn" data-action="导出">导出</button></div></div>
    <div class="table-wrap"><table class="budget-wide-table budget-execution-table"><thead><tr>${currentCfg.columns.map(c=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.map((row,index)=>{
      const actualText=row.dataStatus==="暂无数据"?"暂无数据":numberText(row.actualUsage,unit);
      const diffClass=typeof row.usageDiff==="number"&&row.usageDiff<0?"negative":"";
      return `<tr data-row="${index}">
        <td><div class="budget-month-cell"><b>${row.month}</b><span>${row.period}</span></div></td>
        <td><span class="budget-number-cell">${numberText(row.usageBudget,unit)}</span></td>
        <td><span class="budget-number-cell">${actualText}</span></td>
        <td><span class="budget-number-cell ${diffClass}">${numberText(row.usageDiff,unit)}</span></td>
        <td><span class="budget-rate-pill ${row.usageRate!==null&&row.usageRate>=100?"danger":row.usageRate!==null&&row.usageRate>=budget.threshold?"warning":""}">${percentText(row.usageRate)}</span></td>
        <td><span class="budget-number-cell">${numberText(row.cumulativeBudget,unit)}</span></td>
        <td><span class="budget-number-cell">${numberText(row.cumulativeActual,unit)}</span></td>
        <td><span class="budget-rate-pill ${row.cumulativeRate!==null&&row.cumulativeRate>=100?"danger":row.cumulativeRate!==null&&row.cumulativeRate>=budget.threshold?"warning":""}">${percentText(row.cumulativeRate)}</span></td>
        <td>${row.dataStatus==="暂无数据"?tag("未开始"):tag(row.warningStatus)}</td>
      </tr>`;
    }).join("")}</tbody></table></div>
  </div>`;
}
function budgetTrendChart(unit=""){
  const rows=budgetExecutionRows;
  const max=Math.max(...rows.map(row=>Math.max(row.usageBudget,typeof row.actualUsage==="number"?row.actualUsage:0)));
  const linePoints=rows.map((row,index)=>{
    const x=52+index*92;
    const y=row.cumulativeRate===null?null:220-Math.min(120,row.cumulativeRate)/120*178;
    return y===null?null:{x,y};
  }).filter(Boolean);
  const linePath=linePoints.map((point,index)=>`${index?"L":"M"}${point.x},${point.y}`).join(" ");
  return `<div class="budget-combo-chart"><div class="budget-chart-axis budget-chart-axis-left">用量（${unit}）</div><div class="budget-chart-axis budget-chart-axis-right">执行率（%）</div><svg class="budget-trend-line" viewBox="0 0 1080 240" preserveAspectRatio="none" aria-hidden="true"><path d="${linePath}"></path>${linePoints.map(point=>`<circle cx="${point.x}" cy="${point.y}" r="4"></circle>`).join("")}</svg>${rows.map(row=>{
    const actualValue=typeof row.actualUsage==="number"?row.actualUsage:null;
    const isOver=row.warningStatus==="超预算", isNear=row.warningStatus==="临近预算";
    return `<div class="budget-chart-month ${isOver?"over-limit":isNear?"near-limit":""}" title="${row.month} 预算：${numberText(row.usageBudget,"")}；实际：${actualValue===null?"暂无数据":numberText(actualValue,"")}；差额：${numberText(row.usageDiff,"")}；累计执行率：${percentText(row.cumulativeRate)}；预警状态：${row.warningStatus}">
      <div class="budget-bars"><i class="budget-bar-plan" style="height:${Math.max(8,row.usageBudget/max*170)}px"></i><i class="budget-bar-actual ${actualValue===null?"empty":""}" style="height:${actualValue===null?8:Math.max(8,actualValue/max*170)}px"></i></div><b>${row.month}</b>
    </div>`;
  }).join("")}</div><div class="budget-chart-legend"><span><i class="plan"></i>月度预算用量</span><span><i class="actual"></i>月度实际用量</span><span><i class="rate"></i>累计执行率</span></div>`;
}
function budgetGauge(rate,label,type="warning"){
  const safeRate=Math.max(0,Math.min(100,Number(rate)||0));
  const visualRate=type==="primary"?Math.min(96,safeRate):safeRate;
  const arcLength=100*Math.PI*4/3;
  const progressLength=arcLength*visualRate/100;
  const threshold=type==="warning"?`<span class="budget-gauge-threshold">80%</span>`:"";
  return `<div class="budget-gauge ${type}">
    <svg class="budget-gauge-svg" viewBox="0 0 260 210" aria-hidden="true">
      <path class="budget-gauge-track" d="M43.4 162 A100 100 0 1 1 216.6 162"></path>
      <path class="budget-gauge-progress" stroke-dasharray="${progressLength} ${arcLength}" d="M43.4 162 A100 100 0 1 1 216.6 162"></path>
    </svg>
    <div class="budget-gauge-center"><strong>${percentText(rate)}</strong><span>${label}</span></div>
    ${threshold}
    <div class="budget-gauge-scale"><span>0%</span><span>100%</span></div>
  </div>`;
}
const carbonRows=configs["carbon:碳排放核算"].rows;
const carbonDetailTabs=["核算概览","核算边界与排放源","一类（直接排放）","二类（净购入能源间接排放）","三类（其他间接排放）","数据质量与支撑材料"];
const carbonState={detail:null,detailTab:"核算概览"};
const carbonScopeRows={
  one:[["1","2026-01","天然气锅炉","天然气燃烧","燃料燃烧","CO₂","3,820.00","m³","参数法","低位发热量、含碳量、氧化率","8.26 tCO₂e","GB/T 32150—2025","V2026.1","3 个","CB-20260729-001","正常","2026-07-29 09:28"],["2","2026-01","园区自有车辆","车辆燃油","燃料燃烧","CO₂","620.00","L","综合因子法","汽油综合排放因子","1.44 tCO₂e","国家温室气体排放因子数据库","V2026.1","2 个","CB-20260729-001","正常","2026-07-29 09:28"],["3","2026-02","制冷机组","制冷剂逸散","逸散排放","HFCs","12.00","kg","综合因子法","GWP 参数摘要","22.80 tCO₂e","适用行业指南","V2026.1","1 个","CB-20260729-002","异常","2026-07-29 10:18"]],
  two:[["1","2026-01","净购入电力","286,452.80","0","286,452.80","kWh","--","--","0.5703","kgCO₂e/kWh","生态环境部年度电力因子公告","163.36 tCO₂e","V2026.1","3 个","CB-20260729-003","正常"],["2","2026-01","净购入热力","84.70","0","84.70","t 蒸汽","238.46","GJ","0.11","tCO₂e/GJ","客户确认换算规则及官方数据库","26.23 tCO₂e","V2026.1","2 个","CB-20260729-003","正常"]],
  three:[["1","2026-01","员工通勤","42,800","km","0.00277","tCO₂e/km","国家温室气体排放因子数据库","118.62 tCO₂e","V2026.1","行政部","2 个","CB-20260729-004","正常"],["2","2026-01","商务差旅","38","人次","1.952","tCO₂e/人次","国内行业标准，需客户确认","74.18 tCO₂e","V2026.1","综合部","1 个","CB-20260729-004","提示"]]
};
function carbonFilters(items){return `<div class="card filter-card carbon-filter-card"><div class="safety-flex-filters">${items.map(item=>`<div class="field safety-filter-field ${item.length>4?"long-label":""}"><label>${item}</label><input class="control filter-input" placeholder="请输入或选择${item}"></div>`).join("")}<div class="filter-actions safety-filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div></div></div>`;}
function carbonTable(headers,rows,actions=[]){return `<div class="card table-card carbon-table-card"><div class="table-wrap"><table class="carbon-wide-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}${actions.length?"<th>操作</th>":""}</tr></thead><tbody>${rows.map((row,index)=>`<tr data-row="${index}">${row.map((cell,i)=>`<td>${/状态|情况|材料|结果/.test(headers[i])?tag(cell):cell}</td>`).join("")}${actions.length?`<td class="actions">${actions.map(action=>`<button class="btn text ${action==="删除"?"danger":""}" data-action="${action}">${action}</button>`).join("")}</td>`:""}</tr>`).join("")}</tbody></table></div><div class="pagination"><span>共 ${rows.length} 项数据</span><button class="page-btn" disabled>‹</button><button class="page-btn active">1</button><button class="page-btn" disabled>›</button></div></div>`;}
function renderCarbonAccounting(){
  const cfg=configs["carbon:碳排放核算"];currentCfg=cfg;
  if(carbonState.detail) return renderCarbonDetail();
  page.innerHTML=`${carbonFilters(cfg.filters)}
  <div class="stats carbon-latest-stats">${[["园区综合碳排放量","2,287.53","tCO₂e，一类 + 二类 + 三类"],["一类排放量","128.46","tCO₂e"],["二类排放量","1,842.35","tCO₂e"],["三类排放量","316.72","tCO₂e"]].map(item=>`<div class="card stat"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div><div class="stat-note">${item[2]}</div></div>`).join("")}</div>${table(cfg,pageActions(cfg.primary,null))}`;
}
function renderCarbonDetail(){
  const row=carbonState.detail||carbonRows[0], completed=row[9]==="已完成";
  page.innerHTML=`<div class="carbon-detail-head card"><div><button class="btn" data-action="返回核算列表">返回</button><h2>${row[1]}园区碳排放核算</h2><p>状态：${row[9]} · 报告主体：${row[2]} · 核算依据：GB/T 32150—2025 · 最近更新时间：${row[10]}</p></div><div class="carbon-detail-actions">${completed?`<button class="btn primary" data-action="生成报告">生成报告</button><button class="btn" data-action="重新打开">重新打开</button>`:`<button class="btn" data-action="数据质量自检">数据质量自检</button><button class="btn" data-action="重新汇总">重新汇总</button><button class="btn primary" data-action="完成核算">完成核算</button>`}</div></div>
  <div class="tabs">${carbonDetailTabs.map(tab=>`<button class="tab ${tab===carbonState.detailTab?"active":""}" data-carbon-tab="${tab}">${tab}</button>`).join("")}</div><div class="carbon-detail-body">${carbonDetailContent(carbonState.detailTab,completed)}</div>`;
  setTimeout(renderCarbonCharts,0);
}
function renderCarbonCharts(){
  if(!window.echarts) return;
  const comp=document.getElementById("carbonCompositionChart"); if(comp) echarts.init(comp).setOption({title:{text:"排放构成",left:16,top:12,textStyle:{fontSize:15}},tooltip:{trigger:"item"},legend:{bottom:8},series:[{type:"pie",radius:["42%","68%"],center:["50%","50%"],emphasis:{scale:true},data:[{name:"一类",value:128.46},{name:"二类",value:1842.35},{name:"三类",value:316.72}]}]});
  const trend=document.getElementById("carbonTrendChart"); if(trend) echarts.init(trend).setOption({title:{text:"月度排放趋势",left:16,top:12,textStyle:{fontSize:15}},tooltip:{trigger:"axis"},legend:{bottom:8},xAxis:{type:"category",data:Array.from({length:12},(_,i)=>`${i+1}月`)},yAxis:{type:"value",name:"tCO₂e"},series:[{name:"一类",type:"bar",stack:"total",emphasis:{focus:"series"},data:[10,12,9,11,10,12,9,10,11,10,12,12]},{name:"二类",type:"bar",stack:"total",emphasis:{focus:"series"},data:[150,142,155,148,151,158,149,154,160,156,158,161]},{name:"三类",type:"bar",stack:"total",emphasis:{focus:"series"},data:[22,24,26,23,25,27,26,29,28,27,30,29]}]});
  const project=document.getElementById("carbonProjectChart"); if(project) echarts.init(project).setOption({title:{text:"主要排放项目",left:16,top:12,textStyle:{fontSize:15}},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:110,right:24,bottom:30,top:52},xAxis:{type:"value"},yAxis:{type:"category",data:["购入电力","购入热力","员工通勤","天然气燃烧","商务差旅"]},series:[{type:"bar",data:[1642.3,200.05,118.62,86.4,74.18],emphasis:{focus:"series"}}]});
  const sankey=document.getElementById("carbonSankeyChart"); if(sankey) echarts.init(sankey).setOption({title:{text:"碳流图",left:16,top:12,textStyle:{fontSize:15}},tooltip:{trigger:"item"},series:[{type:"sankey",layout:"none",emphasis:{focus:"adjacency"},data:["天然气","外购电力","外购蒸汽","员工通勤","商务差旅","化石燃料燃烧","净购入使用电力","净购入使用热力","其他间接排放","一类","二类","三类","园区综合碳排放量"].map(name=>({name})),links:[["天然气","化石燃料燃烧",86.4],["化石燃料燃烧","一类",86.4],["外购电力","净购入使用电力",1642.3],["净购入使用电力","二类",1642.3],["外购蒸汽","净购入使用热力",200.05],["净购入使用热力","二类",200.05],["员工通勤","其他间接排放",118.62],["商务差旅","其他间接排放",74.18],["其他间接排放","三类",316.72],["一类","园区综合碳排放量",128.46],["二类","园区综合碳排放量",1842.35],["三类","园区综合碳排放量",316.72]].map(([source,target,value])=>({source,target,value}))}]});}
function carbonDetailContent(tab,completed=false){
  if(tab==="核算概览") return `<div class="stats carbon-overview-stats">${[["园区核算排放量","1,970.81 tCO₂e","按中国核算指南要求纳入的排放项目"],["园区综合碳排放量","2,287.53 tCO₂e","一类 + 二类 + 三类"],["一类排放量及占比","128.46 tCO₂e","5.62%"],["二类排放量及占比","1,842.35 tCO₂e","80.54%"],["三类排放量及占比","316.72 tCO₂e","13.84%"]].map(item=>`<div class="card stat"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div><div class="stat-note">${item[2]}</div></div>`).join("")}</div>
  ${carbonTable(["序号","数据项","当前状态","最近更新时间"],[["1","核算边界","已确认","2026-07-28 16:20"],["2","排放源清单","已维护","2026-07-28 16:40"],["3","一类数据","存在异常","2026-07-29 10:18"],["4","二类数据","已上传","2026-07-29 09:28"],["5","三类数据","已上传","2026-07-29 09:52"],["6","数据质量自检","不通过","2026-07-29 10:18"]],["查看"])}
  <div class="carbon-chart-grid"><div class="card carbon-chart" id="carbonCompositionChart"></div><div class="card carbon-chart" id="carbonTrendChart"></div><div class="card carbon-chart" id="carbonProjectChart"></div></div>`;
  if(tab==="核算边界与排放源") return `<div class="card carbon-info-card"><div class="info-grid">${["报告主体名称","统一社会信用代码","单位性质","所属行业","法定代表人","园区地址","排放报告联系人","联系方式","主要产品或服务","能源品种"].map((label,i)=>`<div class="info-item"><label>${label}</label><div>${["大连微冷园区运营管理有限公司","91210200MA7WL2026X","民营","园区运营服务","李明","大连市三里园区","周正","13800000000 / carbon@weileng.cn","园区运营服务","电力、天然气、蒸汽"][i]}</div></div>`).join("")}</div></div>
  <div class="card carbon-info-card"><div class="card-head"><h3>核算边界</h3></div><div class="info-grid">${["组织边界说明","地理边界说明","纳入原则","边界示意图","与上年度相比是否变化","边界变化说明","不纳入边界说明"].map((label,i)=>`<div class="info-item"><label>${label}</label><div>${["当前园区运营主体自有及控制设施","微冷园区红线范围内运营设施和公共区域","自有设施、控制设施及适用指南要求","已上传 1 个文件","否","--","园区企业独立拥有、独立经营的生产设施不纳入运营主体口径"][i]}</div></div>`).join("")}</div></div>
  ${carbonTable(["序号","设施编号","设施名称","设施类别","安装位置","所属部门","是否纳入边界","纳入依据","运行状态"],[["1","FAC-BOILER-001","天然气锅炉","锅炉","动力站","能源部","是","自有","在用"],["2","FAC-CAR-006","园区自有车辆","车辆","园区公共区","行政部","是","控制","在用"],["3","FAC-REF-012","制冷机组","制冷设备","制冷机房","设备部","是","适用指南要求","在用"]],["查看","编辑"])}
  ${carbonTable(["序号","排放源编号","排放源名称","所属设施","排放类别","排放类型","温室气体种类","核算方法","数据来源","状态"],[["1","SRC-2026-001","天然气燃烧","天然气锅炉","一类","燃料燃烧","CO₂、CH₄、N₂O","参数法","台账、发票、上传文件","启用"],["2","SRC-2026-002","净购入电力","园区配电","二类","购入电力","CO₂","上传结果","发票、上传文件","启用"],["3","SRC-2026-003","员工通勤","园区运营活动","三类","其他间接排放","CO₂","上传结果","通勤台账、上传文件","启用"]],["查看","编辑"])}`;
  if(tab.startsWith("一类")) return `${carbonFilters(["月份","排放类型","排放源","数据状态","导入批次"])}<div class="carbon-scope-toolbar"><button class="btn" data-action="查看计算规则">查看计算规则</button><button class="btn" data-action="下载导入模板">下载导入模板</button><button class="btn primary" data-action="上传核算结果">上传核算结果</button></div>${carbonTable(["序号","月份","排放设施","排放源","排放类型","温室气体","活动数据","活动数据单位","核算方法","排放因子或参数摘要","排放量","因子或参数来源","计算规则版本","支撑材料","导入批次","数据状态","更新时间"],carbonScopeRows.one,completed?["查看"]:["查看","编辑","删除"])}`;
  if(tab.startsWith("二类")) return `${carbonFilters(["月份","排放项目","数据状态"])}<div class="carbon-scope-toolbar"><button class="btn" data-action="查看计算规则">查看计算规则</button><button class="btn" data-action="下载导入模板">下载导入模板</button><button class="btn primary" data-action="上传核算结果">上传核算结果</button></div>${carbonTable(["序号","月份","排放项目","购入量","外供量","净购入量","能源单位","热量换算值","热量单位","排放因子","因子单位","排放因子来源","排放量","计算规则版本","支撑材料","导入批次","数据状态"],carbonScopeRows.two,completed?["查看"]:["查看","编辑","删除"])}`;
  if(tab.startsWith("三类")) return `${carbonFilters(["月份","排放项目","数据状态"])}<div class="carbon-scope-toolbar"><button class="btn" data-action="查看计算规则">查看计算规则</button><button class="btn" data-action="下载导入模板">下载导入模板</button><button class="btn primary" data-action="上传核算结果">上传核算结果</button></div><div class="alert warning"><b>业务规则：</b>三类属于园区扩展管理口径，报告中单独列示，不并入依法报送口径。</div>${carbonTable(["序号","月份","排放项目","活动数据","活动数据单位","排放因子","因子单位","因子来源","排放量","计算规则版本","数据提供部门","支撑材料","导入批次","数据状态"],carbonScopeRows.three,completed?["查看"]:["查看","编辑","删除"])}`;
  return `<div class="carbon-scope-toolbar"><button class="btn primary" data-action="执行自检">执行自检</button><button class="btn" data-action="下载异常数据">下载异常数据</button></div>${carbonTable(["序号","检查项","检查内容","自检结果"],[["1","报告主体","名称、信用代码、行业、联系人是否完整","通过"],["2","核算边界","组织边界、地理边界和变化说明是否完整","通过"],["3","活动数据","是否缺失、是否小于 0、月份是否属于核算年度","提示"],["4","汇总结果","明细合计与年度汇总是否一致","不通过"]])}${carbonTable(["序号","批次号","排放类别","文件名称","规则版本","成功条数","失败条数","覆盖条数","操作人","导入时间"],[["1","CB-20260729-001","一类","一类碳排放核算结果.xlsx","V2026.1","24","1","0","周正","2026-07-29 09:28"],["2","CB-20260729-003","二类","二类净购入能源结果.xlsx","V2026.1","24","0","2","周正","2026-07-29 09:36"]],["查看","下载原文件"])}${carbonTable(["序号","材料名称","材料分类","关联年度","关联排放源或项目","文件类型","上传人","上传时间"],[["1","2026年1月电费结算单","能源购入发票或结算单","2026 年","净购入电力","PDF","周正","2026-07-29 09:20"],["2","员工通勤统计表","运输、差旅、通勤、废弃物处理台账","2026 年","员工通勤","XLSX","周正","2026-07-29 09:50"]],["查看","下载"])}`;
}
function budgetKpiIcon(type){
  const icons={
    target:`<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M9 12h6M12 9v6"></path></svg>`,
    actual:`<svg viewBox="0 0 24 24"><path d="M8 7.5a4 4 0 0 0 0 8h1"></path><path d="M16 16.5a4 4 0 0 0 0-8h-1"></path><path d="M9 12h6"></path></svg>`,
    remain:`<svg viewBox="0 0 24 24"><path d="M12 4 5 12h5l-1 8 8-10h-5l0-6Z"></path></svg>`,
    rate:`<svg viewBox="0 0 24 24"><path d="M19 5 5 19"></path><circle cx="7.5" cy="7.5" r="2.2"></circle><circle cx="16.5" cy="16.5" r="2.2"></circle></svg>`,
    warning:`<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.3 2.9 7.9 7 9 4.1-1.1 7-4.7 7-9V6l-7-3Z"></path><path d="M12 8v5M12 16h.01"></path></svg>`
  };
  return `<i class="budget-kpi-icon">${icons[type]||icons.target}</i>`;
}
function budgetCompareTable(unit){
  const rows=budgetExecutionRows.slice(0,7);
  return `<table class="subtable budget-compare-table"><thead><tr><th>月份</th><th>预算用量（${unit}）</th><th>实际用量（${unit}）</th><th>执行率</th><th>同比变化</th></tr></thead><tbody>${rows.map((row,index)=>{
    const changes=[-2.3,3.1,-1.2,4.5,2.8,1.6,-3.2];
    const change=changes[index];
    return `<tr><td>${row.month}</td><td>${numberText(row.usageBudget,"")}</td><td>${numberText(row.actualUsage,"")}</td><td>${percentText(row.usageRate)}</td><td><span class="budget-change ${change>0?"up":"down"}">${change>0?"↑":"↓"} ${Math.abs(change).toFixed(1)}%</span></td></tr>`;
  }).join("")}</tbody></table>`;
}
function renderBudgetReport(){
  if(budgetState.reportPreview) return renderBudgetReportPreview(budgetState.reportPreview);
  currentCfg={rows:budgetReports,columns:["序号","报告名称","所属园区","能源类型","报告周期/报告类型","预算用量","实际用量","执行率/执行状态","生成时间"]};
  page.innerHTML=`<div class="alert"><b>页面定位：</b>预算报告页面仅管理系统按月度、年度自动生成的预算执行报告档案；实时预算执行分析请在“预算执行”页面查看。</div>
  ${budgetFilters("report")}
  <div class="card table-card budget-table-card"><div class="table-toolbar"><div class="table-toolbar-left"><b>报告列表</b><span class="tag">共 ${budgetReports.length} 条</span></div><div class="table-toolbar-right"><span class="budget-toolbar-note">月度结束后自动生成月度报告，年度结束后自动生成年度报告</span></div></div>
    <div class="table-wrap budget-report-table-wrap"><table class="budget-wide-table budget-report-table"><thead><tr>${currentCfg.columns.map(c=>`<th>${c}</th>`).join("")}<th>操作</th></tr></thead><tbody>${budgetReports.map((row,index)=>`<tr data-row="${index}">
      <td>${index+1}</td>
      <td><button class="table-link budget-report-name-link" data-action="预览">${row.name}</button></td>
      <td>${row.park}</td>
      <td>${row.energy}</td>
      <td><div class="budget-report-two-line"><b>${row.period}</b><span>${row.reportType}</span></div></td>
      <td>${row.usageBudget}</td>
      <td>${row.actualUsage}</td>
      <td><div class="budget-report-two-line"><b>${row.rate}</b><span>${tag(row.executionStatus)}</span></div></td>
      <td>${row.created}</td>
      <td class="actions"><button class="btn text" data-action="下载PDF">下载PDF</button><button class="btn text" data-action="重新生成">重新生成</button></td>
    </tr>`).join("")}</tbody></table></div><div class="pagination"><span>共 ${budgetReports.length} 项数据</span><button class="page-btn" disabled>‹</button><button class="page-btn active">1</button><button class="page-btn" disabled>›</button></div>
  </div>`;
}
function renderBudgetReportPreview(report){
  const rows=budgetExecutionRows.slice(0,7);
  const overRows=rows.filter(row=>row.warningStatus==="超预算");
  const abnormalRows=rows.filter(row=>row.dataStatus!=="完整");
  const conclusion=report.executionStatus==="超预算"?"已超出预算，需复核高耗能设备运行和预算调整依据。":report.executionStatus==="临近预算"?"执行率已接近预算阈值，建议持续关注后续周期用能变化。":"预算执行处于正常范围，可按当前用能节奏持续跟踪。";
  page.innerHTML=`<div class="budget-preview-actions"><button class="btn" data-action="返回报告列表">返回</button><div><button class="btn" data-action="下载PDF">下载PDF</button><button class="btn" data-action="重新生成">重新生成</button></div></div>
  <article class="card budget-report-preview">
    <header class="budget-report-cover">
      <div class="budget-report-title-block"><h1>${report.name}</h1><p>报告编号：${report.id}｜快照编号：${report.snapshot}</p></div>
      <div class="budget-report-cover-meta"><span>${report.park}</span><span>${report.energy}</span><span>${report.reportType}</span><span>${report.period}</span></div>
    </header>
    <section class="budget-report-conclusion ${report.executionStatus==="超预算"?"danger":report.executionStatus==="临近预算"?"warning":"success"}">
      <div><label>执行结论</label><strong>${report.executionStatus}</strong></div>
      <p>${conclusion}</p>
    </section>
    <section class="budget-report-metrics">
      <div><label>预算用量</label><strong>${report.usageBudget}</strong></div>
      <div><label>实际用量</label><strong>${report.actualUsage}</strong></div>
      <div><label>剩余用量</label><strong>${report.remainingUsage}</strong></div>
      <div><label>执行率</label><strong>${report.rate}</strong></div>
    </section>
    <h2>基本信息</h2><section class="info-grid budget-report-info-grid"><div class="info-item"><label>所属园区</label><div>${report.park}</div></div><div class="info-item"><label>能源类型</label><div>${report.energy}</div></div><div class="info-item"><label>报告类型</label><div>${report.reportType}</div></div><div class="info-item"><label>报告周期</label><div>${report.period}</div></div><div class="info-item"><label>生成时间</label><div>${report.created}</div></div><div class="info-item"><label>执行状态</label><div>${tag(report.executionStatus)}</div></div></section>
    <h2>执行摘要</h2><section class="budget-report-summary">
      <div><label>超预算月份</label><strong>${overRows.length} 个</strong><span>${overRows.length?overRows.map(row=>row.month).join("、"):"暂无超预算月份"}</span></div>
      <div><label>数据异常月份</label><strong>${abnormalRows.length} 个</strong><span>${abnormalRows.length?abnormalRows.map(row=>row.month).join("、"):"报告快照内数据完整"}</span></div>
      <div><label>统计口径</label><strong>生成时快照</strong><span>后续预算或能耗数据变化不自动覆盖本报告</span></div>
    </section>
    <h2>月度趋势</h2>${budgetTrendChart()}
    <h2>月度执行明细</h2><table class="subtable"><thead><tr><th>月份</th><th>预算用量</th><th>实际用量</th><th>剩余用量</th><th>执行率</th><th>数据状态</th><th>执行状态</th></tr></thead><tbody>${rows.map(row=>`<tr><td>${row.month}</td><td>${numberText(row.usageBudget,"kWh")}</td><td>${row.actualUsage==="异常"?"数据异常":numberText(row.actualUsage,"kWh")}</td><td>${numberText(row.usageDiff,"kWh")}</td><td>${percentText(row.usageRate)}</td><td>${tag(row.dataStatus)}</td><td>${tag(row.warningStatus)}</td></tr>`).join("")}</tbody></table>
    <h2>超预算情况</h2><table class="subtable"><thead><tr><th>月份</th><th>预算用量</th><th>实际用量</th><th>超出用量</th><th>超出比例</th></tr></thead><tbody>${rows.filter(row=>row.warningStatus==="超预算").map(row=>`<tr><td>${row.month}</td><td>${numberText(row.usageBudget,"kWh")}</td><td>${numberText(row.actualUsage,"kWh")}</td><td>${numberText(Math.abs(row.usageDiff),"kWh")}</td><td>${percentText(row.usageRate-100)}</td></tr>`).join("")||`<tr><td colspan="5" class="table-empty">暂无超预算月份</td></tr>`}</tbody></table>
    <h2>数据说明</h2><section class="info-grid budget-report-info-grid"><div class="info-item"><label>数据统计时间</label><div>${report.statTime}</div></div><div class="info-item"><label>数据来源</label><div>${report.source}</div></div></section>
    <div class="alert"><b>数据快照规则：</b>报告生成时保存当时的预算和实际用量数据；后续预算或能耗数据变化不自动覆盖历史报告。执行重新生成后，更新报告内容、快照编号和生成时间。</div>
  </article>`;
}
function renderDashboard(){
  page.innerHTML=`${pageHead("能源总览","汇总当前园区能源用量、费用、预算执行和告警情况。")}
  <div class="card filter-card energy-dashboard-filter"><div class="filters"><div class="field"><label>时间范围</label><input class="control" value="2026年06月"></div><div class="field"><label>能源类型</label><input class="control" value="全部能源"></div><div class="filter-actions"><button class="btn primary" data-action="刷新">刷新</button></div></div></div>
  <div class="stats energy-click-stats"><button class="card stat" data-nav="每日能耗"><span class="stat-title">当月总能耗</span><strong class="stat-value">328,640 kWh</strong><span class="stat-note">点击穿透至每日能耗</span></button><button class="card stat" data-nav="能源账单"><span class="stat-title">当月能耗费用</span><strong class="stat-value">¥ 286,452.00</strong><span class="stat-note">点击穿透至能源账单</span></button><button class="card stat" data-nav="预算执行"><span class="stat-title">预算执行率</span><strong class="stat-value">81.00%</strong><span class="stat-note">点击穿透至预算执行</span></button><button class="card stat" data-nav="能源告警"><span class="stat-title">当前告警数</span><strong class="stat-value">6</strong><span class="stat-note">点击穿透至能源告警列表</span></button></div>
  <div class="energy-dashboard-grid"><div class="card chart energy-line-chart"><h3>能耗趋势</h3><div class="energy-chart-lines"><i></i><i></i><i></i><i></i><i></i><i></i><span class="line-a"></span><span class="line-b"></span></div><div class="chart-labels"><span>06-01</span><span>06-03</span><span>06-05</span><span>06-07</span><span>06-09</span><span>06-11</span></div></div>
  <div class="card chart"><h3>能源占比</h3><div class="donut-wrap"><div class="donut energy-donut"></div><div class="legend"><span style="--c:#0052d9">电力 64%</span><span style="--c:#2ba471">水 18%</span><span style="--c:#ed7b2f">天然气 11%</span><span style="--c:#7d63d8">蒸汽 7%</span></div></div></div></div>
  <div class="card table-card"><div class="table-toolbar"><b>最近告警</b><button class="btn text" data-nav="能源告警">查看全部</button></div><div class="table-wrap"><table><thead><tr><th>报警位置</th><th>用能类型</th><th>告警类型</th><th>用能值</th><th>报警时间</th><th>操作</th></tr></thead><tbody>${configs["alarm:能源告警"].rows.slice(0,5).map(r=>`<tr><td><span class="link" data-nav="能源告警">${r[1]}</span></td><td>${r[2]}</td><td>${energyAlarmTypeTag(r[3])}</td><td>${r[4]}</td><td>${r[7]}</td><td><button class="btn text" data-nav="能源告警">穿透查看</button></td></tr>`).join("")}</tbody></table></div></div>`;
}
function renderCarbonFlow(){
  const cfg=configs["carbon:碳足迹与碳流图"];currentCfg=cfg;
  page.innerHTML=`${pageHead("碳足迹与碳流图",cfg.desc,null,"导出")}${carbonFilters(cfg.filters)}
  <div class="stats carbon-latest-stats">${[["园区核算排放量","1,970.81","tCO₂e"],["园区综合碳排放量","2,287.53","tCO₂e"],["一类排放量","128.46","tCO₂e"],["二类排放量","1,842.35","tCO₂e"],["三类排放量","316.72","tCO₂e"]].map(item=>`<div class="card stat"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div><div class="stat-note">${item[2]}</div></div>`).join("")}</div>
  <div class="carbon-flow-layout"><div class="card carbon-chart" id="carbonCompositionChart"></div><div class="card carbon-sankey" id="carbonSankeyChart"></div></div>
  <div class="carbon-chart-grid"><div class="card carbon-chart" id="carbonTrendChart"></div><div class="card carbon-chart" id="carbonProjectChart"></div></div>
  ${carbonTable(cfg.columns,cfg.rows,["详情"])}`;
  setTimeout(renderCarbonCharts,0);
}
function renderCarbonReport(){
  const cfg=configs["carbon:碳排放报告"];currentCfg=cfg;
  page.innerHTML=`${carbonFilters(cfg.filters)}${table(cfg,pageActions(null,cfg.secondary))}
  <div class="alert"><b>报告模板：</b>园区温室气体排放报告包含报告主体、核算边界、排放设施和排放源、核算方法、活动数据与排放因子、排放结果、数据质量控制、变更说明、碳足迹与碳流分析和需要说明事项。碳资产基础数据报表基于已完成年度核算快照生成。</div>`;
}
function renderSafetyManagement(){
  const cfg=configs["safety:氨气监测管理"];currentCfg=cfg;
  const rows=cfg.allRows||cfg.rows;
  const totalDevices=cfg.total||rows.length;
  const offlineCount=rows.filter(row=>row[5]==="离线").length;
  const onlineCount=Math.max(totalDevices-offlineCount,0);
  const onlineRate=totalDevices?`${((onlineCount/totalDevices)*100).toFixed(1)}%`:"0%";
  const lowCount=rows.filter(row=>row[7]==="低报").length;
  const highCount=rows.filter(row=>row[7]==="高报").length;
  page.innerHTML=`<div class="stats perimeter-alarm-stats ammonia-device-stats">${[["设备总数",String(totalDevices),"当前纳管氨气监测设备总量"],["离线设备",String(offlineCount),"最近未正常上报的设备数量"],["设备在线率",onlineRate,`在线 ${onlineCount} 台 / 总数 ${totalDevices} 台`],["低报设备",String(lowCount),"最新浓度达到低报阈值设备"],["高报设备",String(highCount),"最新浓度达到高报阈值设备"]].map(item=>`<div class="card stat"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div><div class="stat-note">${item[2]}</div></div>`).join("")}</div>
  ${safetyPerimeterFilters(cfg)}
  ${safetyManagementTable(cfg)}`;
}
function renderThresholdConfig(){
  const cfg=configs["safety:阈值配置"];currentCfg=cfg;
  page.innerHTML=`<div class="threshold-config-layout">
    <div class="visitor-save-actions threshold-config-save-actions">
      <span class="threshold-config-modified-time">上次修改时间：${thresholdConfigLastModified}</span>
      <button class="btn primary" data-threshold-action="保存">保存配置</button>
    </div>
    <div class="visitor-config-page">
      <div class="visitor-config-main threshold-config-main">
        <section class="card visitor-config-section visitor-rule-card" id="threshold-concentration-rule">
          <div class="card-head"><h3><i>浓</i>浓度阈值规则</h3></div>
          <div class="card-body visitor-setting-grid">
            ${thresholdConfigFields.slice(0,2).map(field=>`<div class="visitor-setting-item">
              <div><label>${field.label}</label><p>${field.note}</p></div>
              <div class="unit-control"><input class="control" type="number" min="0" step="1" data-threshold-field="${field.key}" value="${escapeAttr(thresholdConfigState[field.key])}"><span>${field.unit}</span></div>
            </div>`).join("")}
          </div>
        </section>
        <section class="card visitor-config-section visitor-rule-card" id="threshold-trigger-rule">
          <div class="card-head"><h3><i>触</i>上传与触发规则</h3></div>
          <div class="card-body visitor-setting-grid">
            ${thresholdConfigFields.slice(2,4).map(field=>`<div class="visitor-setting-item">
              <div><label>${field.label}</label><p>${field.note}</p></div>
              <div class="unit-control"><input class="control" type="number" min="0" step="1" data-threshold-field="${field.key}" value="${escapeAttr(thresholdConfigState[field.key])}"><span>${field.unit}</span></div>
            </div>`).join("")}
          </div>
        </section>
        <section class="card visitor-config-section visitor-rule-card" id="threshold-recover-rule">
          <div class="card-head"><h3><i>恢</i>恢复与抑制规则</h3></div>
          <div class="card-body visitor-setting-grid">
            ${thresholdConfigFields.slice(4).map(field=>`<div class="visitor-setting-item">
              <div><label>${field.label}</label><p>${field.note}</p></div>
              <div class="unit-control"><input class="control" type="number" min="0" step="1" data-threshold-field="${field.key}" value="${escapeAttr(thresholdConfigState[field.key])}"><span>${field.unit}</span></div>
            </div>`).join("")}
          </div>
        </section>
      </div>
    </div>
  </div>`;
}
function alarmRuleTabs(){
  const cfg=configs["alarm:告警规则配置"];
  return `<div class="tabs alarm-rule-tabs">${cfg.tabs.map(tab=>`<button class="tab ${tab===alarmRuleConfigTab?"active":""}" data-tab="${tab}">${tab}</button>`).join("")}</div>`;
}
function collectAlarmRuleConfigValues(){
  document.querySelectorAll("[data-alarm-threshold-field]").forEach(input=>{
    const path=input.dataset.alarmThresholdField.split(".");
    if(path[0]==="base"){
      alarmRuleConfigState.base[path[1]][path[2]]=input.value.trim()||"0.00";
    }else if(path.length===2){
      alarmRuleConfigState[path[0]][path[1]]=input.value.trim()||"0";
    }else{
      alarmRuleConfigState[path[0]][path[2]]=input.value.trim()||"0.00";
    }
  });
  const selected=document.querySelector("[data-alarm-base-strategy]:checked");
  if(selected) alarmRuleConfigState.baseStrategy=selected.dataset.alarmBaseStrategy;
  document.querySelectorAll("[data-alarm-switch]").forEach(input=>{
    alarmRuleConfigState[input.dataset.alarmSwitch].enabled=input.checked;
  });
}
function alarmThresholdInput(scope,key,energy){
  const state=alarmRuleConfigState[scope];
  const value=scope==="base"?alarmRuleConfigState.base[key][energy.key]:state[energy.key];
  const note=scope==="base"?alarmBaseStrategies.find(item=>item.key===key)?.desc:alarmIndependentMeta[scope]?.fieldNote;
  const isRatioBase=scope==="base"&&key!=="fixed";
  const labelSuffix=scope==="base"?(isRatioBase?"增幅阈值":"上限"):"增量阈值";
  const unit=isRatioBase?"%":energy.unit;
  return `<div class="alarm-threshold-field">
    <div><label>${energy.name}${labelSuffix}</label><p>${note}</p></div>
    <div class="unit-control"><input class="control" type="number" min="0" step="0.01" data-alarm-threshold-field="${scope}.${key}.${energy.key}" value="${escapeAttr(value)}"><span>${unit}</span></div>
  </div>`;
}
function alarmBaseStrategyCard(strategy){
  const active=alarmRuleConfigState.baseStrategy===strategy.key;
  return `<section class="card visitor-config-section alarm-base-card ${active?"active":""}" data-alarm-base-card="${strategy.key}">
    <div class="card-head">
      <h3><label class="alarm-strategy-radio"><input type="radio" name="alarm-base-strategy" data-alarm-base-strategy="${strategy.key}" ${active?"checked":""}><span></span>${strategy.name}</label></h3>
      ${active?`<span class="tag primary">当前生效</span>`:""}
    </div>
    <div class="card-body alarm-threshold-grid">
      ${alarmEnergyTypes.map(energy=>alarmThresholdInput("base",strategy.key,energy)).join("")}
    </div>
  </section>`;
}
function alarmIndependentSection(key,title,desc){
  const state=alarmRuleConfigState[key];
  const windowField=key==="surge"?`<div class="alarm-monitor-window">
    <label>监测时间窗口</label>
    <div class="unit-control"><input class="control" type="number" min="1" step="1" data-alarm-threshold-field="surge.window" value="${escapeAttr(state.window)}"><span>小时</span></div>
    <p>窗口期内对应能源增量超过上限时生成告警。</p>
  </div>`:key==="period"?`<div class="alarm-monitor-window alarm-period-window">
    <label>时段范围</label>
    <div class="alarm-period-range">
      <input class="control" type="time" data-alarm-threshold-field="period.start" value="${escapeAttr(state.start)}">
      <span>至</span>
      <input class="control" type="time" data-alarm-threshold-field="period.end" value="${escapeAttr(state.end)}">
    </div>
    <p>例如：22:00 至 06:00 表示跨天夜间时段。</p>
  </div>`:"";
  return `<section class="card alarm-independent-card ${key==="single"?"no-window":""}">
    <div class="alarm-independent-head">
      <div><h3>${title}</h3><p>${desc}</p></div>
      <div class="alarm-switch-wrap"><label class="switch-control"><input type="checkbox" data-alarm-switch="${key}" ${state.enabled?"checked":""}><span></span><b>${state.enabled?"已开启":"已关闭"}</b></label></div>
    </div>
    <div class="alarm-independent-body">
      ${windowField}
      <div class="alarm-independent-fields">${alarmEnergyTypes.map(energy=>alarmThresholdInput(key,key,energy)).join("")}</div>
    </div>
  </section>`;
}
function alarmThresholdTypeClass(type){
  if(type==="固定阈值") return "fixed";
  if(type==="环比上月均值") return "mom";
  if(type==="同比去年均值") return "yoy";
  if(type==="能耗骤增异常") return "surge";
  if(type==="单次读数增量阈值") return "single";
  return "default";
}
function renderAlarmThresholdList(){
  const locations=[...new Set(alarmThresholdListRows.map(row=>row[1]))];
  const modes=[...new Set(alarmThresholdListRows.map(row=>row[2]))];
  return `<div class="card filter-card alarm-threshold-list-filter">
    <div class="filters">
      <div class="field"><label>位置</label><select class="control filter-input"><option value="">全部</option>${locations.map(location=>`<option>${location}</option>`).join("")}</select></div>
      <div class="field"><label>监测模式</label><select class="control filter-input"><option value="">全部</option>${modes.map(mode=>`<option>${mode}</option>`).join("")}</select></div>
      <div class="filter-actions"><button class="btn" data-action="重置">重置</button><button class="btn primary" data-action="查询">查询</button></div>
    </div>
  </div>
  <div class="card table-card alarm-threshold-list-card">
    <div class="table-toolbar"><div class="table-toolbar-left"><b>阈值列表</b><span class="tag">共 ${alarmThresholdListRows.length} 条</span></div><div class="table-toolbar-right"></div></div>
    <div class="table-wrap">
      <table class="alarm-threshold-list-table">
        <thead><tr>${["序号","位置","监测模式","阈值类型","时段/窗口","用电阈值","用水阈值","用蒸汽阈值","创建人","创建时间","操作"].map(column=>`<th>${column}</th>`).join("")}</tr></thead>
        <tbody>${alarmThresholdListRows.map(row=>`<tr>${row.map((cell,index)=>`<td>${index===3?`<span class="alarm-threshold-type ${alarmThresholdTypeClass(cell)}">${cell}</span>`:cell}</td>`).join("")}<td class="actions"><button class="btn text" data-action="修改">修改</button><button class="btn text danger" data-action="删除">删除</button></td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="pagination"><span>共 ${alarmThresholdListRows.length} 条</span><button class="page-btn" disabled>‹</button><button class="page-btn active">1</button><button class="page-btn" disabled>›</button></div>
  </div>`;
}
function renderAlarmRuleConfig(){
  const cfg=configs["alarm:告警规则配置"];currentCfg=cfg;
  const tabs=alarmRuleTabs();
  if(alarmRuleConfigTab==="阈值列表"){
    page.innerHTML=`${tabs}${renderAlarmThresholdList()}`;
    return;
  }
  page.innerHTML=`${tabs}<div class="alarm-rule-config">
    <div class="visitor-save-actions threshold-config-save-actions">
      <span class="threshold-config-modified-time">上次修改时间：${alarmRuleLastModified}</span>
      <button class="btn primary" data-alarm-threshold-action="保存">保存配置</button>
    </div>
    <section class="alarm-section">
      <div class="alarm-section-title"><h2>基础能耗告警策略</h2><span>三选一，当前仅一类基础策略生效</span></div>
      <div class="alarm-base-grid">${alarmBaseStrategies.map(alarmBaseStrategyCard).join("")}</div>
    </section>
    <section class="alarm-section">
      <div class="alarm-section-title"><h2>独立监测维度</h2><span>无论基础策略选哪种，以下配置均独立生效</span></div>
      <div class="alarm-independent-grid">
        ${alarmIndependentSection("surge",alarmIndependentMeta.surge.title,alarmIndependentMeta.surge.desc)}
        ${alarmIndependentSection("single",alarmIndependentMeta.single.title,alarmIndependentMeta.single.desc)}
        ${alarmIndependentSection("period",alarmIndependentMeta.period.title,alarmIndependentMeta.period.desc)}
      </div>
    </section>
  </div>`;
}
function renderDeviceAlarm(){
  const cfg=configs["safety:设备告警"];currentCfg=cfg;
  const rows=cfg.allRows||cfg.rows;
  const pendingCount=rows.filter(row=>row[6]==="待确认").length;
  const assignedCount=rows.filter(row=>row[6]==="待接单").length;
  const processingCount=rows.filter(row=>row[6]==="处置中").length;
  const completedCount=rows.filter(row=>row[6]==="已完成").length;
  const closedCount=rows.filter(row=>row[6]==="误报关闭").length;
  page.innerHTML=`<div class="stats perimeter-alarm-stats device-alarm-stats">${[
    ["告警总数",String(cfg.total||rows.length),"当前纳管设备告警总量"],
    ["待确认",String(pendingCount),"待值班人员确认是否有效"],
    ["待接单",String(assignedCount),"已派单，等待处理人在 App 接单"],
    ["处置中",String(processingCount),"责任人正在现场处置，完成后由移动端提交"],
    ["已闭环",String(completedCount+closedCount),`已完成 ${completedCount} 条 / 误报关闭 ${closedCount} 条`]
  ].map(item=>`<div class="card stat"><div class="stat-title">${item[0]}</div><div class="stat-value">${item[1]}</div><div class="stat-note">${item[2]}</div></div>`).join("")}</div>
  ${safetyAlarmFilters()}
  ${deviceAlarmTable(cfg)}`;
}
function renderIndicatorTab(tabName="能效指标管理"){
  const cfg=configs["analysis:指标分析与预警"];currentCfg=cfg;
  const tabs=`<div class="tabs">${cfg.tabs.map(x=>`<button class="tab ${x===tabName?"active":""}" data-tab="${x}">${x}</button>`).join("")}</div>`;
  if(tabName==="运行参数曲线"){page.innerHTML=`${pageHead(activePage,"展示能耗指标与运行参数叠加曲线。")}${tabs}${filters(["时间范围","能效指标"])}${detailTables["指标分析与预警:运行参数曲线"]}`;return;}
  if(tabName==="预警配置"){const w=E("配置指标或预算预警规则。",["预警对象类型","预警对象"],["预警对象类型","预警对象","预警阈值","生效时间"],[["指标","单位产量电耗","高于目标值 5.00%","2026-01-01 00:00:00"],["预算","生产一部年度预算","执行率达到 80.00%","2026-01-01 00:00:00"]],{actions:["编辑预警规则"],linkAction:false});currentCfg=w;page.innerHTML=`${tabs}${filters(w.filters)}${table(w,pageActions("新增预警规则"))}`;return;}
  page.innerHTML=`${tabs}${filters(cfg.filters)}${table(cfg,pageActions("新增指标"))}`;
}
function renderMeterTab(){
  const cfg=configs["billing:计量关系"];
  currentCfg=cfg;
  page.innerHTML=`<div class="alert"><b>业务规则：</b>${cfg.rule}</div>${meterRelationFilters()}${table(cfg,pageActions(cfg.primary,cfg.secondary))}`;
}
function billingMethodCell(method,energy){
  const cfg=billingMethodConfigs[method];
  const item=cfg.values[energy.name];
  if(!item){
    return `<div class="billing-matrix-cell billing-matrix-cell-empty">
      <div class="billing-empty-title">未配置</div>
      <div class="billing-empty-text">当前计费方式暂未维护${energy.name}参数，绑定该能源时不可选择此方式。</div>
      <div class="billing-cell-actions">
        <button class="btn primary" data-billing-method="${method}" data-billing-energy="${energy.name}">配置</button>
      </div>
    </div>`;
  }
  return `<div class="billing-matrix-cell">
    <div class="billing-cell-price">${item.price}</div>
    <div class="billing-cell-meta">
      <span><b>周期</b>${item.cycle}</span>
      <span><b>规则</b>${item.rule}</span>
    </div>
    <div class="billing-cell-actions">
      <button class="btn text" data-billing-method="${method}" data-billing-energy="${energy.name}">编辑</button>
    </div>
  </div>`;
}
function renderBillingMethods(){
  currentCfg=configs["billing:计费方式"];
  page.innerHTML=`<div class="billing-method-toolbar">
    <div class="billing-method-summary"><b>计费参数矩阵</b><span>4 种固定计费方式 × 水 / 电 / 蒸汽 3 类能源，共 12 组参数</span></div>
    <div class="billing-method-actions"><span class="billing-method-updated">上次修改时间：${billingMethodLastModified}</span><button class="btn primary" data-action="保存配置">保存配置</button></div>
  </div>
  <div class="billing-matrix">
    <div class="billing-matrix-head billing-matrix-method-head">计费方式</div>
    ${billingEnergyTypes.map(energy=>`<div class="billing-matrix-head"><strong>${energy.name}</strong><span>${energy.meter} · ${energy.unit}</span></div>`).join("")}
    ${billingMethodTypes.map(method=>{
      const cfg=billingMethodConfigs[method];
      const configured=billingEnergyTypes.filter(energy=>cfg.values[energy.name]).length;
      return `<div class="billing-method-row-head"><strong>${method}</strong><span>${cfg.desc}</span><em class="${configured<3?"warning":""}">已配置 ${configured} 类能源</em></div>${billingEnergyTypes.map(energy=>billingMethodCell(method,energy)).join("")}`;
    }).join("")}
  </div>`;
}
function renderStandard(){
  const cfg=configs[`${activeModule}:${activePage}`]; currentCfg=cfg;
  if(!cfg){page.innerHTML=`<div class="alert warning"><b>需客户确认：</b>${activePage}暂未配置页面字段和交互。</div>`;return;}
  const filterHtml=activePage==="远传设备管理"?remoteDeviceFilters():activePage==="人工表计管理"?manualMeterFilters():activePage==="抄表管理"?meterReadingFilters():activePage==="计量关系"?meterRelationFilters():activePage==="每日能耗"?dailyEnergyFilters():activePage==="能源告警"?energyAlarmFilters():filters(cfg.filters);
  page.innerHTML=`${cfg.rule&&!cfg.noRule?`<div class="alert ${/不支持人工新增|不可物理删除/.test(cfg.rule)?"warning":""}"><b>业务规则：</b>${cfg.rule}</div>`:""}${cfg.tabs?`<div class="tabs">${cfg.tabs.map((x,i)=>`<button class="tab ${i===0?"active":""}" data-tab="${x}">${x}</button>`).join("")}</div>`:""}${filterHtml}${table(cfg,pageActions(cfg.primary,cfg.secondary))}`;
}
function renderPage(){
  renderMenu();
  document.getElementById("energyBreadcrumb").textContent=`能源管理系统 / ${energyModules.find(x=>x.id===activeModule).name} / ${activePage}`;
  if(activePage==="能源总览") return renderDashboard();
  if(activePage==="碳排放核算") return renderCarbonAccounting();
  if(activePage==="碳足迹与碳流图") return renderCarbonFlow();
  if(activePage==="碳排放报告") return renderCarbonReport();
  if(activePage==="氨气监测管理") return renderSafetyManagement();
  if(activePage==="阈值配置") return renderThresholdConfig();
  if(activePage==="设备告警") return renderDeviceAlarm();
  if(activePage==="指标分析与预警") return renderIndicatorTab();
  if(activePage==="告警规则配置") return renderAlarmRuleConfig();
  if(activePage==="计费方式") return renderBillingMethods();
  if(activePage==="计量关系") return renderMeterTab();
  if(activePage==="预算管理") return renderBudgetManagement();
  if(activePage==="预算执行") return renderBudgetExecution();
  if(activePage==="预算报告") return renderBudgetReport();
  renderStandard();
}

const detailTabs={
  "计费规则配置":["规则信息","计费参数","审批记录","规则快照"],"表具与计费关联":["表具信息","计费关联","抄表记录","操作日志"],
  "账单列表":["基本信息","费用明细","规则快照","缴费凭证","财务确认"],"用能统计与报表":["统计结果"],"水电气能耗监控":["表具读数","抄表记录"],
  "指标分析与预警":["指标信息","运行参数曲线","预警配置"],"异常诊断与处置":["异常信息","触发记录","处理记录","操作日志"],
  "碳排放核算":["核算概览","核算边界与排放源","数据质量与支撑材料"],"碳排放报告":["报告信息","生成数据快照","操作日志"],
  "远传设备管理":["设备信息","业务属性","同步记录","操作日志"],"人工表计管理":["表计信息","绑定位置","人工抄表记录","操作日志"],"每日能耗":["设备读数"],"抄表管理":["抄表信息","读数校验","操作日志"],
  "计费方式":["方式信息","计费参数","审批记录"],"计量关系":["关联表计","关联账单"],"能源账单":["基本信息","费用明细","规则快照","缴费凭证","财务确认"],"缴费管理":["缴费信息","缴费凭证","财务确认","操作日志"],
  "告警规则配置":["规则信息","适用对象","变更记录"],"能源告警":["告警信息","触发记录","处理记录","操作日志"],
  "氨气监测管理":["实时监测","告警记录","阈值配置","更新日志"],"阈值配置":["阈值信息","适用设备","变更记录"],"设备告警":["告警信息","流程明细"],
  "能源类型与单位配置":["配置信息","变更记录","引用快照"],"碳排换算系数配置":["配置信息","变更记录","引用快照"],"计费参数配置":["配置信息","变更记录","引用快照"],
  "分项类型配置":["配置信息","变更记录","引用快照"],"异常规则参数配置":["配置信息","变更记录","引用快照"],"行业能耗标准配置":["配置信息","变更记录","引用快照"]
};
const extraDetailFields={
  "计费规则配置":["适用对象类型","规则审批结果"],"表具与计费关联":["抄表方式"],"账单列表":["生成时间","财务确认状态"],
  "异常诊断与处置":["异常原因","处理说明","误告警原因"],"碳排放核算":["报告编号"],
  "计费方式":["适用对象类型","规则审批结果"],"能源账单":["生成时间","财务确认状态"],"缴费管理":["确认人","确认时间"],
  "远传设备管理":["关联对象","业务属性维护人"],"人工表计管理":["表计倍率","最近抄表人"],"每日能耗":["数据来源"],"抄表管理":["校验结果"],
  "告警规则配置":["规则快照"],"能源告警":["异常原因","处理说明","误告警原因"],
  "氨气监测管理":["告警负责人","最新状态"],"阈值配置":["告警对象","默认通知策略"],"设备告警":["低报阈值","高报阈值","持续时长","恢复持续时长"]
};
const extraValues={"适用对象类型":"部门","规则审批结果":"已通过","抄表方式":"自动采集","生成时间":"2026-06-01 02:00:00","财务确认状态":"待确认","异常来源":"系统自动检测","异常原因":"—","处理说明":"—","误告警原因":"—","能源类型":"电力","预算值":"¥ 2,860,000.00","报告编号":"CR-202605-0012","告警阈值":"30 ppm","处置说明":"—","处置结果":"—","监测设备状态":"在线","告警负责人":"王海","最新状态":"高报告警","告警对象":"氨气监测设备","默认通知策略":"站内消息 + 短信","低报阈值":"20 ppm","高报阈值":"30 ppm","持续时长":"连续 30 秒","恢复持续时长":"连续 5 分钟"};
function infoItems(row){
  const fields=[...(currentCfg?.columns||[]),...(extraDetailFields[activePage]||[])];
  return fields.map(f=>{const i=currentCfg?.columns.indexOf(f)??-1;const v=i>=0?row[i]:(extraValues[f]||"—");return `<div class="info-item"><label>${f}</label><div>${v}</div></div>`;}).join("");
}
const detailTables={
  "计费规则配置:计费参数":`<table class="subtable"><thead><tr><th>计费模式</th><th>时段 / 阶梯</th><th>单价 / 包干金额</th><th>生效日期</th></tr></thead><tbody><tr><td>分时单价</td><td>峰时段 08:00-12:00</td><td>0.92 元/kWh</td><td>2026-01-01</td></tr><tr><td>分时单价</td><td>谷时段 00:00-07:00</td><td>0.38 元/kWh</td><td>2026-01-01</td></tr></tbody></table>`,
  "表具与计费关联:抄表记录":`<table class="subtable"><thead><tr><th>抄表周期</th><th>上次读数</th><th>本次读数</th><th>本次用量</th><th>抄表方式</th><th>抄表时间</th></tr></thead><tbody><tr><td>2026-05</td><td>268,130.80</td><td>286,452.80</td><td>18,322.00</td><td>自动采集</td><td>2026-06-01 00:05:12</td></tr></tbody></table>`,
  "表具与计费关联:计费关联":`<table class="subtable"><thead><tr><th>关联主体</th><th>表具数量</th><th>能源类型</th><th>计费方式</th><th>读数汇总</th></tr></thead><tbody><tr><td>生产一部</td><td>6</td><td>电</td><td>生产用电分时计费</td><td>286,452.80 kWh</td></tr></tbody></table>`,
  "账单列表:基本信息":`<div class="info-grid"><div class="info-item"><label>账单编号</label><div>EN-BILL-202605-00128</div></div><div class="info-item"><label>月份</label><div>2026-05</div></div><div class="info-item"><label>部门</label><div>生产一部</div></div><div class="info-item"><label>生成时间</label><div>2026-06-01 02:00:00</div></div><div class="info-item"><label>缴费截止日</label><div>2026-06-20</div></div><div class="info-item"><label>缴费状态</label><div>待缴费</div></div></div>`,
  "账单列表:费用明细":`<table class="subtable"><thead><tr><th>能源类型</th><th>上月读数</th><th>本月读数</th><th>实际用量</th><th>计费方式</th><th>计费参数</th><th>金额</th></tr></thead><tbody><tr><td>电</td><td>118,130.80</td><td>286,452.80</td><td>168,322.00 kWh</td><td>分时单价</td><td>参数版本 V2026.1</td><td>¥ 126,841.20</td></tr></tbody></table>`,
  "账单列表:缴费凭证":`<div class="info-grid"><div class="info-item"><label>缴费时间</label><div>—</div></div><div class="info-item"><label>支付方式</label><div>—</div></div><div class="info-item"><label>流水号</label><div>—</div></div><div class="info-item"><label>凭证编号</label><div>—</div></div><div class="info-item"><label>附件</label><div>—</div></div><div class="info-item"><label>财务确认状态</label><div>待确认</div></div></div>`,
  "账单列表:财务确认":`<div class="info-grid"><div class="info-item"><label>财务确认状态</label><div>待确认</div></div><div class="info-item"><label>确认结果</label><div>—</div></div><div class="info-item"><label>驳回原因</label><div>—</div></div><div class="info-item"><label>确认时间</label><div>—</div></div></div>`,
  "计费方式:计费参数":`<table class="subtable"><thead><tr><th>计费方式</th><th>能源类型</th><th>时段 / 阶梯</th><th>单价 / 包干金额</th><th>生效日期</th></tr></thead><tbody><tr><td>分时单价</td><td>电</td><td>峰时段 08:00-12:00</td><td>0.92 元/kWh</td><td>2026-01-01</td></tr><tr><td>分时单价</td><td>蒸汽</td><td>平段 08:00-18:00</td><td>238 元/t</td><td>2026-01-01</td></tr></tbody></table>`,
  "计量关系:抄表记录":`<table class="subtable"><thead><tr><th>抄表周期</th><th>上次读数</th><th>本次读数</th><th>本次用量</th><th>抄表方式</th><th>抄表时间</th></tr></thead><tbody><tr><td>2026-05</td><td>268,130.80</td><td>286,452.80</td><td>18,322.00</td><td>自动采集</td><td>2026-06-01 00:05:12</td></tr></tbody></table>`,
  "计量关系:计费关联":`<table class="subtable"><thead><tr><th>关联主体</th><th>表具数量</th><th>能源类型</th><th>计费方式</th><th>读数汇总</th></tr></thead><tbody><tr><td>生产一部</td><td>6</td><td>电</td><td>生产用电分时计费</td><td>286,452.80 kWh</td></tr></tbody></table>`,
  "能源账单:费用明细":`<table class="subtable"><thead><tr><th>能源类型</th><th>上月读数</th><th>本月读数</th><th>实际用量</th><th>计费方式</th><th>计费参数</th><th>金额</th></tr></thead><tbody><tr><td>电</td><td>118,130.80</td><td>286,452.80</td><td>168,322.00 kWh</td><td>分时单价</td><td>参数版本 V2026.1</td><td>¥ 126,841.20</td></tr></tbody></table>`,
  "能源账单:缴费凭证":`<div class="info-grid"><div class="info-item"><label>缴费时间</label><div>—</div></div><div class="info-item"><label>支付方式</label><div>—</div></div><div class="info-item"><label>流水号</label><div>—</div></div><div class="info-item"><label>凭证编号</label><div>—</div></div><div class="info-item"><label>附件</label><div>—</div></div><div class="info-item"><label>财务确认状态</label><div>待确认</div></div></div>`,
  "能源账单:财务确认":`<div class="info-grid"><div class="info-item"><label>财务确认状态</label><div>待确认</div></div><div class="info-item"><label>确认结果</label><div>—</div></div><div class="info-item"><label>驳回原因</label><div>—</div></div><div class="info-item"><label>确认时间</label><div>—</div></div></div>`,
  "缴费管理:缴费凭证":`<div class="info-grid"><div class="info-item"><label>缴费时间</label><div>2026-06-09 15:26</div></div><div class="info-item"><label>支付方式</label><div>银行转账</div></div><div class="info-item"><label>流水号</label><div>TR-20260609-8621</div></div><div class="info-item"><label>凭证附件</label><div>已上传</div></div></div>`,
  "缴费管理:财务确认":`<div class="info-grid"><div class="info-item"><label>确认状态</label><div>待确认</div></div><div class="info-item"><label>确认人</label><div>—</div></div><div class="info-item"><label>确认时间</label><div>—</div></div><div class="info-item"><label>驳回原因</label><div>—</div></div></div>`,
  "远传设备管理:业务属性":`<div class="info-grid"><div class="info-item"><label>所属园区</label><div>微冷园区</div></div><div class="info-item"><label>安装位置</label><div>1#配电室</div></div><div class="info-item"><label>关联对象</label><div>生产一部</div></div><div class="info-item"><label>维护方式</label><div>能源系统维护业务属性，设备基础信息由接口同步</div></div></div>`,
  "远传设备管理:同步记录":`<table class="subtable"><thead><tr><th>同步时间</th><th>同步来源</th><th>同步结果</th><th>新增设备</th><th>更新设备</th><th>失败原因</th></tr></thead><tbody><tr><td>2026-06-11 10:30:00</td><td>IoT 设备接口</td><td>成功</td><td>0</td><td>4</td><td>—</td></tr><tr><td>2026-06-11 09:30:00</td><td>IoT 设备接口</td><td>成功</td><td>1</td><td>3</td><td>—</td></tr></tbody></table>`,
  "人工表计管理:绑定位置":`<div class="info-grid"><div class="info-item"><label>所属园区</label><div>微冷园区</div></div><div class="info-item"><label>安装位置</label><div>食堂给水支管</div></div><div class="info-item"><label>绑定对象</label><div>后勤部</div></div><div class="info-item"><label>位置状态</label><div>已绑定</div></div></div>`,
  "人工表计管理:人工抄表记录":`<table class="subtable"><thead><tr><th>抄表周期</th><th>上次读数</th><th>本次读数</th><th>本次用量</th><th>抄表人</th><th>抄表时间</th></tr></thead><tbody><tr><td>2026-06</td><td>8,102.8</td><td>8,216.4</td><td>113.6 m³</td><td>王海</td><td>2026-06-10 18:20:00</td></tr></tbody></table>`,
  "指标分析与预警:运行参数曲线":`<div class="card chart energy-line-chart"><h3>能耗指标与运行参数叠加曲线</h3><div class="energy-chart-lines"><i></i><i></i><i></i><i></i><i></i><i></i><span class="line-a"></span><span class="line-b"></span></div><div class="chart-labels"><span>1日</span><span>5日</span><span>10日</span><span>15日</span><span>20日</span><span>25日</span></div></div>`,
  "指标分析与预警:预警配置":`<table class="subtable"><thead><tr><th>预警对象类型</th><th>预警对象</th><th>预警阈值</th><th>生效时间</th></tr></thead><tbody><tr><td>指标</td><td>单位产量电耗</td><td>高于目标值 5.00%</td><td>2026-01-01 00:00:00</td></tr></tbody></table>`,
  "碳排放核算:数据质量与支撑材料":`<table class="subtable"><thead><tr><th>序号</th><th>检查项</th><th>检查内容</th><th>自检结果</th></tr></thead><tbody><tr><td>1</td><td>报告主体</td><td>名称、信用代码、行业、联系人是否完整</td><td>通过</td></tr><tr><td>2</td><td>汇总结果</td><td>明细合计与年度汇总是否一致</td><td>不通过</td></tr></tbody></table>`,
  "氨气监测管理:阈值配置":`<div class="info-grid"><div class="info-item"><label>低报浓度</label><div>${thresholdConfigState.low} PPM</div></div><div class="info-item"><label>高报浓度</label><div>${thresholdConfigState.high} PPM</div></div><div class="info-item"><label>浓度上传频率</label><div>${thresholdConfigState.uploadFrequency} 秒</div></div><div class="info-item"><label>浓度持续时长</label><div>${thresholdConfigState.duration} 秒</div></div><div class="info-item"><label>恢复持续时长</label><div>${thresholdConfigState.recover} 秒</div></div><div class="info-item"><label>告警冷却时长</label><div>${thresholdConfigState.cooldown} 秒</div></div></div>`,
  "氨气监测管理:最近告警":`<table class="subtable"><thead><tr><th>告警编号</th><th>告警级别</th><th>触发浓度</th><th>触发时间</th><th>告警状态</th></tr></thead><tbody><tr><td>NH3-AL-20260611-0028</td><td>高报</td><td>38 ppm</td><td>2026-06-11 10:12:08</td><td>待确认</td></tr><tr><td>NH3-AL-20260610-0013</td><td>低报</td><td>28 ppm</td><td>2026-06-10 18:22:31</td><td>已完成</td></tr></tbody></table>`,
  "阈值配置:适用设备":`<table class="subtable"><thead><tr><th>设备编号</th><th>设备名称</th><th>所属区域</th><th>当前生效配置</th></tr></thead><tbody><tr><td>NH3-00012</td><td>制冷机房北侧监测器</td><td>A栋 / 制冷机房</td><td>制冷机房高风险区</td></tr><tr><td>NH3-00018</td><td>冷库机房西侧监测器</td><td>A栋 / 冷库机房</td><td>冷库机房标准区</td></tr></tbody></table>`
};
const recordLabels={"审批记录":"审批结果、审批意见、审批人","触发记录":"命中规则、实际值、阈值、触发对象","处理记录":"异常原因、处理说明、附件、处理人","处置记录":"处置说明、附件、结果、处置人","操作日志":"操作类型、操作人、操作时间","预警记录":"执行率、阈值、通知对象","变更记录":"变更前后内容、生效时间、操作人","告警记录":"监测点、浓度值、阈值、级别","流程记录":"流程节点、处理人、处理时间"};
function dailyEnergyMeterName(type){
  return type==="电"?"电表":type==="水"?"水表":"蒸汽表";
}
function dailyEnergyDeviceRows(row=[]){
  const type=row[2]||"电";
  const value=row[3]||"979.02 kW·h";
  const unit=(String(value).match(/kW·h|m³|t/)||[""])[0];
  const baseValue=parseFloat(String(value).replace(/[^\d.]/g,""))||0;
  const sources={
    "电":[
      ["1","1#配电室总电表","EL-MTR-000128","1#生产楼 / 1#配电室",0.18],
      ["2","冷库配电间电表","EL-MTR-000216","冷库楼 / 冷库配电间",0.14],
      ["3","办公楼配电箱","EL-MTR-000305","办公楼 / 配电箱",0.12],
      ["4","研发楼实验室电表","EL-MTR-000316","研发楼 / 实验室配电箱",0.10],
      ["5","2#仓库配电箱电表","EL-MTR-000328","2#仓库 / 配电箱",0.09],
      ["6","宿舍楼生活用电表","EL-MTR-000342","宿舍楼 / 生活配电间",0.08],
      ["7","动力站辅机电表","EL-MTR-000356","动力站 / 辅机间",0.08],
      ["8","污水站动力电表","EL-MTR-000371","污水站 / 动力柜",0.07],
      ["9","门卫室照明电表","EL-MTR-000388","门卫室 / 照明箱",0.07],
      ["10","充电区总电表","EL-MTR-000392","停车场 / 充电区",0.07]
    ],
    "水":[
      ["1","办公楼总水表","WT-MTR-000036","办公楼 / 总管",0.20],
      ["2","食堂给水支管水表","WT-MTR-000041","食堂楼 / 给水支管",0.16],
      ["3","绿化取水点水表","WT-MTR-000062","园区室外 / 绿化取水点",0.12],
      ["4","宿舍楼生活水表","WT-MTR-000075","宿舍楼 / 生活水井",0.11],
      ["5","冷库补水管水表","WT-MTR-000086","冷库楼 / 补水管",0.10],
      ["6","生产车间给水表","WT-MTR-000094","生产车间 / 给水主管",0.09],
      ["7","污水站进水表","WT-MTR-000108","污水站 / 进水口",0.08],
      ["8","消防水池补水表","WT-MTR-000116","消防泵房 / 补水管",0.06],
      ["9","门卫室生活水表","WT-MTR-000124","门卫室 / 生活水点",0.04],
      ["10","设备清洗区水表","WT-MTR-000139","生产区 / 清洗点",0.04]
    ],
    "蒸汽":[
      ["1","动力站蒸汽主管表","ST-MTR-000021","动力站 / 蒸汽主管",0.22],
      ["2","生产车间蒸汽支管","ST-MTR-000028","生产车间 / 蒸汽支管",0.16],
      ["3","换热站入口蒸汽表","ST-MTR-000033","换热站 / 入口",0.12],
      ["4","冷库除霜蒸汽表","ST-MTR-000041","冷库楼 / 除霜支管",0.10],
      ["5","包装车间蒸汽表","ST-MTR-000052","包装车间 / 蒸汽支管",0.09],
      ["6","食堂蒸汽支管表","ST-MTR-000063","食堂楼 / 蒸汽支管",0.08],
      ["7","清洗间蒸汽表","ST-MTR-000071","生产区 / 清洗间",0.07],
      ["8","制冷机房换热表","ST-MTR-000086","制冷机房 / 换热支管",0.06],
      ["9","二期预留蒸汽表","ST-MTR-000097","二期厂房 / 预留口",0.05],
      ["10","研发试验蒸汽表","ST-MTR-000103","研发楼 / 试验间",0.05]
    ]
  };
  const rows=(sources[type]||sources["电"]).map(item=>{
    const valueNumber=Number((baseValue*item[4]).toFixed(2));
    return {index:item[0],name:item[1],code:item[2],location:item[3],value:valueNumber,usage:`${valueNumber.toFixed(2)}${unit?` ${unit}`:""}`};
  });
  const sort=drawerContext.dailyEnergySort||"desc";
  return rows.sort((a,b)=>sort==="asc"?a.value-b.value:b.value-a.value).map((item,index)=>({...item,index:String(index+1)}));
}
function dailyEnergyDetailTabContent(tab,row=[]){
  const rows=dailyEnergyDeviceRows(row);
  const sort=drawerContext.dailyEnergySort||"desc";
  return `<div class="daily-energy-detail-section">
    <table class="subtable daily-energy-detail-table">
      <thead><tr><th>序号</th><th>设备名称</th><th>设备编码</th><th>绑定位置</th><th><button class="daily-energy-sort-btn" data-daily-energy-sort="${sort==="asc"?"desc":"asc"}">日用量<span>${sort==="asc"?"↑":"↓"}</span></button></th></tr></thead>
      <tbody>${rows.map(item=>`<tr><td>${item.index}</td><td>${item.name}</td><td>${item.code}</td><td>${item.location}</td><td>${item.usage}</td></tr>`).join("")}</tbody>
    </table>
  </div>`;
}
function meterRelationMeterRows(row=[]){
  const energy=row[3]||"电";
  const unit=energy==="电"?"kWh":energy==="水"?"m³":"t";
  const relationSource=String(row[4]||"").includes("人工")?"人工表计":String(row[4]||"").includes("备用")?"人工表计":"远传设备";
  const meterNames=String(row[4]||"1块：默认表计").split("：").pop().split("、").filter(Boolean);
  return meterNames.map((name,index)=>({
    name,
    code:`${energy==="电"?"EL":energy==="水"?"WT":"ST"}-MTR-${String(128+index*17).padStart(6,"0")}`,
    source:relationSource.includes("远传设备")&&relationSource.includes("人工表计")?(index%2===0?"远传设备":"人工表计"):relationSource,
    location:index===0?row[11]||"—":`${row[11]||"—"}-${index+1}`,
    cyclePoint:index===0?"99999":"999999",
    unit,
    ratio:index===0?"1.00":"1.20",
    status:(relationSource.includes("远传设备")&&relationSource.includes("人工表计")?(index%2===0?"远传设备":"人工表计"):relationSource)==="远传设备"?"可监测":"启用"
  }));
}
function meterRelationDetailContent(tab,row=[]){
  const meters=meterRelationMeterRows(row);
  if(tab==="关联表计") return `<table class="subtable meter-relation-detail-table"><thead><tr><th>序号</th><th>设备名称</th><th>设备编码</th><th>表计来源</th><th>安装位置</th><th>循环点</th><th>计量单位</th><th>计量倍率</th><th>表计状态</th></tr></thead><tbody>${meters.map((item,index)=>`<tr><td>${index+1}</td><td><button class="table-link">${item.name}</button></td><td>${item.code}</td><td>${item.source||"—"}</td><td>${item.location}</td><td>${item.cyclePoint}</td><td>${item.unit}</td><td>${item.ratio}</td><td>${tag(item.status)}</td></tr>`).join("")}</tbody></table>`;
  if(tab==="关联账单") return `<table class="subtable"><thead><tr><th>账单编号</th><th>所属账期</th><th>账期用量</th><th>账单金额</th><th>账单状态</th><th>生成时间</th></tr></thead><tbody><tr><td><button class="table-link">EN-BILL-202606-00128</button></td><td>2026-06</td><td>${row[3]==="电"?"168,322.00 kWh":row[3]==="水"?"2,860.00 m³":"486.80 t"}</td><td>${row[5]==="按年包干"?"¥ 10,000.00":"¥ 126,841.20"}</td><td>${tag("待缴")}</td><td>2026-07-01 02:00:00</td></tr><tr><td><button class="table-link">EN-BILL-202605-00117</button></td><td>2026-05</td><td>${row[3]==="电"?"152,640.00 kWh":row[3]==="水"?"2,612.00 m³":"438.20 t"}</td><td>¥ 96,520.00</td><td>${tag("已缴")}</td><td>2026-06-01 02:00:00</td></tr></tbody></table>`;
  return "";
}
function meterRelationDetailBody(row=[],activeTab="关联表计"){
  const meters=meterRelationMeterRows(row);
  const meterCount=String(row[4]||"0块").split("：")[0]||`${meters.length}块`;
  return `<div class="purchase-inbound-detail meter-relation-detail">
    <div class="purchase-inbound-detail-title">
      <div class="purchase-inbound-detail-title-main">
        <h3>${row[1]||"—"}</h3>
        <span>关系编号：${row[10]||"—"}</span>
      </div>
      <span class="purchase-inbound-detail-status">${meterRelationStatusTag(row[8]||"—")}</span>
    </div>
    <section class="purchase-inbound-detail-summary meter-relation-detail-summary">
      <div><label>所属园区</label><b>${row[2]||"—"}</b></div>
      <div><label>能源类型</label><b>${row[3]||"—"}</b></div>
      <div><label>关联表计数</label><b>${meterCount}</b></div>
      <div><label>计费方式</label><b>${row[5]||"—"}</b></div>
    </section>
    <section class="meter-relation-detail-rule">
      <div><label>计费规则摘要</label><b>${row[6]||"—"}</b></div>
      <div><label>有效期</label><b>${row[12]||"—"} 至 ${row[13]||"长期"}</b></div>
    </section>
    <div class="purchase-inbound-detail-tabs meter-relation-detail-tabs">${detailTabs["计量关系"].map(tab=>`<button class="${tab===activeTab?"active":""}" data-meter-relation-detail-tab="${tab}">${tab}</button>`).join("")}</div>
    <div class="purchase-inbound-detail-tab-panel meter-relation-detail-tab-panel">
      <div id="meterRelationDetailTabBody">${meterRelationDetailContent(activeTab,row)}</div>
    </div>
  </div>`;
}
function detailContent(tab){
  const key=`${activePage}:${tab}`,row=drawerContext.row||[];
  if(activePage==="每日能耗"){
    return dailyEnergyDetailTabContent(tab,row);
  }
  if(activePage==="计量关系") return meterRelationDetailContent(tab,row);
  if(tab==="用量趋势"||tab==="费用趋势") return `<div class="card chart energy-line-chart"><h3>${tab}</h3><div class="energy-chart-lines"><i></i><i></i><i></i><i></i><i></i><i></i><span class="${tab==="用量趋势"?"line-a":"line-b"}"></span></div><div class="chart-labels"><span>1月</span><span>2月</span><span>3月</span><span>4月</span><span>5月</span><span>6月</span></div></div>`;
  if(detailTables[key]) return detailTables[key];
  if(/快照|版本/.test(tab)) return `<div class="alert warning"><b>${tab}：</b>保留生成时的数据范围、配置版本与生效时间；后续配置变更不反算历史业务数据。</div><div class="info-grid"><div class="info-item"><label>快照版本</label><div>V2026.1</div></div><div class="info-item"><label>生效时间</label><div>2026-01-01 00:00:00</div></div><div class="info-item"><label>引用状态</label><div>已引用</div></div><div class="info-item"><label>历史反算</label><div>不反算</div></div></div>`;
  if(recordLabels[tab]) return `<h3 class="section-title">${tab}</h3><div class="timeline"><div class="timeline-item"><time>2026-06-11 10:12:00</time><b>${recordLabels[tab]}</b><span>记录人：周正</span></div><div class="timeline-item"><time>2026-06-10 16:30:00</time><b>${recordLabels[tab]}</b><span>记录人：系统</span></div></div>`;
  return `<div class="info-grid">${infoItems(row)}</div>`;
}
function resetEnergyDrawerFooter(){
  document.querySelector("#energyDrawerOverlay .drawer")?.classList.remove("meter-relation-form-drawer","meter-relation-detail-drawer");
  const drawerFoot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(drawerFoot){
    drawerFoot.style.display="";
    drawerFoot.innerHTML=`<button class="btn" data-close="drawer">取消</button><button class="btn primary" id="energyDrawerConfirm">确定</button>`;
  }
  const closeBtn=document.querySelector('#energyDrawerOverlay .drawer-foot [data-close="drawer"]');
  if(closeBtn) closeBtn.textContent="取消";
  const confirmBtn=document.getElementById("energyDrawerConfirm");
  if(confirmBtn){
    confirmBtn.textContent="确定";
    confirmBtn.style.display="";
    confirmBtn.dataset.action="";
    confirmBtn.addEventListener("click",handleEnergyDrawerConfirm);
  }
}
function ammoniaDeviceValue(detail){
  const value=parseFloat(String(detail.concentration).replace(/[^\d.]/g,""));
  return Number.isNaN(value)?0:value;
}
function ammoniaDeviceHistory(detail){
  const current=ammoniaDeviceValue(detail)||18;
  const low=Number(thresholdConfigState.low)||20;
  const high=Number(thresholdConfigState.high)||30;
  const reportTimestamp=ammoniaDetailDateValue(detail.reportTime);
  const values=[
    Math.max(current-14,8),
    Math.max(current-10,10),
    Math.max(current-7,12),
    Math.max(current-4,15),
    Math.max(current-1,18),
    Math.max(current-6,14),
    Math.max(current-2,17),
    Math.max(current+1,20),
    Math.max(current-3,16),
    Math.max(current+2,21),
    Math.max(current+4,24),
    current
  ];
  return ["08:00","08:10","08:20","08:30","08:40","08:50","09:00","09:10","09:20","09:30","09:40","09:50"].map((time,index)=>({
    time,
    datetime:formatDateTime(new Date(reportTimestamp-(11-index)*10*60*1000)),
    value:Math.round(values[index]*10)/10,
    lowAlarm:values[index]>=low&&values[index]<high,
    highAlarm:values[index]>=high
  }));
}
function ammoniaHistoryByRange(detail){
  const history=ammoniaDeviceHistory(detail);
  const filters=drawerContext.monitorState||{};
  const start=filters.start?new Date(filters.start).getTime():0;
  const end=filters.end?new Date(filters.end).getTime():Infinity;
  return history.filter(item=>{
    const current=ammoniaDetailDateValue(item.datetime);
    return current>=start&&current<=end;
  });
}
function ammoniaDetailDateValue(text){
  return new Date(String(text).replace(" ","T")).getTime();
}
function ammoniaDetailTrendChart(history){
  const low=Number(thresholdConfigState.low)||20;
  const high=Number(thresholdConfigState.high)||30;
  const width=860;
  const height=240;
  const padding={left:40,right:18,top:18,bottom:36};
  const maxValue=Math.max(high+8,...history.map(item=>item.value))+2;
  const minValue=Math.min(0,low-8);
  const x=index=>padding.left+(index*(width-padding.left-padding.right))/Math.max(history.length-1,1);
  const y=value=>padding.top+((maxValue-value)*(height-padding.top-padding.bottom))/Math.max(maxValue-minValue,1);
  const polyline=history.map((item,index)=>`${x(index)},${y(item.value)}`).join(" ");
  const thresholdLine=value=>`M ${padding.left} ${y(value)} L ${width-padding.right} ${y(value)}`;
  const lowPoints=history.filter(item=>item.lowAlarm).map(item=>({x:x(history.indexOf(item)),y:y(item.value),value:item.value,time:item.time}));
  const highPoints=history.filter(item=>item.highAlarm).map(item=>({x:x(history.indexOf(item)),y:y(item.value),value:item.value,time:item.time}));
  const gridLines=[0,1,2,3,4].map(index=>{
    const value=minValue+((maxValue-minValue)/4)*index;
    return {value:Math.round(value),y:y(value)};
  });
  return `<section class="ammonia-detail-section">
    <div class="ammonia-detail-chart-card ammonia-chart-with-legend">
      ${ammoniaMonitorLegend()}
      <div class="ammonia-chart-canvas">
        <svg class="ammonia-detail-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="历史浓度折线图">
          ${gridLines.map(line=>`<line x1="${padding.left}" y1="${line.y}" x2="${width-padding.right}" y2="${line.y}" class="grid-line"></line><text x="2" y="${line.y+4}" class="axis-text">${line.value}</text>`).join("")}
          ${history.map((item,index)=>`<text x="${x(index)}" y="${height-10}" text-anchor="middle" class="axis-text">${item.time}</text>`).join("")}
          <path d="${thresholdLine(low)}" class="threshold-low"></path>
          <path d="${thresholdLine(high)}" class="threshold-high"></path>
          <polyline points="${polyline}" class="actual-line"></polyline>
          ${lowPoints.map(point=>`<circle cx="${point.x}" cy="${point.y}" r="4.2" class="low-alert-point"></circle>`).join("")}
          ${highPoints.map(point=>`<circle cx="${point.x}" cy="${point.y}" r="4.6" class="high-alert-point"></circle>`).join("")}
        </svg>
      </div>
    </div>
  </section>`;
}
function ammoniaHistoryTable(detail,history){
  return `<section class="ammonia-detail-section">
    <table class="subtable ammonia-detail-record-table ammonia-history-table">
      <thead><tr><th>序号</th><th>时间</th><th>实际浓度</th><th>低报阈值</th><th>高报阈值</th><th>浓度状态</th><th>告警点</th></tr></thead>
      <tbody>${history.map((item,index)=>`<tr><td>${index+1}</td><td>${item.time}</td><td>${item.value} ppm</td><td>${detail.threshold.low}</td><td>${detail.threshold.high}</td><td>${tag(item.highAlarm?"高报":item.lowAlarm?"低报":"正常")}</td><td>${item.highAlarm?`<span class="text-danger">高报告警</span>`:item.lowAlarm?`<span class="text-warning">低报告警</span>`:"--"}</td></tr>`).join("")}</tbody>
    </table>
  </section>`;
}
function ammoniaRecordsByRange(records,timeKey="time"){
  const filters=drawerContext.alarmFilters||{};
  const start=filters.start?new Date(filters.start).getTime():0;
  const end=filters.end?new Date(filters.end).getTime():Infinity;
  return records.filter(item=>{
    const current=ammoniaDetailDateValue(item[timeKey]||item.time);
    return current>=start&&current<=end;
  });
}
function ammoniaDeviceDetailData(row=[]){
  const [index="1",code="NH3-00012",name="1号氨气监测仪",location="制冷机房北侧",park="微冷园区",onlineStatus="在线",concentration="38 ppm",levelStatus="高报",reportTime="2026-06-11 10:30:10"]=row;
  const alarmSource=(configs["safety:设备告警"].allRows||configs["safety:设备告警"].rows).filter(item=>item[2]===code);
  const alarms=[
    ...alarmSource.map((item,index)=>({index:index+1,id:item[0],level:item[4],value:item[3],time:item[5],recovered:item[6]==="已完成"?"2026-06-11 12:08:20":"--",status:item[6]})),
    {index:alarmSource.length+1,id:`${code}-AL-20260608-0006`,level:"低报",value:"24 ppm",time:"2026-06-08 14:16:08",recovered:"2026-06-08 14:26:40",status:"已完成"},
    {index:alarmSource.length+2,id:`${code}-AL-20260607-0002`,level:"高报",value:"32 ppm",time:"2026-06-07 09:45:12",recovered:"2026-06-07 10:03:18",status:"已完成"}
  ].sort((a,b)=>ammoniaDetailDateValue(b.time)-ammoniaDetailDateValue(a.time));
  const latestAlarm=alarms[0]||{id:"—",level:"—",value:"—",time:"—",recovered:"--",status:"—"};
  const threshold={
    low:`${thresholdConfigState.low} PPM`,
    high:`${thresholdConfigState.high} PPM`,
    uploadFrequency:`${thresholdConfigState.uploadFrequency} 秒`,
    duration:`${thresholdConfigState.duration} 秒`,
    recover:`${thresholdConfigState.recover} 秒`,
    cooldown:`${thresholdConfigState.cooldown} 秒`
  };
  const logs=[
    {index:1,account:"admin",time:"2026-06-11 10:32",type:"修改",detail:`字段告警冷却时长由 20 秒修改为了 ${threshold.cooldown}`},
    {index:2,account:"yangrenxuan",time:"2026-06-11 09:50",type:"修改",detail:`执行人添加了 ${name}`},
    {index:3,account:"system",time:"2026-06-11 09:40",type:"修改",detail:`字段高报阈值由 28 PPM 修改为了 ${threshold.high}`}
  ];
  return {index,code,name,location,park,onlineStatus,concentration,levelStatus,reportTime,latestAlarm,threshold,logs,alarms};
}
function ammoniaDeviceTag(themeText){
  return `<span class="tag">${themeText}</span>`;
}
function ammoniaMonitorStatusClass(status){
  if(status==="高报") return "danger";
  if(status==="低报") return "warning";
  return "normal";
}
function ammoniaMonitorIcon(type){
  const icons={
    concentration:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15.5 9 11.5l3 2.8L18.8 7.5"></path><circle cx="19" cy="7.5" r="1.4"></circle></svg>`,
    status:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.5 19 18H5L12 5.5Z"></path><path d="M12 10v3.6"></path><path d="M12 16.6h.01"></path></svg>`,
    report:`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.8"></circle><path d="M12 8.6V12l2.6 1.7"></path></svg>`,
    online:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10.5a7.4 7.4 0 0 1 10 0"></path><path d="M9.4 13.2a3.8 3.8 0 0 1 5.2 0"></path><circle cx="12" cy="16.8" r="1.1"></circle></svg>`
  };
  return `<div class="ammonia-monitor-icon">${icons[type]||icons.concentration}</div>`;
}
function ammoniaMonitorCards(detail){
  return `<div class="ammonia-monitor-cards">
    <div class="ammonia-monitor-card concentration">
      ${ammoniaMonitorIcon("concentration")}
      <div><label>最新浓度</label><b>${detail.concentration}</b></div>
    </div>
    <div class="ammonia-monitor-card ${ammoniaMonitorStatusClass(detail.levelStatus)}">
      ${ammoniaMonitorIcon("status")}
      <div><label>浓度状态</label><b>${detail.levelStatus}</b></div>
    </div>
    <div class="ammonia-monitor-card report">
      ${ammoniaMonitorIcon("report")}
      <div><label>最近上报时间</label><b>${detail.reportTime.replace(" ","<br>")}</b></div>
    </div>
    <div class="ammonia-monitor-card online">
      ${ammoniaMonitorIcon("online")}
      <div><label>在线状态</label><b>${detail.onlineStatus}</b></div>
    </div>
  </div>`;
}
function ammoniaMonitorLegend(){
  return `<div class="ammonia-detail-chart-legend ammonia-monitor-legend">
    <span><i class="actual"></i>实际浓度曲线</span>
    <span><i class="low-line"></i>低报阈值线</span>
    <span><i class="high-line"></i>高报阈值线</span>
    <span><i class="low-dot"></i>低报告警发生点</span>
    <span><i class="high-dot"></i>高报告警发生点</span>
  </div>`;
}
function ammoniaDeviceDetailTabContent(tab,row=[]){
  const detail=ammoniaDeviceDetailData(row);
  if(tab==="告警记录"){
    const filters=drawerContext.alarmFilters||{start:"",end:""};
    const rows=ammoniaRecordsByRange(detail.alarms);
    return `<div class="ammonia-detail-record-panel">
      <div class="purchase-inbound-device-filter ammonia-detail-filter">
        <div class="field ammonia-detail-date-range"><label>时间范围</label><div class="ammonia-date-range-group"><input class="control" type="datetime-local" data-ammonia-alarm-filter="start" value="${filters.start||""}"><span>至</span><input class="control" type="datetime-local" data-ammonia-alarm-filter="end" value="${filters.end||""}"></div></div>
        <div class="filter-actions"><button class="btn" data-ammonia-alarm-action="reset">重置</button><button class="btn primary" data-ammonia-alarm-action="query">查询</button></div>
      </div>
      <table class="subtable ammonia-detail-record-table">
        <colgroup><col class="w-index"><col class="w-id"><col class="w-level"><col class="w-value"><col class="w-time"><col class="w-time"><col class="w-status"></colgroup>
        <thead><tr><th>序号</th><th>告警编号</th><th>告警级别</th><th>触发浓度</th><th>触发时间</th><th>恢复时间</th><th>告警状态</th></tr></thead>
        <tbody>${rows.length?rows.map(item=>`<tr><td>${item.index}</td><td>${item.id}</td><td>${tag(item.level)}</td><td>${item.value}</td><td>${item.time}</td><td>${item.recovered}</td><td>${tag(item.status)}</td></tr>`).join(""):`<tr><td colspan="7" class="table-empty">暂无告警记录</td></tr>`}</tbody>
      </table>
    </div>`;
  }
  if(tab==="阈值配置"){
    return `<section class="ammonia-detail-section ammonia-threshold-panel">
      <div class="ammonia-detail-kv-grid">
        <div><label>低报浓度</label><b>${detail.threshold.low}</b></div>
        <div><label>高报浓度</label><b>${detail.threshold.high}</b></div>
        <div><label>浓度上传频率</label><b>${detail.threshold.uploadFrequency}</b></div>
        <div><label>浓度持续时长</label><b>${detail.threshold.duration}</b></div>
        <div><label>恢复持续时长</label><b>${detail.threshold.recover}</b></div>
        <div><label>告警冷却时长</label><b>${detail.threshold.cooldown}</b></div>
      </div>
    </section>`;
  }
  if(tab==="更新日志"){
    const rows=detail.logs;
    return `<div class="ammonia-detail-record-panel">
      <table class="subtable ammonia-detail-record-table ammonia-detail-log-table">
        <colgroup><col class="w-index"><col class="w-account"><col class="w-time"><col class="w-type"><col></colgroup>
        <thead><tr><th>序号</th><th>账号</th><th>时间</th><th>操作类型</th><th>详情</th></tr></thead>
        <tbody>${rows.map(item=>`<tr><td>${item.index}</td><td>${item.account}</td><td>${item.time}</td><td>${item.type}</td><td>${item.detail}</td></tr>`).join("")}</tbody>
      </table>
    </div>`;
  }
  const monitorState=drawerContext.monitorState||{start:"",end:"",view:"chart"};
  const history=ammoniaHistoryByRange(detail);
  return `<div class="ammonia-detail-section-grid">
    <section class="ammonia-detail-section ammonia-monitor-panel">
      ${ammoniaMonitorCards(detail)}
      <div class="ammonia-detail-toolbar">
        <div class="field ammonia-detail-date-range"><label>时间范围</label><div class="ammonia-date-range-group"><input class="control" type="datetime-local" data-ammonia-monitor-filter="start" value="${monitorState.start||""}"><span>至</span><input class="control" type="datetime-local" data-ammonia-monitor-filter="end" value="${monitorState.end||""}"></div></div>
        <div class="ammonia-detail-view-switch"><button class="${monitorState.view==="chart"?"active":""}" data-ammonia-monitor-view="chart">图表</button><button class="${monitorState.view==="list"?"active":""}" data-ammonia-monitor-view="list">列表</button></div>
      </div>
      ${monitorState.view==="chart"?`${ammoniaDetailTrendChart(history)}<div class="ammonia-monitor-tip"><b>说明：</b>数据每 10 秒上传一次，图表展示为所选时间范围内的浓度变化趋势。</div>`:ammoniaHistoryTable(detail,history)}
    </section>
  </div>`;
}
function openAmmoniaDeviceDetail(row,targetTab){
  const tabs=detailTabs["氨气监测管理"]||["实时监测","告警记录","阈值配置","更新日志"];
  const activeTab=tabs.includes(targetTab)?targetTab:tabs[0];
  drawerMode="detail";
  drawerContext={row,customDetail:"ammonia-device",detailTab:activeTab,alarmFilters:{start:"",end:""},monitorState:{start:"",end:"",view:"chart"}};
  document.getElementById("energyDrawerTitle").textContent="氨气监测设备详情";
  document.getElementById("energyDrawerTabs").innerHTML="";
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.add("ammonia-device-detail-drawer");
  const detail=ammoniaDeviceDetailData(row);
  document.getElementById("energyDrawerBody").innerHTML=`<div class="purchase-inbound-detail ammonia-device-detail">
    <div class="purchase-inbound-detail-title">
      <div class="purchase-inbound-detail-title-main">
        <h3>${detail.code}</h3>
        <span class="ammonia-device-detail-name">${detail.name}</span>
      </div>
      <span class="purchase-inbound-detail-status">${tag(detail.levelStatus)}</span>
    </div>
    <section class="purchase-inbound-detail-summary ammonia-device-detail-summary">
      <div><label>所属园区</label><b>${detail.park}</b></div>
      <div><label>安装位置</label><b>${detail.location}</b></div>
      <div><label>当前告警</label><b>${detail.latestAlarm.id}</b></div>
      <div><label>阈值策略</label><b>低报 ${detail.threshold.low} / 高报 ${detail.threshold.high}</b></div>
    </section>
    <div class="purchase-inbound-detail-tabs ammonia-device-detail-tabs">
      ${tabs.map(name=>`<button class="${name===activeTab?"active":""}" data-ammonia-detail-tab="${name}">${name}</button>`).join("")}
    </div>
    <div class="purchase-inbound-detail-tab-panel ammonia-device-detail-panel">
      <div id="ammoniaDeviceDetailTabBody">${ammoniaDeviceDetailTabContent(activeTab,row)}</div>
    </div>
  </div>`;
  const closeBtn=document.querySelector('#energyDrawerOverlay .drawer-foot [data-close="drawer"]');
  if(closeBtn) closeBtn.textContent="关闭";
  document.getElementById("energyDrawerConfirm").textContent="查看设备告警";
  const drawerFoot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(drawerFoot) drawerFoot.style.display="none";
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function deviceAlarmTime(baseTime,offsetMinutes){
  return Number.isFinite(baseTime)?formatDateTime(new Date(baseTime+offsetMinutes*60*1000)):"—";
}
function deviceAlarmDetailData(row=[]){
  const [alarmId="NH3-AL-20260611-0028",point="制冷机房北侧",deviceCode="NH3-00012",concentration="38 ppm",level="高报",triggerTime="2026-06-11 10:12:08",status="待确认",owner="—"]=row;
  const device=alarmDeviceMeta(deviceCode);
  const triggerTimestamp=ammoniaDetailDateValue(triggerTime);
  const isFalseClose=status==="误报关闭";
  const confirmActor=status==="待确认"?"—":(isFalseClose?owner:"周正");
  const dispatchActor=["待接单","处置中","已完成"].includes(status)?owner:"—";
  const acceptTime=["处置中","已完成"].includes(status)?deviceAlarmTime(triggerTimestamp,14):"—";
  const processTip=status==="待确认"
    ?"系统已产生告警，等待值班人员确认是否为有效告警。"
    :isFalseClose
      ?"告警已在确认环节判定为误报，未进入现场处置。"
      :status==="待接单"
        ?"告警已确认有效并完成派单，等待处理人在 App 接单。"
        :status==="处置中"
          ?"处理人已在 App 接单并开始现场处置，完成后由移动端提交闭环。"
          :"现场处置已完成，告警进入闭环归档。";
  const processRecords=[
    {step:"产生告警",actor:"系统",time:triggerTime,result:`监测点浓度达到 ${concentration}，触发${level}`},
    {step:"确认",actor:confirmActor,time:status==="待确认"?"—":deviceAlarmTime(triggerTimestamp,4),result:status==="待确认"?"待确认":isFalseClose?"判定误报并关闭":"确认有效，派单处置"},
    {step:"处置",actor:isFalseClose?"—":dispatchActor,time:["待接单","处置中","已完成"].includes(status)?deviceAlarmTime(triggerTimestamp,10):"—",result:isFalseClose?"未进入处置":status==="待确认"?"待派单":status==="待接单"?"已派单，待 App 接单":"已 App 接单，现场通风、排查泄漏点并复位"},
    {step:"完成",actor:["已完成","误报关闭"].includes(status)?(owner==="—"?"周正":owner):"—",time:["已完成","误报关闭"].includes(status)?deviceAlarmTime(triggerTimestamp,isFalseClose?12:46):"—",result:status==="已完成"?"移动端提交处置完成并归档":isFalseClose?"误报关闭并归档":"待移动端提交"}
  ];
  const flowStates=[
    {index:1,name:"产生告警",className:"done"},
    {index:2,name:"确认",className:status==="待确认"?"current":(isFalseClose?"rejected":"done")},
    {index:3,name:"处置",className:isFalseClose?"":(["待接单","处置中"].includes(status)?"current":(status==="已完成"?"done":""))},
    {index:4,name:isFalseClose?"误报关闭":"完成",className:["已完成","误报关闭"].includes(status)?"done":""}
  ];
  const handleRecords=isFalseClose?[]:[{
    index:1,
    assignee:owner==="—"?"—":owner,
    assignTime:["待接单","处置中","已完成"].includes(status)?deviceAlarmTime(triggerTimestamp,6):"—",
    arriveTime:["处置中","已完成"].includes(status)?deviceAlarmTime(triggerTimestamp,16):"—",
    finishTime:status==="已完成"?deviceAlarmTime(triggerTimestamp,46):"—",
    result:status==="已完成"?"移动端已提交完成":status==="待接单"?"待 App 接单":"处理中",
    note:status==="待接单"?"已派单，等待处理人在 App 接单":"现场执行通风排险、复测浓度并恢复设备正常上报，完成后在移动端提交处置结果"
  }];
  const logs=[
    {index:1,account:"system",time:triggerTime,type:"产生告警",detail:`系统在 ${triggerTime} 监测到 ${point} 浓度达到 ${concentration}，自动生成告警 ${alarmId}`},
    {index:2,account:confirmActor==="—"?"system":confirmActor,time:status==="待确认"?"—":deviceAlarmTime(triggerTimestamp,4),type:"确认处理",detail:status==="待确认"?"系统等待人工确认":isFalseClose?`${confirmActor} 在 ${deviceAlarmTime(triggerTimestamp,4)} 确认为误报并关闭该告警`:`${confirmActor} 在 ${deviceAlarmTime(triggerTimestamp,4)} 确认告警有效并发起派单`},
    {index:3,account:isFalseClose?"system":(owner==="—"?"system":owner),time:isFalseClose?"—":(["待接单","处置中","已完成"].includes(status)?deviceAlarmTime(triggerTimestamp,10):"—"),type:isFalseClose?"流程结束":status==="待接单"?"派单处置":"处置跟进",detail:isFalseClose?"误报关闭后流程结束，未生成处置记录":status==="待确认"?"等待派单，不生成处置跟进日志":status==="待接单"?`系统于 ${deviceAlarmTime(triggerTimestamp,10)} 向 ${owner} 发起派单，等待其在 App 接单`:`${owner} 于 ${deviceAlarmTime(triggerTimestamp,10)} 接收处置任务并持续跟进`},
    {index:4,account:["处置中","已完成"].includes(status)?owner:"system",time:["处置中","已完成"].includes(status)?acceptTime:"—",type:["处置中","已完成"].includes(status)?"App 接单":"状态更新",detail:["处置中","已完成"].includes(status)?`${owner} 在 ${acceptTime} 通过 App 完成接单并开始现场处置`:(status==="待接单"?"等待处理人在 App 接单":"告警仍在处理中")},
    {index:5,account:["已完成","误报关闭"].includes(status)?(owner==="—"?"周正":owner):"system",time:["已完成","误报关闭"].includes(status)?deviceAlarmTime(triggerTimestamp,isFalseClose?12:46):"—",type:["已完成","误报关闭"].includes(status)?"闭环归档":"状态更新",detail:status==="已完成"?`${owner} 在 ${deviceAlarmTime(triggerTimestamp,46)} 通过移动端提交处置完成，系统归档该告警`:isFalseClose?`${owner} 在 ${deviceAlarmTime(triggerTimestamp,12)} 完成误报关闭归档`:"告警仍在处理中"}];
  return {
    alarmId,
    point,
    device,
    concentration,
    level,
    triggerTime,
    status,
    owner,
    isFalseClose,
    confirmActor,
    lowThreshold:`${thresholdConfigState.low} PPM`,
    highThreshold:`${thresholdConfigState.high} PPM`,
    duration:`${thresholdConfigState.duration} 秒`,
    recover:`${thresholdConfigState.recover} 秒`,
    cooldown:`${thresholdConfigState.cooldown} 秒`,
    notifyPolicy:"站内消息 + 短信 + 值班大屏 + App 推送",
    processTip,
    flowStates,
    processRecords,
    handleRecords,
    logs
  };
}
function deviceAlarmDetailTabContent(tab,row=[]){
  const detail=deviceAlarmDetailData(row);
  if(tab==="流程明细"){
    const handleNote=detail.isFalseClose
      ? "该告警在确认环节判定为误报关闭，未生成现场处置任务。"
      : (detail.handleRecords[0]?.note || "告警尚未进入现场处置。");
    return `<div class="device-alarm-detail-tab">
      <div class="alarm-workorder-flow device-alarm-workorder-flow">
        ${detail.processRecords.map(item=>{
          const operator=item.actor==="—"?"系统":item.actor;
          const time=item.time==="—"?"待处理":item.time;
          return `<div class="alarm-workorder-flow-item ${item.time==="—"?"pending":""}">
          <time>${time}</time><i></i><div><b>${item.step}</b><span>${operator}：${item.result}</span></div>
        </div>`;
        }).join("")}
      </div>
      <div class="purchase-inbound-detail-tip device-alarm-detail-tip"><b>当前节点：${detail.status}</b><span>${detail.processTip}</span></div>
      <div class="device-alarm-track-note">
        <label>${detail.isFalseClose?"误报说明":"处置说明"}</label>
        <span>${handleNote}</span>
      </div>
    </div>`;
  }
  const isDispatched=["待接单","处置中","已完成"].includes(detail.status);
  const dispatchInfo={
    status:detail.isFalseClose?"无需派单":(detail.status==="待确认"?"待确认后派单":"已派单"),
    dispatcher:isDispatched?(detail.confirmActor==="—"?"周正":detail.confirmActor):"—",
    dispatchTime:isDispatched?(detail.handleRecords[0]?.assignTime||"—"):"—",
    assignee:isDispatched?(detail.handleRecords[0]?.assignee||detail.owner):"—",
    deadline:isDispatched?deviceAlarmTime(ammoniaDetailDateValue(detail.triggerTime),28):"—",
    note:isDispatched?"请按关联告警处置建议完成现场核查，并上传处理结果。":(detail.isFalseClose?"误报关闭，无需派单。":"待值班人员确认告警有效性后再派单。")
  };
  const canChangeHandler=["待接单","处置中"].includes(detail.status);
  const assigneeValue=canChangeHandler
    ? `${dispatchInfo.assignee}<button class="btn primary alarm-workorder-change-btn device-alarm-change-btn" type="button" data-action="换人">换人</button>`
    : dispatchInfo.assignee;
  return `<div class="device-alarm-detail-tab">
    <section class="purchase-inbound-detail-section device-alarm-detail-section device-alarm-compact-section">
      <h3 class="device-alarm-subtitle">告警信息</h3>
      <div class="device-alarm-kv-grid">
        <div><label>告警级别</label><b>${tag(detail.level)}</b></div>
        <div><label>触发浓度</label><b>${detail.concentration}</b></div>
        <div><label>告警事件</label><b>氨气浓度${detail.level}</b></div>
        <div><label>告警位置</label><b>${detail.point}</b></div>
      </div>
      <h3 class="device-alarm-subtitle">派单信息</h3>
      <div class="device-alarm-kv-grid">
        <div><label>处理人</label><b class="device-alarm-handler-value">${assigneeValue}</b></div>
        <div><label>处理时限</label><b>${dispatchInfo.deadline}</b></div>
        <div><label>派单人</label><b>${dispatchInfo.dispatcher}</b></div>
        <div><label>派单时间</label><b>${dispatchInfo.dispatchTime}</b></div>
        <div class="wide"><label>派单说明</label><b>${dispatchInfo.note}</b></div>
      </div>
    </section>
  </div>`;
}
function openDeviceAlarmDetail(row,targetTab){
  const tabs=detailTabs["设备告警"]||["告警信息","流程明细"];
  const activeTab=tabs.includes(targetTab)?targetTab:tabs[0];
  resetEnergyDrawerFooter();
  drawerMode="detail";
  const resolvedRowIndex=Number.isInteger(drawerContext.rowIndex)?drawerContext.rowIndex:((configs["safety:设备告警"].allRows||[]).indexOf(row));
  drawerContext={row,rowIndex:resolvedRowIndex,customDetail:"device-alarm",detailTab:activeTab};
  document.getElementById("energyDrawerTitle").textContent="设备告警详情";
  document.getElementById("energyDrawerTabs").innerHTML="";
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.add("device-alarm-detail-drawer");
  const detail=deviceAlarmDetailData(row);
  document.getElementById("energyDrawerBody").innerHTML=`<div class="purchase-inbound-detail device-alarm-detail">
    <div class="purchase-inbound-detail-title">
      <div class="purchase-inbound-detail-title-main">
        <h3>${detail.alarmId}</h3>
        <span class="ammonia-device-detail-name">${detail.device.name}</span>
      </div>
      <span class="purchase-inbound-detail-status">${tag(detail.status)}</span>
    </div>
    <section class="purchase-inbound-detail-summary device-alarm-detail-summary">
      <div><label>监测点</label><b>${detail.point}</b></div>
      <div><label>设备编码</label><b>${detail.device.code}</b></div>
      <div><label>触发时间</label><b>${detail.triggerTime}</b></div>
      <div><label>当前处理人</label><b>${detail.owner}</b></div>
    </section>
    <div class="purchase-inbound-detail-tabs device-alarm-detail-tabs">
      ${tabs.map(name=>`<button class="${name===activeTab?"active":""}" data-device-alarm-detail-tab="${name}">${name}</button>`).join("")}
    </div>
    <div class="purchase-inbound-detail-tab-panel device-alarm-detail-panel">
      <div id="deviceAlarmDetailTabBody">${deviceAlarmDetailTabContent(activeTab,row)}</div>
    </div>
  </div>`;
  const closeBtn=document.querySelector('#energyDrawerOverlay .drawer-foot [data-close="drawer"]');
  if(closeBtn) closeBtn.textContent="关闭";
  const drawerFoot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(drawerFoot){
    drawerFoot.style.display="flex";
    const confirmBtn=document.getElementById("energyDrawerConfirm");
    if(row[6]==="待确认"){
      let falseCloseBtn=drawerFoot.querySelector('[data-drawer-extra-action="误报关闭"]');
      if(!falseCloseBtn){
        falseCloseBtn=document.createElement("button");
        falseCloseBtn.className="btn danger";
        falseCloseBtn.dataset.action="误报关闭";
        falseCloseBtn.dataset.drawerExtraAction="误报关闭";
        falseCloseBtn.textContent="误报关闭";
        drawerFoot.insertBefore(falseCloseBtn,confirmBtn||null);
      }
      if(confirmBtn){
        confirmBtn.style.display="";
        confirmBtn.textContent="派单";
        confirmBtn.dataset.action="派单处置";
      }
    }else if(["待接单","处置中"].includes(row[6])&&confirmBtn){
      confirmBtn.style.display="";
      confirmBtn.textContent="换人";
      confirmBtn.dataset.action="换人";
    }else if(confirmBtn){
      confirmBtn.style.display="none";
      confirmBtn.dataset.action="";
    }
  }
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function remoteReadingRows(row=[]){
  const latestReading=row[11]||"";
  const unit=(String(latestReading).match(/[a-zA-Z³]+|t|kWh|m³/)||[""])[0];
  const baseValue=parseFloat(String(latestReading).replace(/[^\d.]/g,""))||0;
  return Array.from({length:10},(_,index)=>{
    const value=Math.max(baseValue-index*12.36,0).toFixed(2);
    const minute=51-index*10;
    const hour=minute>0?16:15;
    const normalizedMinute=((minute%60)+60)%60;
    return [index+1,`2026-07-27 ${String(hour).padStart(2,"0")}:${String(normalizedMinute).padStart(2,"0")}:27`,`${value}${unit?` ${unit}`:""}`];
  });
}
function manualMeterReadingRows(row=[]){
  const latestReading=row[10]||"";
  const unit=(String(latestReading).match(/[a-zA-Z³]+|t|kWh|m³/)||[""])[0];
  const baseValue=parseFloat(String(latestReading).replace(/[^\d.]/g,""))||0;
  const baseTime=row[11]||"2026-06-10 18:20:00";
  return Array.from({length:6},(_,index)=>{
    const value=Math.max(baseValue-index*18.6,0).toFixed(1);
    const day=Math.max(1,10-index);
    const time=index===0?baseTime:`2026-06-${String(day).padStart(2,"0")} ${index%2?"17:45:00":"18:20:00"}`;
    return [index+1,time,`${value}${unit?` ${unit}`:""}`];
  });
}
function openRemoteReadingDrawer(row=[]){
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  document.querySelector("#energyDrawerOverlay .drawer").classList.add("remote-reading-drawer");
  resetEnergyDrawerFooter();
  drawerMode="detail";
  drawerContext={row,customDetail:"remote-reading"};
  const deviceName=row[1]||"远传设备";
  const deviceCode=row[2]||"—";
  document.getElementById("energyDrawerTitle").textContent=`历史读数：${deviceName} / ${deviceCode}`;
  const rows=remoteReadingRows(row);
  document.getElementById("energyDrawerBody").innerHTML=`<div class="remote-reading-page">
    <div class="remote-reading-filter">
      <div class="remote-reading-field">
        <label>读数时间</label>
        <div class="remote-reading-date-range">
          <input class="control" placeholder="开始日期">
          <span>-</span>
          <input class="control" placeholder="结束日期">
        </div>
      </div>
      <div class="remote-reading-actions">
        <button class="btn primary" data-action="查询">搜索</button>
        <button class="btn" data-action="重置">重置</button>
      </div>
    </div>
    <div class="remote-reading-tip">温馨提示：按住「shift」+ 鼠标滚轮滑动，查看列表其他信息</div>
    <div class="remote-reading-table-wrap">
      <table class="remote-reading-table">
        <thead><tr><th>序号</th><th>读数时间</th><th>读数</th></tr></thead>
        <tbody>${rows.map(item=>`<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="remote-reading-pagination">
      <span>共 4339 条</span>
      <button class="btn">10条/页</button>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">4</button>
      <button class="page-btn">5</button>
      <button class="page-btn">6</button>
      <button class="page-btn">...</button>
      <button class="page-btn">434</button>
      <button class="page-btn">›</button>
    </div>
  </div>`;
  const drawerFoot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(drawerFoot) drawerFoot.style.display="none";
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openManualMeterReadingDrawer(row=[]){
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  document.querySelector("#energyDrawerOverlay .drawer").classList.add("remote-reading-drawer");
  resetEnergyDrawerFooter();
  drawerMode="detail";
  drawerContext={row,customDetail:"manual-meter-reading"};
  const deviceName=row[1]||"人工表计";
  const deviceCode=row[2]||"—";
  document.getElementById("energyDrawerTitle").textContent=`历史读数：${deviceName} / ${deviceCode}`;
  const rows=manualMeterReadingRows(row);
  document.getElementById("energyDrawerBody").innerHTML=`<div class="remote-reading-page">
    <div class="remote-reading-filter">
      <div class="remote-reading-field">
        <label>抄表时间</label>
        <div class="remote-reading-date-range">
          <input class="control" placeholder="开始日期">
          <span>-</span>
          <input class="control" placeholder="结束日期">
        </div>
      </div>
      <div class="remote-reading-actions">
        <button class="btn primary" data-action="查询">搜索</button>
        <button class="btn" data-action="重置">重置</button>
      </div>
    </div>
    <div class="remote-reading-tip">温馨提示：按住「shift」+ 鼠标滚轮滑动，查看列表其他信息</div>
    <div class="remote-reading-table-wrap">
      <table class="remote-reading-table">
        <thead><tr><th>序号</th><th>抄表时间</th><th>最近抄表读数</th></tr></thead>
        <tbody>${rows.map(item=>`<tr><td>${item[0]}</td><td>${item[1]}</td><td>${item[2]}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="remote-reading-pagination">
      <span>共 6 条</span>
      <button class="btn">10条/页</button>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn" disabled>›</button>
    </div>
  </div>`;
  const drawerFoot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(drawerFoot) drawerFoot.style.display="none";
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openDailyEnergyDetail(row=[]){
  const tabs=detailTabs["每日能耗"]||["设备读数"];
  const activeTab=tabs[0];
  const type=row[2]||"电";
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  document.querySelector("#energyDrawerOverlay .drawer").classList.add("daily-energy-drawer");
  resetEnergyDrawerFooter();
  drawerMode="detail";
  drawerContext={row,customDetail:"daily-energy",detailTab:activeTab,dailyEnergySort:"desc"};
  document.getElementById("energyDrawerTitle").textContent="每日能耗详情";
  document.getElementById("energyDrawerBody").innerHTML=`<div class="purchase-inbound-detail daily-energy-detail">
    <div class="purchase-inbound-detail-title">
      <div class="purchase-inbound-detail-title-main">
        <h3>${row[1]||"—"}</h3>
        <span class="daily-energy-detail-name">${dailyEnergyMeterName(type)}</span>
      </div>
      <span class="purchase-inbound-detail-status">${tag(type)}</span>
    </div>
    <section class="purchase-inbound-detail-summary daily-energy-detail-summary">
      <div><label>能耗类型</label><b>${type}</b></div>
      <div><label>能耗日期</label><b>${row[1]||"—"}</b></div>
      <div><label>日用量</label><b>${row[3]||"—"}</b></div>
      <div><label>数据更新时间</label><b>${row[4]||"—"}</b></div>
    </section>
    <div class="purchase-inbound-detail-tabs daily-energy-detail-tabs">
      ${tabs.map(name=>`<button class="${name===activeTab?"active":""}" data-daily-energy-detail-tab="${name}">${name}</button>`).join("")}
    </div>
    <div class="purchase-inbound-detail-tab-panel daily-energy-detail-panel">
      <div id="dailyEnergyDetailTabBody">${dailyEnergyDetailTabContent(activeTab,row)}</div>
    </div>
  </div>`;
  const drawerFoot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(drawerFoot) drawerFoot.style.display="none";
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openDetail(row){
  const tabs=detailTabs[activePage]; if(!tabs) return toast(`${activePage}在 PRD 中未定义详情页面`);
  document.getElementById("energyDrawerTabs").classList.remove("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  resetEnergyDrawerFooter();
  if(activePage==="氨气监测管理") return openAmmoniaDeviceDetail(row);
  if(activePage==="设备告警") return openDeviceAlarmDetail(row);
  if(activePage==="每日能耗") return openDailyEnergyDetail(row);
  if(activePage==="计量关系") return openMeterRelationDetail(row);
  drawerMode="detail";drawerContext={row,customDetail:null};document.getElementById("energyDrawerTitle").textContent=activePage==="每日能耗"?`【${row[1]||"—"}】 — 【${dailyEnergyMeterName(row[2]||"电")}】`:`${activePage}详情`;
  document.getElementById("energyDrawerTabs").innerHTML=tabs.map((x,i)=>`<button class="tab ${i===0?"active":""}" data-drawer-tab="${x}">${x}</button>`).join("");
  document.getElementById("energyDrawerBody").innerHTML=detailContent(tabs[0]);document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openMeterRelationDetail(row){
  drawerMode="detail";
  drawerContext={row,customDetail:"meter-relation",detailTab:"关联表计"};
  const drawer=document.querySelector("#energyDrawerOverlay .drawer");
  drawer.classList.add("meter-relation-detail-drawer");
  document.getElementById("energyDrawerTitle").textContent="计量关系详情";
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.getElementById("energyDrawerBody").innerHTML=meterRelationDetailBody(row,"关联表计");
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openDetailAt(row,targetTab){
  if(activePage==="氨气监测管理") return openAmmoniaDeviceDetail(row,targetTab);
  if(activePage==="设备告警") return openDeviceAlarmDetail(row,targetTab);
  if(activePage==="计量关系") return openMeterRelationDetail(row);
  openDetail(row);const target=document.querySelector(`[data-drawer-tab="${targetTab}"]`);if(!target)return;
  document.querySelectorAll("[data-drawer-tab]").forEach(x=>x.classList.toggle("active",x===target));document.getElementById("energyDrawerBody").innerHTML=detailContent(targetTab);
}
function openTrendDetail(row){
  document.getElementById("energyDrawerTabs").classList.remove("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  resetEnergyDrawerFooter();
  drawerMode="detail";drawerContext={row,customDetail:null};document.getElementById("energyDrawerTitle").textContent="用能统计趋势";
  document.getElementById("energyDrawerTabs").innerHTML=`<button class="tab active" data-drawer-tab="用量趋势">用量趋势</button><button class="tab" data-drawer-tab="费用趋势">费用趋势</button>`;
  document.getElementById("energyDrawerBody").innerHTML=`<div class="card chart energy-line-chart"><h3>按统计条件展示用量趋势</h3><div class="energy-chart-lines"><i></i><i></i><i></i><i></i><i></i><i></i><span class="line-a"></span></div><div class="chart-labels"><span>1月</span><span>2月</span><span>3月</span><span>4月</span><span>5月</span><span>6月</span></div></div>`;
  document.getElementById("energyDrawerOverlay").classList.add("show");
}

function resetBudgetDrawerClass(){
  const drawer=document.querySelector("#energyDrawerOverlay .drawer");
  drawer.classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  drawer.classList.add("budget-drawer");
}
function budgetYearOptions(selectedYear){
  const years=[2025,2026,2027,2028,2029,2030];
  return years.map(year=>`<option value="${year}" ${String(year)===String(selectedYear)?"selected":""}>${year}年</option>`).join("");
}
function budgetEnergyIcon(type){
  const icons={
    水:`<svg class="budget-energy-icon water" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.8C9.4 7 7 10.2 7 13.2a5 5 0 0 0 10 0c0-3-2.4-6.2-5-9.4Z"></path><path d="M9.8 14.2a2.7 2.7 0 0 0 2.7 2.7"></path></svg>`,
    电:`<svg class="budget-energy-icon power" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 2.8 6.8 13h4.9l-.9 8.2L17.4 10h-5l.8-7.2Z"></path></svg>`,
    蒸汽:`<svg class="budget-energy-icon steam" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 5.2c-1.3 1.3-1.3 2.8 0 4.1s1.3 2.7 0 4"></path><path d="M12 4.2c-1.5 1.5-1.5 3.1 0 4.6s1.5 3 0 4.5"></path><path d="M16.8 5.2c-1.3 1.3-1.3 2.8 0 4.1s1.3 2.7 0 4"></path><path d="M5.5 18.5h13"></path></svg>`
  };
  return icons[type]||"";
}
function monthlyBudgetTable(row,editable=false,unitOverride){
  const unit=unitOverride||budgetUnits[row.type]||"单位";
  const isAverage=row.split==="按月平均";
  const isEffectiveEditing=row.status==="生效中";
  const tableHeadUnit=unit==="单位"?"":`（${unit}）`;
  return `<div class="budget-month-table-wrap"><table class="subtable budget-month-table"><thead><tr><th>月份</th><th data-budget-month-unit>月度预算用量${tableHeadUnit}</th><th>备注</th></tr></thead><tbody>${budgetMonthRows(row).map(item=>`<tr><td>${item.month}</td><td>${editable?`<div class="unit-control budget-month-unit-control"><input class="control" type="number" min="0" placeholder="请输入" data-budget-month-usage value="${item.usage??""}" ${isAverage||isEffectiveEditing&&Number(item.month.replace("月",""))<7?"disabled":""}><span data-budget-month-input-unit>${unit}</span></div>`:numberText(item.usage||null,unit)}</td><td>${editable?`<input class="control" placeholder="请输入备注（选填）" data-budget-month-remark value="${item.remark}" ${isAverage?"disabled":""}>`:item.remark||"--"}</td></tr>`).join("")}</tbody></table></div>`;
}
function budgetDrawerState(){
  const body=document.getElementById("energyDrawerBody");
  const split=body.querySelector('[data-budget-field="split"]:checked')?.value||"";
  return {
    type:body.querySelector('[data-budget-field="type"]')?.value||"",
    usage:Number(body.querySelector('[data-budget-field="usage"]')?.value||0),
    split,
    warningEnabled:!!body.querySelector('[data-budget-field="warningEnabled"]')?.checked
  };
}
function updateBudgetDrawerSummary(unit,annual,total){
  const summary=document.querySelector("#energyDrawerOverlay .budget-drawer-check");
  if(!summary) return;
  const hasAnnual=annual>0;
  const diff=hasAnnual?annual-total:0;
  summary.innerHTML=`<span>月度预算合计：${hasAnnual?numberText(total,unit):"待填写"}</span><span>年度预算用量：${hasAnnual?numberText(annual,unit):"待填写"}</span><span>差额：${hasAnnual?numberText(diff,unit):"待计算"}</span>`;
}
function refreshBudgetMonthBreakdown(){
  const state=budgetDrawerState();
  const unit=budgetUnits[state.type]||"单位";
  const unitLabel=document.querySelector('[data-budget-unit]');
  if(unitLabel) unitLabel.textContent=unit;
  const monthUnit=document.querySelector('[data-budget-month-unit]');
  if(monthUnit) monthUnit.textContent=`月度预算用量${unit==="单位"?"":`（${unit}）`}`;
  document.querySelectorAll('[data-budget-month-input-unit]').forEach(item=>{item.textContent=unit;});
  const threshold=document.querySelector('[data-budget-field="threshold"]');
  if(threshold) threshold.disabled=!state.warningEnabled;
  const switchText=document.querySelector('[data-budget-switch-text]');
  if(switchText) switchText.textContent=state.warningEnabled?"已开启":"已关闭";
  const usageInputs=[...document.querySelectorAll('[data-budget-month-usage]')];
  const remarkInputs=[...document.querySelectorAll('[data-budget-month-remark]')];
  if(state.split==="按月平均"){
    const base=state.usage>0?Math.floor(state.usage/12):"";
    let remainder=state.usage>0?state.usage-base*12:0;
    usageInputs.forEach((input,index)=>{
      input.value=state.usage>0?base+(index<remainder?1:0):"";
      input.disabled=true;
    });
    remarkInputs.forEach(input=>{
      input.value=state.usage>0?"系统按月平均分解":"";
      input.disabled=true;
    });
  }else if(state.split==="手动分解"){
    usageInputs.forEach(input=>{input.disabled=false;});
    remarkInputs.forEach(input=>{input.disabled=false;});
  }else{
    usageInputs.forEach(input=>{input.value="";input.disabled=true;});
    remarkInputs.forEach(input=>{input.value="";input.disabled=true;});
  }
  const total=usageInputs.reduce((sum,input)=>sum+Number(input.value||0),0);
  updateBudgetDrawerSummary(unit,state.usage,total);
}
function bindBudgetDrawerInteractions(){
  const body=document.getElementById("energyDrawerBody");
  body.querySelectorAll("[data-budget-field]").forEach(el=>{
    el.addEventListener("input",refreshBudgetMonthBreakdown);
    el.addEventListener("change",refreshBudgetMonthBreakdown);
  });
  body.querySelectorAll("[data-budget-energy]").forEach(button=>{
    button.addEventListener("click",()=>{
      const field=body.querySelector('[data-budget-field="type"]');
      if(!field||button.disabled) return;
      field.value=button.dataset.budgetEnergy;
      body.querySelectorAll("[data-budget-energy]").forEach(item=>item.classList.toggle("active",item===button));
      field.dispatchEvent(new Event("change",{bubbles:true}));
    });
  });
  const averageAction=body.querySelector("[data-budget-average-action]");
  if(averageAction) averageAction.addEventListener("click",()=>{
    const averageRadio=body.querySelector('[data-budget-field="split"][value="按月平均"]');
    if(averageRadio) averageRadio.checked=true;
    refreshBudgetMonthBreakdown();
  });
  body.querySelectorAll("[data-budget-month-usage]").forEach(el=>el.addEventListener("input",refreshBudgetMonthBreakdown));
  refreshBudgetMonthBreakdown();
}
function openBudgetDrawer(action,row={}){
  resetBudgetDrawerClass();
  resetEnergyDrawerFooter();
  drawerMode=action.includes("新增")||action==="编辑"?"form":"detail";
  drawerContext={row,customDetail:"budget"};
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  const title=action==="新增预算"?"新增预算":action==="编辑"?"编辑预算":"月度预算";
  document.getElementById("energyDrawerTitle").textContent=title;
  const isForm=drawerMode==="form";
  const isCreate=action==="新增预算";
  const emptyBudget={year:"",park:"",type:"",usage:"",split:"",effective:"",status:"待生效",warningEnabled:null,threshold:"",remark:""};
  const source=isCreate?emptyBudget:(row.id?row:budgetRows[0]);
  const unit=budgetUnits[source.type]||"单位";
  const budgetValue=source.usage?numberText(source.usage,unit):"待填写";
  const optionSelected=(value,current)=>value===current?"selected":"";
  document.getElementById("energyDrawerBody").innerHTML=`<div class="budget-drawer-body">
    ${source.status==="生效中"&&isForm?`<div class="alert warning"><b>编辑限制：</b>生效中预算仅允许修改年度预算用量、当前月份及未来月份预算、预警开关、预警阈值和备注；已结束月份不可修改。</div>`:""}
    <section><h3>基本信息</h3><div class="form-grid budget-form-grid">
      <div class="form-field"><label class="required">预算年度</label><select class="control budget-year-picker" data-budget-field="year" ${!isForm||source.status==="生效中"?"disabled":""}><option value="" ${source.year?"":"selected"} disabled>请选择预算年度</option>${budgetYearOptions(source.year)}</select></div>
      <div class="form-field"><label class="required">所属园区</label><select class="control" ${!isForm||source.status==="生效中"?"disabled":""}><option value="" ${source.park?"":"selected"} disabled>请选择所属园区</option><option ${optionSelected("东园区",source.park)}>东园区</option><option ${optionSelected("西园区",source.park)}>西园区</option></select></div>
      <div class="form-field"><label class="required">能源类型</label><input type="hidden" data-budget-field="type" value="${source.type||""}"><div class="budget-energy-segment">${["水","电","蒸汽"].map(type=>`<button type="button" class="${source.type===type?"active":""}" data-budget-energy="${type}" ${!isForm||source.status==="生效中"?"disabled":""}>${budgetEnergyIcon(type)}${type}</button>`).join("")}</div></div>
      <div class="form-field"><label class="required">生效日期</label><input class="control" type="date" data-budget-field="effective" placeholder="请选择生效日期" value="${source.effective||""}" ${!isForm?"disabled":""}></div>
      <div class="form-field full"><label>备注</label><textarea class="control" maxlength="500" placeholder="请输入备注（选填）" ${!isForm?"disabled":""}>${source.remark||""}</textarea></div>
    </div></section>
    <section><h3>年度预算用量</h3><div class="form-grid budget-form-grid">
      <div class="form-field"><label class="required">年度预算用量</label><div class="unit-control"><input class="control" type="number" min="0" data-budget-field="usage" placeholder="请输入年度预算用量" value="${source.usage??""}" ${!isForm?"disabled":""}><span data-budget-unit>${unit}</span></div><span class="form-help">必须大于0，能源类型确定后自动带出计量单位</span></div>
      <div class="budget-info-box"><b>说明</b><span>年度预算用量将按所选方式分解至各月份，用于预算执行对比和预警计算。</span></div>
    </div></section>
    <section><div class="budget-section-head"><h3>月度分解</h3><button type="button" class="btn" data-budget-average-action ${!isForm?"disabled":""}>按预算用量平均分配</button></div><div class="budget-split-row"><label class="required">月度分解方式</label><label class="budget-radio"><input type="radio" name="budgetSplit" value="按月平均" data-budget-field="split" ${source.split==="按月平均"?"checked":""} ${!isForm?"disabled":""}><span></span>按月平均分解</label><label class="budget-radio"><input type="radio" name="budgetSplit" value="手动分解" data-budget-field="split" ${source.split==="手动分解"?"checked":""} ${!isForm?"disabled":""}><span></span>手动设置每月预算</label></div>${monthlyBudgetTable(source,isForm,unit)}</section>
    <section><h3>预算预警</h3><div class="form-grid budget-form-grid">
      <div class="form-field"><label class="required">启用预算预警</label><label class="switch-control budget-warning-switch"><input type="checkbox" data-budget-field="warningEnabled" ${source.warningEnabled===true?"checked":""} ${!isForm?"disabled":""}><span></span><b data-budget-switch-text>${source.warningEnabled===true?"已开启":"已关闭"}</b></label><span class="form-help">预算预警仅在预算执行页面展示</span></div>
      <div class="form-field"><label class="required">预警阈值</label><div class="unit-control"><input class="control" type="number" min="1" max="99" data-budget-field="threshold" placeholder="请输入" value="${source.threshold??""}" ${!isForm||source.warningEnabled!==true?"disabled":""}><span>%</span></div><span class="form-help">范围1%～99%，超预算阈值固定为100%</span></div>
    </div></section>
  </div>`;
  const foot=document.querySelector("#energyDrawerOverlay .drawer-foot");
  if(foot){
    foot.style.display=isForm?"flex":"none";
    foot.innerHTML=isForm?`<div class="budget-drawer-check"><span>月度预算合计：${budgetValue}</span><span>年度预算用量：${budgetValue}</span><span>差额：${source.usage?`0 ${unit}`:"待计算"}</span></div><button class="btn" data-close="drawer">取消</button><button class="btn primary" id="energyDrawerConfirm">保存</button>`:`<button class="btn" data-close="drawer">关闭</button>`;
    const confirm=document.getElementById("energyDrawerConfirm");
    if(confirm) confirm.addEventListener("click",()=>{document.getElementById("energyDrawerOverlay").classList.remove("show");toast(`${title}已保存`);},{once:true});
  }
  if(isForm) bindBudgetDrawerInteractions();
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openBudgetStopModal(row){
  resetEnergyModalState();
  document.getElementById("energyModalTitle").textContent="停用预算";
  document.getElementById("energyModalBody").innerHTML=`<div class="alert warning"><b>停用确认：</b>停用后，该预算不再参与后续预算执行和预算预警，历史数据仍将保留。是否继续？</div><div class="form-grid"><div class="form-field"><label>预算</label><input class="control" value="${row.park}${row.year}年度${row.type}预算" disabled></div><div class="form-field full"><label class="required">停用原因</label><textarea class="control" placeholder="请输入停用原因"></textarea><span class="form-help">停用时间由系统自动记录，停用后不允许恢复。</span></div></div>`;
  document.getElementById("energyModalConfirm").textContent="确认停用";
  document.getElementById("energyModalOverlay").classList.add("show");
}
const actionSpecs={
  "计费规则配置:新增规则":["计费规则名称","能源类型","计费模式","适用对象类型","适用对象","生效日期","失效日期","计费模式配置项"],
  "计费规则配置:编辑":["计费规则名称","能源类型","计费模式","适用对象类型","适用对象","生效日期","失效日期","计费模式配置项"],
  "计费规则配置:提交审批":["计费规则名称（只读）","计费模式（只读）","适用对象（只读）","生效周期（只读）"],
  "计费规则配置:审批通过":["审批结果：通过（只读）","审批意见"],"计费规则配置:审批驳回":["审批结果：驳回（只读）","审批意见"],
  "计费规则配置:停用":["计费规则名称（只读）","停用确认"],"计费规则配置:批量停用":["已选计费规则（只读）","停用确认"],"计费规则配置:删除":["计费规则名称（只读）","删除确认"],
  "表具与计费关联:新增表具":["表具编号","表具类型","安装位置","表具状态","最近校验日期","关联主体","计费规则","抄表方式"],
  "表具与计费关联:编辑":["表具编号（只读）","表具类型","安装位置","表具状态","最近校验日期","关联主体","计费规则","抄表方式"],
  "表具与计费关联:人工抄表":["表具编号（只读）","抄表周期","抄表方式：人工抄表（只读）","上次读数（只读）","本次读数","本次用量（只读）","签字照片 / 抄表单附件"],
  "表具与计费关联:停用":["表具编号（只读）","表具状态：已停用（只读）"],"表具与计费关联:启用":["表具编号（只读）","表具状态：正常（只读）"],
  "账单列表:生成账单":["账单月份","部门","规则快照（只读）"],
  "账单列表:缴费":["账单编号（只读）","账单金额（只读）","支付方式","流水号","凭证编号","缴费凭证附件"],
  "账单列表:财务确认":["账单编号（只读）","支付方式（只读）","流水号（只读）","凭证编号（只读）","财务确认结果：已确认（只读）"],
  "账单列表:驳回凭证":["账单编号（只读）","财务确认结果：已驳回（只读）","驳回原因"],
  "指标分析与预警:新增指标":["指标名称","目标值","计算周期"],"指标分析与预警:编辑":["指标名称","目标值","计算周期"],
  "指标分析与预警:新增预警规则":["预警对象类型：指标 / 预算","预警对象","预警阈值","生效时间"],
  "指标分析与预警:编辑预警规则":["预警对象类型：指标 / 预算","预警对象","预警阈值","生效时间"],
  "异常诊断与处置:阈值配置":["异常类型","异常子类","阈值参数","生效时间"],
  "异常诊断与处置:开始处理":["异常编号（只读）","负责人"],"异常诊断与处置:填写结果并关闭":["异常编号（只读）","异常原因","处理说明","处理附件"],
  "异常诊断与处置:误告警":["异常编号（只读）","误告警原因","备注说明"],"异常诊断与处置:催办":["异常编号（只读）","催办对象","催办说明"],
  "碳排放核算:新增核算年度":["核算年度","报告主体","统一社会信用代码（只读）","核算周期（只读）","核算依据","核算说明"],
  "碳排放报告:生成报告":["报告年度","报告类型","报告名称","核算依据（只读）","报告口径","编制单位","报告日期","是否附碳足迹与碳流图","报告说明"],
  "氨气监测管理:查看告警":["监测点（只读）","最近告警（只读）"],
  "阈值配置:新增阈值":["配置名称","低报阈值","高报阈值","持续时长","恢复持续时长","告警冷却时长","适用设备","启用状态"],
  "阈值配置:编辑":["配置名称","低报阈值","高报阈值","持续时长","恢复持续时长","告警冷却时长","适用设备","启用状态"],
  "阈值配置:停用":["配置名称（只读）","停用确认"],"阈值配置:启用":["配置名称（只读）","启用确认"],
  "设备告警:误报关闭":["告警编号（只读）","告警级别（只读）","关闭原因"],
  "设备告警:派单处置":["工单编号（只读）","处理人","处理时限","告警位置","关联告警处置建议","派单说明"],
  "能源类型与单位配置:新增能源类型与单位":["能源类型","计量单位","数据精度","生效时间"],"能源类型与单位配置:编辑":["能源类型","计量单位","数据精度","生效时间"],
  "碳排换算系数配置:新增碳排换算系数":["能源类型","碳排换算系数","生效时间"],"碳排换算系数配置:编辑":["能源类型","碳排换算系数","生效时间"],
  "计费参数配置:新增计费参数":["计费参数名称","计费参数值","生效时间"],"计费参数配置:编辑":["计费参数名称","计费参数值","生效时间"],
  "分项类型配置:新增分项类型":["分项类型名称","生效时间"],"分项类型配置:编辑":["分项类型名称","生效时间"],
  "异常规则参数配置:新增异常规则参数":["异常类型","异常子类","阈值参数","生效时间"],"异常规则参数配置:编辑":["异常类型","异常子类","阈值参数","生效时间"],
  "行业能耗标准配置:新增行业能耗标准":["行业能耗标准名称","对标值","生效时间"],"行业能耗标准配置:编辑":["行业能耗标准名称","对标值","生效时间"]
};
const readonlyActionNotes={"计费规则配置:删除":"已经用于账单生成的规则不允许删除。","计费规则配置:停用":"停用后不影响历史账单，历史账单继续使用规则快照。","表具与计费关联:人工抄表":"同一表具、同一抄表周期只允许一条有效人工抄表记录；本次读数不得小于上次读数，换表场景除外。","账单列表:生成账单":"同一部门、同一账单月份只允许存在一张有效账单，生成时保存计费规则快照。","异常诊断与处置:填写结果并关闭":"必须填写异常原因和处理说明。","异常诊断与处置:误告警":"必须填写误告警原因和备注说明。","阈值配置:停用":"停用后保留历史告警命中记录，不影响既有处置台账。","设备告警:误报关闭":"关闭前需确认该告警为误报，并记录误报依据。","设备告警:派单处置":"确认告警有效后需指派责任人，处理人需在 App 完成接单，并在移动端提交处置完成。"};
Object.assign(actionSpecs,{
  "远传设备管理:同步设备":["同步来源（只读）","同步范围","同步说明"],
  "人工表计管理:新增表计":["表计编号","设备类型","表计类型","所属园区","安装位置","绑定对象","表计倍率","初始读数"],
  "人工表计管理:编辑":["表计编号（只读）","设备类型","表计类型","所属园区","安装位置","绑定对象","表计倍率"],
  "人工表计管理:绑定位置":["表计编号（只读）","所属园区","安装位置","绑定对象","位置说明"],
  "人工表计管理:停用":["表计编号（只读）","停用原因","停用说明"],"人工表计管理:启用":["表计编号（只读）","启用确认"],
  "计费方式:编辑":["计费方式名称","能源类型","计费方式","适用对象类型","适用对象","生效日期","失效日期","计费方式配置项"],
  "计费方式:提交审批":["计费方式名称（只读）","计费方式（只读）","适用对象（只读）","生效周期（只读）"],
  "计费方式:审批通过":["审批结果：通过（只读）","审批意见"],"计费方式:审批驳回":["审批结果：驳回（只读）","审批意见"],
  "计费方式:停用":["计费方式名称（只读）","停用确认"],"计费方式:删除":["计费方式名称（只读）","删除确认"],
  "计量关系:新增关系":["表具编号","表具类型","安装位置","表具状态","最近校验日期","关联主体","计费方式","抄表方式"],
  "计量关系:新增表具":["表具编号","表具类型","安装位置","表具状态","最近校验日期","关联主体","计费方式","抄表方式"],
  "计量关系:编辑":["表具编号（只读）","表具类型","安装位置","表具状态","最近校验日期","关联主体","计费方式","抄表方式"],
  "计量关系:人工抄表":["表具编号（只读）","抄表周期","抄表方式：人工抄表（只读）","上次读数（只读）","本次读数","本次用量（只读）","签字照片 / 抄表单附件"],
  "计量关系:停用":["表具编号（只读）","表具状态：已停用（只读）"],"计量关系:启用":["表具编号（只读）","表具状态：正常（只读）"],
  "能源账单:生成账单":["账单月份","部门","规则快照（只读）"],
  "能源账单:缴费":["账单编号（只读）","账单金额（只读）","支付方式","流水号","凭证编号","缴费凭证附件"],
  "能源账单:财务确认":["账单编号（只读）","支付方式（只读）","流水号（只读）","凭证编号（只读）","财务确认结果：已确认（只读）"],
  "能源账单:驳回凭证":["账单编号（只读）","财务确认结果：已驳回（只读）","驳回原因"],
  "缴费管理:缴费":["账单编号（只读）","应缴金额（只读）","支付方式","流水号","凭证编号","缴费凭证附件"],
  "缴费管理:财务确认":["缴费单号（只读）","支付方式（只读）","流水号（只读）","财务确认结果：已确认（只读）"],
  "缴费管理:驳回凭证":["缴费单号（只读）","财务确认结果：已驳回（只读）","驳回原因"],
  "缴费管理:重新提交凭证":["缴费单号（只读）","支付方式","流水号","凭证编号","缴费凭证附件"],
  "告警规则配置:新增阈值":["规则名称","监测维度","能源类型","触发条件","生效时间","启用状态"],
  "告警规则配置:编辑":["规则名称","监测维度","能源类型","触发条件","生效时间","启用状态"],
  "告警规则配置:停用":["规则名称（只读）","停用确认"],"告警规则配置:启用":["规则名称（只读）","启用确认"],
  "能源告警:开始处理":["告警编号（只读）","负责人"],"能源告警:填写结果并关闭":["告警编号（只读）","告警原因","处理说明","处理附件"],
  "能源告警:误告警":["告警编号（只读）","误告警原因","备注说明"],"能源告警:催办":["告警编号（只读）","催办对象","催办说明"],
  "能源类型与单位配置:停用":["能源类型（只读）","停用确认"],"碳排换算系数配置:停用":["能源类型（只读）","碳排换算系数（只读）","停用确认"],
  "计费参数配置:停用":["计费参数名称（只读）","计费参数值（只读）","停用确认"],"分项类型配置:停用":["分项类型名称（只读）","停用确认"],
  "异常规则参数配置:停用":["异常类型（只读）","异常子类（只读）","阈值参数（只读）","停用确认"],"行业能耗标准配置:停用":["行业能耗标准名称（只读）","对标值（只读）","停用确认"]
});
Object.assign(readonlyActionNotes,{
  "远传设备管理:同步设备":"远传设备由接口同步，不允许在能源系统中人工新增或删除；同步只更新接口设备信息和最新数据。",
  "人工表计管理:停用":"停用后该表计不再参与新的人工抄表，历史抄表记录和费用数据保留。",
  "计费方式:删除":"已经用于账单生成的计费方式不允许删除。",
  "计费方式:停用":"停用后不影响历史账单，历史账单继续使用计费方式快照。",
  "计量关系:人工抄表":"同一表具、同一抄表周期只允许一条有效人工抄表记录；本次读数不得小于上次读数，换表场景除外。",
  "能源账单:生成账单":"同一部门、同一账单月份只允许存在一张有效账单，生成时保存计费方式快照。",
  "缴费管理:财务确认":"财务确认后缴费记录进入已确认状态，不允许直接删除凭证。",
  "能源告警:填写结果并关闭":"必须填写告警原因和处理说明。",
  "能源告警:误告警":"必须填写误告警原因和备注说明。",
  "告警规则配置:停用":"停用后不影响已生成告警，历史告警保留规则快照。"
});
function field(label){return `<div class="form-field ${/说明|原因|配置项|附件/.test(label)?"full":""}"><label class="${/只读/.test(label)?"":"required"}">${label}</label>${/附件/.test(label)?`<div class="upload-box">＋ 上传${label}</div>`:/说明|原因|配置项/.test(label)?`<textarea class="control" placeholder="请输入${label}"></textarea>`:`<input class="control" ${/只读/.test(label)?"disabled":""} placeholder="请输入或选择${label}">`}<span class="form-help">${/只读/.test(label)?"由当前业务数据自动带出，不可修改":/生效时间/.test(label)?"变更按所填生效时间执行":""}</span></div>`;}
function billingMethodFormFields(method,energy){
  const unit=billingEnergyTypes.find(item=>item.name===energy)?.unit||"";
  const base=[
    {label:"计费方式",value:method,readonly:true},
    {label:"能源类型",value:energy,readonly:true},
    {label:"计量单位",value:unit,readonly:true}
  ];
  if(method==="按年包干") return [
    ...base.slice(0,3),
    {label:"年度包干金额",type:"number",unit:"元 / 年",placeholder:"请输入年度固定收费金额"},
    {label:"账单分摊方式",type:"select",options:["按月平均分摊","按季度平均分摊","一次性生成"]},
    {label:"包干开始月份",type:"month"},
    {label:"包干结束月份",type:"month"},
    {label:"超包干用量处理",type:"select",options:["仅记录不加收","按平均单价加收","需人工确认后加收"]},
    ...base.slice(3),
    {label:"备注说明",type:"textarea",required:false,placeholder:"请输入特殊约定，例如停用当月是否计费"}
  ];
  if(method==="平均单价") return [
    ...base.slice(0,3),
    {label:"平均单价",type:"number",unit:`元 / ${unit}`,placeholder:"请输入统一单价"},
    {label:"账单结算周期",type:"select",options:["按月结算","按季度结算","按抄表周期结算"]},
    {label:"费用取整规则",type:"select",options:["保留2位小数","四舍五入到元","向上取整到元"]},
    ...base.slice(3)
  ];
  if(method==="阶梯单价") return [
    ...base.slice(0,3),
    {label:"阶梯结算周期",type:"select",options:["按月结算","按季度结算","按年度结算"]},
    {type:"tierRows",unit},
    ...base.slice(3)
  ];
  if(method==="分时单价") return [
    ...base.slice(0,3),
    {label:"时段模板",type:"select",options:["默认峰平谷模板","工作日 / 休息日模板","自定义时段模板"]},
    {type:"timeRows",unit},
    {label:"时段匹配方式",type:"select",options:["按采集时间匹配","按抄表记录时间匹配"]},
    ...base.slice(3)
  ];
  return [...base,{label:"计费参数"}];
}
function billingMethodField(spec){
  if(spec.type==="tierRows"){
    return `<div class="form-field full billing-tier-config"><label class="required">阶梯价格</label>
      <div class="billing-config-rows" data-tier-row-list>
        <div class="billing-config-row billing-config-row-head"><span>阶梯名称</span><span>起始用量</span><span>截止用量</span><span>单价</span><span>操作</span></div>
        ${billingTierRow("第一阶梯",spec.unit,"0","请输入截止用量",false)}
        ${billingTierRow("第二阶梯",spec.unit,"自动承接上一档","请输入截止用量",true)}
        ${billingTierRow("第三阶梯",spec.unit,"自动承接上一档","不填表示以上",true)}
      </div>
      <div class="billing-config-toolbar"><button class="btn small" type="button" data-add-tier-row>新增阶梯</button><span>最后一档截止用量可留空，表示以上用量。</span></div>
    </div>`;
  }
  if(spec.type==="timeRows"){
    return `<div class="form-field full billing-time-config"><label class="required">分时时段价格</label>
      <div class="billing-config-rows billing-time-rows">
        <div class="billing-config-row billing-config-row-head"><span>时段类型</span><span>时间范围</span><span>单价</span></div>
        <div class="billing-config-row"><b>尖峰</b><div><input class="control" placeholder="例如 10:00-11:00, 19:00-21:00"></div><div><input class="control" type="number" placeholder="请输入单价"><em>元 / ${spec.unit}</em></div></div>
        <div class="billing-config-row"><b>高峰</b><div><input class="control" placeholder="例如 08:00-10:00, 17:00-19:00"></div><div><input class="control" type="number" placeholder="请输入单价"><em>元 / ${spec.unit}</em></div></div>
        <div class="billing-config-row"><b>平段</b><div><input class="control" placeholder="例如 11:00-17:00, 21:00-23:00"></div><div><input class="control" type="number" placeholder="请输入单价"><em>元 / ${spec.unit}</em></div></div>
        <div class="billing-config-row"><b>低谷</b><div><input class="control" placeholder="例如 23:00-08:00"></div><div><input class="control" type="number" placeholder="请输入单价"><em>元 / ${spec.unit}</em></div></div>
      </div>
      <span class="form-help">同一天内时段不可重叠；跨日时段用 23:00-08:00 表示。</span>
    </div>`;
  }
  const full=spec.type==="textarea"||/备注|说明|时段/.test(spec.label);
  const required=spec.required!==false&&!spec.readonly;
  const label=`<label class="${required?"required":""}">${spec.label}</label>`;
  const help=spec.readonly?"由当前配置对象自动带出，不可修改":(spec.unit?`单位：${spec.unit}`:"");
  let control="";
  if(spec.type==="select"){
    control=`<select class="control">${(spec.options||[]).map((option,index)=>`<option${index===0?" selected":""}>${option}</option>`).join("")}</select>`;
  }else if(spec.type==="textarea"){
    control=`<textarea class="control" placeholder="${escapeAttr(spec.placeholder||`请输入${spec.label}`)}">${escapeAttr(spec.value||"")}</textarea>`;
  }else{
    control=`<input class="control" type="${spec.type||"text"}" value="${escapeAttr(spec.value||"")}" ${spec.readonly?"readonly":""} placeholder="${escapeAttr(spec.placeholder||`请输入${spec.label}`)}">`;
  }
  return `<div class="form-field ${full?"full":""}">${label}${control}<span class="form-help">${help}</span></div>`;
}
function billingTierRow(name,unit,startPlaceholder,endPlaceholder,removable){
  return `<div class="billing-config-row billing-tier-row">
    <div><input class="control" value="${escapeAttr(name)}" placeholder="请输入阶梯名称"></div>
    <div><input class="control" placeholder="${escapeAttr(startPlaceholder)}" ${startPlaceholder==="0"?"value=\"0\"":""} ${startPlaceholder==="自动承接上一档"?"readonly":""}><em>${unit}</em></div>
    <div><input class="control" placeholder="${escapeAttr(endPlaceholder)}"><em>${unit}</em></div>
    <div><input class="control" type="number" placeholder="请输入单价"><em>元 / ${unit}</em></div>
    <div>${removable?`<button class="btn text danger" type="button" data-remove-tier-row>删除</button>`:"--"}</div>
  </div>`;
}
function addBillingTierRow(){
  const list=document.querySelector("[data-tier-row-list]");
  if(!list) return;
  const count=list.querySelectorAll(".billing-tier-row").length+1;
  list.insertAdjacentHTML("beforeend",billingTierRow(`第${count}阶梯`,billingEnergyTypes.find(item=>item.name===drawerContext.energy)?.unit||"","自动承接上一档","不填表示以上",true));
}
function openBillingMethodModal(method,energy){
  const cfg=billingMethodConfigs[method];
  const item=cfg?.values?.[energy];
  if(!cfg) return toast("未找到对应计费方式配置");
  resetEnergyModalState();
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className="modal energy-modal billing-method-modal";
  drawerContext={customDetail:"billing-method",method,energy};
  document.getElementById("energyModalTitle").textContent=`${item?"编辑":"配置"}${method} / ${energy}`;
  const fields=billingMethodFormFields(method,energy);
  document.getElementById("energyModalBody").innerHTML=`<div class="alert warning"><b>${item?"编辑参数":"未配置"}：</b>当前维护 ${method} 在 ${energy} 场景下的计费参数。</div>
    <div class="form-grid billing-method-form-grid">
      ${fields.map(billingMethodField).join("")}
    </div>`;
  document.getElementById("energyModalOverlay").classList.add("show");
}
const manualMeterUnit=type=>type==="电表"?"kWh":type==="蒸汽表"?"t":"m³";
const numericReading=value=>Number(String(value||"0").replace(/,/g,"").replace(/[^\d.-]/g,""))||0;
const formatReadingNumber=value=>numericReading(value).toLocaleString("zh-CN",{minimumFractionDigits:1,maximumFractionDigits:1});
const readingWithUnit=(value,type)=>`${formatReadingNumber(value)} ${manualMeterUnit(type)}`;
const meterReadingBillList=row=>String(row?.[15]||"").split(";").filter(Boolean).map(item=>{
  const [no,period,use,status]=item.split("｜");
  return {no:no||"—",period:period||"—",use:use||"—",status:status||"—"};
});
function meterReadingMeterOptions(){
  const rows=configs["monitor:人工表计管理"]?.allRows||configs["monitor:人工表计管理"]?.rows||[];
  return rows.filter(row=>row[13]==="启用").map(row=>`${row[1]} / ${row[2]}`);
}
function meterReadingMeterMeta(selection){
  const rows=configs["monitor:人工表计管理"]?.allRows||configs["monitor:人工表计管理"]?.rows||[];
  const code=String(selection||"").split(" / ").pop();
  const row=rows.find(item=>item[2]===code)||rows.find(item=>item[13]==="启用")||[];
  return {
    name:row[1]||"食堂给水支管水表",
    code:row[2]||"MAN-WT-00012",
    type:row[3]||"水表",
    park:row[5]||"微冷园区",
    location:row[6]||"食堂给水支管",
    prevReading:row[10]||row[7]||"0 m³",
    prevTime:row[11]||row[8]||"—",
    cyclePoint:row[9]||"99999"
  };
}
function meterReadingValues(){
  const values={};
  document.querySelectorAll("[data-meter-reading-field]").forEach(input=>{values[input.dataset.meterReadingField]=input.value.trim();});
  return values;
}
function meterReadingField(label,value="",placeholder="",required=true,readonly=false){
  return `<div class="form-field"><label class="${required&&!readonly?"required":""}">${label}</label><input class="control" data-meter-reading-field="${label}" value="${escapeAttr(value)}" ${readonly?"readonly":""} placeholder="${placeholder||`请输入${label}`}"></div>`;
}
function meterReadingSelectField(label,options,value="",required=true,readonly=false){
  return `<div class="form-field"><label class="${required&&!readonly?"required":""}">${label}</label><select class="control" data-meter-reading-field="${label}" ${readonly?"disabled":""}>${options.map(option=>`<option value="${option}"${option===value?" selected":""}>${option}</option>`).join("")}</select></div>`;
}
function meterReadingTextareaField(label,value="",required=false){
  return `<div class="form-field full"><label class="${required?"required":""}">${label}</label><textarea class="control" data-meter-reading-field="${label}" placeholder="请输入${label}">${escapeAttr(value)}</textarea></div>`;
}
function meterReadingForm(action,row=[]){
  const isEdit=action==="编辑";
  const options=meterReadingMeterOptions();
  const selected=isEdit?`${row[1]} / ${row[2]}`:(options[0]||"食堂给水支管水表 / MAN-WT-00012");
  const meta=isEdit?{name:row[1],code:row[2],type:row[3],park:row[4],location:row[6],prevReading:row[7],prevTime:row[16],cyclePoint:row[10]}:meterReadingMeterMeta(selected);
  const type=meta.type;
  const prev=isEdit?row[7]:meta.prevReading;
  const current=isEdit?row[8]:"";
  const delta=current?readingWithUnit(numericReading(current)-numericReading(prev),type):"自动计算";
  return `<div class="meter-reading-form">
    <div class="meter-reading-rule">本次增量 = 本次读数 - 上次读数；同一人工表计、同一抄表时间不能存在两条有效记录。</div>
    <section class="meter-reading-section">
      <h3>人工表计信息</h3>
      <div class="form-grid meter-reading-form-grid meter-reading-form-grid--meter">
        ${isEdit?meterReadingField("选择人工表计",selected,"",false,true):meterReadingSelectField("选择人工表计",options,selected)}
        ${meterReadingField("设备编码",meta.code,"",false,true)}
        ${meterReadingField("设备类型",meta.type,"",false,true)}
        ${meterReadingField("安装位置",meta.location,"",false,true)}
        ${meterReadingField("所属园区",meta.park,"",false,true)}
        ${meterReadingField("循环点",meta.cyclePoint,"",false,true)}
      </div>
    </section>
    <section class="meter-reading-section">
      <h3>上次读数</h3>
      <div class="form-grid meter-reading-form-grid meter-reading-form-grid--previous">
        ${meterReadingField("上次读数",prev,"",false,true)}
        ${meterReadingField("上次读数时间",meta.prevTime,"",false,true)}
      </div>
    </section>
    <section class="meter-reading-section">
      <h3>本次抄表</h3>
      <div class="form-grid meter-reading-form-grid">
        ${meterReadingField("本次读数",current,"请输入本次读数")}
        ${meterReadingField("本次抄表时间",isEdit?row[11]:formatDateTime(new Date()),"请输入本次抄表时间")}
        ${meterReadingField("本次增量",delta,"",false,true)}
        ${meterReadingField("抄表人",isEdit?row[12]:"周正","请输入抄表人")}
        ${meterReadingTextareaField("备注",isEdit?row[17]:"")}
      </div>
    </section>
  </div>`;
}
function openMeterReadingModal(action,row=[]){
  resetEnergyModalState();
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className="modal energy-modal meter-reading-modal";
  document.getElementById("energyModalTitle").textContent=action;
  document.getElementById("energyModalConfirm").textContent=action==="作废"?"确认作废":/查看关联账单/.test(action)?"关闭":"保存";
  let body="";
  if(action==="新增抄表"||action==="编辑") body=meterReadingForm(action,row);
  if(action==="作废") body=`<div class="form-grid meter-reading-form-grid">${meterReadingField("抄表记录",`${row[0]||"—"} / ${row[1]||"—"}`,"",false,true)}${meterReadingField("账单关联状态",row[14]||"未关联","",false,true)}${meterReadingTextareaField("作废原因","",true)}</div>`;
  if(action==="查看关联账单"){
    const bills=meterReadingBillList(row);
    body=`<div class="meter-reading-bill-panel">${bills.length?`<table class="subtable meter-reading-bill-table"><thead><tr><th>账单编号</th><th>所属账期</th><th>读数用途</th><th>账单状态</th></tr></thead><tbody>${bills.map(bill=>`<tr><td>${bill.no}</td><td>${bill.period}</td><td>${bill.use}</td><td>${tag(bill.status)}</td></tr>`).join("")}</tbody></table>`:`<div class="table-empty meter-reading-empty">当前抄表记录未关联能源账单。</div>`}</div>`;
  }
  document.getElementById("energyModalBody").innerHTML=body;
  document.getElementById("energyModalOverlay").classList.add("show");
}
function applyReadingRecordAction(title){
  if(title==="查看关联账单") return true;
  const cfg=configs["monitor:抄表管理"];
  const rows=cfg.allRows||cfg.rows;
  const values=meterReadingValues();
  const row=currentActionContext?.rowIndex>=0?rows[currentActionContext.rowIndex]:null;
  if(title==="新增抄表"){
    if(!values["选择人工表计"]||!values["本次读数"]||!values["本次抄表时间"]){toast("请填写人工表计、本次读数和本次抄表时间");return "blocked";}
    const meta=meterReadingMeterMeta(values["选择人工表计"]);
    const {name,code,type}=meta;
    if(rows.some(item=>item[2]===code&&item[11]===values["本次抄表时间"]&&item[13]==="正常")){toast("同一表计、同一抄表时间已存在有效记录");return "blocked";}
    const prev=values["上次读数"]||meta.prevReading;
    const current=readingWithUnit(values["本次读数"],type);
    const delta=readingWithUnit(numericReading(values["本次读数"])-numericReading(prev),type);
    rows.unshift([`MR-202607-${String(rows.length+42).padStart(5,"0")}`,name,code,type,values["所属园区"]||meta.park,"—",values["安装位置"]||meta.location,prev,current,delta,values["循环点"]||meta.cyclePoint,values["本次抄表时间"],values["抄表人"]||"周正","正常","未关联","",values["上次读数时间"]||meta.prevTime,values["备注"]||"",formatDateTime(new Date())]);
    getPageRuntime("抄表管理").currentPage=1;
    cfg.total=rows.length;
    return true;
  }
  if(!row) return false;
  if(title==="编辑"){
    if(row[14]==="已关联"){toast("已关联账单的记录不允许编辑");return "blocked";}
    if(!values["本次读数"]||!values["本次抄表时间"]||!values["抄表人"]){toast("请填写本次读数、本次抄表时间和抄表人");return "blocked";}
    if(rows.some(item=>item!==row&&item[2]===row[2]&&item[11]===values["本次抄表时间"]&&item[13]==="正常")){toast("同一表计、同一抄表时间已存在有效记录");return "blocked";}
    row[8]=readingWithUnit(values["本次读数"],row[3]);
    row[11]=values["本次抄表时间"];
    row[12]=values["抄表人"];
    row[9]=readingWithUnit(numericReading(row[8])-numericReading(row[7]),row[3]);
    row[17]=values["备注"]||"";
    row[18]=formatDateTime(new Date());
    return true;
  }
  if(title==="作废"){
    if(row[14]==="已关联"){toast("已关联账单的记录不允许作废，请先撤销引用该读数的有效账单");return "blocked";}
    if(!values["作废原因"]){toast("请填写作废原因");return "blocked";}
    row[13]="已作废";
    row[17]=values["作废原因"];
    row[18]=formatDateTime(new Date());
    return true;
  }
  return false;
}
function manualMeterField(label,value="",placeholder="",type="text",required=true){
  return `<div class="form-field"><label class="${required?"required":""}">${label}</label><input class="control" type="${type}" data-manual-meter-field="${label}" value="${escapeAttr(value)}" placeholder="${placeholder||`请输入${label}`}"></div>`;
}
function manualMeterReadonlyField(label,value=""){
  return `<div class="form-field"><label>${label}</label><input class="control" value="${escapeAttr(value)}" readonly></div>`;
}
function manualMeterSelectField(label,options,value=""){
  return `<div class="form-field"><label class="required">${label}</label><select class="control" data-manual-meter-field="${label}">${options.map(option=>`<option value="${option}"${option===value?" selected":""}>${option}</option>`).join("")}</select></div>`;
}
function manualMeterTextareaField(label,value="",required=false){
  return `<div class="form-field full"><label class="${required?"required":""}">${label}</label><textarea class="control" data-manual-meter-field="${label}" placeholder="请输入${label}">${escapeAttr(value)}</textarea></div>`;
}
function manualMeterCascaderField(row=[]){
  const park=row[5]||"微冷园区";
  const location=row[6]||"请选择";
  return `<div class="form-field full manual-meter-cascader-field">
    <label class="required">绑定位置</label>
    <input type="hidden" data-manual-meter-field="所属园区" value="${escapeAttr(park)}">
    <div class="remote-cascader manual-meter-form-cascader">
      <button class="remote-cascader-control" type="button"><span>${escapeAttr(park)} / 能源站 / ${escapeAttr(location)}</span><i>⌄</i></button>
      <div class="remote-cascader-panel">
        <div class="remote-cascader-col"><button class="selected"><i></i><span>微冷园区</span><b>›</b></button><button><i></i><span>上海厂区</span><b>›</b></button></div>
        <div class="remote-cascader-col"><button class="selected"><i></i><span>能源站</span><b>›</b></button><button><i></i><span>生产区</span><b>›</b></button><button><i></i><span>仓储区</span><b>›</b></button><button><i></i><span>办公区</span><b>›</b></button></div>
        <div class="remote-cascader-col"><button><i></i><span>食堂给水支管</span><b>›</b></button><button class="selected"><i></i><span>2#仓库配电箱</span><b>›</b></button><button><i></i><span>换热站入口</span><b>›</b></button><button><i></i><span>绿化取水点</span><b>›</b></button></div>
        <div class="remote-cascader-col"><button class="selected"><i></i><span>1层</span><b>›</b></button><button><i></i><span>2层</span><b>›</b></button><button><i></i><span>3层</span><b>›</b></button><button><i></i><span>4层</span><b>›</b></button></div>
      </div>
    </div>
  </div>`;
}
function manualMeterValues(){
  const values={};
  document.querySelectorAll("[data-manual-meter-field]").forEach(input=>{values[input.dataset.manualMeterField]=input.value.trim();});
  return values;
}
function manualMeterNextCode(type){
  const cfg=configs["monitor:人工表计管理"];
  const prefix=type==="电表"?"MAN-EL":type==="蒸汽表"?"MAN-ST":"MAN-WT";
  const max=(cfg.allRows||[]).reduce((num,row)=>{
    if(!String(row[2]).startsWith(prefix)) return num;
    return Math.max(num,Number(String(row[2]).split("-").pop())||0);
  },0)+1;
  return `${prefix}-${String(max).padStart(5,"0")}`;
}
function manualMeterReadingValue(value,type){
  const text=String(value||"").trim();
  if(!text||/[a-zA-Z]|m³|㎡|吨|度/.test(text)) return text;
  return `${text} ${manualMeterUnit(type)}`;
}
function manualMeterForm(action,row=[]){
  const isEdit=action==="编辑";
  return `<div class="form-grid manual-meter-form-grid">
    ${manualMeterField("设备名称",isEdit?row[1]:"","请输入设备名称")}
    ${manualMeterField("设备编码",isEdit?row[2]:"","留空自动生成")}
    ${manualMeterSelectField("设备类型",["水表","电表","蒸汽表"],isEdit?row[3]:"水表")}
    ${manualMeterSelectField("表计类型",["总表","入户表"],isEdit?row[4]:"入户表")}
    ${manualMeterCascaderField(row)}
    ${manualMeterField("详细位置",isEdit?row[6]:"","请输入详细位置，例如：食堂给水支管")}
    ${manualMeterField("起码读数",isEdit?row[7]:"0","请输入起码读数")}
    ${manualMeterField("读数时间",isEdit?row[8]:"2026-06-01 00:05:12","请输入读数时间")}
    ${manualMeterField("循环点",isEdit?row[9]:"99999","请输入循环点")}
    ${manualMeterTextareaField("备注",isEdit?row[14]:"")}
  </div>`;
}
function openManualMeterModal(action,row=[]){
  resetEnergyModalState();
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className=action==="绑定位置"?"modal energy-modal remote-location-bind-modal manual-meter-location-modal":"modal energy-modal manual-meter-modal";
  document.getElementById("energyModalTitle").textContent=action==="绑定位置"?"位置绑定":action;
  document.getElementById("energyModalConfirm").textContent=action==="绑定位置"?"确定":/停用|启用/.test(action)?"确认":"保存";
  let body="";
  if(action==="新增表计"||action==="编辑") body=manualMeterForm(action,row);
  else if(action==="绑定位置"){
    body=`<div class="remote-location-form manual-meter-location-form">
      <input type="hidden" data-manual-meter-field="所属园区" value="${escapeAttr(row[5]||"微冷园区")}">
      <div class="remote-location-row"><label>设备名称</label><input class="control" value="${escapeAttr(row[1]||"—")}" disabled></div>
      <div class="remote-location-row"><label>设备编码</label><input class="control" value="${escapeAttr(row[2]||"—")}" disabled></div>
      <div class="remote-location-row"><label class="required">绑定位置</label><div class="remote-cascader"><button class="remote-cascader-control" type="button"><span>${escapeAttr(row[5]||"微冷园区")} / 能源站 / ${escapeAttr(row[6]||"请选择")}</span><i>⌄</i></button><div class="remote-cascader-panel"><div class="remote-cascader-col"><button class="selected"><i></i><span>微冷园区</span><b>›</b></button><button><i></i><span>上海厂区</span><b>›</b></button></div><div class="remote-cascader-col"><button class="selected"><i></i><span>能源站</span><b>›</b></button><button><i></i><span>生产区</span><b>›</b></button><button><i></i><span>仓储区</span><b>›</b></button><button><i></i><span>办公区</span><b>›</b></button></div><div class="remote-cascader-col"><button><i></i><span>食堂给水支管</span><b>›</b></button><button class="selected"><i></i><span>2#仓库配电箱</span><b>›</b></button><button><i></i><span>换热站入口</span><b>›</b></button><button><i></i><span>绿化取水点</span><b>›</b></button></div></div></div></div>
      <div class="remote-location-row remote-location-detail-row"><label class="required">详细位置</label><input class="control" data-manual-meter-field="详细位置" value="${escapeAttr(row[6]||"")}" placeholder="请输入详细位置，例如：东侧墙面 / 配电柜旁"></div>
    </div>`;
  }else if(action==="读数"){
    body=`<div class="form-grid manual-meter-form-grid">
      ${manualMeterReadonlyField("设备名称",row[1]||"—")}
      ${manualMeterReadonlyField("设备编码",row[2]||"—")}
      ${manualMeterField("最近抄表读数",row[10]||"0","请输入最近抄表读数")}
      ${manualMeterField("抄表时间",row[11]||"2026-06-10 18:20:00","请输入抄表时间")}
      ${manualMeterTextareaField("备注",row[14]||"")}
    </div>`;
  }else if(action==="停用"){
    body=`<div class="form-grid manual-meter-form-grid">${manualMeterReadonlyField("设备名称",row[1]||"—")}${manualMeterReadonlyField("设备编码",row[2]||"—")}${manualMeterTextareaField("停用原因","",true)}</div>`;
  }else if(action==="启用"){
    body=`<div class="form-grid manual-meter-form-grid">${manualMeterReadonlyField("设备名称",row[1]||"—")}${manualMeterReadonlyField("设备编码",row[2]||"—")}${manualMeterTextareaField("启用确认","现场表计可正常读数。",true)}</div>`;
  }
  document.getElementById("energyModalBody").innerHTML=body;
  document.getElementById("energyModalOverlay").classList.add("show");
}
function requireManualMeter(values,fields){
  const missing=fields.find(label=>!values[label]);
  if(!missing) return false;
  toast(`请填写${missing}`);
  document.querySelector(`[data-manual-meter-field="${missing}"]`)?.focus();
  return true;
}
function applyManualMeterAction(title){
  const cfg=configs["monitor:人工表计管理"];
  const rows=cfg.allRows||cfg.rows;
  const values=manualMeterValues();
  const row=currentActionContext?.rowIndex>=0?rows[currentActionContext.rowIndex]:null;
  if(title==="新增表计"){
    if(requireManualMeter(values,["设备名称","设备类型","表计类型","所属园区","详细位置","起码读数","读数时间","循环点"])) return "blocked";
    const type=values["设备类型"];
    const code=values["设备编码"]||manualMeterNextCode(type);
    if(rows.some(item=>item[2]===code)){
      toast("设备编码已存在，请重新填写");
      return "blocked";
    }
    const startReading=manualMeterReadingValue(values["起码读数"],type);
    rows.unshift([String(rows.length+1),values["设备名称"],code,type,values["表计类型"],values["所属园区"],values["详细位置"],startReading,values["读数时间"],values["循环点"],startReading,values["读数时间"],"—","启用",values["备注"]||""]);
    rows.forEach((item,index)=>item[0]=String(index+1));
    getPageRuntime("人工表计管理").currentPage=1;
    cfg.total=rows.length;
    return true;
  }
  if(!row) return false;
  if(title==="编辑"){
    if(requireManualMeter(values,["设备名称","设备类型","表计类型","所属园区","详细位置","起码读数","读数时间","循环点"])) return "blocked";
    const code=values["设备编码"]||row[2];
    if(rows.some(item=>item!==row&&item[2]===code)){
      toast("设备编码已存在，请重新填写");
      return "blocked";
    }
    row.splice(0,row.length,row[0],values["设备名称"],code,values["设备类型"],values["表计类型"],values["所属园区"],values["详细位置"],manualMeterReadingValue(values["起码读数"],values["设备类型"]),values["读数时间"],values["循环点"],row[10],row[11],row[12]||"—",row[13]||"启用",values["备注"]||"");
    return true;
  }
  if(title==="绑定位置"||title==="位置绑定"){
    if(requireManualMeter(values,["所属园区","详细位置"])) return "blocked";
    row[5]=values["所属园区"];
    row[6]=values["详细位置"];
    return true;
  }
  if(title==="读数"){
    if(requireManualMeter(values,["最近抄表读数","抄表时间"])) return "blocked";
    row[10]=manualMeterReadingValue(values["最近抄表读数"],row[3]);
    row[11]=values["抄表时间"];
    row[14]=values["备注"]||row[14]||"";
    return true;
  }
  if(title==="停用"){
    if(requireManualMeter(values,["停用原因"])) return "blocked";
    row[13]="停用";
    return true;
  }
  if(title==="启用"){
    if(requireManualMeter(values,["启用确认"])) return "blocked";
    row[13]="启用";
    return true;
  }
  return false;
}
function resetEnergyModalState(){
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className="modal energy-modal";
  document.getElementById("energyModalConfirm").textContent="确认";
}
function openDeviceAlarmModal(action,row=[]){
  resetEnergyModalState();
  currentActionContext={page:activePage,action,rowIndex:drawerContext.rowIndex??-1};
  const modal=document.querySelector("#energyModalOverlay .modal");
  const device=alarmDeviceMeta(row[2]);
  const suggestion=deviceAlarmSuggestion(row);
  if(action==="误报关闭"){
    modal.className="modal energy-modal perimeter-operation-modal";
    document.getElementById("energyModalTitle").textContent="误报关闭";
    document.getElementById("energyModalConfirm").textContent="确认";
    document.getElementById("energyModalBody").innerHTML=`<div class="confirm-message">误报关闭后氨气告警进入终态，不可再进行派单或继续处置。仅待确认氨气告警允许执行误报关闭。</div>
    <div class="field perimeter-false-reason"><label>误报原因 <span>*</span></label><textarea class="control action-security-alarm-false-reason" maxlength="200" placeholder="请填写核验依据，例如现场复测浓度正常、设备瞬时波动已恢复、传感器短时干扰误触发"></textarea></div>`;
    document.getElementById("energyModalOverlay").classList.add("show");
    return;
  }
  if(action==="派单处置"){
    modal.className="modal energy-modal alarm-dispatch-modal";
    document.getElementById("energyModalTitle").textContent="派单";
    document.getElementById("energyModalConfirm").textContent="确认派单";
    document.getElementById("energyModalBody").innerHTML=`<div class="alarm-dispatch-form security-workorder-dispatch-form">
      <div class="form-grid">
        <div class="form-field">
          <label>告警编号（只读）</label>
          <input class="control" value="${row[0]}" readonly>
        </div>
        <div class="form-field">
          <label class="required">处理人</label>
          <input class="control" data-modal-field="处理人" placeholder="请输入处理人" value="${escapeAttr(row[7]==="—"?"王海":row[7])}">
        </div>
        <div class="form-field">
          <label class="required">处理时限</label>
          <input class="control" data-modal-field="处理时限" type="datetime-local" step="60" value="2026-06-11T10:40">
        </div>
        <div class="form-field">
          <label>告警位置</label>
          <input class="control" value="${escapeAttr(`${row[1]} / ${device.location}`)}" readonly>
        </div>
        <div class="form-field full">
          <label>关联告警处置建议</label>
          <textarea class="control" readonly>${suggestion}</textarea>
        </div>
        <div class="form-field full">
          <label>派单说明</label>
          <textarea class="control" data-modal-field="派单说明" placeholder="请输入说明">请按关联告警处置建议完成现场核查，并上传处理结果。</textarea>
        </div>
      </div>
    </div>`;
    document.getElementById("energyModalOverlay").classList.add("show");
    return;
  }
  if(action==="换人"){
    if(!["待接单","处置中"].includes(row[6])){
      toast("仅待接单、处置中的告警支持换人");
      return;
    }
    const deadline=deviceAlarmTime(ammoniaDetailDateValue(row[5]),28);
    modal.className="modal energy-modal alarm-dispatch-modal device-alarm-change-modal";
    document.getElementById("energyModalTitle").textContent="派单换人";
    document.getElementById("energyModalConfirm").textContent="确认换人";
    document.getElementById("energyModalBody").innerHTML=`<div class="alarm-dispatch-form security-workorder-dispatch-form">
      <div class="form-grid">
        <div class="form-field">
          <label>告警编号（只读）</label>
          <input class="control" value="${row[0]}" readonly>
        </div>
        <div class="form-field">
          <label>原处理人（只读）</label>
          <input class="control" value="${escapeAttr(row[7]||"—")}" readonly>
        </div>
        <div class="form-field">
          <label class="required">新处理人（来源：园区员工，必填）</label>
          <input class="control" data-modal-field="新处理人" list="deviceAlarmHandlerOptions" placeholder="请选择新处理人">
          <datalist id="deviceAlarmHandlerOptions">
            ${["王海","赵峰","李青","周正","刘洋","陈凯"].map(name=>`<option value="${name}"></option>`).join("")}
          </datalist>
        </div>
        <div class="form-field">
          <label>处理时限</label>
          <input class="control" data-modal-field="处理时限" value="${deadline}" readonly>
        </div>
        <div class="form-field">
          <label>今日值班人（来自排班日历）</label>
          <input class="control" value="王海、赵峰、李青" readonly>
        </div>
        <div class="form-field">
          <label class="required">换人说明（必填）</label>
          <textarea class="control" data-modal-field="换人说明" placeholder="请输入换人说明">重新指派告警处置责任人。</textarea>
        </div>
      </div>
    </div>`;
    document.getElementById("energyModalOverlay").classList.add("show");
  }
}
function openRemoteLocationModal(row=[]){
  resetEnergyModalState();
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className="modal energy-modal remote-location-bind-modal";
  document.getElementById("energyModalTitle").textContent="位置绑定";
  document.getElementById("energyModalConfirm").textContent="确定";
  const deviceName=row[1]||"—";
  document.getElementById("energyModalBody").innerHTML=`<div class="remote-location-form">
    <div class="remote-location-row">
      <label>设备名称</label>
      <input class="control" value="${escapeAttr(deviceName)}" disabled>
    </div>
    <div class="remote-location-row">
      <label class="required">绑定位置</label>
      <div class="remote-cascader">
        <button class="remote-cascader-control" type="button"><span>请选择</span><i>⌄</i></button>
        <div class="remote-cascader-panel">
          <div class="remote-cascader-col">
            <button class="selected"><i></i><span>微冷园区</span><b>›</b></button>
            <button><i></i><span>上海厂区</span><b>›</b></button>
          </div>
          <div class="remote-cascader-col">
            <button class="selected"><i></i><span>能源站</span><b>›</b></button>
            <button><i></i><span>生产区</span><b>›</b></button>
            <button><i></i><span>仓储区</span><b>›</b></button>
            <button><i></i><span>办公区</span><b>›</b></button>
          </div>
          <div class="remote-cascader-col">
            <button><i></i><span>D栋</span><b>›</b></button>
            <button class="selected"><i></i><span>1#配电室</span><b>›</b></button>
            <button><i></i><span>动力站</span><b>›</b></button>
            <button><i></i><span>冷库机房</span><b>›</b></button>
          </div>
          <div class="remote-cascader-col">
            <button class="selected"><i></i><span>1层</span><b>›</b></button>
            <button><i></i><span>2层</span><b>›</b></button>
            <button><i></i><span>3层</span><b>›</b></button>
            <button><i></i><span>4层</span><b>›</b></button>
            <button><i></i><span>5层</span><b>›</b></button>
          </div>
        </div>
      </div>
    </div>
    <div class="remote-location-row remote-location-detail-row">
      <label>详细位置</label>
      <input class="control" placeholder="请输入详细位置，例如：东侧墙面 / 配电柜旁">
    </div>
  </div>`;
  document.getElementById("energyModalOverlay").classList.add("show");
}
function openFormDrawer(action,fields,note){
  document.getElementById("energyDrawerTabs").classList.remove("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  resetEnergyDrawerFooter();
  currentActionContext={page:activePage,action,rowIndex:drawerContext.rowIndex??-1};
  drawerMode="form";document.getElementById("energyDrawerTitle").textContent=action;
  document.getElementById("energyDrawerTabs").innerHTML="";
  document.getElementById("energyDrawerBody").innerHTML=`${note}<div class="form-grid">${fields.map(field).join("")}</div>`;
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function meterRelationReadonly(label,value){
  return `<div class="form-field"><label>${label}</label><input class="control" value="${escapeAttr(value||"")}" disabled><span class="form-help">由已选数据自动带出，只读</span></div>`;
}
function meterRelationInput(label,value="",required=true,type="text"){
  return `<div class="form-field"><label class="${required?"required":""}">${label}</label><input class="control" type="${type}" value="${escapeAttr(value||"")}" placeholder="请输入或选择${label}"></div>`;
}
function meterRelationSelect(label,options,value="",required=true){
  return `<div class="form-field"><label class="${required?"required":""}">${label}</label><select class="control">${options.map(option=>`<option value="${option}"${option===value?" selected":""}>${option}</option>`).join("")}</select></div>`;
}
function meterRelationTextarea(label,value="",required=false){
  return `<div class="form-field full"><label class="${required?"required":""}">${label}</label><textarea class="control" placeholder="请输入${label}">${escapeAttr(value||"")}</textarea></div>`;
}
function meterRelationEnterpriseMeta(name){
  const data={
    "大连微冷食品股份有限公司":{contact:"张敏 / 13800138001"},
    "大连瑞兴天宝水产品有限公司":{contact:"刘洋 / 13900139002"},
    "大连微冷农产品有限公司":{contact:"王海 / 13600136003"},
    "联合林洋食品（大连）有限公司":{contact:"陈凯 / 13500135004"},
    "海洋食品设计与创制高新技术研究院":{contact:"赵峰 / 13700137005"}
  };
  return data[name]||data["大连微冷食品股份有限公司"];
}
function meterRelationEffectiveField(row=[]){
  const isLong=/长期/.test(row[13]||"长期");
  return `<div class="form-field full meter-relation-validity"><label class="required">有效期</label><div class="meter-relation-validity-row"><input class="control" type="date" value="${escapeAttr(row[12]||"2026-08-01")}"><span>至</span><input class="control" type="date" value="${isLong?"":escapeAttr(row[13]||"")}" ${isLong?"disabled":""}><label class="meter-relation-long-term"><input type="checkbox" ${isLong?"checked":""}>长期</label></div></div>`;
}
function meterRelationSelectedMeterTable(meters=[]){
  return `<div class="form-field full meter-relation-selected-field">
    <div class="meter-relation-selected-head"><label class="required">关联表计</label><button class="btn" type="button" data-action="选择表计">选择表计</button></div>
    <div class="meter-relation-selected-table-wrap">
      <table class="subtable meter-relation-selected-table">
        <thead><tr><th>序号</th><th>设备名称</th><th>设备编码</th><th>安装位置</th><th>循环点</th></tr></thead>
        <tbody>${meters.map((item,index)=>`<tr><td>${index+1}</td><td>${item.name}</td><td>${item.code}</td><td>${item.location}</td><td>${item.cyclePoint}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    <span class="form-help">多表计逐行展示，账单生成时汇总全部有效表计用量。</span>
  </div>`;
}
function meterRelationForm(action,row=[]){
  const isEdit=action==="编辑";
  const locked=isEdit&&row[9]==="已产生账单";
  const meters=meterRelationMeterRows(row);
  const enterprise=row[1]||"大连微冷食品股份有限公司";
  const park=row[2]||"三里园区";
  const energy=row[3]||"电";
  const method=row[5]||"分时单价";
  const enterpriseMeta=meterRelationEnterpriseMeta(enterprise);
  return `<div class="meter-relation-form">
    ${locked?`<div class="alert warning"><b>编辑限制：</b>该计量关系已产生账单，企业、能源类型、关联表计、计费方式和生效日期不可修改。如需更换企业、表计或计费方式，应结束原关系后新增关系。</div>`:""}
    <section class="meter-relation-section"><h3>企业信息</h3><div class="form-grid meter-relation-form-grid meter-relation-enterprise-grid">
      ${meterRelationSelect("所属园区",["三里园区"],park,true)}
      <div class="form-field"><label class="required">企业</label><select class="control" data-meter-relation-enterprise>${["大连微冷食品股份有限公司","大连瑞兴天宝水产品有限公司","大连微冷农产品有限公司","联合林洋食品（大连）有限公司","海洋食品设计与创制高新技术研究院"].map(option=>`<option value="${option}"${option===enterprise?" selected":""}>${option}</option>`).join("")}</select></div>
      <div class="form-field"><label>联系人/联系方式</label><input class="control" data-meter-relation-contact value="${enterpriseMeta.contact}" disabled><span class="form-help">选择企业后由企业管理自动带出</span></div>
    </div></section>
    <section class="meter-relation-section"><h3>表计信息</h3><div class="form-grid meter-relation-form-grid meter-relation-meter-grid">
      ${meterRelationSelect("能源类型",["水","电","蒸汽"],energy,true)}
      ${meterRelationSelectedMeterTable(meters)}
    </div></section>
    <section class="meter-relation-section"><h3>计费信息</h3><div class="form-grid meter-relation-form-grid">
      ${meterRelationSelect("计费方式",billingMethodTypes,method,true)}
      ${meterRelationReadonly("计费规则摘要",row[6]||"尖/峰/平/谷4个时段")}
      ${meterRelationEffectiveField(row)}
      ${meterRelationTextarea("备注",locked?"已产生账单，仅允许修改失效日期和备注。":"")}
    </div></section>
  </div>`;
}
function openMeterRelationModal(action,row=[]){
  resetEnergyModalState();
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className="modal energy-modal meter-relation-modal";
  currentActionContext={page:activePage,action,rowIndex:drawerContext.rowIndex??-1};
  document.getElementById("energyModalTitle").textContent=action;
  document.getElementById("energyModalConfirm").textContent=/停用|重新启用/.test(action)?"确认":"保存";
  if(action==="新增计量关系"||action==="编辑"){
    document.getElementById("energyModalBody").innerHTML=meterRelationForm(action,row);
  }else if(action==="停用"){
    document.getElementById("energyModalBody").innerHTML=`<div class="alert warning"><b>停用影响：</b>停用后不再参与停用日期后的账单生成，不影响停用前已生成账单，表计可重新关联其他企业。</div><div class="form-grid meter-relation-form-grid">${meterRelationReadonly("计量关系",`${row[1]||"—"} / ${row[3]||"—"} / ${row[5]||"—"}`)}${meterRelationInput("停用日期",new Date().toISOString().slice(0,10),true,"date")}${meterRelationTextarea("停用原因","",true)}</div>`;
  }else if(action==="重新启用"){
    document.getElementById("energyModalBody").innerHTML=`<div class="alert warning"><b>重新启用校验：</b>表计当前未关联其他企业，原计费规则仍处于可用状态，且新生效日期不存在时间冲突。</div><div class="form-grid meter-relation-form-grid">${meterRelationReadonly("计量关系",`${row[1]||"—"} / ${row[3]||"—"} / ${row[5]||"—"}`)}${meterRelationInput("新生效日期",new Date().toISOString().slice(0,10),true,"date")}${meterRelationTextarea("备注","若中断时间较长，建议新增新关系，不直接恢复原关系。")}</div>`;
  }
  document.getElementById("energyModalOverlay").classList.add("show");
}
function openMeterRelationDrawer(action,row=[]){
  document.getElementById("energyDrawerTabs").classList.add("hidden-tabs");
  document.querySelector("#energyDrawerOverlay .drawer").classList.remove("ammonia-device-detail-drawer","device-alarm-detail-drawer","remote-reading-drawer","daily-energy-drawer","meter-relation-detail-drawer");
  resetEnergyDrawerFooter();
  document.querySelector("#energyDrawerOverlay .drawer").classList.add("meter-relation-form-drawer");
  currentActionContext={page:activePage,action,rowIndex:-1};
  drawerMode="form";
  drawerContext={row,customDetail:null,rowIndex:-1};
  document.getElementById("energyDrawerTitle").textContent=action;
  document.getElementById("energyDrawerTabs").innerHTML="";
  document.getElementById("energyDrawerBody").innerHTML=meterRelationForm(action,row);
  const closeBtn=document.querySelector('#energyDrawerOverlay .drawer-foot [data-close="drawer"]');
  if(closeBtn) closeBtn.textContent="取消";
  const confirmBtn=document.getElementById("energyDrawerConfirm");
  confirmBtn.textContent="保存";
  confirmBtn.dataset.action="";
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function meterRelationPickerContent(){
  const selectedRows=meterRelationPickerRows.filter(row=>meterRelationPickerState.selectedCodes.has(row[2]));
  const total=meterRelationPickerRows.length;
  const pageCount=Math.max(1,Math.ceil(total/meterRelationPickerState.pageSize));
  meterRelationPickerState.page=Math.min(meterRelationPickerState.page,pageCount);
  const start=(meterRelationPickerState.page-1)*meterRelationPickerState.pageSize;
  const pageRows=meterRelationPickerRows.slice(start,start+meterRelationPickerState.pageSize);
  const pageButtons=Array.from({length:pageCount},(_,index)=>`<button class="page-btn ${index+1===meterRelationPickerState.page?"active":""}" data-meter-relation-picker-page="${index+1}">${index+1}</button>`).join("");
  return `<div class="meter-relation-picker">
    <div class="meter-relation-picker-selected">
      <div class="meter-relation-picker-selected-head">
        <b>已选设备 <span>(${selectedRows.length})</span></b>
        <small>已选设备确认后回填到计量关系抽屉的“已选表计明细”</small>
      </div>
      <div class="meter-relation-picker-chip-list">
        ${selectedRows.length?selectedRows.map(row=>`<span class="meter-relation-picker-chip"><span><b>${row[1]}</b><small>${row[2]}</small></span><button type="button" data-meter-relation-picker-remove="${row[2]}" aria-label="移除${row[1]}">×</button></span>`).join(""):`<span class="meter-relation-picker-empty">暂未选择设备</span>`}
      </div>
    </div>
    <div class="meter-relation-picker-main">
      <div class="meter-relation-picker-toolbar">
        <div class="field"><label>设备名称/编码</label><input class="control" placeholder="请输入设备名称或编码"></div>
        <div class="field"><label>表计来源</label><select class="control"><option>全部来源</option><option>远传设备</option><option>人工表计</option></select></div>
        <div class="field"><label>安装位置</label><input class="control" placeholder="请输入安装位置"></div>
        <div class="meter-relation-picker-actions"><button class="btn primary">查询</button><button class="btn">重置</button></div>
      </div>
      <div class="meter-relation-picker-table-wrap">
        <table class="subtable meter-relation-picker-table">
          <thead><tr><th></th><th>序号</th><th>设备名称</th><th>设备编码</th><th>表计来源</th><th>安装位置</th><th>循环点</th></tr></thead>
          <tbody>${pageRows.map(row=>`<tr><td><input type="checkbox" data-meter-relation-picker-check="${row[2]}" ${meterRelationPickerState.selectedCodes.has(row[2])?"checked":""}></td><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td></tr>`).join("")}</tbody>
        </table>
      </div>
      <div class="meter-relation-picker-pagination"><span>共 ${total} 条</span><button class="page-btn" data-meter-relation-picker-step="prev" ${meterRelationPickerState.page===1?"disabled":""}>‹</button>${pageButtons}<button class="page-btn" data-meter-relation-picker-step="next" ${meterRelationPickerState.page===pageCount?"disabled":""}>›</button></div>
    </div>
  </div>`;
}
function renderMeterRelationPicker(){
  const body=document.getElementById("energyModalBody");
  if(body) body.innerHTML=meterRelationPickerContent();
}
function openMeterRelationPickerModal(){
  resetEnergyModalState();
  const modal=document.querySelector("#energyModalOverlay .modal");
  modal.className="modal energy-modal meter-relation-picker-modal";
  document.getElementById("energyModalTitle").textContent="选择表计";
  document.getElementById("energyModalConfirm").textContent="确定";
  renderMeterRelationPicker();
  document.getElementById("energyModalOverlay").classList.add("show");
}
function openCarbonYearModal(){
  resetEnergyModalState();
  document.getElementById("energyModalTitle").textContent="新增核算年度";
  document.getElementById("energyModalBody").innerHTML=`<div class="form-grid"><div class="form-field"><label class="required">核算年度</label><input class="control" value="2026"></div><div class="form-field"><label class="required">报告主体</label><select class="control"><option>大连微冷园区运营管理有限公司</option></select></div><div class="form-field"><label class="required">统一社会信用代码</label><input class="control" value="91210200MA7WL2026X" disabled></div><div class="form-field"><label class="required">核算周期</label><input class="control" value="2026-01-01 至 2026-12-31" disabled></div><div class="form-field full"><label class="required">核算依据</label><input class="control" value="GB/T 32150—2025；适用行业指南"></div><div class="form-field full"><label>核算说明</label><textarea class="control" maxlength="500" placeholder="最多 500 字"></textarea></div></div><div class="alert warning"><b>业务校验：</b>同一园区同一年度仅允许一条核算记录，新增成功后进入核算详情。</div>`;
  document.getElementById("energyModalOverlay").classList.add("show");
}
function openCarbonUploadModal(){
  resetEnergyModalState();
  document.getElementById("energyModalTitle").textContent="上传核算结果";
  document.getElementById("energyModalBody").innerHTML=`<div class="carbon-upload-steps"><span class="active">1 选择文件</span><span>2 数据校验</span><span>3 导入结果</span></div><div class="form-grid"><div class="form-field"><label class="required">核算年度</label><input class="control" value="2026 年" disabled></div><div class="form-field"><label class="required">排放类别</label><input class="control" value="${carbonState.detailTab.startsWith("二类")?"二类":carbonState.detailTab.startsWith("三类")?"三类":"一类"}" disabled></div><div class="form-field"><label class="required">计算规则版本</label><select class="control"><option>V2026.1</option></select></div><div class="form-field"><label class="required">上传文件</label><div class="upload-box">＋ 上传 XLSX</div></div><div class="form-field full"><label>数据说明</label><textarea class="control"></textarea></div><div class="form-field full"><label>支撑材料</label><div class="upload-box">＋ 上传 PDF、DOCX、XLSX、JPG、PNG、ZIP</div></div></div><div class="carbon-check-summary"><b>数据校验预览</b><span>总条数 25</span><span>可导入 24</span><span>异常 1</span><span>重复 2</span><button class="btn">下载异常数据</button></div><div class="alert warning"><b>重复数据处理：</b>唯一条件为“核算年度 + 月份 + 排放类别 + 排放项目”，重复时需用户确认覆盖，不允许自动累加。</div>`;
  document.getElementById("energyModalOverlay").classList.add("show");
}
function openCarbonRuleDrawer(){
  resetEnergyDrawerFooter();
  document.getElementById("energyDrawerTitle").textContent="计算规则";
  document.getElementById("energyDrawerTabs").innerHTML=["规则信息","正文结构","下载模板"].map((tab,i)=>`<button class="tab ${i===0?"active":""}" data-drawer-tab="${tab}">${tab}</button>`).join("");
  document.getElementById("energyDrawerBody").innerHTML=`<div class="info-grid"><div class="info-item"><label>规则名称</label><div>${carbonState.detailTab.startsWith("二类")?"净购入能源间接排放规则":carbonState.detailTab.startsWith("三类")?"其他间接排放扩展规则":"一类直接排放计算规则"}</div></div><div class="info-item"><label>依据文件</label><div>GB/T 32150—2025、适用行业指南、国家温室气体排放因子数据库</div></div><div class="info-item"><label>规则版本</label><div>V2026.1</div></div><div class="info-item"><label>适用年度</label><div>2026 年</div></div><div class="info-item"><label>维护日期</label><div>2026-07-29</div></div><div class="info-item"><label>园区扩展口径</label><div>${carbonState.detailTab.startsWith("三类")?"是":"否"}</div></div></div><div class="alert"><b>正文结构：</b>适用说明、核算边界、需要准备的数据、计算公式、参数和排放因子、单位换算、数据凭证要求、缺失数据处理、计算示例、下载模板。</div>`;
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openCarbonReportModal(){
  resetEnergyModalState();
  document.getElementById("energyModalTitle").textContent="生成报告";
  document.getElementById("energyModalBody").innerHTML=`<div class="form-grid"><div class="form-field"><label class="required">报告年度</label><select class="control"><option>2025 年</option><option>2026 年</option></select></div><div class="form-field"><label class="required">报告类型</label><select class="control"><option>园区温室气体排放报告</option><option>碳资产基础数据报表</option></select></div><div class="form-field full"><label class="required">报告名称</label><input class="control" value="2025 年度园区温室气体排放报告"></div><div class="form-field"><label class="required">核算依据</label><input class="control" value="GB/T 32150—2025" disabled></div><div class="form-field"><label class="required">报告口径</label><select class="control"><option>园区综合口径</option><option>园区核算口径</option></select></div><div class="form-field"><label class="required">编制单位</label><input class="control" value="大连微冷园区运营管理有限公司"></div><div class="form-field"><label>编制人</label><input class="control" value="周正"></div><div class="form-field"><label class="required">报告日期</label><input class="control" value="2026-07-29"></div><div class="form-field"><label class="required">是否附碳足迹与碳流图</label><select class="control"><option>是</option><option>否</option></select></div><div class="form-field full"><label>报告说明</label><textarea class="control"></textarea></div></div>`;
  document.getElementById("energyModalOverlay").classList.add("show");
}
function openCarbonReportPreview(action){
  if(action==="下载") return toast("报告文件已下载");
  resetEnergyDrawerFooter();
  document.getElementById("energyDrawerTitle").textContent=action==="重新生成"?"重新生成报告":"报告预览";
  document.getElementById("energyDrawerTabs").innerHTML=["封面","声明页","排放结果","数据质量控制","碳流分析"].map((tab,i)=>`<button class="tab ${i===0?"active":""}" data-drawer-tab="${tab}">${tab}</button>`).join("");
  document.getElementById("energyDrawerBody").innerHTML=`<div class="budget-report-preview"><h1>2025 年度园区温室气体排放报告</h1><div class="budget-report-cover-meta"><span>报告主体：大连微冷园区运营管理有限公司</span><span>报告年度：2025 年</span><span>报告版本：V2</span></div><h2>第六章 排放量核算结果</h2>${carbonTable(["序号","排放类别","排放量","说明"],[["1","一类排放量","116.80 tCO₂e","直接排放"],["2","二类排放量","1,765.20 tCO₂e","净购入能源间接排放"],["3","三类排放量","298.40 tCO₂e","园区扩展管理数据"],["4","园区核算排放量","1,882.00 tCO₂e","依法报送口径需按适用指南确认"],["5","园区综合碳排放量","2,180.40 tCO₂e","一类 + 二类 + 三类"]])}</div>`;
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openCarbonFlowDetail(){openCarbonRuleDrawer();}
function openCarbonEmissionDetail(){
  resetEnergyDrawerFooter();
  document.getElementById("energyDrawerTitle").textContent="核算明细详情";
  document.getElementById("energyDrawerTabs").innerHTML=["基本信息","活动数据","核算信息","计量信息","支撑材料和操作记录"].map((tab,i)=>`<button class="tab ${i===0?"active":""}" data-drawer-tab="${tab}">${tab}</button>`).join("");
  document.getElementById("energyDrawerBody").innerHTML=`<div class="info-grid"><div class="info-item"><label>年度</label><div>2026 年</div></div><div class="info-item"><label>月份</label><div>2026-01</div></div><div class="info-item"><label>排放类别</label><div>${carbonState.detailTab.startsWith("二类")?"二类":carbonState.detailTab.startsWith("三类")?"三类":"一类"}</div></div><div class="info-item"><label>排放设施</label><div>天然气锅炉</div></div><div class="info-item"><label>排放源</label><div>天然气燃烧</div></div><div class="info-item"><label>温室气体种类</label><div>CO₂、CH₄、N₂O</div></div><div class="info-item"><label>数据状态</label><div>正常</div></div></div>${carbonTable(["序号","材料名称","文件类型","上传人","上传时间"],[["1","天然气消耗台账","XLSX","周正","2026-07-29 09:20"],["2","燃气结算发票","PDF","周正","2026-07-29 09:21"]],["查看","下载"])}${carbonTable(["序号","操作类型","操作人","操作时间","说明"],[["1","文件导入","周正","2026-07-29 09:28","导入一类核算结果"],["2","页面编辑","周正","2026-07-29 10:18","补充修改说明"]])}`;
  document.getElementById("energyDrawerOverlay").classList.add("show");
}
function openAction(action){
  if(activePage==="碳排放核算"&&action==="返回核算列表"){carbonState.detail=null;carbonState.detailTab="核算概览";return renderPage();}
  if(activePage==="碳排放核算"&&["继续编制","查看"].includes(action)&&!carbonState.detail){carbonState.detail=drawerContext.row||carbonRows[0];carbonState.detailTab="核算概览";return renderPage();}
  if(activePage==="碳排放核算"&&action==="新增核算年度") return openCarbonYearModal();
  if(activeModule==="carbon"&&action==="查看计算规则") return openCarbonRuleDrawer();
  if(activeModule==="carbon"&&action==="上传核算结果") return openCarbonUploadModal();
  if(activeModule==="carbon"&&action==="下载导入模板") return toast("已下载对应排放类别的标准导入模板");
  if(activeModule==="carbon"&&["数据质量自检","执行自检","重新汇总","完成核算","重新打开","删除","编辑","下载异常数据"].includes(action)) return toast(`${action}操作已完成`);
  if(activeModule==="carbon"&&action==="查看") return openCarbonEmissionDetail();
  if(activeModule==="carbon"&&action==="生成报告") return openCarbonReportModal();
  if(activePage==="碳排放报告"&&["预览","下载","重新生成"].includes(action)) return openCarbonReportPreview(action);
  if(activePage==="碳足迹与碳流图"&&action==="详情") return openCarbonFlowDetail();
  if(action==="查看") return openDetail(drawerContext.row||[]);
  if(action==="详情") return openDetail(drawerContext.row||[]);
  if(activePage==="预算管理"&&["新增预算","编辑","查看月度预算"].includes(action)) return openBudgetDrawer(action,drawerContext.row||{});
  if(activePage==="预算管理"&&action==="停用") return openBudgetStopModal(drawerContext.row||{});
  if(activePage==="预算执行"&&action==="导出图表图片") return toast("月度执行趋势图已导出");
  if(activePage==="预算报告"&&action==="预览"){budgetState.reportPreview=drawerContext.row||budgetReports[0];return renderBudgetReport();}
  if(activePage==="预算报告"&&action==="返回报告列表"){budgetState.reportPreview=null;return renderBudgetReport();}
  if(activePage==="预算报告"&&action==="下载PDF") return toast("PDF已下载，导出内容为当前报告快照");
  if(activePage==="预算报告"&&action==="重新生成") return toast("已按当前修正后的预算和能耗统计数据重新生成报告，并更新生成时间");
  if(action==="查看抄表记录") return openDetailAt(drawerContext.row||[],"抄表记录");
  if(action==="查看变更记录") return openDetailAt(drawerContext.row||[],"变更记录");
  if(action==="查看趋势") return openTrendDetail(drawerContext.row||[]);
  if(action==="查看告警") return openDetailAt(drawerContext.row||[],"告警记录");
  if(activePage==="计费方式"&&action==="保存配置") return toast(`${action}操作已完成`);
  if(["查询","重置","刷新","导出","导出报表"].includes(action)){
    if(dynamicPages.has(activePage)){
      const runtime=getPageRuntime(activePage);
      runtime.currentPage=1;
      runtime.filters=action==="重置"?{}:collectFilterValues();
      if(action==="重置") document.querySelectorAll(".filter-input").forEach(x=>x.value="");
      renderPage();
    }else if(action==="重置") document.querySelectorAll(".filter-input").forEach(x=>x.value="");
    return toast(`${action}操作已完成`);
  }
  if(activePage==="远传设备管理"&&action==="读数") return openRemoteReadingDrawer(drawerContext.row||[]);
  if(activePage==="远传设备管理"&&action==="绑定位置") return openRemoteLocationModal(drawerContext.row||[]);
  if(activePage==="远传设备管理"&&action==="编辑") return toast("编辑操作已保留，编辑弹窗暂不展示");
  if(activePage==="远传设备管理"&&action==="删除") return toast("删除操作已提交");
  if(activePage==="人工表计管理"&&action==="读数") return openManualMeterReadingDrawer(drawerContext.row||[]);
  if(activePage==="人工表计管理"&&["新增表计","绑定位置","编辑","停用","启用"].includes(action)){currentActionContext={page:activePage,action,rowIndex:drawerContext.rowIndex??-1};return openManualMeterModal(action,drawerContext.row||[]);}
  if(activePage==="抄表管理"&&["新增抄表","编辑","作废","查看关联账单"].includes(action)){
    const row=drawerContext.row||[];
    if(["编辑","作废"].includes(action)&&row[14]==="已关联") return toast("已关联账单的抄表记录不允许编辑或作废");
    if(["编辑","作废"].includes(action)&&row[13]==="已作废") return toast("已作废的抄表记录不允许再次编辑或作废");
    currentActionContext={page:activePage,action,rowIndex:drawerContext.rowIndex??-1};
    return openMeterReadingModal(action,row);
  }
  if(activePage==="计量关系"&&action==="新增计量关系") return openMeterRelationDrawer(action,[]);
  if(activePage==="计量关系"&&action==="选择表计") return openMeterRelationPickerModal();
  if(activePage==="计量关系"&&["编辑","停用","重新启用"].includes(action)) return openMeterRelationModal(action,drawerContext.row||[]);
  if(activePage==="设备告警"&&["误报关闭","派单处置","换人"].includes(action)) return openDeviceAlarmModal(action,drawerContext.row||[]);
  const key=`${activePage}:${action}`,fields=actionSpecs[key];
  if(!fields) return toast(`PRD 未定义“${activePage} / ${action}”表单字段，已阻止打开`);
  const note=readonlyActionNotes[key]?`<div class="alert warning"><b>业务校验：</b>${readonlyActionNotes[key]}</div>`:"";
  currentActionContext={page:activePage,action,rowIndex:drawerContext.rowIndex??-1};
  if(activePage==="计费方式"&&action==="编辑") return openFormDrawer(action,fields,note);
  if(["计费规则配置"].includes(activePage)&&["新增规则","编辑"].includes(action)) return openFormDrawer(action,fields,note);
  resetEnergyModalState();
  document.getElementById("energyModalTitle").textContent=action;document.getElementById("energyModalBody").innerHTML=`${note}<div class="form-grid">${fields.map(field).join("")}</div>`;document.getElementById("energyModalOverlay").classList.add("show");
}
function toast(message){
  const t=document.createElement("div");t.className="toast";t.innerHTML=`<b>操作成功</b><div>${message}</div>`;document.getElementById("energyToastStack").appendChild(t);setTimeout(()=>t.remove(),2600);
}
function handleEnergyDrawerConfirm(){
  const action=document.getElementById("energyDrawerConfirm")?.dataset.action;
  if(action){
    openAction(action);
    return;
  }
  if(drawerMode==="detail"&&drawerContext.customDetail==="ammonia-device"){
    document.getElementById("energyDrawerOverlay").classList.remove("show");
    activePage="设备告警";
    renderPage();
    toast("已切换至设备告警");
    return;
  }
  const title=document.getElementById("energyDrawerTitle").textContent;document.getElementById("energyDrawerOverlay").classList.remove("show");toast(drawerMode==="form"?`${title}已保存`:`${title}已关闭`);
}

document.addEventListener("click",e=>{
  const addTier=e.target.closest("[data-add-tier-row]");
  if(addTier){addBillingTierRow();return;}
  const removeTier=e.target.closest("[data-remove-tier-row]");
  if(removeTier){removeTier.closest(".billing-tier-row")?.remove();return;}
  const remoteCascaderControl=e.target.closest(".remote-cascader-control");
  if(remoteCascaderControl){
    const cascader=remoteCascaderControl.closest(".remote-cascader");
    cascader?.classList.toggle("open");
    return;
  }
  const remoteCascaderOption=e.target.closest(".remote-cascader-col button");
  if(remoteCascaderOption){
    const cascader=remoteCascaderOption.closest(".remote-cascader");
    remoteCascaderOption.closest(".remote-cascader-col")?.querySelectorAll("button").forEach(button=>button.classList.toggle("selected",button===remoteCascaderOption));
    const selectedText=[...cascader.querySelectorAll(".remote-cascader-col button.selected span")].map(item=>item.textContent.trim()).join(" / ");
    const label=cascader.querySelector(".remote-cascader-control span");
    if(label) label.textContent=selectedText||"请选择";
    cascader.classList.remove("open");
    return;
  }
  if(!e.target.closest(".remote-cascader")) document.querySelectorAll(".remote-cascader.open").forEach(item=>item.classList.remove("open"));
  const module=e.target.closest("[data-module]"); if(module){activeModule=module.dataset.module;activePage=energyModules.find(x=>x.id===activeModule).children[0];if(activePage!=="预算报告")budgetState.reportPreview=null;if(activeModule!=="carbon")carbonState.detail=null;renderPage();return;}
  const p=e.target.closest("[data-page]"); if(p){activePage=p.dataset.page;if(activePage!=="预算报告")budgetState.reportPreview=null;if(activePage!=="碳排放核算")carbonState.detail=null;renderPage();return;}
  const nav=e.target.closest("[data-nav]"); if(nav){for(const m of energyModules){if(m.children.includes(nav.dataset.nav)){activeModule=m.id;activePage=nav.dataset.nav;if(activePage!=="碳排放核算")carbonState.detail=null;document.getElementById("energyDrawerOverlay")?.classList.remove("show");document.getElementById("energyModalOverlay")?.classList.remove("show");renderPage();return;}}}
  const thresholdAction=e.target.closest("[data-threshold-action]");
  if(thresholdAction&&activePage==="阈值配置"){
    document.querySelectorAll("[data-threshold-field]").forEach(input=>{
      const key=input.dataset.thresholdField;
      thresholdConfigState[key]=input.value.trim()||thresholdConfigDefaults[key];
    });
    thresholdConfigLastModified=formatDateTime(new Date());
    renderPage();
    toast("阈值配置已保存");
    return;
  }
  const alarmThresholdAction=e.target.closest("[data-alarm-threshold-action]");
  if(alarmThresholdAction&&activePage==="告警规则配置"){
    collectAlarmRuleConfigValues();
    alarmRuleLastModified=formatDateTime(new Date());
    renderPage();
    toast("告警规则配置已保存");
    return;
  }
  const alarmBaseCard=e.target.closest("[data-alarm-base-card]");
  if(alarmBaseCard&&activePage==="告警规则配置"){
    collectAlarmRuleConfigValues();
    alarmRuleConfigState.baseStrategy=alarmBaseCard.dataset.alarmBaseCard;
    renderAlarmRuleConfig();
    return;
  }
  const alarmSwitch=e.target.closest("[data-alarm-switch]");
  if(alarmSwitch&&activePage==="告警规则配置"){
    collectAlarmRuleConfigValues();
    alarmRuleConfigState[alarmSwitch.dataset.alarmSwitch].enabled=alarmSwitch.checked;
    renderAlarmRuleConfig();
    return;
  }
  const pickerRemove=e.target.closest("[data-meter-relation-picker-remove]");
  if(pickerRemove&&activePage==="计量关系"){
    meterRelationPickerState.selectedCodes.delete(pickerRemove.dataset.meterRelationPickerRemove);
    renderMeterRelationPicker();
    return;
  }
  const pickerPage=e.target.closest("[data-meter-relation-picker-page]");
  if(pickerPage&&activePage==="计量关系"){
    meterRelationPickerState.page=Number(pickerPage.dataset.meterRelationPickerPage)||1;
    renderMeterRelationPicker();
    return;
  }
  const pickerStep=e.target.closest("[data-meter-relation-picker-step]");
  if(pickerStep&&activePage==="计量关系"){
    const pageCount=Math.max(1,Math.ceil(meterRelationPickerRows.length/meterRelationPickerState.pageSize));
    meterRelationPickerState.page=pickerStep.dataset.meterRelationPickerStep==="prev"?Math.max(1,meterRelationPickerState.page-1):Math.min(pageCount,meterRelationPickerState.page+1);
    renderMeterRelationPicker();
    return;
  }
  const point=e.target.closest("[data-row-nav]"); if(point&&currentCfg){const row=currentCfg.rows.find(r=>r[0]===point.dataset.rowNav);if(row){drawerContext.row=row;openDetail(row);return;}}
  const pageStep=e.target.closest("[data-page-step]"); if(pageStep&&dynamicPages.has(activePage)){const runtime=getPageRuntime(activePage),cfg=currentCfg;const pageCount=Math.max(1,Math.ceil((cfg?.allRows||[]).filter(row=>Object.entries(runtime.filters).every(([label,value])=>{if(!value)return true;const resolver=filterFieldMap[activePage]||{};const text=String((resolver[label]?resolver[label](row):row.join(" "))).toLowerCase();return text.includes(value.toLowerCase());})).length/(cfg?.pageSize||10)));runtime.currentPage=pageStep.dataset.pageStep==="prev"?Math.max(1,runtime.currentPage-1):Math.min(pageCount,runtime.currentPage+1);renderPage();return;}
  const pageIndex=e.target.closest("[data-page-index]"); if(pageIndex&&dynamicPages.has(activePage)){getPageRuntime(activePage).currentPage=Number(pageIndex.dataset.pageIndex);renderPage();return;}
  const tr=e.target.closest("tr[data-row]"); if(tr&&currentCfg){drawerContext.row=(currentCfg.allRows||currentCfg.rows)[Number(tr.dataset.row)];drawerContext.rowIndex=Number(tr.dataset.row);}
  const billingConfig=e.target.closest("[data-billing-method]");
  if(billingConfig){openBillingMethodModal(billingConfig.dataset.billingMethod,billingConfig.dataset.billingEnergy);return;}
  const action=e.target.closest("[data-action]"); if(action){openAction(action.dataset.action);return;}
  const tab=e.target.closest("[data-tab]"); if(tab){if(activePage==="指标分析与预警")renderIndicatorTab(tab.dataset.tab);if(activePage==="告警规则配置"){alarmRuleConfigTab=tab.dataset.tab;renderAlarmRuleConfig();}if(["表具与计费关联","计量关系"].includes(activePage))renderMeterTab(tab.dataset.tab);return;}
  const carbonTab=e.target.closest("[data-carbon-tab]"); if(carbonTab&&activePage==="碳排放核算"){carbonState.detailTab=carbonTab.dataset.carbonTab;renderPage();return;}
  const alarmAction=e.target.closest("[data-ammonia-alarm-action]");
  if(alarmAction&&drawerContext.customDetail==="ammonia-device"){
    if(alarmAction.dataset.ammoniaAlarmAction==="reset") drawerContext.alarmFilters={start:"",end:""};
    else drawerContext.alarmFilters={
      start:document.querySelector('[data-ammonia-alarm-filter="start"]')?.value||"",
      end:document.querySelector('[data-ammonia-alarm-filter="end"]')?.value||""
    };
    document.getElementById("ammoniaDeviceDetailTabBody").innerHTML=ammoniaDeviceDetailTabContent("告警记录",drawerContext.row||[]);
    return;
  }
  const monitorFilter=e.target.closest("[data-ammonia-monitor-view]");
  if(monitorFilter&&drawerContext.customDetail==="ammonia-device"){
    drawerContext.monitorState={...(drawerContext.monitorState||{range:"1h",view:"chart"}),view:monitorFilter.dataset.ammoniaMonitorView};
    document.getElementById("ammoniaDeviceDetailTabBody").innerHTML=ammoniaDeviceDetailTabContent("实时监测",drawerContext.row||[]);
    return;
  }
  const ammoniaTab=e.target.closest("[data-ammonia-detail-tab]"); if(ammoniaTab&&drawerContext.customDetail==="ammonia-device"){document.querySelectorAll("[data-ammonia-detail-tab]").forEach(x=>x.classList.toggle("active",x===ammoniaTab));drawerContext.detailTab=ammoniaTab.dataset.ammoniaDetailTab;document.getElementById("ammoniaDeviceDetailTabBody").innerHTML=ammoniaDeviceDetailTabContent(drawerContext.detailTab,drawerContext.row||[]);return;}
  const deviceAlarmTab=e.target.closest("[data-device-alarm-detail-tab]"); if(deviceAlarmTab&&drawerContext.customDetail==="device-alarm"){document.querySelectorAll("[data-device-alarm-detail-tab]").forEach(x=>x.classList.toggle("active",x===deviceAlarmTab));drawerContext.detailTab=deviceAlarmTab.dataset.deviceAlarmDetailTab;document.getElementById("deviceAlarmDetailTabBody").innerHTML=deviceAlarmDetailTabContent(drawerContext.detailTab,drawerContext.row||[]);return;}
  const dailyEnergyTab=e.target.closest("[data-daily-energy-detail-tab]"); if(dailyEnergyTab&&drawerContext.customDetail==="daily-energy"){document.querySelectorAll("[data-daily-energy-detail-tab]").forEach(x=>x.classList.toggle("active",x===dailyEnergyTab));drawerContext.detailTab=dailyEnergyTab.dataset.dailyEnergyDetailTab;document.getElementById("dailyEnergyDetailTabBody").innerHTML=dailyEnergyDetailTabContent(drawerContext.detailTab,drawerContext.row||[]);return;}
  const meterRelationDetailTab=e.target.closest("[data-meter-relation-detail-tab]"); if(meterRelationDetailTab&&drawerContext.customDetail==="meter-relation"){document.querySelectorAll("[data-meter-relation-detail-tab]").forEach(x=>x.classList.toggle("active",x===meterRelationDetailTab));drawerContext.detailTab=meterRelationDetailTab.dataset.meterRelationDetailTab;document.getElementById("meterRelationDetailTabBody").innerHTML=meterRelationDetailContent(drawerContext.detailTab,drawerContext.row||[]);return;}
  const dailyEnergySort=e.target.closest("[data-daily-energy-sort]"); if(dailyEnergySort&&drawerContext.customDetail==="daily-energy"){drawerContext.dailyEnergySort=dailyEnergySort.dataset.dailyEnergySort;document.getElementById("dailyEnergyDetailTabBody").innerHTML=dailyEnergyDetailTabContent(drawerContext.detailTab||"设备读数",drawerContext.row||[]);return;}
  const dt=e.target.closest("[data-drawer-tab]"); if(dt){document.querySelectorAll("[data-drawer-tab]").forEach(x=>x.classList.remove("active"));dt.classList.add("active");document.getElementById("energyDrawerBody").innerHTML=detailContent(dt.dataset.drawerTab);return;}
  const close=e.target.closest("[data-close]"); if(close){document.getElementById(close.dataset.close==="drawer"?"energyDrawerOverlay":"energyModalOverlay").classList.remove("show");if(close.dataset.close==="modal") resetEnergyModalState();}
});
document.addEventListener("input",e=>{
  const currentReading=e.target.closest('[data-meter-reading-field="本次读数"]');
  if(currentReading&&activePage==="抄表管理"){
    const type=document.querySelector('[data-meter-reading-field="设备类型"]')?.value||"水表";
    const prev=document.querySelector('[data-meter-reading-field="上次读数"]')?.value||"0";
    const delta=document.querySelector('[data-meter-reading-field="本次增量"]');
    if(delta) delta.value=currentReading.value.trim()?readingWithUnit(numericReading(currentReading.value)-numericReading(prev),type):"自动计算";
  }
});
document.addEventListener("change",e=>{
  const pickerCheck=e.target.closest("[data-meter-relation-picker-check]");
  if(pickerCheck&&activePage==="计量关系"){
    if(pickerCheck.checked) meterRelationPickerState.selectedCodes.add(pickerCheck.dataset.meterRelationPickerCheck);
    else meterRelationPickerState.selectedCodes.delete(pickerCheck.dataset.meterRelationPickerCheck);
    renderMeterRelationPicker();
    return;
  }
  const relationEnterprise=e.target.closest("[data-meter-relation-enterprise]");
  if(relationEnterprise&&activePage==="计量关系"){
    const meta=meterRelationEnterpriseMeta(relationEnterprise.value);
    const contact=document.querySelector("[data-meter-relation-contact]");
    if(contact) contact.value=meta.contact;
    return;
  }
  const relationLongTerm=e.target.closest(".meter-relation-long-term input");
  if(relationLongTerm&&activePage==="计量关系"){
    const endInput=relationLongTerm.closest(".meter-relation-validity-row")?.querySelector('input[type="date"]:nth-of-type(2)');
    if(endInput){
      endInput.disabled=relationLongTerm.checked;
      if(relationLongTerm.checked) endInput.value="";
    }
    return;
  }
  const meterSelect=e.target.closest('[data-meter-reading-field="选择人工表计"]');
  if(meterSelect&&activePage==="抄表管理"){
    const meta=meterReadingMeterMeta(meterSelect.value);
    const setField=(label,value)=>{const input=document.querySelector(`[data-meter-reading-field="${label}"]`);if(input) input.value=value;};
    setField("设备编码",meta.code);
    setField("设备类型",meta.type);
    setField("所属园区",meta.park);
    setField("安装位置",meta.location);
    setField("循环点",meta.cyclePoint);
    setField("上次读数",meta.prevReading);
    setField("上次读数时间",meta.prevTime);
    setField("本次读数","");
    setField("本次增量","自动计算");
    return;
  }
  const alarmRange=e.target.closest('[data-ammonia-alarm-filter="start"],[data-ammonia-alarm-filter="end"]');
  if(alarmRange&&drawerContext.customDetail==="ammonia-device"){
    drawerContext.alarmFilters={
      start:document.querySelector('[data-ammonia-alarm-filter="start"]')?.value||"",
      end:document.querySelector('[data-ammonia-alarm-filter="end"]')?.value||""
    };
    document.getElementById("ammoniaDeviceDetailTabBody").innerHTML=ammoniaDeviceDetailTabContent("告警记录",drawerContext.row||[]);
    return;
  }
  const monitorRange=e.target.closest('[data-ammonia-monitor-filter="start"],[data-ammonia-monitor-filter="end"]');
  if(monitorRange&&drawerContext.customDetail==="ammonia-device"){
    drawerContext.monitorState={
      ...(drawerContext.monitorState||{start:"",end:"",view:"chart"}),
      start:document.querySelector('[data-ammonia-monitor-filter="start"]')?.value||"",
      end:document.querySelector('[data-ammonia-monitor-filter="end"]')?.value||""
    };
    document.getElementById("ammoniaDeviceDetailTabBody").innerHTML=ammoniaDeviceDetailTabContent("实时监测",drawerContext.row||[]);
  }
});
document.getElementById("energyModalConfirm").addEventListener("click",()=>{const title=document.getElementById("energyModalTitle").textContent;if(title==="查看关联账单"||title==="选择表计"){document.getElementById("energyModalOverlay").classList.remove("show");resetEnergyModalState();return;}const handled=applyModalAction(title);if(handled==="blocked")return;document.getElementById("energyModalOverlay").classList.remove("show");resetEnergyModalState();if(handled)renderPage();toast(`${title}已提交，状态和操作记录已同步更新`);});
document.getElementById("energyDrawerConfirm").addEventListener("click",handleEnergyDrawerConfirm);
document.querySelectorAll(".overlay").forEach(x=>x.addEventListener("click",e=>{if(e.target===x){x.classList.remove("show");if(x.id==="energyModalOverlay") resetEnergyModalState();}}));
initPageFromUrl();
renderPage();
