﻿module egret3d {

     /**
    * @private
     * @language zh_CN
     * @class egret3d.ShadowVertexMethod
     * @classdesc
     * 阴影顶点方法。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class ShadowVertexMethod extends MethodBase {


        /**
        * @language zh_CN
        * 创建一个新的 ShadowVertexMethod 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.vsMethodName = "Shadow_vertex_static";
        }


        /**
         * @language zh_CN
         * 激活 阴影顶点方法。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         *-pos     3 12 0
         *-normal  3 12 12
         *-tangent 3 12 24
         *-color   4 16 36
         *-uv0     2 8  52
         *-uv      1 8  60
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activate(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase  ) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            geometry.sharedVertexBuffer = context3D.creatVertexBuffer(geometry.verticesData);

            geometry.numberOfVertices = geometry.verticesData.length / geometry.vertexAttLength;
            geometry.vertexSizeInBytes = geometry.positionSize * Float32Array.BYTES_PER_ELEMENT + //pos 0
            3 * Float32Array.BYTES_PER_ELEMENT + //normal 12
            3 * Float32Array.BYTES_PER_ELEMENT + //tangent 24
            4 * Float32Array.BYTES_PER_ELEMENT + //color 36 
            2 * Float32Array.BYTES_PER_ELEMENT + //uv 52
            2 * Float32Array.BYTES_PER_ELEMENT; //uv2 60

            geometry.sharedIndexBuffer = context3D.creatIndexBuffer(geometry.indexData);

            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);
            this.usage.attribute_position.uniformIndex = context3D.getShaderAttribLocation(program3D, this.usage.attribute_position.name);
            
            this.usage.uniform_ModelMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_ModelMatrix.name);
            this.usage.uniform_ProjectionMatrix.uniformIndex = context3D.getUniformLocation(program3D, this.usage.uniform_ProjectionMatrix.name);
        }

        /**
         * @language zh_CN
         * 更新 阴影顶点方法。
         * @param context3D {Context3D}
         * @param program3D {IProgram3D}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updata(context3D: Context3D, program3D: IProgram3D, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase  ) {
            // 绑定同时包含顶点位置和颜色信息的缓冲
            context3D.bindVertexBuffer(geometry.sharedVertexBuffer);
            context3D.vertexAttribPointer(program3D, this.usage.attribute_position.uniformIndex, 3, Egret3DDrive.FLOAT, false, geometry.vertexSizeInBytes, 0);
            context3D.uniformMatrix4fv(this.usage.uniform_ModelMatrix.uniformIndex, false, modeltransform.rawData);
            context3D.uniformMatrix4fv(this.usage.uniform_ProjectionMatrix.uniformIndex, false, camera3D.viewProjectionMatrix.rawData);
        }
    }
}  

