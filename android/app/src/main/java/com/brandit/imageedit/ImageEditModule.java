//  Created by react-native-create-bridge

package com.brandit.imageedit;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.brandit.Editor.EditImageActivity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class ImageEditModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "ImageEdit";
    private static ReactApplicationContext reactContext = null;
    private static final int PHOTO_EDITOR_REQUEST = 1;
    private Callback mDoneCallback;
    private Callback mCancelCallback;


    public ImageEditModule(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);

        reactContext = context;
    }

    @Override
    public String getName() {
        // Tell React the name of the module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        return REACT_CLASS;
    }

    @Override
    public Map<String, Object> getConstants() {
        // Export any constants to be used in your native module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        final Map<String, Object> constants = new HashMap<>();
        constants.put("EXAMPLE_CONSTANT", "example");

        return constants;
    }

    @ReactMethod
    public void exampleMethod () {
        // An example native method that you will expose to React
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
    }

    private static void emitDeviceEvent(String eventName, @Nullable WritableMap eventData) {
        // A method for emitting from the native side to JS
        // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    @ReactMethod
    public void Edit(final ReadableMap props, final Callback onDone, final Callback onCancel) {
        String path = props.getString("path");



        Intent intent = new Intent(getCurrentActivity(), EditImageActivity.class);
        intent.putExtra("selectedImagePath", path);
        try{
            ArrayList<String> Stickers = toArray(props.getArray("Stickers"));
            Toast.makeText(getReactApplicationContext(), "Stickers : "+ toArray(props.getArray("Stickers")), Toast.LENGTH_SHORT).show();
            intent.putStringArrayListExtra("Stickers", Stickers);
        }catch (Exception e){
            e.printStackTrace();
        }

        mCancelCallback = onCancel;
        mDoneCallback = onDone;

        getCurrentActivity().startActivityForResult(intent, PHOTO_EDITOR_REQUEST);
    }

    public ArrayList<String> toArray(ReadableArray readableArray) {
        ArrayList<String> array = new ArrayList<String>();

        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            switch (type) {
                case String:
                    array.add(readableArray.getString(i));
                    break;
            }
        }
        return array;
    }
}
