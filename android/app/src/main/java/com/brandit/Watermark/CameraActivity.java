package com.brandit.Watermark;

import android.Manifest;
import android.animation.ValueAnimator;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.PointF;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Location;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.view.OrientationEventListener;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.brandit.Editor.EditImageActivity;
import com.brandit.R;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.transition.Transition;
import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.nabinbhandari.android.permissions.PermissionHandler;
import com.nabinbhandari.android.permissions.Permissions;
import com.otaliastudios.cameraview.CameraException;
import com.otaliastudios.cameraview.CameraListener;
import com.otaliastudios.cameraview.CameraLogger;
import com.otaliastudios.cameraview.CameraOptions;
import com.otaliastudios.cameraview.CameraView;
import com.otaliastudios.cameraview.PictureResult;
import com.otaliastudios.cameraview.controls.Mode;
import com.otaliastudios.cameraview.VideoResult;
import com.otaliastudios.cameraview.controls.Preview;
import com.otaliastudios.cameraview.filter.Filters;
import com.otaliastudios.cameraview.filter.MultiFilter;
import com.otaliastudios.cameraview.filters.BrightnessFilter;
import com.otaliastudios.cameraview.filters.DuotoneFilter;
import com.otaliastudios.cameraview.frame.Frame;
import com.otaliastudios.cameraview.frame.FrameProcessor;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.bottomsheet.BottomSheetBehavior;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class CameraActivity extends AppCompatActivity implements View.OnClickListener, OptionView.Callback {

    private final static CameraLogger LOG = CameraLogger.create("Brandit");
    private final static boolean USE_FRAME_PROCESSOR = false;
    private final static boolean DECODE_BITMAP = true;

    private CameraView camera;

    private int mCurrentFilter = 0;
    private final Filters[] mAllFilters = Filters.values();

    ArrayList<String> masks;

    ArrayList<String> landscapemasks;

    static ArrayList<String> Frames;
    private static int mCurrentMask = 0;
    int  ORIENTATION = -1;
    ImageView watermark;
    LinearLayout recording;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera);
        CameraLogger.setLogLevel(CameraLogger.LEVEL_VERBOSE);
        masks = new ArrayList<>();
        landscapemasks = new ArrayList<>();
        Frames = new ArrayList<>();
        camera = findViewById(R.id.camera);
        camera.setLifecycleOwner(this);
        camera.addCameraListener(new Listener());
        watermark = findViewById(R.id.watermark);
        recording = findViewById(R.id.recording);
        recording.setVisibility(View.GONE);
        try {
            if (getIntent().getStringArrayListExtra("mask") != null) {
                masks = getIntent().getStringArrayListExtra("mask");
                if (masks != null && masks.size() > 0) {
                    for (String s : masks) {
                        Glide.with(this.getApplicationContext())
                                .asBitmap()
                                .load(s)
                                .diskCacheStrategy(DiskCacheStrategy.ALL)
                                .submit();
                    }
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            if (getIntent().getStringArrayListExtra("landmasq") != null) {
                landscapemasks = getIntent().getStringArrayListExtra("landmasq");
                if (landscapemasks != null && landscapemasks.size() > 0) {
                    for (String s : landscapemasks) {
                        Glide.with(this.getApplicationContext())
                                .asBitmap()
                                .load(s)
                                .diskCacheStrategy(DiskCacheStrategy.ALL)
                                .submit();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        OrientationEventListener mOrientationListener = new OrientationEventListener(
                getApplicationContext()) {
            @Override
            public void onOrientationChanged(int orientation) {
                if (orientation == ORIENTATION)
                    return;
                ORIENTATION = orientation;
                mCurrentMask = 0;
                if (orientation == 0 || orientation == 180) {
                    Frames = masks;
                } else if (orientation == 90 || orientation == 270) {
                    Frames = landscapemasks;
                }
            }
        };

        if (mOrientationListener.canDetectOrientation()) {
            mOrientationListener.enable();
        }

        if(Frames != null && Frames.size() > 0)
            Glide.with(CameraActivity.this).load(Frames.get(0)).diskCacheStrategy(DiskCacheStrategy.ALL).into(watermark);
        else
            Glide.with(CameraActivity.this).load(masks.get(0)).diskCacheStrategy(DiskCacheStrategy.ALL).into(watermark);



        //Glide.with(this).load(masks.get(0)).into(watermark);
        if (USE_FRAME_PROCESSOR) {
            camera.addFrameProcessor(new FrameProcessor() {
                @Override
                public void process(@NonNull Frame frame) {

                    if (DECODE_BITMAP) {
                        YuvImage yuvImage = new YuvImage(frame.getData(), ImageFormat.NV21,
                                frame.getSize().getWidth(),
                                frame.getSize().getHeight(),
                                null);
                        ByteArrayOutputStream jpegStream = new ByteArrayOutputStream();
                        yuvImage.compressToJpeg(new Rect(0, 0,
                                frame.getSize().getWidth(),
                                frame.getSize().getHeight()), 100, jpegStream);
                        byte[] jpegByteArray = jpegStream.toByteArray();
                        Bitmap bitmap = BitmapFactory.decodeByteArray(jpegByteArray, 0, jpegByteArray.length);
                        //noinspection ResultOfMethodCallIgnored
                        bitmap.toString();
                    }
                }
            });
        }

        findViewById(R.id.captureVideoSnapshot).setOnClickListener(this);
        findViewById(R.id.toggleCamera).setOnClickListener(this);
//        findViewById(R.id.changeFilter).setOnClickListener(this);

        List<Option<?>> options = Arrays.asList(
                // Layout
                new Option.Width(), new Option.Height(),
                // Engine and preview
                new Option.Mode(), new Option.Engine(), new Option.Preview(),
                // Some controls
                new Option.Flash(), new Option.WhiteBalance(), new Option.Hdr(),
                new Option.PictureMetering(), new Option.PictureSnapshotMetering(),
                // Video recording
                new Option.VideoCodec(), new Option.Audio(),
                // Gestures
                new Option.Pinch(), new Option.HorizontalScroll(), new Option.VerticalScroll(),
                new Option.Tap(), new Option.LongTap(),
                // Watermarks
                new Option.OverlayInPreview(watermark),
                new Option.OverlayInPictureSnapshot(watermark),
                new Option.OverlayInVideoSnapshot(watermark),
                // Other
                new Option.Grid(), new Option.GridColor(), new Option.UseDeviceOrientation()
        );
        List<Boolean> dividers = Arrays.asList(
                false, true,
                false, false, true,
                false, false, false, false, true,
                false, true,
                false, false, false, false, true,
                false, false, true,
                false, false, true
        );
        for (int i = 0; i < options.size(); i++) {
            OptionView view = new OptionView(this);
            //noinspection unchecked
            view.setOption(options.get(i), this);
            view.setHasDivider(dividers.get(i));
//            group.addView(view,
//                    ViewGroup.LayoutParams.MATCH_PARENT,
//                    ViewGroup.LayoutParams.WRAP_CONTENT);
        }


    }

    @Override
    protected void onResume() {
        super.onResume();
        if(camera.isTakingVideo())
            return;
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (Frames == null || Frames.size() == 0)
                    return;
                Glide.with(CameraActivity.this).load(Frames.get(mCurrentMask)).diskCacheStrategy(DiskCacheStrategy.ALL).into(watermark);
            }
        });
    }

    private void message(@NonNull String content, boolean important) {
        if (important) {
            LOG.w(content);
            Toast.makeText(this, content, Toast.LENGTH_SHORT).show();
        } else {
            LOG.i(content);
            Toast.makeText(this, content, Toast.LENGTH_SHORT).show();
        }
    }

    private class Listener extends CameraListener {

        @Override
        public void onCameraOpened(@NonNull CameraOptions options) {
//            ViewGroup group = (ViewGroup) controlPanel.getChildAt(0);
//            for (int i = 0; i < group.getChildCount(); i++) {
//                OptionView view = (OptionView) group.getChildAt(i);
//                view.onCameraOpened(camera, options);
//            }
        }

        @Override
        public void onCameraError(@NonNull CameraException exception) {
            super.onCameraError(exception);
            message("Got CameraException #" + exception.getReason(), true);
        }

        @Override
        public void onPictureTaken(@NonNull PictureResult result) {
            super.onPictureTaken(result);
//            if (camera.isTakingVideo()) {
//                message("Captured while taking video. Size=" + result.getSize(), false);
//                return;
//            }
        }

        @Override
        public void onVideoTaken(@NonNull VideoResult result) {
            //super.onVideoTaken(result);
            String[] permissions = new String[]{
                    Manifest.permission.READ_EXTERNAL_STORAGE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE
            };
            Permissions.check(CameraActivity.this, permissions, null, null, new PermissionHandler() {
                @Override
                public void onGranted() {
                    File source = result.getFile();
                    FileChannel input = null, output = null;
                    try {
                        File environment;
                        environment = Environment.getExternalStoragePublicDirectory(
                                Environment.DIRECTORY_MOVIES);
                        File exportDir;
                        exportDir = environment;
                        if (!exportDir.isDirectory()) {
                            return;
                        }
                        File dest = new File(exportDir, source.getName());
                        int n = 0;
                        String fullSourceName = source.getName();
                        String sourceName, sourceExt;
                        if (fullSourceName.indexOf('.') >= 0) {
                            sourceName = fullSourceName.substring(0, fullSourceName.lastIndexOf('.'));
                            sourceExt = fullSourceName.substring(fullSourceName.lastIndexOf('.'));
                        } else {
                            sourceName = fullSourceName;
                            sourceExt = "";
                        }
                        while (!dest.createNewFile()) {
                            dest = new File(exportDir, sourceName + "_" + (n++) + sourceExt);
                        }
                        input = new FileInputStream(source).getChannel();
                        output = new FileOutputStream(dest).getChannel();
                        output.transferFrom(input, 0, input.size());
                        input.close();
                        output.close();
                        MediaScannerConnection.scanFile(
                                CameraActivity.this,
                                new String[]{dest.getAbsolutePath()},
                                null,
                                new MediaScannerConnection.OnScanCompletedListener() {
                                    @Override
                                    public void onScanCompleted(String path, Uri uri) {
                                        if (uri != null) {
                                            message("success " + uri, true);
                                        } else {
                                            message("fail ", true);
                                        }
                                    }
                                });
                    } catch (IOException e) {
                        message("IOException " + e.getMessage(), true);
                    } finally {
                        if (input != null && input.isOpen()) {
                            try {
                                input.close();
                            } catch (IOException e) {
                                Log.i("Error", "Could not close input channel", e);
                            }
                        }
                        if (output != null && output.isOpen()) {
                            try {
                                output.close();
                            } catch (IOException e) {
                                Log.i("Error", "Could not close output channel", e);
                            }
                        }
                    }
                }

                @Override
                public void onDenied(Context context, ArrayList<String> deniedPermissions) {
                    super.onDenied(context, deniedPermissions);

                }

                @Override
                public boolean onBlocked(Context context, ArrayList<String> blockedList) {
                    return super.onBlocked(context, blockedList);
                }
            });
            //VideoPreviewActivity.setVideoResult(result);
//            Intent intent = new Intent(CameraActivity.this, VideoPreviewActivity.class);
//            startActivity(intent);
            LOG.w("onVideoTaken called! Launched activity.");
        }

        @Override
        public void onVideoRecordingStart() {
            super.onVideoRecordingStart();
            recording.setVisibility(View.VISIBLE);
        }

        @Override
        public void onVideoRecordingEnd() {
            super.onVideoRecordingEnd();
            recording.setVisibility(View.GONE);
            message("Video taken. Processing...", false);
            //LOG.w("onVideoRecordingEnd!");
        }


        @Override
        public void onExposureCorrectionChanged(float newValue, @NonNull float[] bounds, @Nullable PointF[] fingers) {
            if (Frames == null || Frames.size() == 0) {
                if ((masks == null || masks.size() == 0))
                    return;
                Frames = masks;
            }

            if (!camera.isTakingVideo()) {
                if (mCurrentMask != Frames.size()) {
                    if (watermark.getVisibility() == View.GONE)
                        watermark.setVisibility(View.VISIBLE);
                    Glide.with(CameraActivity.this).load(Frames.get(mCurrentMask)).diskCacheStrategy(DiskCacheStrategy.ALL).into(watermark);
                } else {
                    mCurrentMask = -1;
                    watermark.setVisibility(View.GONE);
                    //Glide.with(CameraActivity.this).load(masks.get(mCurrentMask)).into(watermark);
                }
                mCurrentMask++;
            }

        }

        @Override
        public void onZoomChanged(float newValue, @NonNull float[] bounds, @Nullable PointF[] fingers) {
            super.onZoomChanged(newValue, bounds, fingers);
            //message("Zoom:" + newValue, false);
        }
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
//            case R.id.edit: edit(); break;
//            case R.id.capturePicture: capturePicture(); break;
//            case R.id.capturePictureSnapshot: capturePictureSnapshot(); break;
//            case R.id.captureVideo: captureVideo(); break;
            case R.id.captureVideoSnapshot:
                captureVideoSnapshot();
                break;
            case R.id.toggleCamera:
                toggleCamera();
                break;
//            case R.id.changeFilter: changeCurrentFilter(); break;
        }
    }

    @Override
    public void onBackPressed() {
//        BottomSheetBehavior b = BottomSheetBehavior.from(controlPanel);
//        if (b.getState() != BottomSheetBehavior.STATE_HIDDEN) {
//            b.setState(BottomSheetBehavior.STATE_HIDDEN);
//            return;
//        }
        super.onBackPressed();
    }

    private void edit() {
//        BottomSheetBehavior b = BottomSheetBehavior.from(controlPanel);
//        b.setState(BottomSheetBehavior.STATE_COLLAPSED);
    }

    private void captureVideoSnapshot() {
        if (camera.isTakingVideo()) {
            camera.stopVideo();
            return;
        }
        if (camera.getPreview() != Preview.GL_SURFACE) {
            message("Video snapshots are only allowed with the GL_SURFACE preview.", true);
            return;
        }
        camera.takeVideoSnapshot(new File(getFilesDir(), System.currentTimeMillis() +"video.mp4"));
    }

    private void toggleCamera() {
        if (camera.isTakingPicture() || camera.isTakingVideo()) return;
        switch (camera.toggleFacing()) {
            case BACK:
                message("Switched to back camera!", false);
                break;

            case FRONT:
                message("Switched to front camera!", false);
                break;
        }
    }

    private void changeCurrentFilter() {
        if (camera.getPreview() != Preview.GL_SURFACE) {
            message("Filters are supported only when preview is Preview.GL_SURFACE.", true);
            return;
        }
        if (mCurrentFilter < mAllFilters.length - 1) {
            mCurrentFilter++;
        } else {
            mCurrentFilter = 0;
        }
        Filters filter = mAllFilters[mCurrentFilter];
        message(filter.toString(), false);

        // Normal behavior:
        camera.setFilter(filter.newInstance());
    }

    @Override
    public <T> boolean onValueChanged(@NonNull Option<T> option, @NonNull T value, @NonNull String name) {
        if ((option instanceof Option.Width || option instanceof Option.Height)) {
            Preview preview = camera.getPreview();
            boolean wrapContent = (Integer) value == ViewGroup.LayoutParams.WRAP_CONTENT;
            if (preview == Preview.SURFACE && !wrapContent) {
                message("The SurfaceView preview does not support width or height changes. " +
                        "The view will act as WRAP_CONTENT by default.", true);
                return false;
            }
        }
        option.set(camera, value);
//        BottomSheetBehavior b = BottomSheetBehavior.from(controlPanel);
//        b.setState(BottomSheetBehavior.STATE_HIDDEN);
        message("Changed " + option.getName() + " to " + name, false);
        return true;
    }

    //region Permissions

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        boolean valid = true;
        for (int grantResult : grantResults) {
            valid = valid && grantResult == PackageManager.PERMISSION_GRANTED;
        }
        if (valid && !camera.isOpened()) {
            camera.open();
        }
    }


    //endregion
}
