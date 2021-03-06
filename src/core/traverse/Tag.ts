﻿module egret3d {

    /**
    * @class egret3d.Tag
    * @classdesc
    * Object3D 渲染tag
    * 图形属性标签页的属性，由layer列表组成，共用深度信息
    * 渲染每个tag他们的深度信息是不清理的
    * 渲染顺序会根据 Tag.name来进行渲染
    * 渲染顺序按照
    * @see egret3d.Layer
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Tag {

        /**
        * @language zh_CN
        * 根据类型进行渲染排序
        * @see egret3d.Layer
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string = "normalObject";

        /*
        * @private
        */
        public clearDepth: boolean = false; 
       // /**
       //* @language zh_CN
       //* 没有alpha的对象列表
       //*/
       // public objects: Array<Object3D> = new Array<Object3D>();

       // /**
       //  * @language zh_CN
       //  * layer 列表
       //  */
       // public layers: Array<Layer> = new Array<Layer>();
       // /**
       // * @language zh_CN
       // * 有alpha的对象列表
       // */
       // public alphaObjects: Array<Object3D> = new Array<Object3D>();

    }
} 