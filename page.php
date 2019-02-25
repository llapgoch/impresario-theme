<?php get_header(); ?>
    <div class="container-fluid">
        <main role="main" class="row">

            <section class="col-12 pr- pl-md-5 pr-md-5">


                <?php if (have_posts()): while (have_posts()) : the_post(); ?>

                    <!-- article -->
                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                        <div class="container">
                        <?php the_content(); ?>
                        </div>
                    </article>
                    <!-- /article -->

                <?php endwhile; ?>

                <?php else: ?>

                    <!-- article -->
                    <article>

                        <h2><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h2>

                    </article>
                    <!-- /article -->

                <?php endif; ?>

            </section>
            
            <!-- /section -->
        </main>
    </div>


<?php get_footer(); ?>