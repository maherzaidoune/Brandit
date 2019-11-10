package com.brandit.Editor;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Typeface;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.transition.ChangeBounds;
import android.transition.TransitionManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.OrientationEventListener;
import android.view.View;
import android.view.animation.AnticipateOvershootInterpolator;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintSet;
import androidx.core.content.res.ResourcesCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.brandit.Editor.base.BaseActivity;
import com.brandit.Editor.filters.FilterListener;
import com.brandit.Editor.filters.FilterViewAdapter;
import com.brandit.Editor.tools.EditingToolsAdapter;
import com.brandit.Editor.tools.ToolType;
import com.brandit.R;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.ArrayList;

import ja.burhanrashid52.photoeditor.OnPhotoEditorListener;
import ja.burhanrashid52.photoeditor.PhotoEditor;
import ja.burhanrashid52.photoeditor.PhotoEditorView;
import ja.burhanrashid52.photoeditor.PhotoFilter;
import ja.burhanrashid52.photoeditor.SaveSettings;
import ja.burhanrashid52.photoeditor.TextStyleBuilder;
import ja.burhanrashid52.photoeditor.ViewType;

import static android.os.Environment.getExternalStoragePublicDirectory;

public class EditImageActivity extends BaseActivity implements OnPhotoEditorListener,
        View.OnClickListener,
        PropertiesBSFragment.Properties,
        EmojiBSFragment.EmojiListener,
        StickerBSFragment.StickerListener, EditingToolsAdapter.OnItemSelected, FilterListener {

    private static final String TAG = EditImageActivity.class.getSimpleName();
    public static final String EXTRA_IMAGE_PATHS = "extra_image_paths";
    private static final int CAMERA_REQUEST = 52;
    private static final int PICK_REQUEST = 53;
    private PhotoEditor mPhotoEditor;
    private PhotoEditorView mPhotoEditorView;
    private PropertiesBSFragment mPropertiesBSFragment;
    private EmojiBSFragment mEmojiBSFragment;
    private StickerBSFragment mStickerBSFragment;
    private FrameBSFragment mFrameBSFragment = null ;
    private TextView mTxtCurrentTool;
    private Typeface mWonderFont;
    private RecyclerView mRvTools, mRvFilters;
    private EditingToolsAdapter mEditingToolsAdapter = new EditingToolsAdapter(this);
    private FilterViewAdapter mFilterViewAdapter = new FilterViewAdapter(this);
    private ConstraintLayout mRootView;
    private ConstraintSet mConstraintSet = new ConstraintSet();
    private boolean mIsFilterVisible;
    ArrayList<String> Stickers;
    ArrayList<String> masks;
    ArrayList<String> landscapemasks;
    static ArrayList<String> Frames;
    int  ORIENTATION = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //makeFullScreen();

        setContentView(R.layout.activity_edit_image);
        initViews();
        mWonderFont = Typeface.createFromAsset(getAssets(), "beyond_wonderland.ttf");
        try {
            if (getIntent().getExtras().getString("selectedImagePath") != null) {
                Glide.with(this).load(getIntent().getExtras().getString("selectedImagePath")).into(mPhotoEditorView.getSource());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        try{
            if (getIntent().getStringArrayListExtra("Stickers") != null) {
                Stickers = getIntent().getStringArrayListExtra("Stickers");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        try{
            if (getIntent().getStringArrayListExtra("mask") != null) {
                masks = getIntent().getStringArrayListExtra("mask");
                Frames = masks;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        try{
            if (getIntent().getStringArrayListExtra("landmasq") != null) {
                landscapemasks = getIntent().getStringArrayListExtra("landmasq");
            }
        }catch (Exception e){
            e.printStackTrace();
        }



        mFrameBSFragment = new FrameBSFragment(masks);
        mFrameBSFragment.setStickerListener(EditImageActivity.this);
        mPropertiesBSFragment = new PropertiesBSFragment();
        mEmojiBSFragment = new EmojiBSFragment();
        mStickerBSFragment = new StickerBSFragment(Stickers);
        mStickerBSFragment.setStickerListener(this);
        mEmojiBSFragment.setEmojiListener(this);
        mPropertiesBSFragment.setPropertiesChangeListener(this);
        LinearLayoutManager llmTools = new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false);
        mRvTools.setLayoutManager(llmTools);
        mRvTools.setAdapter(mEditingToolsAdapter);
        LinearLayoutManager llmFilters = new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false);
        mRvFilters.setLayoutManager(llmFilters);
        mRvFilters.setAdapter(mFilterViewAdapter);


        Typeface mTextRobotoTf = ResourcesCompat.getFont(this, R.font.roboto_medium);
        Typeface mEmojiTypeFace = Typeface.createFromAsset(getAssets(), "emojione-android.ttf");


        mPhotoEditor = new PhotoEditor.Builder(this, mPhotoEditorView)
                .setPinchTextScalable(true) // set flag to make text scalable when pinch
                .setDefaultTextTypeface(mTextRobotoTf)
                .setDefaultEmojiTypeface(mEmojiTypeFace)
                .build(); // build photo editor sdk

        mPhotoEditor.setOnPhotoEditorListener(this);

        if(hasNotch() && hasSoftKey()){
            mPhotoEditorView.setPadding(0, (int) statusHeight(), 0, (int) softkeyheight());
        }else if (hasNotch()) {
            mPhotoEditorView.setPadding(0, (int) statusHeight(), 0, 0);
        } else if (hasSoftKey()) {
            mPhotoEditorView.setPadding(0, (int) statusHeight(), 0, (int) softkeyheight());
        }

        //Set Image Dynamically
        // mPhotoEditorView.getSource().setImageResource(R.drawable.color_palette);

        OrientationEventListener mOrientationListener = new OrientationEventListener(
                getApplicationContext()) {
            @Override
            public void onOrientationChanged(int orientation) {
                if ((orientation == 0 || orientation == 180) && ORIENTATION == 1)
                    return;
                if ((orientation == 90 || orientation == 270) && ORIENTATION == 2)
                    return;

                if (orientation == 0 || orientation == 180) {
                    ORIENTATION = 1;
                    Frames = masks;
                    try{
                        new Handler().post(new Runnable() {
                            @Override
                            public void run() {
                                if(mFrameBSFragment.isVisible()){
                                    mFrameBSFragment.dismiss();
                                }
                                //if(Frames != null){
                                    mFrameBSFragment = new FrameBSFragment(masks);
                                    mFrameBSFragment.setStickerListener(EditImageActivity.this);
                                //}
                            }
                        });
                    }catch (Exception e){
                        e.printStackTrace();
                        Toast.makeText(getApplicationContext(), "Exception : " + e.getMessage(), Toast.LENGTH_SHORT ).show();
                    }
                } else if (orientation == 90 || orientation == 270) {
                    ORIENTATION = 2;
                    Frames = landscapemasks;
                    try{
                        new Handler().post(new Runnable() {
                            @Override
                            public void run() {
                                if(mFrameBSFragment.isVisible()){
                                    mFrameBSFragment.dismiss();
                                }
                                //if(Frames != null){
                                    mFrameBSFragment = new FrameBSFragment(landscapemasks);
                                    mFrameBSFragment.setStickerListener(EditImageActivity.this);
                                //}
                            }
                        });
                    }catch (Exception e){
                        e.printStackTrace();
                        Toast.makeText(getApplicationContext(), "Exception " + e.getMessage(), Toast.LENGTH_SHORT ).show();
                    }
                }
            }
        };

        if (mOrientationListener.canDetectOrientation()) {
            mOrientationListener.enable();
        }else{
            Toast.makeText(getApplicationContext(), "can't detect orientation", Toast.LENGTH_LONG ).show();
        }
    }

    private void initViews() {
        ImageView imgUndo;
        ImageView imgRedo;
        ImageView imgCamera;
        ImageView imgGallery;
        ImageView imgSave;
        ImageView imgClose;

        mPhotoEditorView = findViewById(R.id.photoEditorView);
        mTxtCurrentTool = findViewById(R.id.txtCurrentTool);
        mRvTools = findViewById(R.id.rvConstraintTools);
        mRvFilters = findViewById(R.id.rvFilterView);
        mRootView = findViewById(R.id.rootView);

//        imgUndo = findViewById(R.id.imgUndo);
//        imgUndo.setOnClickListener(this);
//
//        imgRedo = findViewById(R.id.imgRedo);
//        imgRedo.setOnClickListener(this);

//        imgCamera = findViewById(R.id.imgCamera);
//        imgCamera.setOnClickListener(this);

//        imgGallery = findViewById(R.id.imgGallery);
//        imgGallery.setOnClickListener(this);

        imgSave = findViewById(R.id.imgSave);
        imgSave.setOnClickListener(this);

        imgClose = findViewById(R.id.imgClose);
        imgClose.setOnClickListener(this);

    }

    @Override
    public void onEditTextChangeListener(final View rootView, String text, int colorCode) {
        TextEditorDialogFragment textEditorDialogFragment =
                TextEditorDialogFragment.show(this, text, colorCode);
        textEditorDialogFragment.setOnTextEditorListener(new TextEditorDialogFragment.TextEditor() {
            @Override
            public void onDone(String inputText, int colorCode) {
                final TextStyleBuilder styleBuilder = new TextStyleBuilder();
                styleBuilder.withTextColor(colorCode);

                mPhotoEditor.editText(rootView, inputText, styleBuilder);
                mTxtCurrentTool.setText(R.string.label_text);
            }
        });
    }

    @Override
    public void onAddViewListener(ViewType viewType, int numberOfAddedViews) {
        Log.d(TAG, "onAddViewListener() called with: viewType = [" + viewType + "], numberOfAddedViews = [" + numberOfAddedViews + "]");
    }

    @Override
    public void onRemoveViewListener(ViewType viewType, int numberOfAddedViews) {
        Log.d(TAG, "onRemoveViewListener() called with: viewType = [" + viewType + "], numberOfAddedViews = [" + numberOfAddedViews + "]");
    }

    @Override
    public void onStartViewChangeListener(ViewType viewType) {
        Log.d(TAG, "onStartViewChangeListener() called with: viewType = [" + viewType + "]");
    }

    @Override
    public void onStopViewChangeListener(ViewType viewType) {
        Log.d(TAG, "onStopViewChangeListener() called with: viewType = [" + viewType + "]");
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {

//            case R.id.imgUndo:
//                mPhotoEditor.undo();
//                break;
//
//            case R.id.imgRedo:
//                mPhotoEditor.redo();
//                break;

            case R.id.imgSave:
                saveImage();
                break;

            case R.id.imgClose:
                onBackPressed();
                break;

//            case R.id.imgCamera:
//                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//                startActivityForResult(cameraIntent, CAMERA_REQUEST);
//                break;

//            case R.id.imgGallery:
//                Intent intent = new Intent();
//                intent.setType("image/*");
//                intent.setAction(Intent.ACTION_GET_CONTENT);
//                startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_REQUEST);
//                break;
        }
    }

    @SuppressLint("MissingPermission")
    private void saveImage() {
        if (requestPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
            showLoading("Saving...");
            File path = new File(getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "Images");

            File file = new File(path, System.currentTimeMillis() + ".png");

            Log.i("file", file.getPath());
            try {
                try {
                    path.mkdirs();
                    file.createNewFile();
                } catch (Exception e) {
                    file = new File(getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES)
                            + File.separator
                            + System.currentTimeMillis() + ".jpg");
                    file.createNewFile();
                }


                SaveSettings saveSettings = new SaveSettings.Builder()
                        .setClearViewsEnabled(true)
                        .setTransparencyEnabled(true)
                        .setCompressQuality(1)
                        .build();

                mPhotoEditor.saveAsFile(file.getAbsolutePath(), saveSettings, new PhotoEditor.OnSaveListener() {
                    @Override
                    public void onSuccess(@NonNull String imagePath) {
                        File source = new File(imagePath);
                        FileChannel input = null, output = null;
                        try {
                            File environment;
                            environment = Environment.getExternalStoragePublicDirectory(
                                    Environment.DIRECTORY_PICTURES);
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
                                    EditImageActivity.this,
                                    new String[]{dest.getAbsolutePath()},
                                    null,
                                    new MediaScannerConnection.OnScanCompletedListener() {
                                        @Override
                                        public void onScanCompleted(String path, Uri uri) {
                                            if (uri != null) {
                                                hideLoading();
                                                showSnackbar("Image Saved Successfully");
                                                Glide.with(EditImageActivity.this).load(Uri.fromFile(new File(path))).into(mPhotoEditorView.getSource());
                                            } else {
                                                hideLoading();
                                                showSnackbar("Failed to save Image");
                                            }
                                        }
                                    });
                        } catch (IOException e) {
                            hideLoading();
                            Log.i("Error", "Exception == ", e);
                            showSnackbar("Failed to save Image");
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
                    public void onFailure(@NonNull Exception exception) {
                        hideLoading();
                        showSnackbar("Failed to save Image");
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
                hideLoading();
                showSnackbar(e.getMessage());
            }
        }

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            switch (requestCode) {
                case CAMERA_REQUEST:
                    mPhotoEditor.clearAllViews();
                    Bitmap photo = (Bitmap) data.getExtras().get("data");
                    mPhotoEditorView.getSource().setImageBitmap(photo);
                    break;
                case PICK_REQUEST:
                    try {
                        mPhotoEditor.clearAllViews();
                        Uri uri = data.getData();
                        Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);
                        mPhotoEditorView.getSource().setImageBitmap(bitmap);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    break;
            }
        }
    }

    @Override
    public void onColorChanged(int colorCode) {
        mPhotoEditor.setBrushColor(colorCode);
        mTxtCurrentTool.setText(R.string.label_brush);
    }

    @Override
    public void onOpacityChanged(int opacity) {
        mPhotoEditor.setOpacity(opacity);
        mTxtCurrentTool.setText(R.string.label_brush);
    }

    @Override
    public void onBrushSizeChanged(int brushSize) {
        mPhotoEditor.setBrushSize(brushSize);
        mTxtCurrentTool.setText(R.string.label_brush);
    }

    @Override
    public void onEmojiClick(String emojiUnicode) {
        mPhotoEditor.addEmoji(emojiUnicode);
        mTxtCurrentTool.setText(R.string.label_emoji);

    }

    @Override
    public void onStickerClick(Bitmap bitmap, boolean isFrame) {
        mPhotoEditor.addImage(bitmap, isFrame);
        if(isFrame){
            mTxtCurrentTool.setText("Template");
        }else{
            mTxtCurrentTool.setText(R.string.label_sticker);
        }
    }

    @Override
    public void isPermissionGranted(boolean isGranted, String permission) {
        if (isGranted) {
            saveImage();
        }
    }

    private void showSaveDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage("Are you want to exit without saving image ?");
        builder.setPositiveButton("Save", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                saveImage();
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        builder.setNeutralButton("Discard", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                finish();
            }
        });
        builder.create().show();

    }

    @Override
    public void onFilterSelected(PhotoFilter photoFilter) {
        mPhotoEditor.setFilterEffect(photoFilter);
    }

    @Override
    public void onToolSelected(ToolType toolType) {
        switch (toolType) {
            case BRUSH:
                mPhotoEditor.setBrushDrawingMode(true);
                mTxtCurrentTool.setText(R.string.label_brush);
                mPropertiesBSFragment.show(getSupportFragmentManager(), mPropertiesBSFragment.getTag());
                break;
            case TEXT:
                TextEditorDialogFragment textEditorDialogFragment = TextEditorDialogFragment.show(this);
                textEditorDialogFragment.setOnTextEditorListener(new TextEditorDialogFragment.TextEditor() {
                    @Override
                    public void onDone(String inputText, int colorCode) {
                        final TextStyleBuilder styleBuilder = new TextStyleBuilder();
                        styleBuilder.withTextColor(colorCode);

                        mPhotoEditor.addText(inputText, styleBuilder);
                        mTxtCurrentTool.setText(R.string.label_text);
                    }
                });
                break;
            case ERASER:
                mPhotoEditor.brushEraser();
                mTxtCurrentTool.setText(R.string.label_eraser);
                break;
            case FILTER:
                mTxtCurrentTool.setText(R.string.label_filter);
                showFilter(true);
                break;
            case EMOJI:
                mEmojiBSFragment.show(getSupportFragmentManager(), mEmojiBSFragment.getTag());
                break;
            case STICKER:
                mStickerBSFragment.show(getSupportFragmentManager(), mStickerBSFragment.getTag());
                break;
            case FRAME:
                try{
                    mFrameBSFragment.show(getSupportFragmentManager(), mFrameBSFragment.getTag());
                }catch (Exception e){
                    Toast.makeText(getApplicationContext(), "Exception : " + e.getMessage(), Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }


    void showFilter(boolean isVisible) {
        mIsFilterVisible = isVisible;
        mConstraintSet.clone(mRootView);

        if (isVisible) {
            mConstraintSet.clear(mRvFilters.getId(), ConstraintSet.START);
            mConstraintSet.connect(mRvFilters.getId(), ConstraintSet.START,
                    ConstraintSet.PARENT_ID, ConstraintSet.START);
            mConstraintSet.connect(mRvFilters.getId(), ConstraintSet.END,
                    ConstraintSet.PARENT_ID, ConstraintSet.END);
        } else {
            mConstraintSet.connect(mRvFilters.getId(), ConstraintSet.START,
                    ConstraintSet.PARENT_ID, ConstraintSet.END);
            mConstraintSet.clear(mRvFilters.getId(), ConstraintSet.END);
        }

        ChangeBounds changeBounds = new ChangeBounds();
        changeBounds.setDuration(350);
        changeBounds.setInterpolator(new AnticipateOvershootInterpolator(1.0f));
        TransitionManager.beginDelayedTransition(mRootView, changeBounds);

        mConstraintSet.applyTo(mRootView);
    }

    @Override
    public void onBackPressed() {
        if (mIsFilterVisible) {
            showFilter(false);
            mTxtCurrentTool.setText(R.string.app_name);
        } else if (!mPhotoEditor.isCacheEmpty()) {
            showSaveDialog();
        } else {
            super.onBackPressed();
        }
    }

}
