<?php get_header(); ?>

	<main role="main">
        <div class="row">
        <?php get_sidebar(); ?>
		<!-- section -->
		<section class="row col-md-10 col-sm-11">
            <?php echo do_shortcode('[page_heading]');?>

                <div class="cards row">
                    <?php echo do_shortcode('[body_content]');?>
                </div>

		</section>
        </div>
		<!-- /section -->
	</main>

<?php get_footer(); ?>
