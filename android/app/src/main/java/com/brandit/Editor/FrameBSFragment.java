package com.brandit.Editor;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.coordinatorlayout.widget.CoordinatorLayout;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.brandit.R;
import com.bumptech.glide.Glide;
import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.google.android.material.bottomsheet.BottomSheetDialogFragment;

import java.io.File;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import javax.annotation.Nullable;

public class FrameBSFragment extends BottomSheetDialogFragment {
    ArrayList<String> Stickers;
    ArrayList<Bitmap> bitmaps;

    public FrameBSFragment(ArrayList<String> Stickers) {
        // Required empty public constructor
        this.Stickers = Stickers;
        this.bitmaps = new ArrayList<>();
    }

    public FrameBSFragment() {

    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                if(Stickers == null || Stickers.size() == 0)
                    return;
                for (String s : Stickers) {
                    try {
                        Bitmap bitmap = Glide.with(context).asBitmap().load(s).submit().get();
                        bitmaps.add(bitmap);
                    } catch (ExecutionException e) {
                        e.printStackTrace();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        thread.start();
    }

    private StickerBSFragment.StickerListener mStickerListener;

    public void setStickerListener(StickerBSFragment.StickerListener stickerListener) {
        mStickerListener = stickerListener;
    }

    public interface StickerListener {
        void onStickerClick(Bitmap bitmap, boolean isFrame);
    }

    private BottomSheetBehavior.BottomSheetCallback mBottomSheetBehaviorCallback = new BottomSheetBehavior.BottomSheetCallback() {

        @Override
        public void onStateChanged(@NonNull View bottomSheet, int newState) {
            if (newState == BottomSheetBehavior.STATE_HIDDEN) {
                dismiss();
            }

        }

        @Override
        public void onSlide(@NonNull View bottomSheet, float slideOffset) {
        }
    };


    @SuppressLint("RestrictedApi")
    @Override
    public void setupDialog(Dialog dialog, int style) {
        super.setupDialog(dialog, style);
        View contentView = View.inflate(getContext(), R.layout.fragment_bottom_sticker_emoji_dialog, null);
        dialog.setContentView(contentView);
        CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) ((View) contentView.getParent()).getLayoutParams();
        CoordinatorLayout.Behavior behavior = params.getBehavior();

        if (behavior != null && behavior instanceof BottomSheetBehavior) {
            ((BottomSheetBehavior) behavior).setBottomSheetCallback(mBottomSheetBehaviorCallback);
        }
        ((View) contentView.getParent()).setBackgroundColor(getResources().getColor(android.R.color.transparent));
        RecyclerView rvEmoji = contentView.findViewById(R.id.rvEmoji);

        GridLayoutManager gridLayoutManager = new GridLayoutManager(getActivity(), 3);
        rvEmoji.setLayoutManager(gridLayoutManager);
        FrameBSFragment.StickerAdapter stickerAdapter = new FrameBSFragment.StickerAdapter(Stickers);
        rvEmoji.setAdapter(stickerAdapter);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

    }

    public class StickerAdapter extends RecyclerView.Adapter<FrameBSFragment.StickerAdapter.ViewHolder> {

        public StickerAdapter(ArrayList<String> stickerList) {
            this.stickerList = stickerList;
        }

        ArrayList<String> stickerList;
        ArrayList<File> files;

        @Override
        public FrameBSFragment.StickerAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.row_sticker, parent, false);
            return new FrameBSFragment.StickerAdapter.ViewHolder(view);
        }

        @Override
        public void onBindViewHolder(FrameBSFragment.StickerAdapter.ViewHolder holder, int position) {
            Glide.with(getContext()).load(stickerList.get(position)).into(holder.imgSticker);
//            holder.imgSticker.setImageResource(stickerList.get(position));
        }

        @Override
        public int getItemCount() {
            if(stickerList == null){
                dismiss();
                return 0;
            }
            return stickerList.size();
        }

        class ViewHolder extends RecyclerView.ViewHolder {
            ImageView imgSticker;

            ViewHolder(View itemView) {
                super(itemView);
                imgSticker = itemView.findViewById(R.id.imgSticker);

                itemView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        if (mStickerListener != null) {
//                            mStickerListener.onStickerClick(
//                                    BitmapFactory.decodeFile(files.get(getLayoutPosition()).getPath()));
                            mStickerListener.onStickerClick(bitmaps.get(getLayoutPosition()), true);
                        }
                        dismiss();
                    }
                });
            }
        }
    }

    private String convertEmoji(String emoji) {
        String returnedEmoji = "";
        try {
            int convertEmojiToInt = Integer.parseInt(emoji.substring(2), 16);
            returnedEmoji = getEmojiByUnicode(convertEmojiToInt);
        } catch (NumberFormatException e) {
            returnedEmoji = "";
        }
        return returnedEmoji;
    }

    private String getEmojiByUnicode(int unicode) {
        return new String(Character.toChars(unicode));
    }
}
