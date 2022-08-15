import {
    ServerUnaryCall,
    sendUnaryData,
    ServiceError,
    ServerWritableStream,
    ServerReadableStream,
} from "grpc";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";

import {IPluginsServer} from "../proto/plugins_grpc_pb";
import {Plugin, PluginRequest} from "../proto/plugins_pb";

import {plugins} from "./plugin";

export class PluginsServer implements IPluginsServer {
    getMessage(call: ServerUnaryCall<PluginRequest>, callback: sendUnaryData<Plugin>): void {
        const pluginId = call.request.getId();
        const plugin = plugins.find((u) => u.getId() === pluginId);

        if (!plugin) {
            const error: ServiceError = {
                name: "User Missing",
                message: `User with ID ${pluginId} does not exist.`,
            };
            callback(error, null);
            return;
        }

        console.log(`getUser: returning ${plugin.getMessage()} (id: ${plugin.getId()}).`);
        callback(null, plugin);
    }
}