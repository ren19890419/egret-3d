/**
 * 聚光灯
 * close
 */

class SpotLightSample{
    public constructor() {
        StageMgr.Instance().init();
        this.init();
    }

    private loader: egret3d.UnitLoader;
    private init() {

        this.loader = new egret3d.UnitLoader("resource/texture/earth.png");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    }

    private light: egret3d.SpotLight;
    private _lightDir: egret3d.Vector3D = new egret3d.Vector3D(0, -1, 0);
    private _rotationX: number = 0.01;
    private onLoader(e: egret3d.LoaderEvent3D) {
        let img: egret3d.ImageTexture = e.target.data;

        let geom: egret3d.SphereGeometry = new egret3d.SphereGeometry(200, 30, 30);
        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial(img);
        let earth: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(earth);

        this.light = new egret3d.SpotLight(0xffffff);
        this.light.y = 250;

        let group: egret3d.LightGroup = new egret3d.LightGroup();
        group.addLight(this.light);
        earth.material.lightGroup = group;

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
        
    }

    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 1000;
        this.cameraCtl.rotationX = 0;
    }

    private _lightIntensity = 0.01;
    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }
}