export type RootObject = {
	diseaseh5Shelf: RootObjectDiseaseh5Shelf;
	statisGradeCityDetail: RootObjectStatisGradeCityDetail[];
}
export type RootObjectDiseaseh5ShelfChinaTotal = {
	confirm: number;
	heal: number;
	dead: number;
	noInfect: number;
	localWzzAdd: number;
	deadAdd: number;
	localConfirmAdd: number;
	highRiskAreaNum: number;
	nowConfirm: number;
	localConfirm: number;
	mRiskTime: string;
	nowSevere: number;
	importedCase: number;
	showLocalConfirm: number;
	showlocalinfeciton: number;
	noInfectH5: number;
	local_acc_confirm: number;
	confirmAdd: number;
	nowLocalWzz: number;
	localConfirmH5: number;
	suspect: number;
	mtime: string;
	mediumRiskAreaNum: number;
}
export type RootObjectDiseaseh5ShelfChinaAdd = {
	confirm: number;
	nowSevere: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	suspect: number;
	importedCase: number;
	noInfect: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
}
export type RootObjectDiseaseh5ShelfShowAddSwitch = {
	dead: boolean;
	nowConfirm: boolean;
	importedCase: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
	all: boolean;
	confirm: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	suspect: boolean;
	heal: boolean;
}
export type RootObjectDiseaseh5ShelfAreaTreeToday = {
	confirm: number;
	isUpdated: boolean;
}
export type RootObjectDiseaseh5ShelfAreaTreeTotal = {
	heal: number;
	wzz: number;
	highRiskAreaNum: number;
	mtime: string;
	adcode: string;
	showHeal: boolean;
	continueDayZeroLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
	dead: number;
	showRate: boolean;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
}
export type RootObjectDiseaseh5ShelfAreaTreeChildrenTotal = {
	adcode: string;
	heal: number;
	wzz: number;
	mediumRiskAreaNum: number;
	continueDayZeroConfirmAdd: number;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	confirm: number;
	showHeal: boolean;
	mtime: string;
	dead: number;
	showRate: boolean;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
}
export type RootObjectDiseaseh5ShelfAreaTreeChildrenChildrenToday = {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: string;
	local_confirm_add: number;
}
export type RootObjectDiseaseh5ShelfAreaTreeChildrenChildrenTotal = {
	dead: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	showHeal: boolean;
	wzz: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	provinceLocalConfirm: number;
	showRate: boolean;
	heal: number;
	continueDayZeroLocalConfirm: number;
	adcode: string;
}
export type RootObjectDiseaseh5ShelfAreaTreeChildrenChildren = {
	today: RootObjectDiseaseh5ShelfAreaTreeChildrenChildrenToday;
	total: RootObjectDiseaseh5ShelfAreaTreeChildrenChildrenTotal;
	name: string;
	adcode: string;
	date: string;
}
export type RootObjectDiseaseh5ShelfAreaTreeChildrenToday = {
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
}
export type RootObjectDiseaseh5ShelfAreaTreeChildren = {
	total: RootObjectDiseaseh5ShelfAreaTreeChildrenTotal;
	children: RootObjectDiseaseh5ShelfAreaTreeChildrenChildren[];
	name: string;
	adcode: string;
	date: string;
	today: RootObjectDiseaseh5ShelfAreaTreeChildrenToday;
}
export type RootObjectDiseaseh5ShelfAreaTree = {
	today: RootObjectDiseaseh5ShelfAreaTreeToday;
	total: RootObjectDiseaseh5ShelfAreaTreeTotal;
	children: RootObjectDiseaseh5ShelfAreaTreeChildren[];
	name: string;
}
export type RootObjectDiseaseh5Shelf = {
	lastUpdateTime: string;
	chinaTotal: RootObjectDiseaseh5ShelfChinaTotal;
	chinaAdd: RootObjectDiseaseh5ShelfChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: RootObjectDiseaseh5ShelfShowAddSwitch;
	areaTree: RootObjectDiseaseh5ShelfAreaTree[];
}
export type RootObjectStatisGradeCityDetail = {
	nowConfirm: number;
	dead: number;
	grade: string;
	date: string;
	sdate: string;
	syear: number;
	wzz_add: string;
	province: string;
	city: string;
	confirmAdd: number;
	confirm: number;
	heal: number;
	mtime: string;
}